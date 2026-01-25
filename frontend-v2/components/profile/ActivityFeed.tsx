"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { FileText, Coins, Gift, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Activity } from "@/lib/types/profile"
import { mockActivities } from "@/lib/mock-data/profile"

interface ActivityFeedProps {
  userId: string
}

interface ActivityItemProps {
  activity: Activity
}

function ActivityItem({ activity }: ActivityItemProps) {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'article_posted':
        return <FileText className="h-4 w-4 text-blue-600" />
      case 'xlm_earned':
        return <Coins className="h-4 w-4 text-yellow-600" />
      case 'donation_received':
        return <Gift className="h-4 w-4 text-green-600" />
      case 'rank_up':
        return <TrendingUp className="h-4 w-4 text-purple-600" />
      default:
        return <FileText className="h-4 w-4 text-gray-600" />
    }
  }

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'article_posted':
        return 'border-blue-200 bg-blue-50'
      case 'xlm_earned':
        return 'border-yellow-200 bg-yellow-50'
      case 'donation_received':
        return 'border-green-200 bg-green-50'
      case 'rank_up':
        return 'border-purple-200 bg-purple-50'
      default:
        return 'border-gray-200 bg-gray-50'
    }
  }

  return (
    <div className="flex items-start gap-4 p-4 rounded-lg border hover:shadow-sm transition-shadow">
      <div className={`flex-shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center ${getActivityColor(activity.type)}`}>
        {getActivityIcon(activity.type)}
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground font-medium">
          {activity.description}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
        </p>
      </div>

      {activity.metadata?.amount && (
        <div className="flex-shrink-0 text-right">
          <span className="text-sm font-semibold text-green-600">
            +{activity.metadata.amount} XLM
          </span>
        </div>
      )}
    </div>
  )
}

export function ActivityFeed({ userId }: ActivityFeedProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  
  // In a real app, this would fetch data based on userId
  const activities = mockActivities
  const totalPages = Math.ceil(activities.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentActivities = activities.slice(startIndex, endIndex)

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  if (activities.length === 0) {
    return (
      <div className="text-center py-8">
        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">No activity yet. Start contributing to see your activity here!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Activity Timeline */}
      <div className="space-y-3">
        {currentActivities.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(endIndex, activities.length)} of {activities.length} activities
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="gap-1"
            >
              <ChevronLeft className="h-3 w-3" />
              Previous
            </Button>
            
            <span className="text-sm text-muted-foreground px-2">
              Page {currentPage} of {totalPages}
            </span>
            
            <Button
              variant="outline"
              size="sm"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="gap-1"
            >
              Next
              <ChevronRight className="h-3 w-3" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}