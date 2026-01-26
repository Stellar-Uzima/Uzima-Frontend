import { Coins, BookOpen, Heart, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { UserStats, HELPER_RANKS } from "@/lib/types/profile"

interface StatsGridProps {
  stats: UserStats
}

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  description?: string
  badge?: React.ReactNode
}

function StatCard({ title, value, icon, description, badge }: StatCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="text-muted-foreground">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-foreground">
              {typeof value === 'number' && title.includes('XLM') 
                ? `${value.toLocaleString()} XLM`
                : value.toLocaleString()
              }
            </div>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">
                {description}
              </p>
            )}
          </div>
          {badge && (
            <div className="ml-2">
              {badge}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export function StatsGrid({ stats }: StatsGridProps) {
  const getRankColor = (tier: string) => {
    const rankInfo = HELPER_RANKS[tier as keyof typeof HELPER_RANKS]
    return rankInfo?.color || '#6B7280'
  }

  const getRankBadge = () => {
    const { tier, level, nextTierRequirement } = stats.helperRank
    
    return (
      <div className="text-right">
        <Badge 
          variant="secondary" 
          className="text-xs font-semibold"
          style={{ 
            backgroundColor: `${getRankColor(tier)}20`,
            color: getRankColor(tier),
            borderColor: `${getRankColor(tier)}40`
          }}
        >
          Level {level}
        </Badge>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard
        title="Total XLM Earned"
        value={stats.xlmEarned}
        icon={<Coins className="h-4 w-4" />}
        description="Lifetime earnings"
      />
      
      <StatCard
        title="Articles Posted"
        value={stats.articlesPosted}
        icon={<BookOpen className="h-4 w-4" />}
        description="Published content"
      />
      
      <StatCard
        title="Contributions Made"
        value={stats.contributions}
        icon={<Heart className="h-4 w-4" />}
        description="Community help"
      />
      
      <StatCard
        title="Ubuntu Helper Rank"
        value={stats.helperRank.tier}
        icon={<Shield className="h-4 w-4" />}
        description={stats.helperRank.nextTierRequirement}
        badge={getRankBadge()}
      />
    </div>
  )
}