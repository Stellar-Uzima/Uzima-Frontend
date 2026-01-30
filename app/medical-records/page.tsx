"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Heart,
  Wifi,
  WifiOff,
  Search,
  Plus,
  FileText,
  Stethoscope,
  AlertCircle,
  CheckCircle,
  Clock,
  Download,
  Upload,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface MedicalRecord {
  id: string
  patientName: string
  patientId: string
  age: number
  gender: string
  diagnosis: string
  treatment: string
  date: string
  status: "active" | "completed" | "pending"
  vitals: {
    bloodPressure: string
    heartRate: number
    temperature: number
    weight: number
  }
  medications: string[]
  notes: string
  lastSync: string
  isOfflineCreated: boolean
}

const mockRecords: MedicalRecord[] = [
  {
    id: "1",
    patientName: "Amara Okafor",
    patientId: "UZ001",
    age: 34,
    gender: "Female",
    diagnosis: "Hypertension",
    treatment: "Lifestyle changes + Medication",
    date: "2024-01-15",
    status: "active",
    vitals: {
      bloodPressure: "140/90",
      heartRate: 78,
      temperature: 36.5,
      weight: 65,
    },
    medications: ["Lisinopril 10mg", "Hydrochlorothiazide 25mg"],
    notes: "Patient responding well to treatment. Follow-up in 2 weeks.",
    lastSync: "2024-01-15T10:30:00Z",
    isOfflineCreated: false,
  },
  {
    id: "2",
    patientName: "Kwame Asante",
    patientId: "UZ002",
    age: 28,
    gender: "Male",
    diagnosis: "Malaria",
    treatment: "Artemether-Lumefantrine",
    date: "2024-01-14",
    status: "completed",
    vitals: {
      bloodPressure: "120/80",
      heartRate: 85,
      temperature: 37.8,
      weight: 72,
    },
    medications: ["Artemether-Lumefantrine", "Paracetamol"],
    notes: "Treatment completed successfully. Patient recovered fully.",
    lastSync: "2024-01-14T15:45:00Z",
    isOfflineCreated: false,
  },
  {
    id: "3",
    patientName: "Fatima Hassan",
    patientId: "UZ003",
    age: 45,
    gender: "Female",
    diagnosis: "Diabetes Type 2",
    treatment: "Metformin + Diet control",
    date: "2024-01-13",
    status: "active",
    vitals: {
      bloodPressure: "130/85",
      heartRate: 72,
      temperature: 36.2,
      weight: 68,
    },
    medications: ["Metformin 500mg", "Glibenclamide 5mg"],
    notes: "Blood sugar levels improving. Continue current medication.",
    lastSync: "2024-01-13T09:20:00Z",
    isOfflineCreated: true,
  },
]

export const dynamic = 'force-dynamic'

export default function MedicalRecordsPage() {
  const [isOnline, setIsOnline] = useState(true)
  const [records, setRecords] = useState<MedicalRecord[]>(mockRecords)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null)
  const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "success" | "error">("idle")
  const [pendingSync, setPendingSync] = useState(0)

  // Simulate network status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Simulate intermittent connectivity
    const interval = setInterval(() => {
      setIsOnline((prev) => (Math.random() > 0.8 ? !prev : prev))
    }, 10000)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
      clearInterval(interval)
    }
  }, [])

  // Count offline-created records
  useEffect(() => {
    const offlineRecords = records.filter((record) => record.isOfflineCreated).length
    setPendingSync(offlineRecords)
  }, [records])

  // Handle sync function with useCallback to prevent dependency issues
  const handleSync = useCallback(async () => {
    if (!isOnline) return

    setSyncStatus("syncing")

    // Simulate sync process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Update records to mark as synced
    setRecords((prev) =>
      prev.map((record) => ({
        ...record,
        isOfflineCreated: false,
        lastSync: new Date().toISOString(),
      })),
    )

    setSyncStatus("success")
    setTimeout(() => setSyncStatus("idle"), 3000)
  }, [isOnline])

  // Auto-sync when online
  useEffect(() => {
    if (isOnline && pendingSync > 0) {
      handleSync()
    }
  }, [isOnline, pendingSync, handleSync])

  const filteredRecords = records.filter(
    (record) =>
      record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-emerald-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="text-3xl"
              >
                🏥
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Medical Records
                </h1>
                <p className="text-sm text-emerald-600">Offline-First Healthcare Management</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Connection Status */}
              <div
                className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                  isOnline ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}
              >
                {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
                <span className="text-sm font-medium">{isOnline ? "Online" : "Offline"}</span>
              </div>

              {/* Sync Status */}
              {pendingSync > 0 && (
                <div className="flex items-center space-x-2 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">{pendingSync} pending sync</span>
                </div>
              )}

              {/* Sync Button */}
              <Button
                onClick={handleSync}
                disabled={!isOnline || syncStatus === "syncing"}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
              >
                {syncStatus === "syncing" ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}>
                    <Upload className="w-4 h-4 mr-2" />
                  </motion.div>
                ) : (
                  <Download className="w-4 h-4 mr-2" />
                )}
                {syncStatus === "syncing" ? "Syncing..." : "Sync"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Records List */}
          <div className="lg:col-span-2">
            {/* Search and Filters */}
            <div className="mb-6">
              <div className="flex space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search patients, IDs, or diagnoses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-emerald-200 focus:border-emerald-400"
                  />
                </div>
                <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
                  <Plus className="w-4 h-4 mr-2" />
                  New Record
                </Button>
              </div>
            </div>

            {/* Records Grid */}
            <div className="space-y-4">
              <AnimatePresence>
                {filteredRecords.map((record, index) => (
                  <motion.div
                    key={record.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedRecord(record)}
                    className="cursor-pointer"
                  >
                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                              <AvatarFallback>
                                {record.patientName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold text-gray-800">{record.patientName}</h3>
                              <p className="text-sm text-gray-600">ID: {record.patientId}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(record.status)}>{record.status}</Badge>
                            {record.isOfflineCreated && (
                              <Badge variant="outline" className="border-orange-200 text-orange-600">
                                <WifiOff className="w-3 h-3 mr-1" />
                                Offline
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-gray-500">Age</p>
                            <p className="font-medium">{record.age} years</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Gender</p>
                            <p className="font-medium">{record.gender}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Diagnosis</p>
                            <p className="font-medium text-emerald-600">{record.diagnosis}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Date</p>
                            <p className="font-medium">{new Date(record.date).toLocaleDateString()}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>Last sync: {new Date(record.lastSync).toLocaleString()}</span>
                          <div className="flex items-center space-x-4">
                            <span className="flex items-center">
                              <Heart className="w-4 h-4 mr-1 text-red-500" />
                              {record.vitals.heartRate} bpm
                            </span>
                            <span>{record.vitals.bloodPressure}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Record Details Sidebar */}
          <div className="space-y-6">
            {selectedRecord ? (
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-emerald-700">
                    <FileText className="w-5 h-5 mr-2" />
                    Patient Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="vitals">Vitals</TabsTrigger>
                      <TabsTrigger value="treatment">Treatment</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                      <div className="text-center mb-4">
                        <Avatar className="w-16 h-16 mx-auto mb-2">
                          <AvatarImage src="/placeholder.svg?height=64&width=64" />
                          <AvatarFallback className="text-lg">
                            {selectedRecord.patientName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="font-semibold text-lg">{selectedRecord.patientName}</h3>
                        <p className="text-gray-600">ID: {selectedRecord.patientId}</p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Age:</span>
                          <span className="font-medium">{selectedRecord.age} years</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Gender:</span>
                          <span className="font-medium">{selectedRecord.gender}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <Badge className={getStatusColor(selectedRecord.status)}>{selectedRecord.status}</Badge>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="vitals" className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-red-50 rounded-lg">
                          <Heart className="w-6 h-6 text-red-500 mx-auto mb-1" />
                          <p className="text-sm text-gray-600">Heart Rate</p>
                          <p className="font-bold text-red-600">{selectedRecord.vitals.heartRate} bpm</p>
                        </div>
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <Stethoscope className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                          <p className="text-sm text-gray-600">Blood Pressure</p>
                          <p className="font-bold text-blue-600">{selectedRecord.vitals.bloodPressure}</p>
                        </div>
                        <div className="text-center p-3 bg-orange-50 rounded-lg">
                          <span className="text-2xl">🌡️</span>
                          <p className="text-sm text-gray-600">Temperature</p>
                          <p className="font-bold text-orange-600">{selectedRecord.vitals.temperature}°C</p>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <span className="text-2xl">⚖️</span>
                          <p className="text-sm text-gray-600">Weight</p>
                          <p className="font-bold text-green-600">{selectedRecord.vitals.weight} kg</p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="treatment" className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">Diagnosis</h4>
                        <p className="text-emerald-600 font-medium">{selectedRecord.diagnosis}</p>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">Treatment Plan</h4>
                        <p className="text-gray-600">{selectedRecord.treatment}</p>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">Medications</h4>
                        <div className="space-y-1">
                          {selectedRecord.medications.map((med, index) => (
                            <Badge key={index} variant="outline" className="mr-2 mb-1">
                              {med}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">Notes</h4>
                        <p className="text-gray-600 text-sm">{selectedRecord.notes}</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Select a patient record to view details</p>
                </CardContent>
              </Card>
            )}

            {/* Sync Status Card */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-emerald-700">
                  {syncStatus === "success" ? (
                    <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                  ) : syncStatus === "error" ? (
                    <AlertCircle className="w-5 h-5 mr-2 text-red-500" />
                  ) : (
                    <Clock className="w-5 h-5 mr-2" />
                  )}
                  Sync Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Connection:</span>
                    <span className={`font-medium ${isOnline ? "text-green-600" : "text-red-600"}`}>
                      {isOnline ? "Online" : "Offline"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pending Sync:</span>
                    <span className="font-medium text-orange-600">{pendingSync} records</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Sync:</span>
                    <span className="font-medium text-gray-800">
                      {syncStatus === "success" ? "Just now" : "2 min ago"}
                    </span>
                  </div>
                </div>

                {syncStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-green-50 rounded-lg"
                  >
                    <p className="text-sm text-green-700 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      All records synced successfully!
                    </p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
