export default function DashboardStatsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="border rounded-md p-4">
          <div className="skeleton h-8 w-1/2 mb-2"></div>
          <div className="skeleton h-6 w-1/3"></div>
        </div>
      ))}
    </div>
  );
}
