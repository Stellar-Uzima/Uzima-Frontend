"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Upload,
  Tag,
  DollarSign,
  Users,
  Eye,
  Globe,
  Mic,
  Video,
  FileText,
  ImageIcon,
  Save,
  Send,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Navigation } from "@/components/layout/navigation"

export const dynamic = 'force-dynamic'

const categories = [
  "General Medicine",
  "Traditional Medicine",
  "Community Health",
  "Mental Health",
  "Maternal Health",
  "Child Health",
  "Nutrition",
  "Preventive Care",
  "Emergency Medicine",
  "Health Education",
]

const regions = ["East Africa", "West Africa", "Central Africa", "Southern Africa", "North Africa", "Pan-African"]

const languages = [
  "English",
  "French",
  "Arabic",
  "Swahili",
  "Hausa",
  "Yoruba",
  "Igbo",
  "Amharic",
  "Zulu",
  "Xhosa",
  "Bambara",
  "Twi",
]

const rewardTiers = [
  { engagement: "1-10 likes", xlm: "0.1-1", description: "Getting started" },
  { engagement: "11-50 likes", xlm: "1-5", description: "Building momentum" },
  { engagement: "51-100 likes", xlm: "5-10", description: "Viral content" },
  { engagement: "100+ likes", xlm: "10+", description: "Expert level" },
]

export default function CreatePage() {
  const [contentType, setContentType] = useState("article")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [region, setRegion] = useState("")
  const [language, setLanguage] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [culturalContext, setCulturalContext] = useState("")

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = (asDraft: boolean) => {
    // Handle form submission
    console.log({
      isDraft: asDraft,
      contentType,
      title,
      content,
      category,
      region,
      language,
      tags,
      culturalContext,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <Navigation />

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-emerald-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <ArrowLeft className="w-5 h-5 text-emerald-600" />
              <span className="text-emerald-600 font-medium">Back to Home</span>
            </Link>

            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="text-2xl"
              >
                🏥
              </motion.div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Share Your Healthcare Knowledge
              </h1>
            </div>

            <div className="w-32"></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-emerald-700">Create New Content</CardTitle>
                <p className="text-gray-600">Share your healthcare knowledge with the African community</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Content Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Content Type *</label>
                  <Tabs value={contentType} onValueChange={setContentType}>
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="article" className="flex items-center space-x-2">
                        <FileText className="w-4 h-4" />
                        <span>Article</span>
                      </TabsTrigger>
                      <TabsTrigger value="video" className="flex items-center space-x-2">
                        <Video className="w-4 h-4" />
                        <span>Video</span>
                      </TabsTrigger>
                      <TabsTrigger value="audio" className="flex items-center space-x-2">
                        <Mic className="w-4 h-4" />
                        <span>Audio</span>
                      </TabsTrigger>
                      <TabsTrigger value="image" className="flex items-center space-x-2">
                        <ImageIcon className="w-4 h-4" />
                        <span>Image</span>
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Share your healthcare insight..."
                    className="border-emerald-200 focus:border-emerald-400"
                  />
                </div>

                {/* Category and Region */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="border-emerald-200 focus:border-emerald-400">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Region *</label>
                    <Select value={region} onValueChange={setRegion}>
                      <SelectTrigger className="border-emerald-200 focus:border-emerald-400">
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.map((reg) => (
                          <SelectItem key={reg} value={reg}>
                            {reg}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Language */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Primary Language *</label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="border-emerald-200 focus:border-emerald-400">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang} value={lang}>
                          {lang}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
                  {contentType === "article" && (
                    <Textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Share your knowledge, experience, or insights that could help others in the healthcare community..."
                      rows={12}
                      className="border-emerald-200 focus:border-emerald-400"
                    />
                  )}
                  {contentType === "video" && (
                    <div className="border-2 border-dashed border-emerald-200 rounded-lg p-8 text-center">
                      <Video className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">Upload your video content</p>
                      <p className="text-sm text-gray-500">MP4, MOV, AVI up to 500MB</p>
                      <Button className="mt-4 bg-emerald-500 hover:bg-emerald-600">
                        <Upload className="w-4 h-4 mr-2" />
                        Choose Video File
                      </Button>
                    </div>
                  )}
                  {contentType === "audio" && (
                    <div className="border-2 border-dashed border-emerald-200 rounded-lg p-8 text-center">
                      <Mic className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">Upload your audio content</p>
                      <p className="text-sm text-gray-500">MP3, WAV, M4A up to 100MB</p>
                      <Button className="mt-4 bg-emerald-500 hover:bg-emerald-600">
                        <Upload className="w-4 h-4 mr-2" />
                        Choose Audio File
                      </Button>
                    </div>
                  )}
                  {contentType === "image" && (
                    <div className="border-2 border-dashed border-emerald-200 rounded-lg p-8 text-center">
                      <ImageIcon className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">Upload medical images, charts, or infographics</p>
                      <p className="text-sm text-gray-500">PNG, JPG, SVG up to 10MB</p>
                      <Button className="mt-4 bg-emerald-500 hover:bg-emerald-600">
                        <Upload className="w-4 h-4 mr-2" />
                        Choose Image File
                      </Button>
                    </div>
                  )}
                </div>

                {/* Cultural Context */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cultural Context</label>
                  <Textarea
                    value={culturalContext}
                    onChange={(e) => setCulturalContext(e.target.value)}
                    placeholder="Describe any cultural considerations, traditional practices, or local context relevant to your content..."
                    rows={3}
                    className="border-emerald-200 focus:border-emerald-400"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Help others understand the cultural significance and appropriate application of your knowledge
                  </p>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                  <div className="flex space-x-2 mb-3">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add a tag..."
                      className="border-emerald-200 focus:border-emerald-400"
                      onKeyPress={(e) => e.key === "Enter" && addTag()}
                    />
                    <Button onClick={addTag} variant="outline" className="border-emerald-200 bg-transparent">
                      <Tag className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-emerald-100 text-emerald-700 cursor-pointer"
                        onClick={() => removeTag(tag)}
                      >
                        {tag} ×
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex space-x-4 pt-6">
                  <Button
                    onClick={() => handleSubmit(false)}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Publish Content
                  </Button>
                  <Button
                    onClick={() => handleSubmit(true)}
                    variant="outline"
                    className="border-emerald-200 text-emerald-600 bg-transparent"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Draft
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Earnings Preview */}
            <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-orange-700 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Earning Potential
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-orange-600">~2.5 XLM</div>
                  <p className="text-sm text-orange-600">Estimated earnings</p>
                </div>

                <div className="space-y-3">
                  {rewardTiers.map((tier, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">{tier.engagement}</span>
                      <span className="font-medium text-orange-600">{tier.xlm} XLM</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-orange-100 rounded-lg">
                  <p className="text-xs text-orange-700">
                    💡 Quality content with cultural sensitivity and medical accuracy gets higher engagement and
                    rewards!
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Content Guidelines */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-emerald-700 flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  Content Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <span className="text-emerald-500">✓</span>
                  <span>Use clear, accessible language appropriate for your audience</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-emerald-500">✓</span>
                  <span>Include evidence-based information when possible</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-emerald-500">✓</span>
                  <span>Respect cultural practices and traditional knowledge</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-emerald-500">✓</span>
                  <span>Share personal experiences respectfully and ethically</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-emerald-500">✓</span>
                  <span>Add relevant tags for better discoverability</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-emerald-500">✓</span>
                  <span>Consider offline accessibility for rural communities</span>
                </div>
              </CardContent>
            </Card>

            {/* Community Impact */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-emerald-700 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Community Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Active readers today</span>
                  <span className="font-medium">12,847</span>
                </div>
                <div className="flex justify-between">
                  <span>Content shared this week</span>
                  <span className="font-medium">1,234</span>
                </div>
                <div className="flex justify-between">
                  <span>XLM distributed</span>
                  <span className="font-medium">284,592</span>
                </div>
                <div className="flex justify-between">
                  <span>Lives impacted</span>
                  <span className="font-medium">50K+</span>
                </div>
                <div className="flex justify-between">
                  <span>Healthcare professionals</span>
                  <span className="font-medium">3,456</span>
                </div>
              </CardContent>
            </Card>

            {/* Cultural Sensitivity */}
            <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-purple-700 flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  Cultural Sensitivity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <span className="text-purple-500">🌍</span>
                  <span>Acknowledge diverse African healthcare traditions</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-purple-500">🤝</span>
                  <span>Promote collaboration between traditional and modern medicine</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-purple-500">🗣️</span>
                  <span>Use inclusive language that respects all communities</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-purple-500">📚</span>
                  <span>Cite traditional knowledge sources appropriately</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
