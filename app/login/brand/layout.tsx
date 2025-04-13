import { BrandSidebar } from '@/components/brand/BrandSidebar';

export default function BrandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* 左侧菜单栏 */}
      <div className="w-1/5 min-w-[240px] bg-white shadow-sm">
        <BrandSidebar />
      </div>
      
      {/* 右侧内容区域 */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
} 