import { toast } from "@/components/ui/use-toast"

// LLM响应类型
export type LLMResponse = {
  summary: string
  tags: string[]
}

// LLM错误类型
export type LLMError = {
  message: string
  details?: any
}

// LLM配置类型
export type LLMConfig = {
  model: string
  temperature: number
  maxTokens: number
  apiKey: string
  apiEndpoint: string
}

// 默认LLM配置
const defaultConfig: LLMConfig = {
  model: "Qwen/Qwen2.5-7B-Instruct",
  temperature: 0.7,
  maxTokens: 1000,
  apiKey: process.env.NEXT_PUBLIC_SILICONFLOW_API_KEY || "",
  apiEndpoint: "https://api.siliconflow.cn/v1/chat/completions"
}

// LLM类
export class LLM {
  private config: LLMConfig

  constructor(config: Partial<LLMConfig> = {}) {
    this.config = { ...defaultConfig, ...config }
  }

  // 更新配置
  public updateConfig(newConfig: Partial<LLMConfig>) {
    this.config = { ...this.config, ...newConfig }
  }

  // 生成摘要和标签
  public async generateSummaryAndTags(content: string): Promise<LLMResponse> {
    try {
      const response = await fetch(this.config.apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.config.apiKey}`
        },
        body: JSON.stringify({
          model: this.config.model,
          messages: [
            {
              role: "system",
              content: "你是一个专业的笔记助手。请根据用户提供的笔记内容生成一个简洁的摘要，并推荐3-5个相关的标签。你必须返回一个有效的JSON对象，格式如下：{\"summary\": \"摘要内容\", \"tags\": [\"标签1\", \"标签2\", \"标签3\"]}。摘要应该突出笔记的主要观点和关键信息。标签应该是简洁的、相关的关键词。不要包含任何其他文本或格式，只返回JSON对象。"
            },
            {
              role: "user",
              content: `请为以下笔记内容生成摘要和标签：\n\n${content}`
            }
          ],
          temperature: this.config.temperature,
          max_tokens: this.config.maxTokens
        })
      })

      if (!response.ok) {
        throw new Error(`API请求失败: ${response.status}`)
      }

      const data = await response.json()
      const aiResponse = data.choices[0].message.content

      // 解析JSON响应
      let aiData: LLMResponse
      try {
        // 尝试清理响应文本，移除可能的Markdown标记
        const cleanedResponse = aiResponse.replace(/```json\s*|\s*```/g, '').trim()
        aiData = JSON.parse(cleanedResponse)
      } catch (error) {
        console.error("原始响应:", aiResponse)
        throw new Error("AI响应格式错误")
      }

      return aiData
    } catch (error) {
      throw {
        message: error instanceof Error ? error.message : "生成失败",
        details: error
      } as LLMError
    }
  }

  // 生成记忆
  public async generateMemory(content: string): Promise<any> {
    // TODO: 实现记忆生成功能
    throw new Error("记忆生成功能尚未实现")
  }
}

// 创建默认LLM实例
export const defaultLLM = new LLM()

// 使用示例：
// const llm = new LLM()
// const result = await llm.generateSummaryAndTags("笔记内容")
// console.log(result.summary, result.tags) 