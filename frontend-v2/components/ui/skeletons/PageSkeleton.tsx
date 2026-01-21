import { Skeleton } from "@/components/ui/skeleton";

export function PageSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-1/3 bg-teal-50" />
      <Skeleton className="h-4 w-2/3 bg-teal-50" />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-48 w-full bg-teal-50" />
        <Skeleton className="h-48 w-full bg-teal-50" />
        <Skeleton className="h-48 w-full bg-teal-50" />
      </div>
    </div>
  );
}
