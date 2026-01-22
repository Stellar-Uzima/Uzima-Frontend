import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function ProfileHeaderSkeleton() {
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Avatar Skeleton */}
          <Skeleton className="w-[150px] h-[150px] rounded-full flex-shrink-0" />
          
          {/* User Info Skeleton */}
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-8 w-48" /> {/* Name */}
              <Skeleton className="h-6 w-32" /> {/* Username */}
              
              {/* Wallet Address */}
              <div className="flex items-center gap-2 mt-3">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-6 w-6" />
              </div>
              
              <Skeleton className="h-4 w-36" /> {/* Member since */}
            </div>
            
            {/* Edit Button */}
            <Skeleton className="h-9 w-28" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function StatsGridSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-16 mb-1" />
            <Skeleton className="h-3 w-24" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export function ActivityFeedSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-start gap-4 p-4 rounded-lg border">
          <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
      ))}
    </div>
  )
}

export function EarningsTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-8 w-24" />
      </div>
      
      <div className="rounded-md border">
        <div className="p-4 border-b">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
        
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="p-4 border-b last:border-b-0">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-3 w-12" />
              </div>
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-6 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function PostsGridSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-12 flex-shrink-0" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            
            <div className="flex gap-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-14" />
            </div>
            
            <div className="flex justify-between pt-2 border-t">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export function AchievementsBadgesSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-20" />
      </div>
      
      <Skeleton className="w-full h-2 rounded-full" />
      
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4 text-center space-y-3">
              <Skeleton className="mx-auto w-12 h-12 rounded-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-5 w-16 mx-auto" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function ProfileSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ProfileHeaderSkeleton />
      <StatsGridSkeleton />
      
      {/* Tabs Skeleton */}
      <div className="space-y-6">
        <div className="flex space-x-1 bg-muted p-1 rounded-lg">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-9 flex-1" />
          ))}
        </div>
        
        <Card>
          <CardContent className="p-6">
            <Skeleton className="h-6 w-32 mb-4" />
            <ActivityFeedSkeleton />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}