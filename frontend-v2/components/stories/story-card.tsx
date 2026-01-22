"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Story } from "@/data/stories";
import { CATEGORY_LABELS } from "@/data/stories";
import { useRouter } from "next/navigation";

interface StoryCardProps {
  story: Story;
}

export function StoryCard({ story }: StoryCardProps) {
  const router = useRouter();

  // Truncate excerpt to 120 characters
  const truncatedExcerpt =
    story.excerpt.length > 120
      ? story.excerpt.slice(0, 117) + "..."
      : story.excerpt;

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 bg-white">
      {/* Featured Image - 16:9 ratio */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={story.featuredImage}
          alt={story.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <Badge
            variant="secondary"
            className="bg-white/90 backdrop-blur-sm text-[oklch(0.25_0.03_250)] font-medium"
          >
            {CATEGORY_LABELS[story.category]}
          </Badge>
        </div>
      </div>

      <CardContent className="p-5 space-y-4">
        {/* Community Name */}
        <p className="text-sm text-[oklch(0.65_0.15_175)] font-medium">
          {story.community}
        </p>

        {/* Title */}
        <h3 className="text-xl font-bold text-[oklch(0.25_0.03_250)] leading-tight line-clamp-2">
          {story.title}
        </h3>

        {/* Excerpt */}
        <p className="text-muted-foreground text-sm leading-relaxed">
          {truncatedExcerpt}
        </p>

        {/* Donation Amount */}
        <p className="text-sm font-medium text-[oklch(0.75_0.15_85)]">
          ${story.amountRaised.toLocaleString()} raised by Ubuntu Champions
        </p>

        {/* Read Story Button */}

        <Button
          onClick={() => router.push(`/stories/${story.id}`)}
          className="w-full mt-2 cursor-pointer bg-[oklch(0.65_0.15_175)] hover:bg-[oklch(0.55_0.15_175)] text-white rounded-full transition-colors duration-200"
        >
          Read Story
        </Button>
      </CardContent>
    </Card>
  );
}
