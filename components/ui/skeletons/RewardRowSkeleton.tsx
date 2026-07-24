export default function RewardRowSkeleton() {
  return (
    <div className="flex justify-between items-center py-2 border-b">
      <div className="skeleton h-4 w-1/3"></div>
      <div className="skeleton h-4 w-1/4"></div>
      <div className="skeleton h-4 w-1/6"></div>
    </div>
  );
}
