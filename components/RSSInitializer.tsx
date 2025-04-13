'use client';

import { useEffect } from 'react';
import { rssService } from '@/lib/rssService';

export function RSSInitializer() {
  useEffect(() => {
    rssService.startAutoUpdate();
    
    // 在组件卸载时清理定时器
    return () => {
      rssService.stopAutoUpdate();
    };
  }, []);

  return null; // 这个组件不需要渲染任何内容
} 