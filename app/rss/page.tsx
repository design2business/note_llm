'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { rssService } from '@/lib/rssService';

export default function RSSPage() {
  const [url, setUrl] = useState('');
  const [feeds, setFeeds] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [addingToNotes, setAddingToNotes] = useState(false);

  const fetchFeeds = async () => {
    try {
      const response = await fetch('/api/rss');
      if (!response.ok) throw new Error('Failed to fetch feeds');
      const data = await response.json();
      setFeeds(data);
    } catch (error) {
      console.error('Error fetching feeds:', error);
      toast.error('获取RSS订阅失败');
    }
  };

  useEffect(() => {
    fetchFeeds();
  }, []);

  const handleAddFeed = async () => {
    if (!url) {
      toast.error('请输入有效的RSS URL');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/rss', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) throw new Error('Failed to add feed');
      
      await fetchFeeds();
      setUrl('');
      toast.success('RSS订阅添加成功');
    } catch (error) {
      console.error('Error adding feed:', error);
      toast.error('添加RSS订阅失败');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFeed = async (feedUrl: string) => {
    try {
      const response = await fetch('/api/rss', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: feedUrl }),
      });

      if (!response.ok) throw new Error('Failed to remove feed');
      
      await fetchFeeds();
      toast.success('RSS订阅删除成功');
    } catch (error) {
      console.error('Error removing feed:', error);
      toast.error('删除RSS订阅失败');
    }
  };

  const handleAddToNotes = async () => {
    setAddingToNotes(true);
    try {
      const response = await fetch('/api/rss/articles');
      if (!response.ok) throw new Error('Failed to fetch articles');
      const articles = await response.json();

      // 为每篇文章创建笔记
      for (const article of articles) {
        const response = await fetch('/api/extract-content', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: article.link }),
        });

        if (!response.ok) throw new Error('Failed to extract content');
        const data = await response.json();

        if (data.success) {
          const { title, content, siteName } = data.data;
          const noteContent = `## ${title}\n\n${content}\n\n> 来源: ${siteName || article.link}\n> RSS源: ${article.feedUrl}`;
          
          // 创建新笔记
          const newNote = {
            id: `note-${Date.now()}`,
            title: title,
            content: noteContent,
            tags: ['rss'],
            notebookId: "default",
            timestamp: new Date().toISOString(),
            preview: content.substring(0, 60) + (content.length > 60 ? '...' : ''),
            lastUpdated: Date.now(),
          };

          // 直接更新localStorage中的笔记
          const existingNotes = JSON.parse(localStorage.getItem('notes') || '[]');
          const updatedNotes = [newNote, ...existingNotes];
          localStorage.setItem('notes', JSON.stringify(updatedNotes));

          // 触发笔记更新事件
          window.dispatchEvent(new CustomEvent('notes-updated', {
            detail: updatedNotes
          }));
        }
      }

      toast.success('RSS文章已成功添加到笔记中');
    } catch (error) {
      console.error('Error adding articles to notes:', error);
      toast.error('添加RSS文章到笔记失败');
    } finally {
      setAddingToNotes(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">RSS订阅管理</h1>
      
      <div className="mb-8 flex gap-2">
        <div className="flex gap-2 flex-1">
          <Input
            type="url"
            placeholder="输入RSS订阅URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleAddFeed} disabled={loading}>
            {loading ? '添加中...' : '添加订阅'}
          </Button>
        </div>
        <Button 
          onClick={handleAddToNotes} 
          disabled={addingToNotes || feeds.length === 0}
          variant="secondary"
        >
          {addingToNotes ? '添加中...' : '添加到笔记'}
        </Button>
      </div>

      <div className="grid gap-4">
        {feeds.map((feed) => (
          <Card key={feed.url}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span className="truncate">{feed.url}</span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveFeed(feed.url)}
                >
                  删除
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {feed.items.slice(0, 3).map((item: any, index: number) => (
                  <div key={index} className="border-b pb-2">
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.pubDate}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 