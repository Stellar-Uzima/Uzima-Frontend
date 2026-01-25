"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { ProfileHeader } from "@/components/profile/ProfileHeader"
import { StatsGrid } from "@/components/profile/StatsGrid"
import { ProfileTabs } from "@/components/profile/ProfileTabs"
import { ProfileSkeleton } from "@/components/profile/ProfileSkeleton"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { UserCheck, LogIn } from "lucide-react"
import { useProfile } from "@/lib/contexts/ProfileContext"
import { UserProfile } from "@/lib/types/profile"

// Mock authentication state - in a real app, this would come from context/auth provider
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    // Simulate authentication check
    const checkAuth = async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // For demo purposes, we'll simulate a logged-in user
      // In a real app, this would check wallet connection or session
      const isLoggedIn = true // Change to false to test login prompt
      
      setIsAuthenticated(isLoggedIn)
    }

    checkAuth()
  }, [])

  return { isAuthenticated, setIsAuthenticated }
}

function LoginPrompt() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <UserCheck className="h-8 w-8 text-primary" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground">
                Access Your Profile
              </h1>
              <p className="text-muted-foreground">
                Connect your wallet to view your profile, earnings, and achievements on Stellar Uzima.
              </p>
            </div>
            
            <div className="space-y-3">
              <Button className="w-full gap-2" size="lg">
                <LogIn className="h-4 w-4" />
                Connect Wallet
              </Button>
              
              <p className="text-xs text-muted-foreground">
                New to Stellar Uzima? Your profile will be created automatically when you connect your wallet.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function ProfilePage() {
  const { isAuthenticated } = useAuth()
  const { userProfile } = useProfile()

  // Loading state
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <ProfileSkeleton />
      </div>
    )
  }

  // Not authenticated - show login prompt
  if (!isAuthenticated) {
    return <LoginPrompt />
  }

  // Authenticated - show profile
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            My Profile
          </h1>
          <p className="text-muted-foreground">
            Manage your account, view your contributions, and track your earnings.
          </p>
        </div>

        {/* Profile Header */}
        <ProfileHeader user={userProfile} />

        {/* Stats Grid */}
        <StatsGrid stats={userProfile.stats} />

        {/* Profile Tabs */}
        <ProfileTabs user={userProfile} />
      </main>
    </div>
  )
}