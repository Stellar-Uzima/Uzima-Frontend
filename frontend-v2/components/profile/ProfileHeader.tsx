"use client"

import { useState } from "react"
import Link from "next/link"
import { Copy, Check, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { UserProfile } from "@/lib/types/profile"

interface ProfileHeaderProps {
  user: UserProfile
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const [copied, setCopied] = useState(false)

  const truncateWalletAddress = (address: string) => {
    if (address.length <= 12) return address
    return `${address.slice(0, 6)}...${address.slice(-6)}`
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(user.walletAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy wallet address:', err)
    }
  }

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="bg-card rounded-lg border p-6 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <Avatar className="w-[150px] h-[150px]">
            <AvatarImage 
              src={user.avatar} 
              alt={`${user.name}'s avatar`}
              className="object-cover"
            />
            <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
              {getUserInitials(user.name)}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
              <p className="text-lg text-muted-foreground">@{user.username}</p>
              
              {/* Wallet Address */}
              <div className="flex items-center gap-2 mt-3">
                <span className="text-sm text-muted-foreground">Wallet:</span>
                <code className="text-sm bg-muted px-2 py-1 rounded font-mono">
                  {truncateWalletAddress(user.walletAddress)}
                </code>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={copyToClipboard}
                        className="h-6 w-6"
                      >
                        {copied ? (
                          <Check className="h-3 w-3 text-green-600" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{copied ? 'Copied!' : 'Copy wallet address'}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              {/* Member Since */}
              <p className="text-sm text-muted-foreground">
                Member since {user.createdAt.toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long' 
                })}
              </p>
            </div>

            {/* Edit Profile Button */}
            <div className="flex-shrink-0">
              <Button asChild variant="outline" className="gap-2">
                <Link href="/profile/edit">
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}