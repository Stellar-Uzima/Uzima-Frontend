import { Skeleton } from "@/components/ui/skeleton";

export function StorySkeleton({ count = 9 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm">
          {/* Image skeleton */}
          <Skeleton className="aspect-video w-full bg-teal-50" />

          <div className="p-5 space-y-4">
            {/* Community name */}
            <Skeleton className="h-4 w-1/3 bg-teal-50" />

            {/* Title */}
            <Skeleton className="h-6 w-full bg-teal-50" />
            <Skeleton className="h-6 w-2/3 bg-teal-50" />

            {/* Excerpt */}
            <div className="space-y-2">
              <Skeleton className="h-3 w-full bg-teal-50" />
              <Skeleton className="h-3 w-5/6 bg-teal-50" />
            </div>

            {/* Amount */}
            <Skeleton className="h-4 w-1/2 bg-teal-50" />

            {/* Button */}
            <Skeleton className="h-10 w-full rounded-full bg-teal-50" />
          </div>
        </div>
      ))}
    </div>
  );
}
