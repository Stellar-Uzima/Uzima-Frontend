import { PageSkeleton } from "@/components/ui/skeletons/PageSkeleton";

export default function Loading() {
  return (
    <div className="transition-opacity duration-200">
      <PageSkeleton />
    </div>
  );
}
