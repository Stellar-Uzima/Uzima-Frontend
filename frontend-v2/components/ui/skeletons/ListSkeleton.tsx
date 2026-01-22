import { Skeleton } from "@/components/ui/skeleton";

export function ListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="h-16 w-full bg-teal-50" />
      ))}
    </div>
  );
}
