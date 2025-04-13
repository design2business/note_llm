import { 
  Search,
  Filter,
  MapPin,
  Grid,
  DollarSign,
  Palette,
  History,
  RefreshCcw,
  Share2,
  Users,
  Briefcase,
  FileText,
  ShoppingBag,
  BarChart2,
  Star,
  MessageCircle,
  ChevronRight,
  Tags
} from 'lucide-react';

export default function CreatorsManagementPage() {
  // 示例数据
  const matchingCriteria = [
    {
      title: '地理位置',
      icon: MapPin,
      items: ['北京', '上海', '广州', '深圳', '其他'],
      active: '上海'
    },
    {
      title: '内容类目',
      icon: Grid,
      items: ['美妆', '时尚', '生活', '美食', '旅行'],
      active: '时尚'
    },
    {
      title: '创作费用',
      icon: DollarSign,
      ranges: ['1-5万', '5-10万', '10-20万', '20万以上'],
      active: '5-10万'
    },
    {
      title: '审美风格',
      icon: Palette,
      items: ['轻奢', '小清新', '时尚', '高级感', '生活化'],
      active: '时尚'
    }
  ];

  const creators = [
    {
      id: 1,
      name: '时尚博主A',
      avatar: '/creator-1.jpg',
      location: '上海',
      categories: ['时尚', '美妆'],
      followers: '100万+',
      matchRate: 95,
      recentCollabs: 12,
      avgEngagement: '8.5%'
    },
    {
      id: 2,
      name: '生活达人B',
      avatar: '/creator-2.jpg',
      location: '北京',
      categories: ['生活', '美食'],
      followers: '50万+',
      matchRate: 88,
      recentCollabs: 8,
      avgEngagement: '6.2%'
    }
  ];

  const performanceMetrics = [
    {
      title: '品牌内容绩效',
      metrics: [
        { label: '平均互动率', value: '7.8%' },
        { label: '内容完成率', value: '96%' },
        { label: '准时交付率', value: '92%' }
      ]
    },
    {
      title: '传播绩效',
      metrics: [
        { label: '平均播放量', value: '50万+' },
        { label: '评论转化率', value: '2.5%' },
        { label: '分享率', value: '1.8%' }
      ]
    },
    {
      title: '电商绩效',
      metrics: [
        { label: '带货转化率', value: '3.2%' },
        { label: '平均GMV', value: '¥12万' },
        { label: '复购率', value: '25%' }
      ]
    }
  ];

  return (
    <div className="p-8 pt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* 顶部搜索和筛选 */}
        <div className="flex items-center justify-between">
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索博主名称、标签、类目..."
                className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B4B5A] focus:border-transparent"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>
          <button className="ml-4 px-4 py-2 flex items-center text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Filter className="w-5 h-5 mr-2" />
            高级筛选
          </button>
        </div>

        {/* 博主匹配度 */}
        <section className="bg-white rounded-lg shadow-lg">
          <div className="border-b border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-800">博主匹配度</h2>
            <p className="text-gray-600 mt-1">多维度评估博主与品牌的匹配程度</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {matchingCriteria.map((criteria, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center text-gray-800 mb-3">
                    <criteria.icon className="w-5 h-5 mr-2" />
                    <h3 className="font-semibold">{criteria.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {criteria.items?.map((item, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1 rounded-full text-sm ${
                          item === criteria.active
                            ? 'bg-[#1B4B5A] text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        } cursor-pointer transition-colors`}
                      >
                        {item}
                      </span>
                    ))}
                    {criteria.ranges?.map((range, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1 rounded-full text-sm ${
                          range === criteria.active
                            ? 'bg-[#1B4B5A] text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        } cursor-pointer transition-colors`}
                      >
                        {range}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* 博主列表 */}
            <div className="mt-8 space-y-4">
              {creators.map((creator) => (
                <div key={creator.id} className="border rounded-lg p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
                        {/* 头像占位 */}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 text-lg">{creator.name}</h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          {creator.location}
                          <span className="mx-2">•</span>
                          <Users className="w-4 h-4 mr-1" />
                          {creator.followers}
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {creator.categories.map((category, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-sm">
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#1B4B5A]">{creator.matchRate}%</div>
                      <div className="text-sm text-gray-500">匹配度</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <div className="flex space-x-8">
                      <div>
                        <div className="text-sm text-gray-500">近期合作</div>
                        <div className="font-semibold text-gray-800">{creator.recentCollabs}次</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">平均互动率</div>
                        <div className="font-semibold text-gray-800">{creator.avgEngagement}</div>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-[#1B4B5A] text-white rounded-lg hover:bg-[#15404D] transition-colors">
                      发起合作
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 博主合作 */}
        <section className="bg-white rounded-lg shadow-lg">
          <div className="border-b border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-800">博主合作</h2>
            <p className="text-gray-600 mt-1">管理不同类型的博主合作项目</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="border rounded-lg p-6 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Briefcase className="w-6 h-6 text-[#1B4B5A] mr-3" />
                    <h3 className="font-semibold text-gray-800">品牌合作</h3>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600">长期品牌合作关系管理</p>
              </div>
              <div className="border rounded-lg p-6 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <FileText className="w-6 h-6 text-[#1B4B5A] mr-3" />
                    <h3 className="font-semibold text-gray-800">临时签约</h3>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600">单次项目合作签约管理</p>
              </div>
              <div className="border rounded-lg p-6 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Tags className="w-6 h-6 text-[#1B4B5A] mr-3" />
                    <h3 className="font-semibold text-gray-800">营销合作</h3>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600">营销活动及推广合作</p>
              </div>
            </div>
          </div>
        </section>

        {/* 博主绩效管理 */}
        <section className="bg-white rounded-lg shadow-lg">
          <div className="border-b border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-800">博主绩效管理</h2>
            <p className="text-gray-600 mt-1">全方位评估博主合作效果</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {performanceMetrics.map((section, index) => (
                <div key={index} className="border rounded-lg p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">{section.title}</h3>
                  <div className="space-y-4">
                    {section.metrics.map((metric, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{metric.label}</span>
                        <span className="font-semibold text-[#1B4B5A]">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* NPS评价 */}
            <div className="mt-6 border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">双向评价 & NPS调查</h3>
                <button className="px-4 py-2 text-sm text-[#1B4B5A] hover:bg-gray-100 rounded-lg transition-colors">
                  查看详情
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-[#1B4B5A]"></div>
                </div>
                <span className="text-sm font-semibold text-[#1B4B5A]">4.8/5.0</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 