import Parser from 'rss-parser';

const parser = new Parser();

interface RSSFeed {
  url: string;
  lastFetched: Date;
  items: any[];
}

class RSSService {
  private feeds: Map<string, RSSFeed> = new Map();
  private updateInterval: NodeJS.Timeout | null = null;

  async addFeed(url: string) {
    try {
      const feed = await parser.parseURL(url);
      this.feeds.set(url, {
        url,
        lastFetched: new Date(),
        items: feed.items
      });
      return feed;
    } catch (error) {
      console.error('Error adding RSS feed:', error);
      throw error;
    }
  }

  async updateFeed(url: string) {
    try {
      const feed = await parser.parseURL(url);
      const existingFeed = this.feeds.get(url);
      if (existingFeed) {
        existingFeed.items = feed.items;
        existingFeed.lastFetched = new Date();
        this.feeds.set(url, existingFeed);
      }
      return feed;
    } catch (error) {
      console.error('Error updating RSS feed:', error);
      throw error;
    }
  }

  getFeed(url: string) {
    return this.feeds.get(url);
  }

  getAllFeeds() {
    return Array.from(this.feeds.values());
  }

  getAllArticles() {
    const articles: any[] = [];
    this.feeds.forEach(feed => {
      feed.items.forEach(item => {
        articles.push({
          ...item,
          feedUrl: feed.url
        });
      });
    });
    return articles;
  }

  removeFeed(url: string) {
    this.feeds.delete(url);
  }

  startAutoUpdate(interval: number = 60 * 60 * 1000) { // 默认每小时更新一次
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }

    this.updateInterval = setInterval(async () => {
      for (const [url] of this.feeds) {
        try {
          await this.updateFeed(url);
          console.log(`Updated feed: ${url}`);
        } catch (error) {
          console.error(`Error updating feed ${url}:`, error);
        }
      }
    }, interval);
  }

  stopAutoUpdate() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }
}

export const rssService = new RSSService(); 