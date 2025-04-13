import { 
  FileText, 
  DollarSign, 
  Users, 
  Settings,
  Clock,
  UserCheck,
  Forward,
  Bell,
  CheckCircle,
  XCircle,
  MessageSquare
} from 'lucide-react';

export default function BrandApprovalsPage() {
  const meetings = [
    {
      id: 1,
      date: '2024-03-01 14:00',
      title: '春季营销策划会议',
      participants: ['张总监', '李经理', '王策划'],
      owner: '张总监',
      status: '待转发'
    },
    {
      id: 2,
      date: '2024-03-02 10:00',
      title: '博主合作评估会议',
      participants: ['市场部', '内容部', '财务部'],
      owner: '李经理',
      status: '已完成'
    }
  ];

  const budgets = [
    {
      id: 1,
      type: '立项审批',
      project: '2024春季新品推广',
      amount: '¥500,000',
      status: '待审批'
    },
    {
      id: 2,
      type: '预算变更',
      project: '618品牌活动',
      amount: '¥800,000',
      status: '审批中'
    }
  ];

  const contents = [
    {
      id: 1,
      creator: '时尚博主A',
      project: '春季新品首发',
      type: '短视频',
      status: '待审核'
    },
    {
      id: 2,
      creator: '生活达人B',
      project: '家居好物推荐',
      type: '图文',
      status: '待修改'
    }
  ];

  return (
    <div className="p-8 pt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* 顶部标题 */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">项目审批中心</h1>
          <p className="text-gray-600 mt-2">管理项目相关的所有审批事项</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 项目会议纪要 */}
          <section className="bg-white rounded-lg shadow-lg">
            <div className="border-b border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    项目会议纪要
                  </h2>
                  <p className="text-gray-600 mt-1">管理项目相关会议记录及跟进</p>
                </div>
                <button className="px-4 py-2 bg-[#1B4B5A] text-white rounded-lg hover:bg-[#15404D] transition-colors">
                  新建会议
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {meetings.map((meeting) => (
                  <div key={meeting.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-800">{meeting.title}</h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Clock className="w-4 h-4 mr-1" />
                          {meeting.date}
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        meeting.status === '待转发' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {meeting.status}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <UserCheck className="w-4 h-4 mr-1" />
                      <span>参与人：{meeting.participants.join('、')}</span>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-sm text-gray-600">
                        负责人：{meeting.owner}
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-600 hover:text-[#1B4B5A] transition-colors">
                          <Forward className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-[#1B4B5A] transition-colors">
                          <Bell className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 项目预算审批 */}
          <section className="bg-white rounded-lg shadow-lg">
            <div className="border-b border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 flex items-center">
                    <DollarSign className="w-5 h-5 mr-2" />
                    项目预算审批
                  </h2>
                  <p className="text-gray-600 mt-1">管理项目预算及付款审批</p>
                </div>
                <button className="px-4 py-2 bg-[#1B4B5A] text-white rounded-lg hover:bg-[#15404D] transition-colors">
                  新建审批
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {budgets.map((budget) => (
                  <div key={budget.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-md">
                          {budget.type}
                        </span>
                        <h3 className="font-semibold text-gray-800 mt-2">{budget.project}</h3>
                      </div>
                      <span className="text-xl font-semibold text-[#1B4B5A]">{budget.amount}</span>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        budget.status === '待审批' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {budget.status}
                      </span>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 text-sm text-[#1B4B5A] hover:bg-gray-100 rounded-lg transition-colors">
                          查看详情
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 博主内容审批 */}
          <section className="bg-white rounded-lg shadow-lg">
            <div className="border-b border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    博主内容审批
                  </h2>
                  <p className="text-gray-600 mt-1">管理博主发布内容的审核流程</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {contents.map((content) => (
                  <div key={content.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-800">{content.creator}</h3>
                        <p className="text-sm text-gray-600 mt-1">{content.project}</p>
                      </div>
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-sm rounded-md">
                        {content.type}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        content.status === '待审核' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {content.status}
                      </span>
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-600 hover:text-green-600 transition-colors">
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-red-600 transition-colors">
                          <XCircle className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                          <MessageSquare className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 项目权限设置 */}
          <section className="bg-white rounded-lg shadow-lg">
            <div className="border-b border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 flex items-center">
                    <Settings className="w-5 h-5 mr-2" />
                    项目权限设置
                  </h2>
                  <p className="text-gray-600 mt-1">管理项目成员权限及负责人设置</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <h3 className="font-semibold text-gray-800">成员权限管理</h3>
                  <p className="text-sm text-gray-600 mt-1">设置项目成员的访问和操作权限</p>
                  <button className="mt-3 px-4 py-2 text-sm text-[#1B4B5A] hover:bg-gray-100 rounded-lg transition-colors">
                    管理权限
                  </button>
                </div>
                <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <h3 className="font-semibold text-gray-800">负责人转移</h3>
                  <p className="text-sm text-gray-600 mt-1">变更项目负责人及相关权限</p>
                  <button className="mt-3 px-4 py-2 text-sm text-[#1B4B5A] hover:bg-gray-100 rounded-lg transition-colors">
                    转移负责人
                  </button>
                </div>
                <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <h3 className="font-semibold text-gray-800">绩效报表</h3>
                  <p className="text-sm text-gray-600 mt-1">查看项目相关的绩效统计数据</p>
                  <button className="mt-3 px-4 py-2 text-sm text-[#1B4B5A] hover:bg-gray-100 rounded-lg transition-colors">
                    查看报表
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 