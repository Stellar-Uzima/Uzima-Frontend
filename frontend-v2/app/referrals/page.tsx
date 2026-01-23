"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import {
  CheckCircle2,
  Gift,
  Mail,
  MessageCircle,
  Share2,
  Twitter,
  Users,
} from "lucide-react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ReferralCard } from "@/components/referrals/ReferralCard"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Toaster } from "@/components/ui/toaster"
import { toast } from "@/hooks/use-toast"

interface Referral {
  id: string
  referrerId: string
  friendName: string
  friendEmail: string
  status: "pending" | "completed"
  xlmEarned: number
  createdAt: Date
  completedAt?: Date
}

interface ReferralStats {
  invitesSent: number
  friendsJoined: number
  totalXlmEarned: number
  conversionRate: number
}

const currentUserId = "user-001"
const referralCode = "UZIMA-X7K9"
const shareCode = referralCode.split("-")[1]
const shareLink = `https://stellaruzima.com/join?ref=${shareCode}`

const leaderboard = [
  { id: "user-010", name: "Amina N.", referrals: 42, xlmEarned: 210 },
  { id: "user-014", name: "Samuel O.", referrals: 38, xlmEarned: 190 },
  { id: "user-019", name: "Lina A.", referrals: 35, xlmEarned: 175 },
  { id: "user-001", name: "You", referrals: 27, xlmEarned: 135 },
  { id: "user-023", name: "Maya K.", referrals: 24, xlmEarned: 120 },
  { id: "user-031", name: "Kofi D.", referrals: 21, xlmEarned: 105 },
  { id: "user-042", name: "Dr. Patel", referrals: 19, xlmEarned: 95 },
  { id: "user-051", name: "Isabella M.", referrals: 17, xlmEarned: 85 },
  { id: "user-066", name: "James P.", referrals: 16, xlmEarned: 80 },
  { id: "user-078", name: "Grace W.", referrals: 15, xlmEarned: 75 },
]

const referralHistory: Referral[] = [
  {
    id: "ref-001",
    referrerId: currentUserId,
    friendName: "Kevin N.",
    friendEmail: "kevin@example.com",
    status: "completed",
    xlmEarned: 5,
    createdAt: new Date("2024-02-12"),
    completedAt: new Date("2024-02-13"),
  },
  {
    id: "ref-002",
    referrerId: currentUserId,
    friendName: "Rose A.",
    friendEmail: "rose@example.com",
    status: "pending",
    xlmEarned: 0,
    createdAt: new Date("2024-02-18"),
  },
  {
    id: "ref-003",
    referrerId: currentUserId,
    friendName: "David S.",
    friendEmail: "david@example.com",
    status: "completed",
    xlmEarned: 5,
    createdAt: new Date("2024-02-20"),
    completedAt: new Date("2024-02-21"),
  },
]

const statsBase = {
  invitesSent: 18,
  friendsJoined: 7,
  totalXlmEarned: 35,
}

export default function ReferralsPage() {
  const [walletConnected, setWalletConnected] = useState(false)

  const stats: ReferralStats = useMemo(() => {
    const conversionRate =
      statsBase.invitesSent === 0
        ? 0
        : Math.round((statsBase.friendsJoined / statsBase.invitesSent) * 100)
    return { ...statsBase, conversionRate }
  }, [])

  const copyToClipboard = async (text: string) => {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return
    }
    const textarea = document.createElement("textarea")
    textarea.value = text
    textarea.style.position = "fixed"
    textarea.style.left = "-9999px"
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand("copy")
    document.body.removeChild(textarea)
  }

  const handleCopyLink = async () => {
    await copyToClipboard(shareLink)
    toast({ description: "Link copied to clipboard!" })
  }

  const whatsappMessage = encodeURIComponent(
    `Join me on Stellar Uzima and earn XLM! Use my code ${shareCode}: ${shareLink}`,
  )
  const twitterMessage = encodeURIComponent(
    `I’m inviting you to Stellar Uzima. Earn XLM when you join! ${shareLink}`,
  )
  const emailSubject = encodeURIComponent("Join me on Stellar Uzima")
  const emailBody = encodeURIComponent(
    `Use my referral code ${shareCode} to earn bonus XLM when you join: ${shareLink}`,
  )

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {!walletConnected ? (
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Card className="border-dashed">
              <CardContent className="space-y-4 py-12">
                <h1 className="text-3xl font-bold text-[oklch(0.25_0.03_250)]">
                  Connect your wallet to access referrals
                </h1>
                <p className="text-muted-foreground">
                  You&apos;ll need a connected wallet to generate your referral
                  code and start earning XLM.
                </p>
                <Button
                  className="bg-[oklch(0.65_0.15_175)] hover:bg-[oklch(0.55_0.15_175)] text-white"
                  onClick={() => setWalletConnected(true)}
                >
                  Connect Wallet
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      ) : (
        <>
          <section className="px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-6">
                <Badge className="bg-[oklch(0.65_0.15_175)] text-white">
                  Referral Program
                </Badge>
                <h1 className="text-4xl font-bold text-[oklch(0.25_0.03_250)] sm:text-5xl">
                  Invite Friends, Earn Together
                </h1>
                <p className="text-lg text-muted-foreground">
                  Get 5 XLM for each friend who joins + they get 3 XLM bonus!
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild className="gap-2">
                    <Link href="#share-options">
                      <Share2 className="h-4 w-4" />
                      Share now
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="gap-2">
                    <Link href="#leaderboard">
                      <Users className="h-4 w-4" />
                      View leaderboard
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-[oklch(0.95_0.02_175)] via-white to-[oklch(0.9_0.03_250)] p-8 shadow-lg">
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[oklch(0.65_0.15_175)]/20" />
                <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-[oklch(0.75_0.1_250)]/30" />
                <div className="relative space-y-6">
                  <div className="flex items-center gap-3 text-[oklch(0.25_0.03_250)]">
                    <Gift className="h-10 w-10 text-[oklch(0.65_0.15_175)]" />
                    <div>
                      <p className="text-sm uppercase tracking-widest text-muted-foreground">
                        Bonus rewards
                      </p>
                      <p className="text-2xl font-semibold">Earn up to 50 XLM</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 rounded-2xl border bg-white/70 p-4">
                      <Users className="h-5 w-5 text-[oklch(0.65_0.15_175)]" />
                      <p className="text-sm text-muted-foreground">
                        Build your community with every invite.
                      </p>
                    </div>
                    <div className="flex items-center gap-3 rounded-2xl border bg-white/70 p-4">
                      <CheckCircle2 className="h-5 w-5 text-[oklch(0.65_0.15_175)]" />
                      <p className="text-sm text-muted-foreground">
                        Track conversions and payouts in real time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="px-4 pb-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl space-y-6">
              <ReferralCard referralCode={referralCode} shareLink={shareLink} />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <Card>
                  <CardContent className="space-y-2 py-6">
                    <p className="text-xs uppercase text-muted-foreground">
                      Invites Sent
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-3xl font-semibold text-foreground">
                        {stats.invitesSent}
                      </p>
                      <Users className="h-5 w-5 text-[oklch(0.65_0.15_175)]" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="space-y-2 py-6">
                    <p className="text-xs uppercase text-muted-foreground">
                      Friends Joined
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-3xl font-semibold text-foreground">
                          {stats.friendsJoined}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {stats.conversionRate}% conversion
                        </p>
                      </div>
                      <CheckCircle2 className="h-5 w-5 text-[oklch(0.65_0.15_175)]" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="space-y-2 py-6">
                    <p className="text-xs uppercase text-muted-foreground">
                      XLM Earned
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-3xl font-semibold text-foreground">
                        {stats.totalXlmEarned} XLM
                      </p>
                      <Gift className="h-5 w-5 text-[oklch(0.65_0.15_175)]" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <section id="share-options" className="px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <CardContent className="space-y-6 py-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-foreground">
                      Share your link
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Invite friends through your favorite channels.
                    </p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Button
                      variant="outline"
                      asChild
                      className="gap-2"
                    >
                      <a
                        href={`https://wa.me/?text=${whatsappMessage}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <MessageCircle className="h-4 w-4" />
                        WhatsApp
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      asChild
                      className="gap-2"
                    >
                      <a
                        href={`https://twitter.com/intent/tweet?text=${twitterMessage}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Twitter className="h-4 w-4" />
                        Twitter
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      asChild
                      className="gap-2"
                    >
                      <a href={`mailto:?subject=${emailSubject}&body=${emailBody}`}>
                        <Mail className="h-4 w-4" />
                        Email
                      </a>
                    </Button>
                    <Button variant="outline" className="gap-2" onClick={handleCopyLink}>
                      <Share2 className="h-4 w-4" />
                      Copy link
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="space-y-6 py-6">
                  <h3 className="text-lg font-semibold text-foreground">
                    How it works
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Share your code",
                        description: "Send your referral code or link to friends.",
                        icon: Share2,
                      },
                      {
                        title: "Friend signs up",
                        description: "They join and complete their first action.",
                        icon: Users,
                      },
                      {
                        title: "Both earn XLM",
                        description: "Rewards land in your wallets within 24h.",
                        icon: Gift,
                      },
                    ].map((step, index) => {
                      const Icon = step.icon
                      return (
                        <div
                          key={step.title}
                          className="flex items-start gap-3"
                        >
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[oklch(0.65_0.15_175)]/10">
                            <Icon className="h-4 w-4 text-[oklch(0.65_0.15_175)]" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">
                              {index + 1}. {step.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section id="leaderboard" className="px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-foreground">
                  Referral leaderboard
                </h2>
                <Badge className="bg-[oklch(0.65_0.15_175)]/10 text-[oklch(0.35_0.08_175)]">
                  Top 10 referrers
                </Badge>
              </div>
              <Card>
                <CardContent className="py-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Rank</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Referrals</TableHead>
                        <TableHead>XLM Earned</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leaderboard.map((row, index) => {
                        const isCurrentUser = row.id === currentUserId
                        return (
                          <TableRow
                            key={row.id}
                            className={
                              isCurrentUser
                                ? "bg-[oklch(0.9_0.1_175)]/40"
                                : undefined
                            }
                          >
                            <TableCell>#{index + 1}</TableCell>
                            <TableCell className="font-medium">
                              {row.name}
                            </TableCell>
                            <TableCell>{row.referrals}</TableCell>
                            <TableCell>{row.xlmEarned} XLM</TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <Card>
                <CardContent className="py-6">
                  <h2 className="text-2xl font-semibold text-foreground">
                    Referral history
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Track your invited friends and reward status.
                  </p>
                  <div className="mt-6">
                    {referralHistory.length === 0 ? (
                      <div className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
                        No referrals yet. Start inviting!
                      </div>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Friend Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>XLM Earned</TableHead>
                            <TableHead>Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {referralHistory.map((referral) => (
                            <TableRow key={referral.id}>
                              <TableCell className="font-medium">
                                {referral.friendName}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  className={
                                    referral.status === "completed"
                                      ? "bg-emerald-100 text-emerald-900 border-emerald-200"
                                      : "bg-amber-100 text-amber-900 border-amber-200"
                                  }
                                  variant="outline"
                                >
                                  {referral.status === "completed"
                                    ? "Completed"
                                    : "Pending"}
                                </Badge>
                              </TableCell>
                              <TableCell>{referral.xlmEarned} XLM</TableCell>
                              <TableCell>
                                {referral.createdAt.toLocaleDateString()}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="px-4 pb-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <Card>
                <CardContent className="py-6">
                  <h2 className="text-2xl font-semibold text-foreground">
                    Terms & conditions
                  </h2>
                  <Accordion type="single" collapsible className="mt-4">
                    <AccordionItem value="terms">
                      <AccordionTrigger>
                        Referral rewards rules
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>Friend must complete their first action to qualify.</li>
                          <li>Rewards are credited within 24 hours of completion.</li>
                          <li>Self-referrals and duplicate accounts are disqualified.</li>
                          <li>Uzima reserves the right to review suspicious activity.</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </section>
        </>
      )}

      <Footer />
      <Toaster />
    </main>
  )
}
