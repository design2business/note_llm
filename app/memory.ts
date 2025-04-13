import { prepareTools } from 'mcp-uiux/dist/MCPClient.js'

interface MCPClient {
  disconnect: () => Promise<void>;
}

interface Tool {
  name: string;
  execute: (args: any) => Promise<any>;
}

interface ToolFunctionCall {
  function: {
    name: string;
    description?: string;
    parameters?: any;
  };
}

interface SystemPrompt {
  name: string;
  systemPrompt: string;
}

interface PrepareToolsResult {
  mcpClient: MCPClient;
  tools: Tool[];
  toolsFunctionCall: ToolFunctionCall[];
  systemPrompts: SystemPrompt[];
}

export class MemoryManager {
  private mcpClient: MCPClient | null;
  private tools: Tool[];
  private toolsFunctionCall: ToolFunctionCall[];
  private systemPrompts: SystemPrompt[];
  private url: string;

  constructor(url: string = "http://127.0.0.1:8080") {
    this.url = url;
    this.mcpClient = null;
    this.tools = [];
    this.toolsFunctionCall = [];
    this.systemPrompts = [];
  }

  async initialize() {
    try {
      console.log('开始初始化记忆管理器...');
      const result = await prepareTools(this.url) as PrepareToolsResult;
      console.log('MCP 工具准备完成:', {
        toolsCount: result.tools.length,
        functionCallsCount: result.toolsFunctionCall.length,
        promptsCount: result.systemPrompts.length
      });
      
      this.mcpClient = result.mcpClient;
      this.tools = result.tools;
      this.toolsFunctionCall = result.toolsFunctionCall;
      this.systemPrompts = result.systemPrompts;
      
      console.log('记忆管理器初始化成功');
      return true;
    } catch (error) {
      console.error('初始化记忆管理器失败:', error);
      return false;
    }
  }

  async generateMemory(
    content: string,
    onToolCall?: (toolName: string, args: any) => void,
    onToolResult?: (toolName: string, result: any) => void
  ) {
    console.log('开始生成记忆...');
    if (!this.mcpClient) {
      console.error('记忆管理器未初始化');
      throw new Error('记忆管理器未初始化');
    }

    console.log('查找知识提取提示...');
    const knowledgeExtractorPrompt = this.systemPrompts.find(
      s => s.name === 'knowledge_extractor'
    );
    console.log('知识提取提示:', knowledgeExtractorPrompt?.name || '未找到');

    console.log('筛选知识工具...');
    const knowledgeTools = this.toolsFunctionCall.filter(t =>
      ['create_relations', 'create_entities'].includes(t.function.name)
    );
    console.log('找到的知识工具:', knowledgeTools.map(t => t.function.name));

    console.log('开始调用 LLM 生成记忆...');
    const response = await fetch("https://api.siliconflow.cn/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SILICONFLOW_API_KEY}`
      },
      body: JSON.stringify({
        model: "Qwen/Qwen2.5-7B-Instruct",
        messages: [
          {
            role: "system",
            content: knowledgeExtractorPrompt?.systemPrompt || "你是一个知识提取助手，请从文本中提取关键信息和关系。"
          },
          {
            role: "user",
            content: content
          }
        ],
        tools: knowledgeTools.map(tool => ({
          type: "function",
          function: {
            name: tool.function.name,
            description: tool.function.description || "",
            parameters: tool.function.parameters || {}
          }
        })),
        tool_choice: "auto",
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      console.error('LLM 调用失败:', response.status, response.statusText);
      throw new Error('生成记忆失败');
    }

    console.log('LLM 调用成功，解析响应...');
    const data = await response.json();
    const message = data.choices[0].message;
    console.log('LLM 响应内容:', message);

    // 处理工具调用
    const results = [];
    if (message.tool_calls && message.tool_calls.length > 0) {
      console.log('检测到工具调用:', message.tool_calls);
      
      for (const toolCall of message.tool_calls) {
        console.log(`处理工具调用: ${toolCall.function.name}`, toolCall.function.arguments);
        
        const tool = this.tools.find(t => t.name === toolCall.function.name);
        if (tool) {
          try {
            const args = JSON.parse(toolCall.function.arguments);
            console.log(`执行工具 ${toolCall.function.name} 参数:`, args);
            
            // 通知工具调用开始
            if (onToolCall) {
              onToolCall(toolCall.function.name, args);
            }
            
            const result = await tool.execute(args);
            console.log(`工具 ${toolCall.function.name} 执行结果:`, result);
            
            // 通知工具调用完成
            if (onToolResult) {
              onToolResult(toolCall.function.name, result);
            }
            
            results.push({
              tool: toolCall.function.name,
              result: result
            });
          } catch (error) {
            console.error(`工具 ${toolCall.function.name} 执行失败:`, error);
            if (onToolResult) {
              onToolResult(toolCall.function.name, { error: error.message });
            }
          }
        } else {
          console.warn(`未找到工具: ${toolCall.function.name}`);
          if (onToolResult) {
            onToolResult(toolCall.function.name, { error: '工具未找到' });
          }
        }
      }
    } else {
      console.log('未检测到工具调用，使用默认处理方式');
      // 如果没有工具调用，使用原来的处理方式
      const toolsResult = await this.callOpenAIFunctionAndProcessToolCalls(
        message.content,
        knowledgeTools
      );
      
      for (const item of toolsResult) {
        console.log(`执行工具: ${item.name}`, item.arguments);
        const tool = this.tools.find(t => t.name === item.name);
        if (tool) {
          // 通知工具调用开始
          if (onToolCall) {
            onToolCall(item.name, item.arguments);
          }
          
          const result = await tool.execute(item.arguments);
          console.log(`工具 ${item.name} 执行结果:`, result);
          
          // 通知工具调用完成
          if (onToolResult) {
            onToolResult(item.name, result);
          }
          
          results.push({
            tool: item.name,
            result: result
          });
        } else {
          console.warn(`未找到工具: ${item.name}`);
          if (onToolResult) {
            onToolResult(item.name, { error: '工具未找到' });
          }
        }
      }
    }

    console.log('记忆生成完成，返回结果:', results);
    return results;
  }

  private async callOpenAIFunctionAndProcessToolCalls(prompt: string, tools: any[]) {
    console.log('处理 OpenAI 函数调用...');
    console.log('输入提示:', prompt);
    console.log('可用工具:', tools.map(t => t.function.name));
    
    // 这里需要实现与 OpenAI 函数调用的交互
    // 由于这是一个复杂的实现，我们暂时返回一个模拟结果
    const result = [
      {
        name: 'create_entities',
        arguments: { entities: [] }
      },
      {
        name: 'create_relations',
        arguments: { relations: [] }
      }
    ];
    
    console.log('函数调用处理结果:', result);
    return result;
  }

  async disconnect() {
    console.log('开始断开 MCP 连接...');
    if (this.mcpClient) {
      await this.mcpClient.disconnect();
      console.log('MCP 连接已断开');
    } else {
      console.log('MCP 客户端未初始化，无需断开连接');
    }
  }
} 