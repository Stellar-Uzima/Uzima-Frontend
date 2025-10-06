"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Leaf,
  Brain,
  Users,
  Shield,
  Search,
  Plus,
  Star,
  AlertTriangle,
  CheckCircle,
  BookOpen,
  Microscope,
  Eye,
  MessageSquare,
  Globe,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

interface TraditionalTreatment {
  id: string
  name: string
  localName: string
  region: string
  category: "herb" | "practice" | "ritual" | "therapy"
  description: string
  uses: string[]
  preparation: string
  dosage: string
  contraindications: string[]
  modernEquivalent?: string
  scientificEvidence: "high" | "moderate" | "low" | "none"
  safetyRating: number
  culturalSignificance: "sacred" | "traditional" | "common"
  verifiedBy: string[]
  interactions: string[]
  image: string
}

interface CommunityHealer {
  id: string
  name: string
  title: string
  region: string
  specialties: string[]
  experience: number
  verificationStatus: "verified" | "pending" | "community"
  rating: number
  consultations: number
  languages: string[]
  avatar: string
}

const traditionalTreatments: TraditionalTreatment[] = [
  {
    id: "1",
    name: "African Potato",
    localName: "Ilabatheka (Zulu)",
    region: "Southern Africa",
    category: "herb",
    description: "Traditional immune system booster used for centuries across Southern Africa",
    uses: ["Immune support", "Respiratory health", "General wellness"],
    preparation: "Dried root powder mixed with warm water or honey",
    dosage: "1 teaspoon twice daily with meals",
    contraindications: ["Pregnancy", "Autoimmune conditions"],
    modernEquivalent: "Immune modulators, Vitamin C supplements",
    scientificEvidence: "moderate",
    safetyRating: 4,
    culturalSignificance: "traditional",
    verifiedBy: ["Dr. Nomsa Mbeki", "Traditional Healer Sipho"],
    interactions: ["May enhance immune medications"],
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "2",
    name: "Sutherlandia",
    localName: "Kankerbos (Afrikaans)",
    region: "South Africa",
    category: "herb",
    description: "Known as 'Cancer Bush', used traditionally for various ailments",
    uses: ["Cancer support", "Diabetes management", "Stress relief"],
    preparation: "Tea from dried leaves, 1 cup 2-3 times daily",
    dosage: "2-3 grams dried herb per cup of boiling water",
    contraindications: ["Pregnancy", "Breastfeeding", "Severe liver disease"],
    modernEquivalent: "Adaptogenic herbs, Anti-inflammatory medications",
    scientificEvidence: "high",
    safetyRating: 3,
    culturalSignificance: "sacred",
    verifiedBy: ["Prof. Sarah Johnson", "Healer Maria Tshwane"],
    interactions: ["May interact with diabetes medications"],
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "3",
    name: "Moringa",
    localName: "Zogale (Hausa)",
    region: "West Africa",
    category: "herb",
    description: "Nutrient-dense 'miracle tree' used for malnutrition and general health",
    uses: ["Malnutrition", "Anemia", "Lactation support", "Blood pressure"],
    preparation: "Fresh leaves in food, powder in smoothies, or tea",
    dosage: "1-2 tablespoons powder daily or handful of fresh leaves",
    contraindications: ["Root bark during pregnancy"],
    modernEquivalent: "Multivitamins, Iron supplements",
    scientificEvidence: "high",
    safetyRating: 5,
    culturalSignificance: "common",
    verifiedBy: ["Dr. Amina Hassan", "Elder Fatima Kone"],
    interactions: ["May enhance iron absorption"],
    image: "/placeholder.svg?height=200&width=200",
  },
]

const communityHealers: CommunityHealer[] = [
  {
    id: "1",
    name: "Mama Aisha Kone",
    title: "Traditional Birth Attendant & Herbalist",
    region: "Mali",
    specialties: ["Women's Health", "Pediatric Care", "Digestive Disorders"],
    experience: 35,
    verificationStatus: "verified",
    rating: 4.9,
    consultations: 2847,
    languages: ["Bambara", "French", "Arabic"],
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "2",
    name: "Dr. Kwame Asante",
    title: "Integrative Medicine Practitioner",
    region: "Ghana",
    specialties: ["Mental Health", "Chronic Diseases", "Pain Management"],
    experience: 15,
    verificationStatus: "verified",
    rating: 4.8,
    consultations: 1923,
    languages: ["Twi", "English", "Ga"],
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "3",
    name: "Elder Nomsa Mbeki",
    title: "Sangoma & Community Healer",
    region: "South Africa",
    specialties: ["Spiritual Healing", "Respiratory Health", "Skin Conditions"],
    experience: 42,
    verificationStatus: "community",
    rating: 4.7,
    consultations: 3156,
    languages: ["Zulu", "Xhosa", "English"],
    avatar: "/placeholder.svg?height=60&width=60",
  },
]

export const dynamic = 'force-dynamic'

export default function TraditionalMedicinePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTreatment, setSelectedTreatment] = useState<TraditionalTreatment | null>(null)
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])
  const [showIntegrationPanel, setShowIntegrationPanel] = useState(false)

  // AI-powered suggestions based on selected treatment
  useEffect(() => {
    if (selectedTreatment) {
      const suggestions = [
        `Consider monitoring ${selectedTreatment.name} alongside conventional ${selectedTreatment.modernEquivalent}`,
        `Cultural consultation recommended due to ${selectedTreatment.culturalSignificance} significance`,
        `Safety profile: ${selectedTreatment.safetyRating}/5 - Review contraindications`,
        `Scientific evidence level: ${selectedTreatment.scientificEvidence} - Consider additional research`,
      ]
      setAiSuggestions(suggestions)
    }
  }, [selectedTreatment])

  const filteredTreatments = traditionalTreatments.filter(
    (treatment) =>
      treatment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      treatment.localName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      treatment.uses.some((use) => use.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const getEvidenceColor = (evidence: string) => {
    switch (evidence) {
      case "high":
        return "bg-green-100 text-green-800"
      case "moderate":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-orange-100 text-orange-800"
      case "none":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCulturalColor = (significance: string) => {
    switch (significance) {
      case "sacred":
        return "bg-purple-100 text-purple-800"
      case "traditional":
        return "bg-blue-100 text-blue-800"
      case "common":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-green-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="text-3xl"
              >
                🌿
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Traditional Medicine Integration
                </h1>
                <p className="text-sm text-green-600">Bridging Ancient Wisdom with Modern Healthcare</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
                <Brain className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">AI-Powered</span>
              </div>
              <Button
                onClick={() => setShowIntegrationPanel(!showIntegrationPanel)}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Integrate Treatment
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Treatments List */}
          <div className="lg:col-span-2">
            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search traditional treatments, local names, or uses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-green-200 focus:border-green-400"
                />
              </div>
            </div>

            {/* Treatments Grid */}
            <div className="space-y-4">
              <AnimatePresence>
                {filteredTreatments.map((treatment, index) => (
                  <motion.div
                    key={treatment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedTreatment(treatment)}
                    className="cursor-pointer"
                  >
                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
                            <Leaf className="w-8 h-8 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-semibold text-gray-800">{treatment.name}</h3>
                                <p className="text-sm text-green-600 font-medium">{treatment.localName}</p>
                                <p className="text-xs text-gray-500">{treatment.region}</p>
                              </div>
                              <div className="flex flex-col items-end space-y-1">
                                <Badge className={getEvidenceColor(treatment.scientificEvidence)}>
                                  {treatment.scientificEvidence} evidence
                                </Badge>
                                <div className="flex items-center space-x-1">
                                  <Star className="w-3 h-3 text-yellow-500" />
                                  <span className="text-xs text-gray-600">{treatment.safetyRating}/5</span>
                                </div>
                              </div>
                            </div>

                            <p className="text-sm text-gray-600 mb-3">{treatment.description}</p>

                            <div className="flex flex-wrap gap-1 mb-3">
                              {treatment.uses.slice(0, 3).map((use, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs border-green-200 text-green-700">
                                  {use}
                                </Badge>
                              ))}
                              {treatment.uses.length > 3 && (
                                <Badge variant="outline" className="text-xs border-gray-200 text-gray-600">
                                  +{treatment.uses.length - 3} more
                                </Badge>
                              )}
                            </div>

                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <div className="flex items-center space-x-2">
                                <Badge className={getCulturalColor(treatment.culturalSignificance)}>
                                  {treatment.culturalSignificance}
                                </Badge>
                                <span>Verified by {treatment.verifiedBy.length} experts</span>
                              </div>
                              {treatment.contraindications.length > 0 && (
                                <div className="flex items-center text-orange-600">
                                  <AlertTriangle className="w-3 h-3 mr-1" />
                                  <span>Contraindications</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Treatment Details */}
          <div className="space-y-6">
            {selectedTreatment ? (
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-700">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Treatment Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="usage">Usage</TabsTrigger>
                      <TabsTrigger value="safety">Safety</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                      <div className="text-center mb-4">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Leaf className="w-10 h-10 text-green-600" />
                        </div>
                        <h3 className="font-semibold text-lg">{selectedTreatment.name}</h3>
                        <p className="text-green-600 font-medium">{selectedTreatment.localName}</p>
                        <p className="text-sm text-gray-600">{selectedTreatment.region}</p>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium text-gray-800 mb-1">Description</h4>
                          <p className="text-sm text-gray-600">{selectedTreatment.description}</p>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-800 mb-2">Traditional Uses</h4>
                          <div className="flex flex-wrap gap-1">
                            {selectedTreatment.uses.map((use, idx) => (
                              <Badge key={idx} variant="outline" className="border-green-200 text-green-700">
                                {use}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-800 mb-1">Modern Equivalent</h4>
                          <p className="text-sm text-blue-600">{selectedTreatment.modernEquivalent}</p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="usage" className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">Preparation</h4>
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                          {selectedTreatment.preparation}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">Dosage</h4>
                        <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">{selectedTreatment.dosage}</p>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">Cultural Significance</h4>
                        <Badge className={getCulturalColor(selectedTreatment.culturalSignificance)}>
                          {selectedTreatment.culturalSignificance}
                        </Badge>
                      </div>
                    </TabsContent>

                    <TabsContent value="safety" className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">Safety Rating</h4>
                        <div className="flex items-center space-x-2">
                          <Progress value={selectedTreatment.safetyRating * 20} className="flex-1" />
                          <span className="text-sm font-medium">{selectedTreatment.safetyRating}/5</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">Scientific Evidence</h4>
                        <Badge className={getEvidenceColor(selectedTreatment.scientificEvidence)}>
                          {selectedTreatment.scientificEvidence} evidence
                        </Badge>
                      </div>

                      {selectedTreatment.contraindications.length > 0 && (
                        <div>
                          <h4 className="font-medium text-gray-800 mb-2 flex items-center text-orange-600">
                            <AlertTriangle className="w-4 h-4 mr-1" />
                            Contraindications
                          </h4>
                          <div className="space-y-1">
                            {selectedTreatment.contraindications.map((contra, idx) => (
                              <p key={idx} className="text-sm text-orange-600 bg-orange-50 p-2 rounded">
                                • {contra}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedTreatment.interactions.length > 0 && (
                        <div>
                          <h4 className="font-medium text-gray-800 mb-2">Drug Interactions</h4>
                          <div className="space-y-1">
                            {selectedTreatment.interactions.map((interaction, idx) => (
                              <p key={idx} className="text-sm text-blue-600 bg-blue-50 p-2 rounded">
                                • {interaction}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <Leaf className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Select a traditional treatment to view details</p>
                </CardContent>
              </Card>
            )}

            {/* AI Suggestions */}
            {aiSuggestions.length > 0 && (
              <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-purple-700">
                    <Brain className="w-5 h-5 mr-2" />
                    AI Integration Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {aiSuggestions.map((suggestion, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start space-x-2 p-3 bg-white/60 rounded-lg"
                      >
                        <Brain className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700">{suggestion}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Community Healers */}
          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-green-700">
                  <Users className="w-5 h-5 mr-2" />
                  Community Healers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {communityHealers.map((healer) => (
                    <div key={healer.id} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                      <Avatar>
                        <AvatarImage src={healer.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {healer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <div>
                            <h4 className="font-medium text-gray-800">{healer.name}</h4>
                            <p className="text-xs text-green-600">{healer.title}</p>
                            <p className="text-xs text-gray-500">{healer.region}</p>
                          </div>
                          <div className="flex items-center space-x-1">
                            {healer.verificationStatus === "verified" && (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            )}
                            <Badge
                              variant={healer.verificationStatus === "verified" ? "default" : "outline"}
                              className="text-xs"
                            >
                              {healer.verificationStatus}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 mb-2">
                          <div className="flex items-center">
                            <Star className="w-3 h-3 text-yellow-500 mr-1" />
                            <span className="text-xs text-gray-600">{healer.rating}</span>
                          </div>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-600">{healer.experience} years</span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-600">{healer.consultations} consultations</span>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {healer.specialties.slice(0, 2).map((specialty, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs border-green-200 text-green-700">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Consult Community Healer
                </Button>
              </CardContent>
            </Card>

            {/* Cultural Guidelines */}
            <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-orange-700">
                  <Shield className="w-5 h-5 mr-2" />
                  Cultural Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <Eye className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">Always respect cultural protocols when discussing sacred treatments</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Users className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">Involve community elders in treatment decisions when appropriate</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Globe className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">Consider local availability and seasonal factors</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Microscope className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">Document interactions with modern medications carefully</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
