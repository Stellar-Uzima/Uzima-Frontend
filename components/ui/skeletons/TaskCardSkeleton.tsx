export default function TaskCardSkeleton() {
  return (
    <div className="border rounded-md p-4 w-full max-w-sm">
      <div className="skeleton h-6 w-3/4 mb-2"></div>
      <div className="skeleton h-4 w-1/2 mb-4"></div>
      <div className="skeleton h-24 w-full"></div>
    </div>
  );
}
