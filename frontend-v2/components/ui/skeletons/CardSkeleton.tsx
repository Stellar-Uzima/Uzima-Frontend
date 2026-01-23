import { Skeleton } from "@/components/ui/skeleton";

export function CardSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-3">
          {/* Image */}
          <Skeleton className="h-48 w-full bg-teal-50" />
          {/* Title */}
          <Skeleton className="h-4 w-3/4 bg-teal-50" />
          {/* Text */}
          <Skeleton className="h-3 w-full bg-teal-50" />
          <Skeleton className="h-3 w-5/6 bg-teal-50" />
        </div>
      ))}
    </div>
  );
}
