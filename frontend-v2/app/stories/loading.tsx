import { StorySkeleton } from "@/components/ui/skeletons/StorySkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header skeleton */}
      <div className="h-16 border-b bg-white" />

      {/* Hero skeleton */}
      <section className="py-20 bg-gradient-to-b from-[oklch(0.97_0.01_175)] to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Skeleton className="h-12 w-3/4 mx-auto bg-teal-50" />
          <Skeleton className="h-6 w-1/2 mx-auto bg-teal-50" />
          <div className="flex justify-center gap-8 pt-6">
            <Skeleton className="h-16 w-32 bg-teal-50" />
            <Skeleton className="h-16 w-32 bg-teal-50" />
            <Skeleton className="h-16 w-32 bg-teal-50" />
          </div>
        </div>
      </section>

      {/* Filters skeleton */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center gap-3 mb-12">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-10 w-28 rounded-full bg-teal-50" />
            ))}
          </div>

          {/* Story cards skeleton */}
          <StorySkeleton count={9} />
        </div>
      </section>
    </div>
  );
}
