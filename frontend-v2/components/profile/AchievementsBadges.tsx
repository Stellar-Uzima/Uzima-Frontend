"use client"

import { format } from "date-fns"
import { 
  FileText, 
  Coins, 
  Shield, 
  Users, 
  BookOpen, 
  Trophy,
  Lock
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Achievement } from "@/lib/types/profile"
import { mockAchievements } from "@/lib/mock-data/profile"

interface AchievementsBadgesProps {
  userId: string
}

interface AchievementBadgeProps {
  achievement: Achievement
}

function AchievementBadge({ achievement }: AchievementBadgeProps) {
  const getIcon = (iconName: string) => {
    const iconProps = { className: "h-6 w-6" }
    
    switch (iconName) {
      case 'FileText':
        return <FileText {...iconProps} />
      case 'Coins':
        return <Coins {...iconProps} />
      case 'Shield':
        return <Shield {...iconProps} />
      case 'Users':
        return <Users {...iconProps} />
      case 'BookOpen':
        return <BookOpen {...iconProps} />
      case 'Trophy':
        return <Trophy {...iconProps} />
      default:
        return <Trophy {...iconProps} />
    }
  }

  const getCategoryColor = (category: Achievement['category']) => {
    switch (category) {
      case 'posting':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'earning':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'community':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'milestone':
        return 'bg-purple-100 text-purple-700 border-purple-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card 
            className={`relative cursor-pointer transition-all hover:shadow-md ${
              achievement.isUnlocked 
                ? 'hover:scale-105' 
                : 'opacity-60 grayscale hover:opacity-80'
            }`}
          >
            <CardContent className="p-4 text-center space-y-3">
              {/* Lock overlay for locked achievements */}
              {!achievement.isUnlocked && (
                <div className="absolute top-2 right-2">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
              
              {/* Icon */}
              <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                achievement.isUnlocked 
                  ? getCategoryColor(achievement.category)
                  : 'bg-muted text-muted-foreground border-muted'
              }`}>
                {getIcon(achievement.icon)}
              </div>
              
              {/* Name */}
              <h4 className="font-semibold text-sm leading-tight">
                {achievement.name}
              </h4>
              
              {/* Category Badge */}
              <Badge 
                variant={achievement.isUnlocked ? "secondary" : "outline"}
                className="text-xs"
              >
                {achievement.category}
              </Badge>
              
              {/* Unlock Date */}
              {achievement.isUnlocked && achievement.unlockedAt && (
                <p className="text-xs text-muted-foreground">
                  Unlocked {format(achievement.unlockedAt, 'MMM yyyy')}
                </p>
              )}
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <div className="space-y-2">
            <p className="font-semibold">{achievement.name}</p>
            <p className="text-sm">{achievement.description}</p>
            {achievement.isUnlocked && achievement.unlockedAt ? (
              <p className="text-xs text-muted-foreground">
                Unlocked on {format(achievement.unlockedAt, 'MMMM dd, yyyy')}
              </p>
            ) : (
              <p className="text-xs text-muted-foreground">
                Not yet unlocked
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export function AchievementsBadges({ userId }: AchievementsBadgesProps) {
  // In a real app, this would fetch data based on userId
  const achievements = mockAchievements
  
  const unlockedCount = achievements.filter(a => a.isUnlocked).length
  const totalCount = achievements.length

  return (
    <div className="space-y-4">
      {/* Progress Summary */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {unlockedCount} of {totalCount} achievements unlocked
        </div>
        <div className="text-sm font-medium">
          {Math.round((unlockedCount / totalCount) * 100)}% complete
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
        />
      </div>
      
      {/* Achievements Grid */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {achievements.map((achievement) => (
          <AchievementBadge key={achievement.id} achievement={achievement} />
        ))}
      </div>
      
      {/* Categories Legend */}
      <div className="flex flex-wrap gap-2 pt-4 border-t">
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          Posting
        </Badge>
        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
          Earning
        </Badge>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          Community
        </Badge>
        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
          Milestone
        </Badge>
      </div>
    </div>
  )
}