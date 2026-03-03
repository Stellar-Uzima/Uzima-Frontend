import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  className?: string;
}

export function StarRating({ rating, className }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const totalStars = 5;

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {Array.from({ length: totalStars }).map((_, index) => {
        const filled =
          index < fullStars || (index === fullStars && hasHalfStar);
        return (
          <span
            key={index}
            className={cn(
              "text-[11px]",
              filled ? "text-amber-500" : "text-amber-200",
            )}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}
