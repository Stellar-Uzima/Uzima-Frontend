export default function HealerCardSkeleton() {
  return (
    <div className="border rounded-md p-4 w-full max-w-sm">
      <div className="skeleton h-32 w-full mb-4"></div>
      <div className="skeleton h-6 w-2/3 mb-2"></div>
      <div className="skeleton h-4 w-1/3"></div>
    </div>
  );
}
