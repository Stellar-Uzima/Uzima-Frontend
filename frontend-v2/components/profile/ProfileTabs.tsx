"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, DollarSign, FileText, Award } from "lucide-react"
import { UserProfile } from "@/lib/types/profile"
import { ActivityFeed } from "./ActivityFeed"
import { EarningsTable } from "./EarningsTable"
import { PostsGrid } from "./PostsGrid"
import { AchievementsBadges } from "./AchievementsBadges"

interface ProfileTabsProps {
  user: UserProfile
}

export function ProfileTabs({ user }: ProfileTabsProps) {
  return (
    <Tabs defaultValue="activity" className="w-full">
      <TabsList className="grid w-full grid-cols-4 mb-6">
        <TabsTrigger value="activity" className="flex items-center gap-2">
          <Activity className="h-4 w-4" />
          <span className="hidden sm:inline">Activity</span>
        </TabsTrigger>
        <TabsTrigger value="earnings" className="flex items-center gap-2">
          <DollarSign className="h-4 w-4" />
          <span className="hidden sm:inline">Earnings</span>
        </TabsTrigger>
        <TabsTrigger value="posts" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          <span className="hidden sm:inline">Posts</span>
        </TabsTrigger>
        <TabsTrigger value="achievements" className="flex items-center gap-2">
          <Award className="h-4 w-4" />
          <span className="hidden sm:inline">Achievements</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="activity" className="space-y-4">
        <div className="bg-card rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <ActivityFeed userId={user.id} />
        </div>
      </TabsContent>

      <TabsContent value="earnings" className="space-y-4">
        <div className="bg-card rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4">Earnings History</h3>
          <EarningsTable userId={user.id} />
        </div>
      </TabsContent>

      <TabsContent value="posts" className="space-y-4">
        <div className="bg-card rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4">Published Articles</h3>
          <PostsGrid userId={user.id} />
        </div>
      </TabsContent>

      <TabsContent value="achievements" className="space-y-4">
        <div className="bg-card rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4">Achievements & Badges</h3>
          <AchievementsBadges userId={user.id} />
        </div>
      </TabsContent>
    </Tabs>
  )
}