
"use client"

import { MapPin, Star, MessageCircle, ShieldCheck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CommunityHealer } from "@/app/traditional-medicine/data"

interface HealerCardProps {
    healer: CommunityHealer
}

export function HealerCard({ healer }: HealerCardProps) {
    return (
        <Card className="hover:shadow-lg transition-shadow duration-300 border-gray-100 h-full flex flex-col">
            <CardContent className="p-6 flex-1 flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                    <Avatar className="w-16 h-16 border-2 border-emerald-100">
                        <AvatarImage src={healer.avatar} />
                        <AvatarFallback className="bg-emerald-50 text-emerald-700 font-bold text-lg">
                            {healer.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                            <h3 className="font-bold text-gray-900 truncate pr-2">{healer.name}</h3>
                            {healer.verificationStatus === "verified" && (
                                <ShieldCheck className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                            )}
                        </div>
                        <p className="text-sm text-emerald-600 font-medium mb-1 truncate">{healer.title}</p>
                        <div className="flex items-center text-xs text-gray-500 mb-2">
                            <MapPin className="w-3 h-3 mr-1" />
                            {healer.region}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                    <div className="bg-gray-50 rounded p-2 flex flex-col items-center justify-center text-center">
                        <div className="flex items-center font-bold text-gray-900">
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" />
                            {healer.rating}
                        </div>
                        <span className="text-xs text-gray-500">Rating</span>
                    </div>
                    <div className="bg-gray-50 rounded p-2 flex flex-col items-center justify-center text-center">
                        <span className="font-bold text-gray-900">{healer.experience}+</span>
                        <span className="text-xs text-gray-500">Years Exp.</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-6 flex-1 content-start">
                    {healer.specialties.map((specialty, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs font-normal border-gray-200 text-gray-600">
                            {specialty}
                        </Badge>
                    ))}
                </div>

                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200 shadow-md">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Consult
                </Button>
            </CardContent>
        </Card>
    )
}
