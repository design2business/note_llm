import { NextResponse } from 'next/server';
import { rssService } from '@/lib/rssService';

export async function GET() {
  try {
    const articles = rssService.getAllArticles();
    return NextResponse.json(articles);
  } catch (error) {
    console.error('Error fetching RSS articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch RSS articles' },
      { status: 500 }
    );
  }
} 