import Link from 'next/link';
import { Button } from './ui/button';

export function Nav() {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-xl font-bold">
              首页
            </Link>
            <Link href="/rss" className="text-xl font-bold">
              RSS订阅
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline">登录</Button>
          </div>
        </div>
      </div>
    </nav>
  );
} 