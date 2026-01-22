import { ProfileProvider } from "@/lib/contexts/ProfileContext"

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProfileProvider>
      {children}
    </ProfileProvider>
  )
}