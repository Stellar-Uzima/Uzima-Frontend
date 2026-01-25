
"use client"

import { Leaf, BookOpen, AlertTriangle, Activity, Pill, Languages, ShieldCheck, Microscope } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { TraditionalTreatment } from "@/app/traditional-medicine/data"

interface TreatmentDetailsProps {
    treatment: TraditionalTreatment | null
}

export function TreatmentDetails({ treatment }: TreatmentDetailsProps) {
    if (!treatment) {
        return (
            <Card className="h-full bg-white/50 border-dashed border-2 flex items-center justify-center p-12 text-center">
                <div className="max-w-xs mx-auto">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Leaf className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a Treatment</h3>
                    <p className="text-gray-500">
                        Click on any traditional medicine from the list to view its comprehensive details, safety guidelines, and modern integrations.
                    </p>
                </div>
            </Card>
        )
    }

    const getEvidenceColor = (evidence: string) => {
        switch (evidence) {
            case "high": return "text-emerald-700 bg-emerald-50 border-emerald-200"
            case "moderate": return "text-yellow-700 bg-yellow-50 border-yellow-200"
            case "low": return "text-orange-700 bg-orange-50 border-orange-200"
            default: return "text-red-700 bg-red-50 border-red-200"
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            key={treatment.id}
            className="h-full"
        >
            <Card className="h-full border-0 shadow-lg overflow-hidden bg-white/90 backdrop-blur-md">
                <div className="h-2 bg-gradient-to-r from-emerald-500 to-teal-500" />
                <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-50 flex items-center justify-center shadow-sm">
                                <Leaf className="w-8 h-8 text-emerald-600" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl font-bold text-gray-900">{treatment.name}</CardTitle>
                                <CardDescription className="text-emerald-600 font-medium mt-1 flex items-center gap-2">
                                    <Languages className="w-4 h-4" />
                                    {treatment.localName}
                                </CardDescription>
                            </div>
                        </div>
                        <Badge variant="outline" className="text-sm py-1 px-3 bg-gray-50">
                            {treatment.region}
                        </Badge>
                    </div>
                </CardHeader>

                <CardContent className="h-[calc(100%-8rem)]">
                    <Tabs defaultValue="overview" className="w-full h-full flex flex-col">
                        <TabsList className="grid w-full grid-cols-3 mb-6 bg-gray-100/80 p-1">
                            <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Overview</TabsTrigger>
                            <TabsTrigger value="usage" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Usage & Prep</TabsTrigger>
                            <TabsTrigger value="safety" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Safety & Data</TabsTrigger>
                        </TabsList>

                        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                            <TabsContent value="overview" className="space-y-6 mt-0">
                                <div className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-100">
                                    <h4 className="flex items-center gap-2 font-semibold text-emerald-900 mb-2">
                                        <BookOpen className="w-4 h-4" /> Description
                                    </h4>
                                    <p className="text-gray-700 leading-relaxed">{treatment.description}</p>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3 block">Traditional Uses</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {treatment.uses.map((use, idx) => (
                                            <Badge key={idx} variant="secondary" className="px-3 py-1 text-sm bg-gray-100 text-gray-700 hover:bg-gray-200">
                                                {use}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <Separator />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <span className="text-sm font-medium text-gray-500">Modern Equivalent</span>
                                        <div className="flex items-center gap-2 text-blue-700 bg-blue-50 px-3 py-2 rounded-md text-sm border border-blue-100">
                                            <Pill className="w-4 h-4" />
                                            {treatment.modernEquivalent}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <span className="text-sm font-medium text-gray-500">Cultural Significance</span>
                                        <div className="flex items-center gap-2 text-purple-700 bg-purple-50 px-3 py-2 rounded-md text-sm border border-purple-100">
                                            <Activity className="w-4 h-4" />
                                            {treatment.culturalSignificance}
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="usage" className="space-y-6 mt-0">
                                <div className="space-y-4">
                                    <div className="bg-amber-50 rounded-lg p-5 border border-amber-100">
                                        <h4 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
                                            <span className="w-6 h-6 rounded-full bg-amber-200 flex items-center justify-center text-xs font-bold text-amber-800">1</span>
                                            Preparation
                                        </h4>
                                        <p className="text-amber-800/90 leading-relaxed">{treatment.preparation}</p>
                                    </div>

                                    <div className="bg-blue-50 rounded-lg p-5 border border-blue-100">
                                        <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                                            <span className="w-6 h-6 rounded-full bg-blue-200 flex items-center justify-center text-xs font-bold text-blue-800">2</span>
                                            Dosage
                                        </h4>
                                        <p className="text-blue-800/90 leading-relaxed">{treatment.dosage}</p>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="safety" className="space-y-6 mt-0">
                                <div className="grid grid-cols-2 gap-4">
                                    <Card className="bg-gray-50 border-0 shadow-none">
                                        <CardContent className="p-4">
                                            <div className="flex flex-col gap-2">
                                                <span className="text-sm font-medium text-gray-500">Safety Rating</span>
                                                <div className="flex items-end gap-2">
                                                    <span className="text-3xl font-bold text-gray-900">{treatment.safetyRating}</span>
                                                    <span className="text-sm text-gray-500 mb-1">/ 5.0</span>
                                                </div>
                                                <Progress value={(treatment.safetyRating / 5) * 100} className="h-2" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card className={`border-0 shadow-none ${getEvidenceColor(treatment.scientificEvidence)} bg-opacity-10`}>
                                        <CardContent className="p-4 flex flex-col justify-center h-full">
                                            <span className="text-sm font-medium mb-1 opacity-80">Scientific Evidence</span>
                                            <div className="flex items-center gap-2 font-bold text-lg capitalize">
                                                <Microscope className="w-5 h-5" />
                                                {treatment.scientificEvidence}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                {(treatment.contraindications.length > 0 || treatment.interactions.length > 0) && (
                                    <div className="space-y-4">
                                        {treatment.contraindications.length > 0 && (
                                            <div className="bg-red-50 border border-red-100 rounded-lg p-4">
                                                <h4 className="text-red-800 font-semibold mb-2 flex items-center gap-2">
                                                    <AlertTriangle className="w-4 h-4" /> Contraindications
                                                </h4>
                                                <ul className="space-y-1">
                                                    {treatment.contraindications.map((item, i) => (
                                                        <li key={i} className="text-sm text-red-700 pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-red-400">
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {treatment.interactions.length > 0 && (
                                            <div className="bg-orange-50 border border-orange-100 rounded-lg p-4">
                                                <h4 className="text-orange-800 font-semibold mb-2 flex items-center gap-2">
                                                    <Activity className="w-4 h-4" /> Drug Interactions
                                                </h4>
                                                <ul className="space-y-1">
                                                    {treatment.interactions.map((item, i) => (
                                                        <li key={i} className="text-sm text-orange-700 pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-orange-400">
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                        <ShieldCheck className="w-4 h-4 text-emerald-600" /> Verified By
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {treatment.verifiedBy.map((verifier, i) => (
                                            <Badge key={i} variant="outline" className="bg-white border-gray-200 text-gray-600 font-normal">
                                                {verifier}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </TabsContent>
                        </div>
                    </Tabs>
                </CardContent>
            </Card>
        </motion.div>
    )
}
