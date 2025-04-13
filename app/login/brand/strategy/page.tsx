import Image from 'next/image';
import { CalendarDays } from 'lucide-react';

export default function BrandStrategyPage() {
  const brandEvents = [
    { month: '一月', event: '新年品牌焕新活动' },
    { month: '三月', event: '春季新品发布会' },
    { month: '六月', event: '618品牌节' },
    { month: '九月', event: '品牌周年庆典' },
    { month: '十二月', event: '年度品牌盛典' },
  ];

  return (
    <div className="p-8 pt-24">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* 品牌屋 */}
        <section className="bg-white rounded-lg shadow-lg">
          <div className="border-b border-gray-100 p-6">
            <h2 className="text-2xl font-bold text-gray-800">品牌屋</h2>
            <p className="text-gray-600 mt-2">参考知名品牌战略规划，打造独特品牌价值</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 border rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <h3 className="font-semibold text-gray-800 mb-3 text-lg">品牌愿景</h3>
                <p className="text-gray-600 leading-relaxed">打造引领生活方式的创新品牌</p>
              </div>
              <div className="p-6 border rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <h3 className="font-semibold text-gray-800 mb-3 text-lg">品牌使命</h3>
                <p className="text-gray-600 leading-relaxed">为用户创造高品质生活体验</p>
              </div>
              <div className="p-6 border rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <h3 className="font-semibold text-gray-800 mb-3 text-lg">品牌价值观</h3>
                <p className="text-gray-600 leading-relaxed">创新、品质、用户至上</p>
              </div>
            </div>
          </div>
        </section>

        {/* 品牌受众 */}
        <section className="bg-white rounded-lg shadow-lg">
          <div className="border-b border-gray-100 p-6">
            <h2 className="text-2xl font-bold text-gray-800">品牌受众</h2>
            <p className="text-gray-600 mt-2">深入了解目标用户的生活方式与价值观</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">目标用户画像</h3>
                  <div className="space-y-3">
                    <p className="text-gray-600 flex items-center">
                      <span className="w-2 h-2 bg-[#1B4B5A] rounded-full mr-3"></span>
                      25-40岁的都市白领
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <span className="w-2 h-2 bg-[#1B4B5A] rounded-full mr-3"></span>
                      追求品质生活
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <span className="w-2 h-2 bg-[#1B4B5A] rounded-full mr-3"></span>
                      关注个人成长与生活品味
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <span className="w-2 h-2 bg-[#1B4B5A] rounded-full mr-3"></span>
                      具有较强的消费能力
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative h-80 rounded-xl overflow-hidden">
                <Image
                  src="/lifestyle-audience.jpg"
                  alt="品牌目标受众生活方式"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 品牌年度规划 */}
        <section className="bg-white rounded-lg shadow-lg">
          <div className="border-b border-gray-100 p-6">
            <h2 className="text-2xl font-bold text-gray-800">品牌年度规划</h2>
            <p className="text-gray-600 mt-2">重要品牌活动时间线</p>
          </div>
          <div className="p-6">
            <div className="grid gap-6">
              {brandEvents.map((event, index) => (
                <div 
                  key={index}
                  className="flex items-center p-6 border rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-[#1B4B5A] rounded-full text-white mr-6">
                    <CalendarDays className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{event.month}</h3>
                    <p className="text-gray-600 mt-1">{event.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 