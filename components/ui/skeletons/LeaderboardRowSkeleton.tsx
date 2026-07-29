export default function LeaderboardRowSkeleton() {
  return (
    <div className="flex items-center gap-3 py-3 border-b last:border-0">
      <div className="skeleton h-6 w-6 rounded-full" />
      <div className="skeleton h-8 w-8 rounded-full" />
      <div className="flex-1 space-y-2">
        <div className="skeleton h-4 w-1/3" />
        <div className="skeleton h-3 w-1/4" />
      </div>
      <div className="skeleton h-4 w-12" />
      <div className="skeleton h-4 w-10" />
    </div>
  );
}