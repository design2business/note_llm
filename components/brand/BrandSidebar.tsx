"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Target, 
  ClipboardList, 
  CheckSquare, 
  Users
} from 'lucide-react';

const menuItems = [
  {
    title: '项目信息',
    icon: ClipboardList,
    href: '/login/brand/projects'
  },
  {
    title: '项目审批',
    icon: CheckSquare,
    href: '/login/brand/approvals'
  },
  {
    title: '博主管理',
    icon: Users,
    href: '/login/brand/creators'
  },
  {
    title: '品牌策略',
    icon: Target,
    href: '/login/brand/strategy'
  }
];

export function BrandSidebar() {
  const pathname = usePathname();

  return (
    <div className="h-full py-8 px-4">
      <div className="mb-8 px-4">
        <h2 className="text-xl font-bold text-gray-800">品牌管理</h2>
      </div>
      
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center px-4 py-3 text-sm font-medium rounded-lg
                ${isActive 
                  ? 'bg-[#1B4B5A] text-white' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }
                transition-colors duration-200
              `}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'} mr-3`} />
              {item.title}
            </Link>
          );
        })}
      </nav>
    </div>
  );
} 