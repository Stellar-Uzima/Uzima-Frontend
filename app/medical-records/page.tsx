"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, FileText, Wifi, WifiOff, Clock, CheckCircle, AlertCircle, Edit, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/layout/navigation";
import { getRecords, updateRecordStatus } from "@/lib/db";
import { syncMedicalRecords } from "@/lib/sync";
import { MedicalRecord } from "@/types/medical-record";

export default function MedicalRecordsPage() {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [isOnline, setIsOnline] = useState(true);
  const [pendingSyncCount, setPendingSyncCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const fetchRecords = async () => {
    const fetchedRecords = await getRecords();
    setRecords(fetchedRecords);
    setPendingSyncCount(fetchedRecords.filter((r) => r.syncStatus === "pending").length);
  };

  useEffect(() => {
    fetchRecords();

    const handleOnline = () => {
      setIsOnline(true);
      syncMedicalRecords();
      fetchRecords(); // Refresh records after sync attempt
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleManualSync = async () => {
    await syncMedicalRecords();
    fetchRecords(); // Refresh records after manual sync
  };

  const filteredRecords = records.filter(
    (record) =>
      record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.treatment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSyncStatusIcon = (status: MedicalRecord["syncStatus"]) => {
    switch (status) {
      case "synced":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "pending":
        return <Clock className="w-4 h-4 text-orange-500" />;
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getSyncStatusBadge = (status: MedicalRecord["syncStatus"]) => {
    switch (status) {
      case "synced":
        return <Badge variant="outline" className="border-green-200 text-green-700">Synced</Badge>;
      case "pending":
        return <Badge variant="outline" className="border-orange-200 text-orange-600">Pending</Badge>;
      case "error":
        return <Badge variant="destructive">Error</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <Navigation />

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
              <div
                className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                  isOnline ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}
              >
                {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
                <span className="text-sm font-medium">{isOnline ? "Online" : "Offline"}</span>
              </div>

              {pendingSyncCount > 0 && (
                <div className="flex items-center space-x-2 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">{pendingSyncCount} pending sync</span>
                </div>
              )}

              <Button
                onClick={handleManualSync}
                disabled={!isOnline || pendingSyncCount === 0}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
              >
                {pendingSyncCount > 0 ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}>
                    <Clock className="w-4 h-4 mr-2" />
                  </motion.div>
                ) : (
                  <CheckCircle className="w-4 h-4 mr-2" />
                )}
                {pendingSyncCount > 0 ? "Sync Now" : "All Synced"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="relative flex-1 mr-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search records by patient name, diagnosis, or treatment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-emerald-200 focus:border-emerald-400"
            />
          </div>
          <Link href="/medical-records/new">
            <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
              <Plus className="w-4 h-4 mr-2" />
              New Record
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          <AnimatePresence>
            {filteredRecords.length > 0 ? (
              <>
                {filteredRecords.map((record) => (
                  <motion.div
                    key={record.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-gray-800 text-lg">{record.patientName}</h3>
                            <p className="text-sm text-gray-600">{record.diagnosis}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getSyncStatusBadge(record.syncStatus)}
                            <Link href={`/medical-records/${record.id}/edit`}>
                              <Button variant="outline" size="sm" className="border-emerald-200 text-emerald-600">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          <p>Date: {record.date}</p>
                          <p>Treatment: {record.treatment}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </>
            ) : (
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-8 text-center text-gray-600">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p>No medical records found. Create a new one to get started!</p>
                </CardContent>
              </Card>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
