import Link from 'next/link'
import { 
  UserCircle2, 
  Building2, 
  Users,
  HelpCircle
} from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-green-50 to-yellow-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-center text-3xl font-bold text-gray-700 mb-12 font-['FZHei-B01']">
          选择登录方式
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 博主入口 */}
          <div className="group relative">
            <Link 
              href="/login/blogger"
              className="block h-full"
            >
              <div className="h-full p-8 bg-white hover:bg-gray-50 rounded-lg shadow-md transition-all group-hover:shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-gradient-to-br from-purple-100 to-transparent rounded-full opacity-50"></div>
                <div className="relative z-10">
                  <UserCircle2 className="w-12 h-12 text-purple-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-3">博主入口</h3>
                  <p className="text-gray-500">创作者和内容分享者专属通道</p>
                </div>
              </div>
            </Link>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="absolute top-2 right-2 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                    <HelpCircle className="w-4 h-4 text-gray-500" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">适合内容创作者、博主和KOL，提供创作工具和数据分析功能</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* 品牌入口 */}
          <div className="group relative">
            <Link 
              href="/login/brand"
              className="block h-full"
            >
              <div className="h-full p-8 bg-white hover:bg-gray-50 rounded-lg shadow-md transition-all group-hover:shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-gradient-to-br from-blue-100 to-transparent rounded-full opacity-50"></div>
                <div className="relative z-10">
                  <Building2 className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-3">品牌入口</h3>
                  <p className="text-gray-500">品牌方和商业合作伙伴通道</p>
                </div>
              </div>
            </Link>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="absolute top-2 right-2 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                    <HelpCircle className="w-4 h-4 text-gray-500" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">适合品牌商家和广告主，提供营销推广和数据洞察功能</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* 游客入口 */}
          <div className="group relative">
            <Link 
              href="/login/guest"
              className="block h-full"
            >
              <div className="h-full p-8 bg-white hover:bg-gray-50 rounded-lg shadow-md transition-all group-hover:shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-gradient-to-br from-green-100 to-transparent rounded-full opacity-50"></div>
                <div className="relative z-10">
                  <Users className="w-12 h-12 text-green-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-3">游客入口</h3>
                  <p className="text-gray-500">浏览内容和关注感兴趣的创作者</p>
                </div>
              </div>
            </Link>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="absolute top-2 right-2 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                    <HelpCircle className="w-4 h-4 text-gray-500" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">适合普通用户，可以浏览内容、关注创作者和参与互动</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  )
} 