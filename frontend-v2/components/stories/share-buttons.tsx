"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Twitter, Facebook, Linkedin, Link2, Check } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  url: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm font-medium text-muted-foreground mr-2">
        Share this story:
      </span>

      {/* Twitter */}
      <Button
        variant="outline"
        size="icon"
        asChild
        className="rounded-full hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-colors"
      >
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Twitter"
        >
          <Twitter className="w-4 h-4" />
        </a>
      </Button>

      {/* Facebook */}
      <Button
        variant="outline"
        size="icon"
        asChild
        className="rounded-full hover:bg-[#4267B2] hover:text-white hover:border-[#4267B2] transition-colors"
      >
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Facebook"
        >
          <Facebook className="w-4 h-4" />
        </a>
      </Button>

      {/* LinkedIn */}
      <Button
        variant="outline"
        size="icon"
        asChild
        className="rounded-full hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-colors"
      >
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-4 h-4" />
        </a>
      </Button>

      {/* Copy Link */}
      <Button
        variant="outline"
        size="icon"
        onClick={handleCopyLink}
        className={`rounded-full transition-colors ${
          copied
            ? "bg-green-500 text-white border-green-500"
            : "hover:bg-[oklch(0.65_0.15_175)] hover:text-white hover:border-[oklch(0.65_0.15_175)]"
        }`}
        aria-label={copied ? "Link copied!" : "Copy link"}
      >
        {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
      </Button>

      {copied && (
        <span className="text-sm text-green-600 font-medium animate-[fadeIn_0.2s_ease-out]">
          Copied!
        </span>
      )}
    </div>
  );
}
