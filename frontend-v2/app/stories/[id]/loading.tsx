import { Skeleton } from "@/components/ui/skeleton";

export default function StoryLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header skeleton */}
      <div className="h-16 border-b bg-white" />

      {/* Hero skeleton */}
      <div className="h-[60vh] bg-gray-200 relative">
        <div className="absolute bottom-0 left-0 right-0 p-12">
          <div className="max-w-5xl mx-auto space-y-4">
            <Skeleton className="h-8 w-32 rounded-full bg-teal-100" />
            <Skeleton className="h-12 w-3/4 bg-teal-100" />
            <Skeleton className="h-6 w-1/3 bg-teal-100" />
            <div className="flex gap-4">
              <Skeleton className="h-4 w-32 bg-teal-100" />
              <Skeleton className="h-4 w-32 bg-teal-100" />
            </div>
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Share buttons */}
          <div className="flex gap-3 mb-8 pb-8 border-b">
            <Skeleton className="h-10 w-24 bg-teal-50" />
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-10 w-10 rounded-full bg-teal-50" />
            ))}
          </div>

          {/* Content paragraphs */}
          <div className="space-y-4 mb-12">
            <Skeleton className="h-8 w-1/2 bg-teal-50" />
            <Skeleton className="h-4 w-full bg-teal-50" />
            <Skeleton className="h-4 w-full bg-teal-50" />
            <Skeleton className="h-4 w-5/6 bg-teal-50" />
            <Skeleton className="h-4 w-full bg-teal-50" />
            <Skeleton className="h-4 w-3/4 bg-teal-50" />
          </div>

          {/* Video placeholder */}
          <div className="mb-12">
            <Skeleton className="h-6 w-48 mb-4 bg-teal-50" />
            <Skeleton className="aspect-video w-full rounded-xl bg-teal-50" />
          </div>

          {/* Gallery placeholder */}
          <div className="mb-12">
            <Skeleton className="h-6 w-40 mb-4 bg-teal-50" />
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton
                  key={i}
                  className="aspect-square rounded-lg bg-teal-50"
                />
              ))}
            </div>
          </div>

          {/* Impact metrics placeholder */}
          <Skeleton className="h-64 w-full rounded-2xl bg-teal-50 mb-12" />

          {/* Helper shoutout placeholder */}
          <Skeleton className="h-40 w-full rounded-2xl bg-teal-50" />
        </div>
      </div>

      {/* Related stories skeleton */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-8 w-64 mx-auto mb-8 bg-teal-50" />
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden">
                <Skeleton className="aspect-video w-full bg-teal-50" />
                <div className="p-5 space-y-3">
                  <Skeleton className="h-4 w-1/3 bg-teal-50" />
                  <Skeleton className="h-6 w-full bg-teal-50" />
                  <Skeleton className="h-4 w-full bg-teal-50" />
                  <Skeleton className="h-10 w-full rounded-full bg-teal-50" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
