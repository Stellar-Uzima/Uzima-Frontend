"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Stethoscope,
  Users,
  TrendingUp,
  Star,
  MessageCircle,
  Share2,
  Plus,
  Search,
  Filter,
  Globe,
  Wifi,
  WifiOff,
  BookOpen,
  Video,
  Leaf,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import Image from "next/image";
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

export const dynamic = 'force-dynamic'

const healthEmojis = [
  "🏥",
  "💊",
  "🩺",
  "❤️",
  "🧬",
  "🦷",
  "👩‍⚕️",
  "👨‍⚕️",
  "🌿",
  "🔬",
];
const trendingTopics = [
  "Mental Health Awareness",
  "Telemedicine Revolution",
  "Traditional Medicine",
  "Preventive Care",
  "Nutrition Science",
  "Community Health",
  "Medical AI",
  "Patient Care Excellence",
];

const healthSlang = [
  "This treatment is absolutely fire! 🔥",
  "No cap, this doctor saved my life! 💯",
  "That diagnosis was spot on, bestie! ✨",
  "This health tip is giving main character energy! 💅",
  "Periodt! Prevention is better than cure! 💅✨",
  "Ubuntu in healthcare - we heal together! 🤝",
  "Asante sana for this knowledge! 🙏",
];

const featuredPosts = [
  {
    id: 1,
    title:
      "Integrating Traditional Healing with Modern Medicine in Rural Kenya",
    author: "Dr. Amina Hassan",
    specialty: "Integrative Medicine",
    content:
      "Exploring how traditional Kikuyu healing practices can complement modern medical treatments for better patient outcomes...",
    likes: 234,
    shares: 45,
    comments: 67,
    xlmEarned: 12.5,
    tags: ["Traditional Medicine", "Integration", "Kenya", "Rural Health"],
    timeAgo: "2 hours ago",
    avatar: "/placeholder.svg?height=40&width=40",
    region: "East Africa",
    language: "Swahili/English",
  },
  {
    id: 2,
    title: "Telemedicine Success Stories from Remote Nigerian Communities",
    author: "Dr. Chidi Okafor",
    specialty: "Telemedicine Specialist",
    content:
      "How satellite internet and mobile health apps are transforming healthcare delivery in Northern Nigeria...",
    likes: 189,
    shares: 32,
    comments: 89,
    xlmEarned: 9.8,
    tags: ["Telemedicine", "Nigeria", "Remote Care", "Digital Health"],
    timeAgo: "4 hours ago",
    avatar: "/placeholder.svg?height=40&width=40",
    region: "West Africa",
    language: "Hausa/English",
  },
  {
    id: 3,
    title: "Community Health Workers: The Backbone of African Healthcare",
    author: "Mama Fatima Kone",
    specialty: "Community Health Leader",
    content:
      "Sharing 20 years of experience training and supporting community health workers across Mali...",
    likes: 156,
    shares: 28,
    comments: 43,
    xlmEarned: 8.2,
    tags: ["Community Health", "Mali", "Training", "Healthcare Workers"],
    timeAgo: "6 hours ago",
    avatar: "/placeholder.svg?height=40&width=40",
    region: "West Africa",
    language: "Bambara/French",
  },
  {
    id: 4,
    title: "Offline-First Medical Records: A Game Changer for Rural Clinics",
    author: "Dr. Nomsa Mbeki",
    specialty: "Health Informatics",
    content:
      "How implementing offline-capable electronic health records improved patient care in South African townships...",
    likes: 203,
    shares: 56,
    comments: 78,
    xlmEarned: 11.3,
    tags: ["Health Tech", "Offline", "South Africa", "EHR"],
    timeAgo: "8 hours ago",
    avatar: "/placeholder.svg?height=40&width=40",
    region: "Southern Africa",
    language: "Zulu/English",
  },
];

export default function HomePage() {
  const [currentEmoji, setCurrentEmoji] = useState(0);
  const [currentSlang, setCurrentSlang] = useState(0);
  const isOnline = useNetworkStatus();
  const [posts, _setPosts] = useState(featuredPosts);

  useEffect(() => {
    const emojiInterval = setInterval(() => {
      setCurrentEmoji((prev) => (prev + 1) % healthEmojis.length);
    }, 2000);

    const slangInterval = setInterval(() => {
      setCurrentSlang((prev) => (prev + 1) % healthSlang.length);
    }, 4000);

    return () => {
      clearInterval(emojiInterval);
      clearInterval(slangInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="text-8xl mb-4">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentEmoji}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ duration: 0.5 }}
                >
                  {healthEmojis[currentEmoji]}
                </motion.span>
              </AnimatePresence>
            </div>

            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Ubuntu Healthcare for Africa
            </h2>

            <p className="text-xl text-gray-600 mb-6 max-w-4xl mx-auto">
              Bridging traditional African healing wisdom with modern medicine
              through blockchain technology. Accessible telemedicine, secure
              medical records, and community-driven healthcare that works even
              offline. 🌍
            </p>

            <motion.div
              key={currentSlang}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-lg font-medium text-emerald-600 mb-8"
            >
              {healthSlang[currentSlang]}
            </motion.div>

            {/* Connection Status */}
            <div className="flex justify-center mb-8">
              <div
                className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                  isOnline
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-orange-700"
                }`}
              >
                {isOnline ? (
                  <Wifi className="w-5 h-5" />
                ) : (
                  <WifiOff className="w-5 h-5" />
                )}
                <span className="font-medium">
                  {isOnline
                    ? "Online - Full Features Available"
                    : "Offline Mode - Core Features Active"}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
            {[
              {
                icon: Video,
                label: "Telemedicine",
                href: "/telemedicine",
                color: "blue",
                description: "Virtual consultations",
              },
              {
                icon: Leaf,
                label: "Traditional Medicine",
                href: "/traditional-medicine",
                color: "green",
                description: "Ancient wisdom",
              },
              {
                icon: Heart,
                label: "Medical Records",
                href: "/medical-records",
                color: "red",
                description: "Secure & offline",
              },
              {
                icon: BookOpen,
                label: "Health Education",
                href: "/education",
                color: "purple",
                description: "Learn & grow",
              },
            ].map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={action.href}>
                  <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
                    <CardContent className="p-6 text-center">
                      <action.icon
                        className={`w-12 h-12 mx-auto mb-3 text-${action.color}-500 group-hover:scale-110 transition-transform`}
                      />
                      <h3 className="font-semibold text-gray-800 mb-1">
                        {action.label}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {action.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {[
              {
                icon: Users,
                label: "Healthcare Professionals",
                value: "12,847",
                color: "emerald",
              },
              {
                icon: Heart,
                label: "Patient Stories",
                value: "8,923",
                color: "rose",
              },
              {
                icon: Stethoscope,
                label: "Medical Articles",
                value: "15,672",
                color: "blue",
              },
              {
                icon: TrendingUp,
                label: "XLM Distributed",
                value: "284,592",
                color: "yellow",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <stat.icon
                      className={`w-8 h-8 mx-auto mb-2 text-${stat.color}-500`}
                    />
                    <div className="text-2xl font-bold text-gray-800">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Topics */}
      <section className="py-8 px-4 bg-white/40 backdrop-blur-sm">
        <div className="container mx-auto">
          <h3 className="text-2xl font-bold text-center mb-6 text-emerald-700">
            🔥 Trending in African Healthcare
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {trendingTopics.map((topic, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Badge
                  variant="secondary"
                  className="px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 hover:from-emerald-200 hover:to-teal-200 cursor-pointer"
                >
                  #{topic}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search health topics, conditions, treatments, or regions..."
                className="pl-10 py-3 border-emerald-200 focus:border-emerald-400"
              />
            </div>
            <Button
              variant="outline"
              className="border-emerald-200 text-emerald-600 hover:bg-emerald-50 bg-transparent"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter by Region
            </Button>
            <Button
              variant="outline"
              className="border-emerald-200 text-emerald-600 hover:bg-emerald-50 bg-transparent"
            >
              <Globe className="w-4 h-4 mr-2" />
              Language
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-emerald-700">
              Featured Health Stories
            </h3>
            <Link href="/create">
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
                <Plus className="w-4 h-4 mr-2" />
                Share Your Story
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 max-w-6xl mx-auto">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <Image
                            src={post.avatar || "/placeholder.svg"}
                            alt={post.author}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <AvatarFallback>
                            {post.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div>
                          <h4 className="font-semibold text-gray-800">
                            {post.author}
                          </h4>
                          <p className="text-sm text-emerald-600">
                            {post.specialty}
                          </p>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <span>{post.region}</span>
                            <span>•</span>
                            <span>{post.language}</span>
                            <span>•</span>
                            <span>{post.timeAgo}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 text-yellow-600">
                          <Star className="w-4 h-4" />
                          <span className="font-semibold">
                            {post.xlmEarned} XLM
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">earned</p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <h3 className="text-xl font-bold mb-3 text-gray-800">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{post.content}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          variant="outline"
                          className="border-emerald-200 text-emerald-600"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-6">
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-rose-500 transition-colors">
                          <Heart className="w-5 h-5" />
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
                          <MessageCircle className="w-5 h-5" />
                          <span>{post.comments}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-emerald-500 transition-colors">
                          <Share2 className="w-5 h-5" />
                          <span>{post.shares}</span>
                        </button>
                      </div>

                      <Link href={`/post/${post.id}`}>
                        <Button
                          variant="ghost"
                          className="text-emerald-600 hover:text-emerald-700"
                        >
                          Read More
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/explore">
              <Button
                variant="outline"
                className="border-emerald-200 text-emerald-600 hover:bg-emerald-50 bg-transparent"
              >
                View All Stories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Community Features */}
      <section className="py-16 px-4 bg-gradient-to-r from-emerald-100 to-teal-100">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4 text-emerald-800">
            Ubuntu - We Heal Together
          </h3>
          <p className="text-lg text-emerald-700 mb-12 max-w-3xl mx-auto">
            Join a community that believes in collective healing, where
            traditional wisdom meets modern innovation, and where every voice
            matters in building healthier African communities.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Cultural Respect",
                description:
                  "Honoring traditional healing practices while embracing modern medicine",
              },
              {
                icon: Globe,
                title: "Offline-First",
                description:
                  "Healthcare that works even in areas with limited internet connectivity",
              },
              {
                icon: Users,
                title: "Community Driven",
                description:
                  "Local expertise and community knowledge at the heart of healthcare",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-emerald-600" />
                </div>
                <h4 className="text-xl font-semibold text-emerald-800 mb-2">
                  {feature.title}
                </h4>
                <p className="text-emerald-700">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}