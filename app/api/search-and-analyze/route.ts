import { NextResponse } from 'next/server'
import { defaultLLM } from '@/app/llm'
import { chromium } from 'playwright'

interface SearchResult {
  index: number
  title: string
  link: string
  snippet: string
}

export async function POST(request: Request) {
  console.log('收到搜索和分析请求')
  try {
    const { query } = await request.json()
    console.log('请求参数:', { query })

    if (!query) {
      console.log('错误：搜索关键词为空')
      return NextResponse.json(
        { success: false, error: '搜索关键词不能为空' },
        { status: 400 }
      )
    }

    console.log('开始Google搜索...')
    const searchResults = await searchGoogle(query)
    console.log('Google搜索完成，开始LLM分析...')
    
    const analysis = await analyzeWithLLM(searchResults)
    console.log('LLM分析完成')

    console.log('返回结果:', {
      success: true,
      data: {
        searchResultsLength: searchResults.length,
        analysisLength: analysis.length
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        searchResults,
        analysis
      }
    })
  } catch (error) {
    console.error('搜索和分析时发生错误:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : '搜索和分析失败' },
      { status: 500 }
    )
  }
}

// 使用playwright搜索Google
async function searchGoogle(query: string): Promise<string> {
  console.log('开始执行Google搜索:', query)
  try {
    console.log('初始化playwright...')
    const browser = await chromium.launch({
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    console.log('浏览器已启动')
    
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      viewport: { width: 1280, height: 800 }
    })
    console.log('创建新上下文')
    
    const page = await context.newPage()
    console.log('创建新页面')
    
    // 直接构造百度搜索URL
    const searchUrl = `https://www.baidu.com/s?wd=${encodeURIComponent(query)}`
    console.log('构造搜索URL:', searchUrl)
    
    console.log('访问搜索结果页面...')
    await page.goto(searchUrl, { waitUntil: 'networkidle', timeout: 60000 })
    console.log('搜索结果页面加载完成')
    
    console.log('等待搜索结果加载...')
    // 等待百度搜索结果选择器
    await Promise.race([
      page.waitForSelector('#content_left', { timeout: 60000 }),
      page.waitForSelector('.result', { timeout: 60000 })
    ])
    console.log('搜索结果已加载')
    
    // 添加额外等待时间确保内容完全加载
    await page.waitForTimeout(2000)
    
    console.log('提取搜索结果...')
    const results = await page.evaluate((): SearchResult[] => {
      const searchResults: SearchResult[] = []
      // 百度搜索结果选择器
      const resultElements = document.querySelectorAll('.result, .result-op')
      
      resultElements.forEach((element, index) => {
        const title = element.querySelector('h3')?.textContent || ''
        const link = element.querySelector('a')?.href || ''
        const snippet = element.querySelector('.c-abstract, .c-color-text')?.textContent || ''
        
        if (title && link) {
          searchResults.push({
            index: index + 1,
            title,
            link,
            snippet
          })
        }
      })
      
      return searchResults
    })
    
    console.log('搜索结果数量:', results.length)
    console.log('前3条结果:', results.slice(0, 3))
    
    console.log('关闭浏览器...')
    await browser.close()
    console.log('浏览器已关闭')
    
    if (results.length === 0) {
      throw new Error('未找到任何搜索结果')
    }
    
    // 格式化搜索结果
    const formattedResults = results.map((result: SearchResult) => 
      `${result.index}. ${result.title}\n链接: ${result.link}\n摘要: ${result.snippet}\n`
    ).join('\n')
    
    console.log('搜索结果格式化完成')
    return formattedResults
  } catch (error) {
    console.error('Google搜索过程中发生错误:', error)
    throw new Error(`Google搜索失败: ${error instanceof Error ? error.message : '未知错误'}`)
  }
}

// 使用LLM分析搜索结果
async function analyzeWithLLM(searchResults: string): Promise<string> {
  console.log('开始LLM分析...')
  try {
    console.log('准备LLM分析提示...')
    const prompt = `请分析以下Google搜索结果，并提供一个全面的总结和分析：

${searchResults}

请从以下几个方面进行分析：
1. 主要发现和关键信息
2. 不同来源的观点和立场
3. 可能存在的争议或不同意见
4. 相关的重要背景信息
5. 总结和建议

请以结构化的方式呈现分析结果。`

    console.log('调用LLM生成分析...')
    const result = await defaultLLM.generateSummaryAndTags(prompt)
    console.log('LLM分析完成')
    
    return result.summary
  } catch (error) {
    console.error('LLM分析失败:', error)
    throw new Error('LLM分析失败')
  }
} 