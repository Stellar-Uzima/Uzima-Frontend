import { ListSkeleton } from "@/components/ui/skeletons/ListSkeleton";

export default function Loading() {
  return (
    <div className="transition-opacity duration-200">
      {/* 6 list items as placeholder */}
      <ListSkeleton count={6} />
    </div>
  );
}
