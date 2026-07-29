"use client";

import { useState } from "react";
import { MessageCircle, ThumbsUp, Send, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/ui/EmptyState";
import { Pagination } from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Comment {
  id: string;
  author: string;
  authorInitials: string;
  content: string;
  timestamp: Date;
  upvotes: number;
  hasUpvoted: boolean;
  isOptimistic?: boolean;
}

interface TaskDiscussionThreadProps {
  taskId: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const AVATAR_COLOURS = [
  "bg-terra/20 text-terra",
  "bg-gold/20 text-amber-700",
  "bg-emerald-100 text-emerald-700",
  "bg-sky-100 text-sky-700",
  "bg-violet-100 text-violet-700",
];

function avatarColour(index: number) {
  return AVATAR_COLOURS[index % AVATAR_COLOURS.length];
}

function getInitials(name: string) {
  return name.slice(0, 2).toUpperCase();
}

function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "just now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks}w ago`;
  }

  return date.toLocaleDateString();
}

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const MOCK_COMMENTS: Record<string, Comment[]> = {
  "hydration-check": [
    {
      id: "1",
      author: "Amara",
      authorInitials: "AM",
      content: "Does drinking tea count towards hydration, or should it be plain water?",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      upvotes: 12,
      hasUpvoted: false,
    },
    {
      id: "2",
      author: "Kofi",
      authorInitials: "KO",
      content: "Herbal tea counts! Just avoid sugary drinks. I've been doing this for a week and feel great.",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      upvotes: 8,
      hasUpvoted: false,
    },
  ],
  "neighbourhood-walk-photo": [
    {
      id: "3",
      author: "Lena",
      authorInitials: "LE",
      content: "Does a 20-minute walk count if split into two 10-minute walks?",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      upvotes: 15,
      hasUpvoted: false,
    },
    {
      id: "4",
      author: "Kwame",
      authorInitials: "KW",
      content: "Yes! The key is total time. I usually do 10 min in the morning and 10 min in the evening.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      upvotes: 11,
      hasUpvoted: false,
    },
  ],
};

const COMMENTS_PER_PAGE = 5;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function TaskDiscussionThread({ taskId }: TaskDiscussionThreadProps) {
  const [comments, setComments] = useState<Comment[]>(
    MOCK_COMMENTS[taskId] || []
  );
  const [newComment, setNewComment] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Sort comments by upvotes (most helpful first)
  const sortedComments = [...comments].sort((a, b) => b.upvotes - a.upvotes);

  // Pagination
  const totalPages = Math.ceil(sortedComments.length / COMMENTS_PER_PAGE);
  const startIndex = (currentPage - 1) * COMMENTS_PER_PAGE;
  const paginatedComments = sortedComments.slice(
    startIndex,
    startIndex + COMMENTS_PER_PAGE
  );

  const handlePostComment = async () => {
    if (!newComment.trim() || isPosting) return;

    const optimisticComment: Comment = {
      id: `temp-${Date.now()}`,
      author: "You",
      authorInitials: "YO",
      content: newComment.trim(),
      timestamp: new Date(),
      upvotes: 0,
      hasUpvoted: false,
      isOptimistic: true,
    };

    // Optimistic update
    setComments((prev: Comment[]) => [optimisticComment, ...prev]);
    setNewComment("");
    setIsPosting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Replace optimistic comment with "real" comment
    setComments((prev: Comment[]) =>
      prev.map((comment: Comment) =>
        comment.id === optimisticComment.id
          ? { ...comment, isOptimistic: false }
          : comment
      )
    );
    setIsPosting(false);
  };

  const handleUpvote = (commentId: string) => {
    setComments((prev: Comment[]) =>
      prev.map((comment: Comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            upvotes: comment.hasUpvoted
              ? comment.upvotes - 1
              : comment.upvotes + 1,
            hasUpvoted: !comment.hasUpvoted,
          };
        }
        return comment;
      })
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handlePostComment();
    }
  };

  return (
    <section
      aria-labelledby="discussion-heading"
      className="rounded-3xl border border-terra/10 bg-white p-5 sm:p-6 space-y-5"
    >
      <div className="flex items-center gap-2">
        <MessageCircle className="h-4 w-4 text-terra" aria-hidden="true" />
        <h2
          id="discussion-heading"
          className="text-sm font-semibold tracking-wide text-terra uppercase"
        >
          Discussion
        </h2>
      </div>

      {/* Comment input */}
      <div className="space-y-3">
        <div className="flex gap-3">
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold",
              avatarColour(0)
            )}
          >
            YO
          </div>
          <div className="flex-1 space-y-2">
            <Input
              type="text"
              placeholder="Ask a question or share a tip..."
              value={newComment}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewComment(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isPosting}
              className="rounded-2xl border-terra/20 bg-cream/50 focus:border-terra/40 focus:ring-terra/20"
            />
            <div className="flex justify-end">
              <Button
                type="button"
                onClick={handlePostComment}
                disabled={!newComment.trim() || isPosting}
                size="sm"
                className="rounded-full bg-terra text-white hover:bg-terra/90 text-xs font-semibold gap-1.5"
              >
                {isPosting ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Posting...
                  </>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    Post
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments list */}
      {comments.length === 0 ? (
        <EmptyState
          title="No questions yet"
          description="Be the first to ask a question or share a tip about this task!"
          icon={<MessageCircle className="h-8 w-8 text-terra/60" />}
          className="py-8 border-dashed"
        />
      ) : (
        <div className="space-y-4">
          <div className="space-y-3">
            {paginatedComments.map((comment, index) => (
              <div
                key={comment.id}
                className={cn(
                  "flex gap-3 rounded-2xl p-3.5 transition-all",
                  comment.isOptimistic
                    ? "bg-terra/5 border border-terra/20 animate-in fade-in slide-in-from-top-2"
                    : "bg-cream/50"
                )}
              >
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-bold",
                    avatarColour(index)
                  )}
                >
                  {comment.authorInitials}
                </div>
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-earth">
                      {comment.author}
                    </span>
                    <span className="text-xs text-muted">
                      {getRelativeTime(comment.timestamp)}
                    </span>
                    {comment.isOptimistic && (
                      <span className="text-[11px] text-terra/70 italic">
                        posting...
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-earth/90 leading-relaxed">
                    {comment.content}
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      onClick={() => handleUpvote(comment.id)}
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "h-7 px-2 rounded-full gap-1.5 text-xs font-medium",
                        comment.hasUpvoted
                          ? "bg-terra/10 text-terra hover:bg-terra/15"
                          : "text-muted hover:bg-cream hover:text-earth"
                      )}
                    >
                      <ThumbsUp
                        className={cn(
                          "h-3.5 w-3.5",
                          comment.hasUpvoted && "fill-current"
                        )}
                      />
                      {comment.upvotes}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={comments.length}
              itemsPerPage={COMMENTS_PER_PAGE}
              onPageChange={setCurrentPage}
              label="comments"
              className="pt-2"
            />
          )}
        </div>
      )}
    </section>
  );
}
