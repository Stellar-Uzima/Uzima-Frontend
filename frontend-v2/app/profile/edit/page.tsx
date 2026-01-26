"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { ArrowLeft, Save, X, Upload, Camera } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { useProfile } from "@/lib/contexts/ProfileContext"

const editProfileSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name must be less than 50 characters"),
  username: z.string().min(3, "Username must be at least 3 characters").max(20, "Username must be less than 20 characters").regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  avatar: z.string().optional().or(z.literal("")),
})

type EditProfileFormValues = z.infer<typeof editProfileSchema>

export default function EditProfilePage() {
  const router = useRouter()
  const { userProfile, updateProfile, isLoading: contextLoading } = useProfile()
  const [isLoading, setIsLoading] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState<string>("")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // In a real app, this would come from authentication context or API
  const currentUser = userProfile

  const form = useForm<EditProfileFormValues>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: currentUser.name,
      username: currentUser.username,
      avatar: currentUser.avatar,
    },
  })

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a JPEG, PNG, or WebP image.",
        variant: "destructive",
      })
      return
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024 // 5MB in bytes
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB.",
        variant: "destructive",
      })
      return
    }

    setUploadedFile(file)

    // Create preview URL
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setAvatarPreview(result)
      form.setValue("avatar", result)
    }
    reader.readAsDataURL(file)
  }

  const handleAvatarUrlChange = (url: string) => {
    setAvatarPreview(url)
    setUploadedFile(null)
    form.setValue("avatar", url)
  }

  const onSubmit = async (data: EditProfileFormValues) => {
    setIsLoading(true)
    
    try {
      let finalAvatarUrl = data.avatar

      // If a file was uploaded, use the preview URL (in a real app, upload to storage first)
      if (uploadedFile && avatarPreview) {
        finalAvatarUrl = avatarPreview
        console.log("File to upload:", uploadedFile)
        // In a real app, you would:
        // 1. Upload the file to a storage service (AWS S3, Cloudinary, etc.)
        // 2. Get the uploaded file URL
        // 3. Use that URL as the avatar
      }
      
      // Update the profile using context
      await updateProfile({
        name: data.name,
        username: data.username,
        avatar: finalAvatarUrl
      })
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      })
      
      router.push("/profile")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    router.push("/profile")
  }

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const truncateWalletAddress = (address: string) => {
    if (address.length <= 12) return address
    return `${address.slice(0, 6)}...${address.slice(-6)}`
  }

  const currentAvatarUrl = avatarPreview || form.watch("avatar") || currentUser.avatar

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/profile">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Edit Profile</h1>
          <p className="text-muted-foreground">Update your profile information</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Make changes to your profile here. Click save when you're done.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Avatar Section */}
              <div className="space-y-4">
                <FormLabel>Profile Picture</FormLabel>
                
                {/* Avatar Preview */}
                <div className="flex items-center gap-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage 
                      src={currentAvatarUrl} 
                      alt="Profile avatar"
                      className="object-cover"
                    />
                    <AvatarFallback className="text-xl font-bold bg-primary/10 text-primary">
                      {getUserInitials(form.watch("name") || currentUser.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Current Profile Picture</p>
                    <p className="text-xs text-muted-foreground">
                      Upload a new image or enter a URL below
                    </p>
                  </div>
                </div>

                {/* Avatar Upload/URL Tabs */}
                <Tabs defaultValue="upload" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="upload" className="gap-2">
                      <Upload className="h-4 w-4" />
                      Upload Image
                    </TabsTrigger>
                    <TabsTrigger value="url" className="gap-2">
                      <Camera className="h-4 w-4" />
                      Image URL
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="upload" className="space-y-4">
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <div className="space-y-2">
                        <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                        <div>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                            className="gap-2"
                          >
                            <Upload className="h-4 w-4" />
                            Choose Image
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          JPEG, PNG, or WebP up to 5MB
                        </p>
                      </div>
                    </div>
                    {uploadedFile && (
                      <div className="text-sm text-muted-foreground">
                        Selected: {uploadedFile.name} ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="url" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="avatar"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input 
                              placeholder="https://example.com/avatar.jpg" 
                              {...field}
                              onChange={(e) => {
                                field.onChange(e)
                                handleAvatarUrlChange(e.target.value)
                              }}
                            />
                          </FormControl>
                          <FormDescription>
                            Enter a direct URL to an image file
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                </Tabs>
              </div>

              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your display name that will be shown to other users.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Username Field */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your username" {...field} />
                    </FormControl>
                    <FormDescription>
                      Your unique username. Only letters, numbers, and underscores allowed.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Wallet Address (Read-only) */}
              <div className="space-y-2">
                <FormLabel>Wallet Address</FormLabel>
                <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                  <code className="text-sm font-mono flex-1">
                    {truncateWalletAddress(currentUser.walletAddress)}
                  </code>
                  <span className="text-xs text-muted-foreground">Read-only</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Your wallet address cannot be changed.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button type="submit" disabled={isLoading || contextLoading} className="gap-2">
                  <Save className="h-4 w-4" />
                  {isLoading || contextLoading ? "Saving..." : "Save Changes"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleCancel}
                  disabled={isLoading || contextLoading}
                  className="gap-2"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}