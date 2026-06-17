export default function DashboardStatsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="border rounded-lg p-6 bg-white shadow-sm">
          <div className="h-4 bg-gray-200 rounded-full w-1/2 mb-3 animate-pulse"></div>
          <div className="h-8 bg-gray-300 rounded-full w-1/3 mb-2 animate-pulse"></div>
          <div className="h-3 bg-gray-200 rounded-full w-3/4 animate-pulse"></div>
          <div className="mt-3 h-2 bg-gray-100 rounded-full w-full animate-pulse"></div>
        </div>
      ))}
    </div>
  );
}
