"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Video,
  Phone,
  MessageSquare,
  Calendar,
  Clock,
  User,
  Star,
  MapPin,
  Languages,
  Stethoscope,
  Heart,
  Brain,
  Eye,
  Bone,
  Baby,
  Shield,
  Wifi,
  WifiOff,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"

interface Doctor {
  id: string
  name: string
  specialty: string
  rating: number
  experience: number
  languages: string[]
  location: string
  availability: "available" | "busy" | "offline"
  consultationFee: number
  avatar: string
  verified: boolean
  nextAvailable: string
  specializations: string[]
  education: string
  about: string
}

interface Appointment {
  id: string
  doctorId: string
  doctorName: string
  specialty: string
  date: string
  time: string
  status: "upcoming" | "completed" | "cancelled"
  type: "video" | "audio" | "chat"
  symptoms: string
  avatar: string
}

const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Amina Hassan",
    specialty: "General Medicine",
    rating: 4.9,
    experience: 12,
    languages: ["English", "Swahili", "Arabic"],
    location: "Nairobi, Kenya",
    availability: "available",
    consultationFee: 25,
    avatar: "/placeholder.svg?height=60&width=60",
    verified: true,
    nextAvailable: "Available now",
    specializations: ["Preventive Care", "Chronic Diseases", "Women's Health"],
    education: "MD, University of Nairobi",
    about: "Passionate about accessible healthcare for rural communities across East Africa.",
  },
  {
    id: "2",
    name: "Dr. Kwame Asante",
    specialty: "Pediatrics",
    rating: 4.8,
    experience: 8,
    languages: ["English", "Twi", "French"],
    location: "Accra, Ghana",
    availability: "busy",
    consultationFee: 30,
    avatar: "/placeholder.svg?height=60&width=60",
    verified: true,
    nextAvailable: "Available in 2 hours",
    specializations: ["Child Development", "Vaccinations", "Nutrition"],
    education: "MD, University of Ghana Medical School",
    about: "Dedicated to improving child health outcomes through telemedicine and community outreach.",
  },
  {
    id: "3",
    name: "Dr. Fatima Kone",
    specialty: "Mental Health",
    rating: 4.7,
    experience: 15,
    languages: ["French", "Bambara", "English"],
    location: "Bamako, Mali",
    availability: "available",
    consultationFee: 35,
    avatar: "/placeholder.svg?height=60&width=60",
    verified: true,
    nextAvailable: "Available now",
    specializations: ["Anxiety", "Depression", "PTSD", "Cultural Therapy"],
    education: "MD, Université de Bamako",
    about: "Integrating traditional healing practices with modern mental health treatment.",
  },
  {
    id: "4",
    name: "Dr. Nomsa Mbeki",
    specialty: "Cardiology",
    rating: 4.9,
    experience: 20,
    languages: ["English", "Zulu", "Xhosa"],
    location: "Cape Town, South Africa",
    availability: "offline",
    consultationFee: 45,
    avatar: "/placeholder.svg?height=60&width=60",
    verified: true,
    nextAvailable: "Available tomorrow 9 AM",
    specializations: ["Heart Disease", "Hypertension", "Preventive Cardiology"],
    education: "MD, University of Cape Town",
    about: "Leading expert in cardiovascular health with focus on African genetic factors.",
  },
]

const upcomingAppointments: Appointment[] = [
  {
    id: "1",
    doctorId: "1",
    doctorName: "Dr. Amina Hassan",
    specialty: "General Medicine",
    date: "2024-01-16",
    time: "14:00",
    status: "upcoming",
    type: "video",
    symptoms: "Persistent headaches and fatigue",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    doctorId: "3",
    doctorName: "Dr. Fatima Kone",
    specialty: "Mental Health",
    date: "2024-01-17",
    time: "10:30",
    status: "upcoming",
    type: "video",
    symptoms: "Anxiety and sleep issues",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]
const _specialtyIcons = {
  "General Medicine": Stethoscope,
  Pediatrics: Baby,
  "Mental Health": Brain,
  Cardiology: Heart,
  Ophthalmology: Eye,
  Orthopedics: Bone,
}

export const dynamic = 'force-dynamic'

export default function TelemedicinePage() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("all")
  const [isOnline, setIsOnline] = useState(true)
  const [activeTab, setActiveTab] = useState("find-doctor")

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSpecialty = selectedSpecialty === "all" || doctor.specialty === selectedSpecialty

    return matchesSearch && matchesSpecialty
  })

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available":
        return "bg-green-100 text-green-800"
      case "busy":
        return "bg-yellow-100 text-yellow-800"
      case "offline":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getAvailabilityIcon = (availability: string) => {
    switch (availability) {
      case "available":
        return <CheckCircle className="w-3 h-3" />
      case "busy":
        return <Clock className="w-3 h-3" />
      case "offline":
        return <AlertCircle className="w-3 h-3" />
      default:
        return <Clock className="w-3 h-3" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      <Navigation />

      {/* Header */}
      <section className="py-12 px-4">
        <div className="container mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-6xl mb-4">
              <Video className="w-16 h-16 mx-auto text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Telemedicine for Africa
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Connect with qualified healthcare professionals across Africa. Quality medical consultations that work
              even with limited connectivity.
            </p>

            {/* Connection Status */}
            <div className="flex justify-center mb-8">
              <div
                className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                  isOnline ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                }`}
              >
                {isOnline ? <Wifi className="w-5 h-5" /> : <WifiOff className="w-5 h-5" />}
                <span className="font-medium">
                  {isOnline ? "Online - All Features Available" : "Limited Connectivity - Audio/Chat Available"}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8">
            <TabsTrigger value="find-doctor">Find Doctor</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="emergency">Emergency</TabsTrigger>
          </TabsList>

          {/* Find Doctor Tab */}
          <TabsContent value="find-doctor">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Doctors List */}
              <div className="lg:col-span-2">
                {/* Search and Filters */}
                <div className="mb-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Input
                        placeholder="Search doctors, specialties, or locations..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border-blue-200 focus:border-blue-400"
                      />
                    </div>
                    <select
                      value={selectedSpecialty}
                      onChange={(e) => setSelectedSpecialty(e.target.value)}
                      className="px-4 py-2 border border-blue-200 rounded-md focus:border-blue-400 focus:outline-none"
                    >
                      <option value="all">All Specialties</option>
                      <option value="General Medicine">General Medicine</option>
                      <option value="Pediatrics">Pediatrics</option>
                      <option value="Mental Health">Mental Health</option>
                      <option value="Cardiology">Cardiology</option>
                    </select>
                  </div>
                </div>

                {/* Doctors Grid */}
                <div className="space-y-4">
                  <AnimatePresence>
                    {filteredDoctors.map((doctor, index) => (
                      <motion.div
                        key={doctor.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => setSelectedDoctor(doctor)}
                        className="cursor-pointer"
                      >
                        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                          <CardContent className="p-6">
                            <div className="flex items-start space-x-4">
                              <div className="relative">
                                <Avatar className="w-16 h-16">
                                  <AvatarImage src={doctor.avatar || "/placeholder.svg"} />
                                  <AvatarFallback>
                                    {doctor.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                {doctor.verified && (
                                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-4 h-4 text-white" />
                                  </div>
                                )}
                              </div>

                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <h3 className="font-semibold text-gray-800 text-lg">{doctor.name}</h3>
                                    <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                                      <MapPin className="w-4 h-4" />
                                      <span>{doctor.location}</span>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="flex items-center space-x-1 mb-1">
                                      <Star className="w-4 h-4 text-yellow-500" />
                                      <span className="font-medium">{doctor.rating}</span>
                                    </div>
                                    <p className="text-sm text-gray-600">{doctor.experience} years exp.</p>
                                  </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-3">
                                  {doctor.specializations.slice(0, 3).map((spec, idx) => (
                                    <Badge key={idx} variant="outline" className="border-blue-200 text-blue-700">
                                      {spec}
                                    </Badge>
                                  ))}
                                </div>

                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-4">
                                    <Badge className={getAvailabilityColor(doctor.availability)}>
                                      {getAvailabilityIcon(doctor.availability)}
                                      <span className="ml-1">{doctor.availability}</span>
                                    </Badge>
                                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                                      <Languages className="w-4 h-4" />
                                      <span>{doctor.languages.join(", ")}</span>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-semibold text-green-600">${doctor.consultationFee}</p>
                                    <p className="text-xs text-gray-500">per consultation</p>
                                  </div>
                                </div>

                                <div className="mt-3 pt-3 border-t border-gray-100">
                                  <p className="text-sm text-gray-600 mb-2">{doctor.nextAvailable}</p>
                                  <div className="flex space-x-2">
                                    <Button
                                      size="sm"
                                      className="bg-blue-500 hover:bg-blue-600"
                                      disabled={doctor.availability === "offline"}
                                    >
                                      <Video className="w-4 h-4 mr-1" />
                                      Video Call
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="border-blue-200 text-blue-600 bg-transparent"
                                      disabled={doctor.availability === "offline"}
                                    >
                                      <MessageSquare className="w-4 h-4 mr-1" />
                                      Chat
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="border-blue-200 text-blue-600 bg-transparent"
                                    >
                                      <Calendar className="w-4 h-4 mr-1" />
                                      Schedule
                                    </Button>
                                  </div>
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

              {/* Doctor Details Sidebar */}
              <div className="space-y-6">
                {selectedDoctor ? (
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center text-blue-700">
                        <User className="w-5 h-5 mr-2" />
                        Doctor Profile
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center mb-6">
                        <div className="relative inline-block">
                          <Avatar className="w-20 h-20 mx-auto mb-3">
                            <AvatarImage src={selectedDoctor.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="text-lg">
                              {selectedDoctor.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {selectedDoctor.verified && (
                            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                              <CheckCircle className="w-5 h-5 text-white" />
                            </div>
                          )}
                        </div>
                        <h3 className="font-semibold text-lg">{selectedDoctor.name}</h3>
                        <p className="text-blue-600 font-medium">{selectedDoctor.specialty}</p>
                        <p className="text-sm text-gray-600">{selectedDoctor.education}</p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-800 mb-2">About</h4>
                          <p className="text-sm text-gray-600">{selectedDoctor.about}</p>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-800 mb-2">Specializations</h4>
                          <div className="flex flex-wrap gap-1">
                            {selectedDoctor.specializations.map((spec, idx) => (
                              <Badge key={idx} variant="outline" className="border-blue-200 text-blue-700">
                                {spec}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-800 mb-2">Languages</h4>
                          <p className="text-sm text-gray-600">{selectedDoctor.languages.join(", ")}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                          <div className="text-center">
                            <div className="flex items-center justify-center mb-1">
                              <Star className="w-4 h-4 text-yellow-500 mr-1" />
                              <span className="font-semibold">{selectedDoctor.rating}</span>
                            </div>
                            <p className="text-xs text-gray-500">Rating</p>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold">{selectedDoctor.experience}</div>
                            <p className="text-xs text-gray-500">Years Experience</p>
                          </div>
                        </div>

                        <div className="pt-4">
                          <Button
                            className="w-full bg-blue-500 hover:bg-blue-600 mb-2"
                            disabled={selectedDoctor.availability === "offline"}
                          >
                            <Video className="w-4 h-4 mr-2" />
                            Start Video Consultation - ${selectedDoctor.consultationFee}
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full border-blue-200 text-blue-600 bg-transparent"
                            disabled={selectedDoctor.availability === "offline"}
                          >
                            <Calendar className="w-4 h-4 mr-2" />
                            Schedule Appointment
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-8 text-center">
                      <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Select a doctor to view their profile</p>
                    </CardContent>
                  </Card>
                )}

                {/* Quick Stats */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Platform Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Available Doctors:</span>
                        <span className="font-medium text-green-600">
                          {doctors.filter((d) => d.availability === "available").length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Consultations Today:</span>
                        <span className="font-medium text-blue-600">247</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Average Response:</span>
                        <span className="font-medium text-gray-800">&lt; 2 minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Success Rate:</span>
                        <span className="font-medium text-green-600">98.5%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Appointments</h2>
                <p className="text-gray-600">Manage your upcoming and past consultations</p>
              </div>

              <div className="grid gap-6">
                {upcomingAppointments.map((appointment, index) => (
                  <motion.div
                    key={appointment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={appointment.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {appointment.doctorName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold text-gray-800">{appointment.doctorName}</h3>
                              <p className="text-blue-600">{appointment.specialty}</p>
                              <p className="text-sm text-gray-600">
                                {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            <Badge
                              className={
                                appointment.type === "video"
                                  ? "bg-blue-100 text-blue-800"
                                  : appointment.type === "audio"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-purple-100 text-purple-800"
                              }
                            >
                              {appointment.type === "video" && <Video className="w-3 h-3 mr-1" />}
                              {appointment.type === "audio" && <Phone className="w-3 h-3 mr-1" />}
                              {appointment.type === "chat" && <MessageSquare className="w-3 h-3 mr-1" />}
                              {appointment.type}
                            </Badge>

                            <div className="flex space-x-2">
                              <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                                Join Call
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-blue-200 text-blue-600 bg-transparent"
                              >
                                Reschedule
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <p className="text-sm text-gray-600">
                            <strong>Symptoms:</strong> {appointment.symptoms}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}

                {upcomingAppointments.length === 0 && (
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-12 text-center">
                      <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">No Upcoming Appointments</h3>
                      <p className="text-gray-600 mb-6">
                        Schedule your first consultation with a healthcare professional
                      </p>
                      <Button onClick={() => setActiveTab("find-doctor")} className="bg-blue-500 hover:bg-blue-600">
                        Find a Doctor
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Emergency Tab */}
          <TabsContent value="emergency">
            <div className="max-w-2xl mx-auto">
              <Card className="bg-red-50 border-red-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-red-700 flex items-center">
                    <Shield className="w-6 h-6 mr-2" />
                    Emergency Services
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🚨</div>
                      <h2 className="text-2xl font-bold text-red-700 mb-2">Medical Emergency</h2>
                      <p className="text-red-600 mb-6">
                        If this is a life-threatening emergency, please contact your local emergency services
                        immediately.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button className="bg-red-500 hover:bg-red-600 h-16 text-lg">
                        <Phone className="w-6 h-6 mr-2" />
                        Call Emergency Services
                      </Button>
                      <Button variant="outline" className="border-red-200 text-red-600 h-16 text-lg bg-transparent">
                        <Video className="w-6 h-6 mr-2" />
                        Emergency Video Call
                      </Button>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-800 mb-3">Emergency Numbers by Region:</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>🇰🇪 Kenya:</span>
                          <span className="font-mono">999 / 112</span>
                        </div>
                        <div className="flex justify-between">
                          <span>🇳🇬 Nigeria:</span>
                          <span className="font-mono">199 / 112</span>
                        </div>
                        <div className="flex justify-between">
                          <span>🇿🇦 South Africa:</span>
                          <span className="font-mono">10177 / 112</span>
                        </div>
                        <div className="flex justify-between">
                          <span>🇬🇭 Ghana:</span>
                          <span className="font-mono">193 / 112</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <h3 className="font-semibold text-yellow-800 mb-2">When to Use Emergency Services:</h3>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• Severe chest pain or difficulty breathing</li>
                        <li>• Loss of consciousness or severe head injury</li>
                        <li>• Severe bleeding that won&apos;t stop</li>
                        <li>• Signs of stroke (face drooping, arm weakness, speech difficulty)</li>
                        <li>• Severe allergic reactions</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}
