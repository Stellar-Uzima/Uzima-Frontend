import { CardSkeleton } from "@/components/ui/skeletons/CardSkeleton";

export default function Loading() {
  return (
    <div className="transition-opacity duration-200">
      <CardSkeleton count={3} />
    </div>
  );
}
