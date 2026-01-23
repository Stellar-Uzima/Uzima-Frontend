"use client"

import { useRef } from "react"
import { Download, Link as LinkIcon, Copy } from "lucide-react"
import QRCode from "react-qr-code"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"

interface ReferralCardProps {
  referralCode: string
  shareLink: string
}

async function copyToClipboard(text: string) {
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

export function ReferralCard({ referralCode, shareLink }: ReferralCardProps) {
  const qrWrapperRef = useRef<HTMLDivElement>(null)

  const handleCopyCode = async () => {
    await copyToClipboard(referralCode)
    toast({ description: "Code copied to clipboard!" })
  }

  const handleCopyLink = async () => {
    await copyToClipboard(shareLink)
    toast({ description: "Link copied to clipboard!" })
  }

  const handleDownloadQr = () => {
    const svg = qrWrapperRef.current?.querySelector("svg")
    if (!svg) {
      return
    }
    const serialized = new XMLSerializer().serializeToString(svg)
    const blob = new Blob([serialized], { type: "image/svg+xml;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "uzima-referral-qr.svg"
    link.click()
    URL.revokeObjectURL(url)
    toast({ description: "QR code downloaded!" })
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Share your referral code</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-xl border bg-muted/40 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Your code</p>
              <p className="text-2xl font-bold tracking-widest text-foreground">
                {referralCode}
              </p>
            </div>
            <Button variant="outline" className="gap-2" onClick={handleCopyCode}>
              <Copy className="h-4 w-4" />
              Copy code
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_200px]">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">Share link</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex-1 rounded-lg border bg-background px-3 py-2 text-sm text-muted-foreground">
                {shareLink}
              </div>
              <Button variant="outline" className="gap-2" onClick={handleCopyLink}>
                <LinkIcon className="h-4 w-4" />
                Copy link
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">QR code</p>
            <div
              ref={qrWrapperRef}
              className="flex items-center justify-center rounded-xl border bg-background p-4"
            >
              <QRCode value={shareLink} size={140} />
            </div>
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={handleDownloadQr}
            >
              <Download className="h-4 w-4" />
              Download QR
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
