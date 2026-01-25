"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { UserProfile } from '../types/profile'
import { mockUserProfile } from '../mock-data/profile'

interface ProfileContextType {
  userProfile: UserProfile
  updateProfile: (updates: Partial<UserProfile>) => void
  isLoading: boolean
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

interface ProfileProviderProps {
  children: ReactNode
}

export function ProfileProvider({ children }: ProfileProviderProps) {
  const [userProfile, setUserProfile] = useState<UserProfile>(mockUserProfile)
  const [isLoading, setIsLoading] = useState(false)

  const updateProfile = async (updates: Partial<UserProfile>) => {
    setIsLoading(true)
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Update the profile with new data
      setUserProfile(prev => ({
        ...prev,
        ...updates,
        updatedAt: new Date()
      }))
      
      // In a real app, this would make an API call to persist the changes
      console.log('Profile updated:', updates)
      
    } catch (error) {
      console.error('Failed to update profile:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ProfileContext.Provider value={{ userProfile, updateProfile, isLoading }}>
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  const context = useContext(ProfileContext)
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider')
  }
  return context
}