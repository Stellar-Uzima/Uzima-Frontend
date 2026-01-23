import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PhotoGallery } from "@/components/stories/photo-gallery";
import { VideoEmbed } from "@/components/stories/video-embed";
import { BeforeAfter } from "@/components/stories/before-after";
import { ShareButtons } from "@/components/stories/share-buttons";
import { RelatedStories } from "@/components/stories/related-stories";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Calendar,
  User,
  Heart,
  DollarSign,
  Clock,
  Users,
} from "lucide-react";
import {
  getStoryById,
  getRelatedStories,
  CATEGORY_LABELS,
  stories,
} from "@/data/stories";

interface StoryPageProps {
  params: Promise<{ id: string }>;
}

// Generate static params for all stories
export async function generateStaticParams() {
  return stories.map((story) => ({
    id: story.id,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: StoryPageProps): Promise<Metadata> {
  const { id } = await params;
  const story = getStoryById(id);

  if (!story) {
    return {
      title: "Story Not Found - Stellar Uzima",
    };
  }

  return {
    title: `${story.title} - Ubuntu Helpers Stories | Stellar Uzima`,
    description: story.excerpt,
    openGraph: {
      title: story.title,
      description: story.excerpt,
      type: "article",
      publishedTime: story.publishedAt.toISOString(),
      authors: [story.author],
      images: [
        {
          url: story.featuredImage,
          width: 1200,
          height: 675,
          alt: story.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: story.title,
      description: story.excerpt,
      images: [story.featuredImage],
    },
  };
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { id } = await params;
  const story = getStoryById(id);

  if (!story) {
    notFound();
  }

  const relatedStories = getRelatedStories(story.id, 3);

  // Format date
  const formattedDate = story.publishedAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Current URL for sharing (would be dynamic in production)
  const shareUrl = `https://stellaruzima.com/stories/${story.id}`;

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Full-width Hero Image */}
      <section className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
        <Image
          src={story.featuredImage}
          alt={story.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16">
          <div className="max-w-5xl mx-auto">
            {/* Back Button */}
            <Link href="/stories" className="inline-block mb-6">
              <Button
                variant="ghost"
                className="text-white hover:bg-white/20 gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Stories
              </Button>
            </Link>

            {/* Category Badge */}
            <Badge className="mb-4 bg-[oklch(0.65_0.15_175)] text-white">
              {CATEGORY_LABELS[story.category]}
            </Badge>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight max-w-4xl">
              {story.title}
            </h1>

            {/* Community */}
            <p className="text-white/80 text-lg mb-4">{story.community}</p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {story.author}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Share Buttons */}
          <div className="mb-8 pb-8 border-b">
            <ShareButtons title={story.title} url={shareUrl} />
          </div>

          {/* Story Content */}
          <div className="prose prose-lg max-w-none mb-12">
            {/* Render markdown-like content */}
            {story.content.split("\n").map((line, index) => {
              const trimmedLine = line.trim();

              if (trimmedLine.startsWith("# ")) {
                return (
                  <h2
                    key={index}
                    className="text-3xl font-bold text-[oklch(0.25_0.03_250)] mt-8 mb-4"
                  >
                    {trimmedLine.slice(2)}
                  </h2>
                );
              }
              if (trimmedLine.startsWith("## ")) {
                return (
                  <h3
                    key={index}
                    className="text-2xl font-bold text-[oklch(0.25_0.03_250)] mt-6 mb-3"
                  >
                    {trimmedLine.slice(3)}
                  </h3>
                );
              }
              if (trimmedLine.startsWith("### ")) {
                return (
                  <h4
                    key={index}
                    className="text-xl font-bold text-[oklch(0.25_0.03_250)] mt-4 mb-2"
                  >
                    {trimmedLine.slice(4)}
                  </h4>
                );
              }
              if (trimmedLine.startsWith("> ")) {
                return (
                  <blockquote
                    key={index}
                    className="border-l-4 border-[oklch(0.65_0.15_175)] pl-4 italic text-muted-foreground my-6"
                  >
                    {trimmedLine.slice(2)}
                  </blockquote>
                );
              }
              if (trimmedLine.startsWith("- ")) {
                return (
                  <li key={index} className="text-muted-foreground ml-4">
                    {trimmedLine.slice(2)}
                  </li>
                );
              }
              if (trimmedLine === "") {
                return <br key={index} />;
              }
              return (
                <p
                  key={index}
                  className="text-muted-foreground leading-relaxed mb-4"
                >
                  {trimmedLine}
                </p>
              );
            })}
          </div>

          {/* Video Embed */}
          {story.videoUrl && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-[oklch(0.25_0.03_250)] mb-4">
                Watch the Story
              </h3>
              <VideoEmbed url={story.videoUrl} title={story.title} />
            </div>
          )}

          {/* Photo Gallery */}
          {story.gallery.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-[oklch(0.25_0.03_250)] mb-4">
                Photo Gallery
              </h3>
              <PhotoGallery images={story.gallery} storyTitle={story.title} />
            </div>
          )}

          {/* Before & After */}
          {story.beforeAfterImages && (
            <div className="mb-12">
              <BeforeAfter
                before={story.beforeAfterImages.before}
                after={story.beforeAfterImages.after}
                caption={story.beforeAfterImages.caption}
              />
            </div>
          )}

          {/* Impact Metrics */}
          <div className="mb-12 p-8 bg-[oklch(0.97_0.01_175)] rounded-2xl">
            <h3 className="text-2xl font-bold text-[oklch(0.25_0.03_250)] mb-6 text-center">
              Impact Metrics
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-[oklch(0.65_0.15_175)]/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-[oklch(0.65_0.15_175)]" />
                </div>
                <p className="text-2xl font-bold text-[oklch(0.25_0.03_250)]">
                  {story.impact.peopleHelped.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">People Helped</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-[oklch(0.75_0.15_85)]/10 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-[oklch(0.75_0.15_85)]" />
                </div>
                <p className="text-2xl font-bold text-[oklch(0.25_0.03_250)]">
                  ${story.amountRaised.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Amount Raised</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-cyan-500/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-cyan-600" />
                </div>
                <p className="text-2xl font-bold text-[oklch(0.25_0.03_250)]">
                  {story.impact.duration}
                </p>
                <p className="text-sm text-muted-foreground">Duration</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-2xl font-bold text-[oklch(0.25_0.03_250)]">
                  {story.helpersCount}
                </p>
                <p className="text-sm text-muted-foreground">Ubuntu Helpers</p>
              </div>
            </div>

            {/* Key Metrics List */}
            <div className="space-y-2">
              {story.impact.metrics.map((metric, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-muted-foreground"
                >
                  <span className="w-2 h-2 rounded-full bg-[oklch(0.65_0.15_175)]" />
                  {metric}
                </div>
              ))}
            </div>
          </div>

          {/* Helper Shoutout */}
          <div className="text-center p-8 bg-gradient-to-r from-[oklch(0.65_0.15_175)] to-[oklch(0.55_0.15_175)] rounded-2xl text-white mb-12">
            <Users className="w-12 h-12 mx-auto mb-4 opacity-90" />
            <p className="text-2xl font-bold mb-2">
              Made possible by {story.helpersCount} Ubuntu Helpers
            </p>
            <p className="text-white/80">
              Thank you to every individual who contributed to this
              transformative project.
            </p>
          </div>

          {/* Share Buttons (bottom) */}
          <div className="pt-8 border-t">
            <ShareButtons title={story.title} url={shareUrl} />
          </div>
        </div>
      </article>

      {/* Related Stories */}
      <RelatedStories stories={relatedStories} />

      <Footer />
    </main>
  );
}
