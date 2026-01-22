"use client"

import { format } from "date-fns"
import { Clock, Tag, BookOpen } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Post } from "@/lib/types/profile"
import { mockPosts } from "@/lib/mock-data/profile"

interface PostsGridProps {
  userId: string
}

interface PostCardProps {
  post: Post
}

function PostCard({ post }: PostCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
            {post.title}
          </CardTitle>
          <div className="flex-shrink-0 text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readTime} min
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex flex-wrap gap-1">
          {post.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {post.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{post.tags.length - 3} more
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
          <span>
            Published {format(post.publishedAt, 'MMM dd, yyyy')}
          </span>
          <div className="flex items-center gap-1">
            <Tag className="h-3 w-3" />
            {post.tags.length} tags
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function EmptyState() {
  return (
    <div className="text-center py-12">
      <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
        <BookOpen className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">No posts yet</h3>
      <p className="text-muted-foreground mb-4">Share your knowledge!</p>
      <p className="text-sm text-muted-foreground max-w-md mx-auto">
        Start writing articles to share your healthcare expertise with the community and earn XLM tokens.
      </p>
    </div>
  )
}

export function PostsGrid({ userId }: PostsGridProps) {
  // In a real app, this would fetch data based on userId
  const posts = mockPosts

  if (posts.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {posts.length} article{posts.length !== 1 ? 's' : ''} published
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}