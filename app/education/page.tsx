"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Play,
  Download,
  Star,
  Clock,
  Users,
  Award,
  Search,
  Globe,
  Headphones,
  FileText,
  Video,
  CheckCircle,
  Lock,
  Wifi,
  WifiOff,
  CloudDownload,
  Trash2,
  FolderOpen, // New icon for Downloads
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorAvatar: string;
  duration: string;
  lessons: number;
  students: number;
  rating: number;
  level: "beginner" | "intermediate" | "advanced";
  category: string;
  language: string;
  region: string;
  price: number;
  isOfflineAvailable: boolean;
  progress?: number;
  isDownloaded?: boolean;
  thumbnail: string;
  tags: string[];
  culturalContext: string;
}

interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: "video" | "audio" | "text" | "interactive";
  isCompleted: boolean;
  isLocked: boolean;
}

// NOTE: Hardcoded data for demonstration purposes
const initialCourses: Course[] = [
  {
    id: "1",
    title: "Traditional African Medicine: Foundations and Modern Applications",
    description:
      "Explore the rich heritage of African traditional medicine and learn how to integrate it with modern healthcare practices.",
    instructor: "Dr. Amina Hassan",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    duration: "6 weeks",
    lessons: 24,
    students: 1247,
    rating: 4.8,
    level: "intermediate",
    category: "Traditional Medicine",
    language: "English/Swahili",
    region: "East Africa",
    price: 0,
    isOfflineAvailable: true,
    isDownloaded: true, // Downloaded and 65% complete
    progress: 65,
    thumbnail: "/placeholder.svg?height=200&width=300",
    tags: ["Traditional Medicine", "Herbal Medicine", "Cultural Health"],
    culturalContext:
      "Focuses on East African healing traditions with respect for cultural protocols",
  },
  {
    id: "2",
    title: "Community Health Worker Training Program",
    description:
      "Comprehensive training for community health workers serving rural African communities with limited healthcare access.",
    instructor: "Mama Fatima Kone",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    duration: "8 weeks",
    lessons: 32,
    students: 892,
    rating: 4.9,
    level: "beginner",
    category: "Community Health",
    language: "French/Bambara",
    region: "West Africa",
    price: 0,
    isOfflineAvailable: true,
    isDownloaded: false,
    progress: 0,
    thumbnail: "/placeholder.svg?height=200&width=300",
    tags: ["Community Health", "Primary Care", "Rural Health"],
    culturalContext:
      "Designed for West African communities with emphasis on local health challenges",
  },
  {
    id: "3",
    title: "Maternal and Child Health in African Contexts",
    description:
      "Evidence-based approaches to improving maternal and child health outcomes across diverse African settings.",
    instructor: "Dr. Nomsa Mbeki",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    duration: "4 weeks",
    lessons: 16,
    students: 2156,
    rating: 4.7,
    level: "intermediate",
    category: "Maternal Health",
    language: "English/Zulu",
    region: "Southern Africa",
    price: 25,
    isOfflineAvailable: true,
    isDownloaded: true, // Downloaded but 0% complete
    progress: 0,
    thumbnail: "/placeholder.svg?height=200&width=300",
    tags: ["Maternal Health", "Child Health", "Nutrition"],
    culturalContext:
      "Incorporates Southern African cultural practices around childbirth and child-rearing",
  },
  {
    id: "4",
    title: "Mental Health and Cultural Healing Practices",
    description:
      "Understanding mental health through African cultural lenses and integrating traditional healing with modern therapy.",
    instructor: "Dr. Kwame Asante",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    duration: "5 weeks",
    lessons: 20,
    students: 743,
    rating: 4.6,
    level: "advanced",
    category: "Mental Health",
    language: "English/Twi",
    region: "West Africa",
    price: 35,
    isOfflineAvailable: false,
    isDownloaded: false,
    progress: 0,
    thumbnail: "/placeholder.svg?height=200&width=300",
    tags: ["Mental Health", "Cultural Therapy", "Traditional Healing"],
    culturalContext:
      "Explores Akan and broader West African approaches to mental wellness",
  },
];

const sampleLessons: Lesson[] = [
  {
    id: "1",
    title: "Introduction to African Traditional Medicine",
    duration: "15 min",
    type: "video",
    isCompleted: true,
    isLocked: false,
  },
  {
    id: "2",
    title: "Historical Context and Cultural Significance",
    duration: "20 min",
    type: "text",
    isCompleted: true,
    isLocked: false,
  },
  {
    id: "3",
    title: "Common Medicinal Plants Across Africa",
    duration: "25 min",
    type: "interactive",
    isCompleted: true,
    isLocked: false,
  },
  {
    id: "4",
    title: "Integration with Modern Healthcare",
    duration: "18 min",
    type: "video",
    isCompleted: false,
    isLocked: false,
  },
  {
    id: "5",
    title: "Case Studies: Successful Integration",
    duration: "30 min",
    type: "text",
    isCompleted: false,
    isLocked: true,
  },
];

export default function EducationPage() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [isOnline, setIsOnline] = useState(true);
  const [activeTab, setActiveTab] = useState("courses");
  const [myCourses, setMyCourses] = useState(initialCourses);

  useEffect(() => {
    // Initial selection: select the first course in the initial list
    if (initialCourses.length > 0) {
      setSelectedCourse(initialCourses[0]);
    }

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const filteredCourses = myCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || course.category === selectedCategory;
    const matchesLevel =
      selectedLevel === "all" || course.level === selectedLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="w-4 h-4" />;
      case "audio":
        return <Headphones className="w-4 h-4" />;
      case "text":
        return <FileText className="w-4 h-4" />;
      case "interactive":
        return <Play className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const handleDownloadToggle = (courseId: string) => {
    setMyCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === courseId
          ? {
              ...course,
              isDownloaded: !course.isDownloaded,
            }
          : course,
      ),
    );
  };

  const ongoingCourses = myCourses.filter(
    (course) => course.progress !== undefined && course.progress > 0,
  );

  const downloadedCourses = myCourses.filter(
    (course) => course.isDownloaded && course.isOfflineAvailable,
  );

  const totalCourses = initialCourses.length;

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-blue-50 to-indigo-50">
      <Navigation />

      {/* Header */}
      <section className="py-12 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-6xl mb-4">
              <BookOpen className="w-16 h-16 mx-auto text-purple-600" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Health Education for Africa
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Learn from African healthcare experts. Culturally relevant
              education that bridges traditional wisdom with modern medical
              knowledge. Available offline for remote areas.
            </p>

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
                    ? "Online - All Courses Available"
                    : `Offline Mode - ${downloadedCourses.length} Downloaded Courses`}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto mb-8">
            <TabsTrigger value="courses">
              All Courses ({totalCourses})
            </TabsTrigger>
            <TabsTrigger value="my-learning">
              My Learning ({ongoingCourses.length})
            </TabsTrigger>
            <TabsTrigger value="downloads">
              Downloads ({downloadedCourses.length})
            </TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
          </TabsList>

          {/* 1. All Courses Tab */}
          <TabsContent value="courses">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Courses List */}
              <div className="lg:col-span-2">
                {/* Search and Filters */}
                <div className="mb-6">
                  <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        placeholder="Search courses, instructors, or topics..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 border-purple-200 focus:border-purple-400"
                      />
                    </div>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-4 py-2 border border-purple-200 rounded-md focus:border-purple-400 focus:outline-none"
                    >
                      <option value="all">All Categories</option>
                      <option value="Traditional Medicine">
                        Traditional Medicine
                      </option>
                      <option value="Community Health">Community Health</option>
                      <option value="Maternal Health">Maternal Health</option>
                      <option value="Mental Health">Mental Health</option>
                    </select>
                    <select
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                      className="px-4 py-2 border border-purple-200 rounded-md focus:border-purple-400 focus:outline-none"
                    >
                      <option value="all">All Levels</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>

                  {!isOnline && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                      <div className="flex items-center space-x-2 text-orange-700">
                        <WifiOff className="w-5 h-5" />
                        <span className="font-medium">
                          Offline Mode: Showing only downloaded courses (
                          {downloadedCourses.length} available)
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Courses Grid */}
                <div className="grid gap-6">
                  <AnimatePresence>
                    {filteredCourses
                      .filter((course) => isOnline || course.isOfflineAvailable)
                      .map((course, index) => (
                        <motion.div
                          key={course.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => setSelectedCourse(course)}
                          className="cursor-pointer"
                        >
                          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                            <CardContent className="p-6">
                              <div className="flex items-start space-x-4">
                                <div className="w-24 h-16 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                                  <BookOpen className="w-8 h-8 text-purple-600" />
                                </div>

                                <div className="flex-1">
                                  <div className="flex items-start justify-between mb-2">
                                    <div>
                                      <h3 className="font-semibold text-gray-800 text-lg mb-1">
                                        {course.title}
                                      </h3>
                                      <p className="text-sm text-gray-600 mb-2">
                                        {course.description}
                                      </p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      {course.isOfflineAvailable && (
                                        <Badge
                                          variant="outline"
                                          className="border-green-200 text-green-700"
                                        >
                                          <Download className="w-3 h-3 mr-1" />
                                          Offline
                                        </Badge>
                                      )}
                                      {course.price === 0 && (
                                        <Badge className="bg-green-100 text-green-800">
                                          Free
                                        </Badge>
                                      )}
                                    </div>
                                  </div>

                                  <div className="flex items-center space-x-4 mb-3">
                                    <div className="flex items-center space-x-2">
                                      <Avatar className="w-6 h-6">
                                        <AvatarImage
                                          src={
                                            course.instructorAvatar ||
                                            "/placeholder.svg"
                                          }
                                        />
                                        <AvatarFallback className="text-xs">
                                          {course.instructor
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                        </AvatarFallback>
                                      </Avatar>
                                      <span className="text-sm text-gray-600">
                                        {course.instructor}
                                      </span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <Star className="w-4 h-4 text-yellow-500" />
                                      <span className="text-sm font-medium">
                                        {course.rating}
                                      </span>
                                    </div>
                                    <Badge
                                      className={getLevelColor(course.level)}
                                    >
                                      {course.level}
                                    </Badge>
                                  </div>

                                  <div className="flex flex-wrap gap-2 mb-3">
                                    {course.tags.slice(0, 3).map((tag, idx) => (
                                      <Badge
                                        key={idx}
                                        variant="outline"
                                        className="border-purple-200 text-purple-700"
                                      >
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>

                                  <div className="flex items-center justify-between text-sm text-gray-600">
                                    <div className="flex items-center space-x-4">
                                      <div className="flex items-center space-x-1">
                                        <Clock className="w-4 h-4" />
                                        <span>{course.duration}</span>
                                      </div>
                                      <div className="flex items-center space-x-1">
                                        <BookOpen className="w-4 h-4" />
                                        <span>{course.lessons} lessons</span>
                                      </div>
                                      <div className="flex items-center space-x-1">
                                        <Users className="w-4 h-4" />
                                        <span>
                                          {course.students.toLocaleString()}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Globe className="w-4 h-4" />
                                      <span>{course.language}</span>
                                    </div>
                                  </div>

                                  {course.progress !== undefined &&
                                    course.progress > 0 && (
                                      <div className="mt-3">
                                        <div className="flex items-center justify-between mb-1">
                                          <span className="text-sm text-gray-600">
                                            Progress
                                          </span>
                                          <span className="text-sm font-medium">
                                            {course.progress}%
                                          </span>
                                        </div>
                                        <Progress
                                          value={course.progress}
                                          className="h-2"
                                        />
                                      </div>
                                    )}

                                  <div className="mt-4 pt-3 border-t border-gray-100">
                                    <p className="text-xs text-purple-600 mb-2">
                                      {course.culturalContext}
                                    </p>
                                    <div className="flex justify-between items-center">
                                      <span className="text-lg font-semibold text-gray-800">
                                        {course.price === 0
                                          ? "Free"
                                          : `$${course.price}`}
                                      </span>
                                      <Button className="bg-purple-500 hover:bg-purple-600">
                                        {course.progress !== undefined &&
                                        course.progress > 0
                                          ? "Continue"
                                          : "Start Course"}
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

              {/* Course Details Sidebar */}
              <div className="space-y-6">
                {selectedCourse ? (
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center text-purple-700">
                        <BookOpen className="w-5 h-5 mr-2" />
                        Course Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-lg mb-2">
                            {selectedCourse.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3">
                            {selectedCourse.description}
                          </p>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage
                              src={
                                selectedCourse.instructorAvatar ||
                                "/placeholder.svg"
                              }
                            />
                            <AvatarFallback>
                              {selectedCourse.instructor
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {selectedCourse.instructor}
                            </p>
                            <p className="text-sm text-gray-600">
                              {selectedCourse.region}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">Duration</p>
                            <p className="font-medium">
                              {selectedCourse.duration}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Lessons</p>
                            <p className="font-medium">
                              {selectedCourse.lessons}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Students</p>
                            <p className="font-medium">
                              {selectedCourse.students.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Rating</p>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span className="font-medium">
                                {selectedCourse.rating}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-gray-600 mb-2">
                            Cultural Context
                          </p>
                          <p className="text-sm text-purple-600 bg-purple-50 p-3 rounded-lg">
                            {selectedCourse.culturalContext}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-600 mb-2">
                            What you&apos;ll learn
                          </p>
                          <div className="space-y-2">
                            {selectedCourse.tags.map((tag, idx) => (
                              <div
                                key={idx}
                                className="flex items-center space-x-2"
                              >
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span className="text-sm">{tag}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <Button className="w-full bg-purple-500 hover:bg-purple-600">
                          {selectedCourse.price === 0
                            ? "Enroll for Free"
                            : `Enroll for $${selectedCourse.price}`}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-8 text-center">
                      <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">
                        Select a course to view details
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Sample Lessons */}
                {selectedCourse && (
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-purple-700">
                        Course Content
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {sampleLessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className={`flex items-center justify-between p-3 rounded-lg ${
                              lesson.isCompleted
                                ? "bg-green-50 border border-green-200"
                                : lesson.isLocked
                                  ? "bg-gray-50 border border-gray-200"
                                  : "bg-blue-50 border border-blue-200"
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  lesson.isCompleted
                                    ? "bg-green-500 text-white"
                                    : lesson.isLocked
                                      ? "bg-gray-400 text-white"
                                      : "bg-blue-500 text-white"
                                }`}
                              >
                                {lesson.isCompleted ? (
                                  <CheckCircle className="w-4 h-4" />
                                ) : lesson.isLocked ? (
                                  <Lock className="w-4 h-4" />
                                ) : (
                                  getTypeIcon(lesson.type)
                                )}
                              </div>
                              <div>
                                <p className="font-medium text-sm">
                                  {lesson.title}
                                </p>
                                <p className="text-xs text-gray-600">
                                  {lesson.duration}
                                </p>
                              </div>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {lesson.type}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* 2. My Learning Tab */}
          <TabsContent value="my-learning">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <BookOpen className="w-6 h-6 mr-2 text-purple-600" />
                Courses in Progress ({ongoingCourses.length})
              </h2>
              <p className="text-gray-600 mb-6">
                Jump back into your active courses and continue learning.
              </p>

              <div className="grid gap-6">
                {ongoingCourses.length > 0 ? (
                  ongoingCourses.map((course, index) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardContent className="p-4 flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800 text-lg mb-1">
                              {course.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-3">
                              Taught by {course.instructor}
                            </p>

                            {/* Progress Bar */}
                            <div className="flex items-center space-x-3">
                              <Progress
                                value={course.progress}
                                className="h-2 w-3/4 bg-gray-200"
                              />
                              <span className="text-sm font-medium text-purple-600">
                                {course.progress}%
                              </span>
                            </div>
                          </div>

                          <Button className="bg-purple-500 hover:bg-purple-600 ml-4">
                            Continue
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                ) : (
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-6 text-center text-gray-600">
                      <Play className="w-8 h-8 mx-auto text-gray-400 mb-3" />
                      <p>
                        You haven&apos;t started any courses yet. Go to **All
                        Courses** to begin!
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* 3. Downloads Tab */}
          <TabsContent value="downloads">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <FolderOpen className="w-6 h-6 mr-2 text-blue-600" />
                Offline Downloads ({downloadedCourses.length})
              </h2>
              <p className="text-gray-600 mb-6">
                Access these courses anytime, even without an internet
                connection.
              </p>

              <div className="grid gap-6">
                {downloadedCourses.length > 0 ? (
                  downloadedCourses.map((course, index) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="bg-blue-50 border border-blue-200 shadow-md">
                        <CardContent className="p-4 flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <CloudDownload className="w-6 h-6 text-blue-600 shrink-0" />
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-800 text-base">
                                {course.title}
                              </h3>
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Clock className="w-4 h-4" />
                                <span>{course.duration}</span>
                                {course.progress !== undefined &&
                                  course.progress > 0 && (
                                    <>
                                      <Badge
                                        variant="outline"
                                        className="bg-white text-purple-700"
                                      >
                                        Progress: {course.progress}%
                                      </Badge>
                                    </>
                                  )}
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="border-red-300 text-red-600 hover:bg-red-100"
                              onClick={() => handleDownloadToggle(course.id)}
                              aria-label={`Remove download for ${course.title}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                            <Button className="bg-purple-500 hover:bg-blue-600">
                              View Offline
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                ) : (
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-6 text-center text-gray-600">
                      <Download className="w-8 h-8 mx-auto text-gray-400 mb-3" />
                      <p>
                        You haven&apos;t downloaded any courses yet. Use the
                        **Offline** badge on course cards to save content for
                        offline access!
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* 4. Certificates Tab */}
          <TabsContent value="certificates">
            <div className="max-w-4xl mx-auto text-center py-12">
              <Award className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Your Achievements
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Certificates you earn upon course completion will appear here.
                Keep up the great work!
              </p>
              <Button className="bg-purple-500 hover:bg-purple-600">
                Explore Courses to Earn Certificates
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
