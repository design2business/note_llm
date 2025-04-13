"use client";

import Link from 'next/link';
import { Sparkles, ChevronDown, Globe } from 'lucide-react';
import { Logo } from './Logo';
import { useState } from 'react';
import Image from 'next/image';

const LANGUAGES = [
  { code: 'zh', label: '中文' },
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' }
];

export function Nav() {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  return (
    <nav className="w-full fixed top-0 z-50 bg-white shadow-sm">
      <div className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center group">
            <div className="relative w-16 h-16 transition-transform duration-300 group-hover:scale-102">
              <Image
                src="/ux-consulting-logo.png"
                alt="UX Consulting Logo"
                fill
                className="object-contain rounded-full"
                quality={95}
                priority
              />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-[方正黑体] tracking-[0.1em] ml-4 sm:ml-5 lg:ml-6 text-[#1B4B5A] whitespace-nowrap group-hover:text-[#15404D] transition-colors">品牌生活方式内容广场</h1>
          </Link>
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
          <div className="relative">
            <button 
              className="flex items-center space-x-1 sm:space-x-2 text-base sm:text-lg text-gray-600 hover:text-gray-800 transition-colors px-2 sm:px-3 py-2 rounded-lg hover:bg-gray-50"
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            >
              <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>中文</span>
              <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isLangMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-36 sm:w-40 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    className="w-full text-left px-4 py-2 text-sm sm:text-base text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      setIsLangMenuOpen(false);
                    }}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link href="/rss" className="text-base sm:text-lg text-gray-600 hover:text-gray-800 transition-colors ml-4 sm:ml-8 lg:ml-12 hidden sm:block">
            RSS订阅
          </Link>
          <button className="text-base sm:text-lg px-3 sm:px-4 py-2 rounded-lg bg-[#1B4B5A] text-white hover:bg-[#15404D] transition-all">
            <span className="flex items-center space-x-1 sm:space-x-2">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>AI创作助手</span>
            </span>
          </button>
          <button className="text-base sm:text-lg px-3 sm:px-4 py-2 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all text-gray-700">
            登录
          </button>
        </div>
      </div>
    </nav>
  );
} 