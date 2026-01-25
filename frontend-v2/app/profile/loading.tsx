import { Header } from "@/components/header"
import { ProfileSkeleton } from "@/components/profile/ProfileSkeleton"

export default function ProfileLoading() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProfileSkeleton />
    </div>
  )
}