
"use client"

import { Shield, Eye, Users, Globe, Microscope } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SafetyGuidelines() {
    const guidelines = [
        {
            icon: Eye,
            title: "Cultural Respect",
            text: "Always respect cultural protocols and sacred traditions when discussing treatments."
        },
        {
            icon: Microscope,
            title: "Clinical Interactions",
            text: "Document interactions with modern medications carefully. Consult with integration specialists."
        },
        {
            icon: Users,
            title: "Community Consensus",
            text: "Involve community elders and verified practitioners in major treatment decisions."
        },
        {
            icon: Globe,
            title: "Sourcing & Sustainability",
            text: "Consider local ecological impact and seasonal availability of herbal resources."
        }
    ]

    return (
        <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-100 shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center text-orange-800">
                    <Shield className="w-5 h-5 mr-2 text-orange-600" />
                    Safety & Cultural Guidelines
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                    {guidelines.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 bg-white/60 p-3 rounded-lg border border-orange-100/50">
                            <div className="p-2 bg-orange-100 rounded-lg flex-shrink-0">
                                <item.icon className="w-4 h-4 text-orange-600" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-orange-900 text-sm mb-0.5">{item.title}</h4>
                                <p className="text-sm text-orange-800/80 leading-snug">{item.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
