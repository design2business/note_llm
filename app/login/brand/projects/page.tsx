export default function BrandProjectsPage() {
  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">项目信息</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">进行中的项目</h2>
          <div className="space-y-4">
            {/* 项目列表示例 */}
            {[1, 2, 3].map((project) => (
              <div key={project} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">示例项目 {project}</h3>
                    <p className="text-sm text-gray-500 mt-1">开始日期: 2024-03-{project}</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    进行中
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  这是一个示例项目描述，展示项目的基本信息和进展情况。
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 