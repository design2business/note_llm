"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
  PlusCircle,
  ChevronDown,
  ChevronRight,
  File,
  Hash,
  Trash,
  X,
  Plus,
  Search,
  Folder,
  FolderPlus,
  Save,
  AlertCircle,
  Clock,
  Link as LinkIcon,
  UserCircle2,
  Building2,
  Users,
  HelpCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { MemoryManager } from './memory'
import { defaultLLM } from './llm'
import { ImageCarousel } from '@/components/ImageCarousel'
import Link from 'next/link'

// 定义笔记类型
type Note = {
  id: string
  title: string
  content: string
  tags: string[]
  notebookId: string
  timestamp: string
  preview?: string
  lastUpdated: number
}

// 定义标签类型
type Tag = {
  id: string
  name: string
}

// 定义笔记本类型
type Notebook = {
  id: string
  name: string
}

// 定义记忆状态类型
type MemoryStatus = {
  step: string;
  status: 'loading' | 'success' | 'error';
  message: string;
  details?: any;
}

// 生成笔记预览
const generatePreview = (content: string, length = 60): string => {
  const plainText = content.replace(/#{1,6}\s/g, "").trim()
  return plainText.length > length ? plainText.substring(0, length) + "..." : plainText
}

// 更新时间戳
const updateTimestamp = (): string => {
  return "just now"
}

// 格式化日期
const formatDate = (timestamp: number): string => {
  const now = Date.now()
  const diff = now - timestamp

  // 如果不到1分钟
  if (diff < 60 * 1000) {
    return "just now"
  }

  // 如果不到1小时
  if (diff < 60 * 60 * 1000) {
    const minutes = Math.floor(diff / (60 * 1000))
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`
  }

  // 如果不到24小时
  if (diff < 24 * 60 * 60 * 1000) {
    const hours = Math.floor(diff / (60 * 60 * 1000))
    return `${hours} hour${hours > 1 ? "s" : ""} ago`
  }

  // 如果不到7天
  if (diff < 7 * 24 * 60 * 60 * 1000) {
    const days = Math.floor(diff / (24 * 60 * 60 * 1000))
    return `${days} day${days > 1 ? "s" : ""} ago`
  }

  // 否则显示完整日期
  const date = new Date(timestamp)
  return date.toLocaleDateString()
}

// 自定义按钮组件
const CustomButton = ({
  children,
  onClick,
  variant = "default",
  className,
  ...props
}: {
  children: React.ReactNode
  onClick?: () => void
  variant?: "default" | "outline" | "ghost" | "destructive"
  className?: string
  [key: string]: any
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full transition-colors"
  const variantStyles = {
    default: "bg-black text-white hover:bg-gray-800",
    outline: "border border-gray-300 hover:bg-gray-100",
    ghost: "hover:bg-gray-100",
    destructive: "text-red-500 hover:bg-red-50 hover:text-red-600",
  }

  return (
    <button onClick={onClick} className={cn(baseStyles, variantStyles[variant], className)} {...props}>
      {children}
    </button>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-50 via-green-50 to-yellow-50">
      {/* 图片轮播区域 */}
      <ImageCarousel />
      
      {/* 登录选项区域 */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-center text-2xl font-bold text-gray-700 mb-8">
          选择您的身份开始体验
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* 博主入口 */}
          <div className="group relative">
            <Link href="/login/blogger" className="block">
              <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-gradient-to-br from-purple-100 to-transparent rounded-full opacity-50" />
                <div className="relative z-10">
                  <UserCircle2 className="w-12 h-12 text-purple-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-3">博主入口</h3>
                  <p className="text-gray-500 text-sm">创作者和内容分享者专属通道</p>
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
            <Link href="/login/brand" className="block">
              <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-gradient-to-br from-blue-100 to-transparent rounded-full opacity-50" />
                <div className="relative z-10">
                  <Building2 className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-3">品牌入口</h3>
                  <p className="text-gray-500 text-sm">品牌方和商业合作伙伴通道</p>
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
            <Link href="/login/guest" className="block">
              <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-gradient-to-br from-green-100 to-transparent rounded-full opacity-50" />
                <div className="relative z-10">
                  <Users className="w-12 h-12 text-green-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-3">游客入口</h3>
                  <p className="text-gray-500 text-sm">浏览内容和关注感兴趣的创作者</p>
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
    </main>
  )
}
