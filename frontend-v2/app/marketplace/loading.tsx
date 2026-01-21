import { CardSkeleton } from "@/components/ui/skeletons/CardSkeleton";

export default function Loading() {
  return (
    <div className="transition-opacity duration-200">
      {/* Render 6 cards as a placeholder */}
      <CardSkeleton count={6} />
    </div>
  );
}
