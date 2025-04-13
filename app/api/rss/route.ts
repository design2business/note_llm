import { NextResponse } from 'next/server';
import { rssService } from '@/lib/rssService';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    
    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    const feed = await rssService.addFeed(url);
    return NextResponse.json(feed);
  } catch (error) {
    console.error('Error adding RSS feed:', error);
    return NextResponse.json(
      { error: 'Failed to add RSS feed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const feeds = rssService.getAllFeeds();
    return NextResponse.json(feeds);
  } catch (error) {
    console.error('Error fetching RSS feeds:', error);
    return NextResponse.json(
      { error: 'Failed to fetch RSS feeds' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { url } = await request.json();
    
    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    rssService.removeFeed(url);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error removing RSS feed:', error);
    return NextResponse.json(
      { error: 'Failed to remove RSS feed' },
      { status: 500 }
    );
  }
} 