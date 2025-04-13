import { NextResponse } from 'next/server'
import { chromium } from 'playwright'
import { Readability } from '@mozilla/readability'
import TurndownService from 'turndown'
import { JSDOM } from 'jsdom'

export async function POST(request: Request) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json(
        { success: false, error: 'URL is required' },
        { status: 400 }
      )
    }

    // 启动浏览器
    const browser = await chromium.launch()
    const context = await browser.newContext()
    const page = await context.newPage()

    // 访问URL
    await page.goto(url, { waitUntil: 'networkidle' })

    // 获取页面内容
    const html = await page.content()
    
    // 使用Readability提取内容
    const dom = new JSDOM(html, { url })
    const reader = new Readability(dom.window.document)
    const article = reader.parse()

    if (!article) {
      await browser.close()
      return NextResponse.json(
        { success: false, error: 'Failed to extract content' },
        { status: 500 }
      )
    }

    // 使用Turndown转换为Markdown
    const turndownService = new TurndownService()
    const markdown = turndownService.turndown(article.content || '')

    // 在服务器端控制台显示提取的内容
    console.log('提取的标题:', article.title)
    console.log('提取的正文:', markdown)

    // 关闭浏览器
    await browser.close()

    return NextResponse.json({
      success: true,
      data: {
        title: article.title || '',
        content: markdown,
        siteName: article.siteName || '',
        url: url
      }
    })
  } catch (error) {
    console.error('Error extracting content:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to extract content' },
      { status: 500 }
    )
  }
} 