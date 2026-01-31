"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Search,
  Heart,
  MessageCircle,
  Share2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

// Mock data for healthcare stories
const STORIES = [
  {
    id: 1,
    title: "How Traditional Herbs Helped My Recovery",
    author: "Amara Okonkwo",
    category: "Traditional Medicine",
    excerpt:
      "After months of struggling with chronic pain, I discovered the healing power of indigenous herbs recommended by a local healer. Combined with modern physiotherapy...",
    image: "/african-traditional-medicine-herbs.jpg",
    likes: 234,
    comments: 45,
    date: "2024-03-15",
    language: "English",
    region: "West Africa",
  },
  {
    id: 2,
    title: "Telemedicine Saved My Village",
    author: "Dr. Kwame Mensah",
    category: "Telemedicine",
    excerpt:
      "In rural Ghana, access to healthcare was limited. Through Stellar Uzima's telemedicine platform, we connected our community with specialists across Africa...",
    image: "/african-doctor-telemedicine-consultation.jpg",
    likes: 567,
    comments: 89,
    date: "2024-03-12",
    language: "English",
    region: "West Africa",
  },
  {
    id: 3,
    title: "Ubuntu in Healthcare: Community Healing",
    author: "Thandiwe Ndlovu",
    category: "Community Health",
    excerpt:
      'The philosophy of Ubuntu - "I am because we are" - transformed how we approach mental health in our township. By creating support circles...',
    image: "/african-community-health-circle-gathering.jpg",
    likes: 423,
    comments: 67,
    date: "2024-03-10",
    language: "English",
    region: "Southern Africa",
  },
  {
    id: 4,
    title: "Blockchain for Medical Records: My Experience",
    author: "Ibrahim Hassan",
    category: "Technology",
    excerpt:
      "Moving between countries for work meant losing access to my medical history. Stellar Uzima's blockchain-based records changed everything...",
    image: "/blockchain-medical-records-technology.jpg",
    likes: 345,
    comments: 52,
    date: "2024-03-08",
    language: "English",
    region: "East Africa",
  },
  {
    id: 5,
    title: "Maternal Health Education in Swahili",
    author: "Fatima Mwangi",
    category: "Health Education",
    excerpt:
      "Access to maternal health information in our native language was scarce. The culturally relevant courses on Stellar Uzima helped me prepare for motherhood...",
    image: "/african-pregnant-woman-health-education.jpg",
    likes: 678,
    comments: 123,
    date: "2024-03-05",
    language: "Swahili",
    region: "East Africa",
  },
  {
    id: 6,
    title: "Offline Access During Power Outages",
    author: "Chidi Okafor",
    category: "Technology",
    excerpt:
      "When the power grid failed during an emergency, Stellar Uzima's offline-first design allowed me to access critical health information...",
    image: "/mobile-phone-offline-healthcare-app.jpg",
    likes: 456,
    comments: 78,
    date: "2024-03-03",
    language: "English",
    region: "West Africa",
  },
  {
    id: 7,
    title: "Earning While Sharing Healing Knowledge",
    author: "Mama Zola",
    category: "Traditional Medicine",
    excerpt:
      "As a traditional healer for 40 years, I never imagined my knowledge could reach thousands. Through Stellar Uzima, I share wisdom and earn XLM tokens...",
    image: "/african-elder-traditional-healer-wisdom.jpg",
    likes: 892,
    comments: 156,
    date: "2024-03-01",
    language: "Zulu",
    region: "Southern Africa",
  },
  {
    id: 8,
    title: "Connecting Diaspora with Home Healthcare",
    author: "Aisha Diallo",
    category: "Telemedicine",
    excerpt:
      "Living abroad, I worried about my elderly parents' health. Stellar Uzima connected them with doctors who understand our culture and language...",
    image: "/elderly-african-parents-video-call-healthcare.jpg",
    likes: 534,
    comments: 91,
    date: "2024-02-28",
    language: "French",
    region: "West Africa",
  },
  {
    id: 9,
    title: "Mental Health Without Stigma",
    author: "Kofi Asante",
    category: "Mental Health",
    excerpt:
      "Breaking the silence around mental health in our community was difficult. Stellar Uzima provided a safe, anonymous space to seek help...",
    image: "/african-man-mental-health-support.jpg",
    likes: 723,
    comments: 134,
    date: "2024-02-25",
    language: "English",
    region: "West Africa",
  },
  {
    id: 10,
    title: "Youth Health Champions Program",
    author: "Zainab Mohammed",
    category: "Community Health",
    excerpt:
      "Training young people to become health advocates in their communities. Through Stellar Uzima, we're creating a new generation of healthcare leaders...",
    image: "/african-youth-health-education-program.jpg",
    likes: 612,
    comments: 98,
    date: "2024-02-22",
    language: "English",
    region: "East Africa",
  },
];

const CATEGORIES = [
  "All",
  "Traditional Medicine",
  "Telemedicine",
  "Community Health",
  "Technology",
  "Health Education",
  "Mental Health",
];
const REGIONS = [
  "All",
  "West Africa",
  "East Africa",
  "Southern Africa",
  "North Africa",
  "Central Africa",
];
const LANGUAGES = [
  "All",
  "English",
  "Swahili",
  "French",
  "Arabic",
  "Zulu",
  "Hausa",
  "Amharic",
];

const ITEMS_PER_PAGE = 6;

export const dynamic = "force-dynamic";

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter stories based on search and filters
  const filteredStories = STORIES.filter((story) => {
    const matchesSearch =
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || story.category === selectedCategory;
    const matchesRegion =
      selectedRegion === "All" || story.region === selectedRegion;
    const matchesLanguage =
      selectedLanguage === "All" || story.language === selectedLanguage;

    return matchesSearch && matchesCategory && matchesRegion && matchesLanguage;
  });

  // Pagination
  const totalPages = Math.ceil(filteredStories.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedStories = filteredStories.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  // Reset to page 1 when filters change
  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Explore Health Stories
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover healing journeys, traditional wisdom, and community
            experiences across Africa
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4 w-[50%]">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search stories, authors, or topics..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                handleFilterChange();
              }}
              className="pl-10 h-12 text-base"
            />
          </div>

          {/* Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Category
              </label>
              <Select
                value={selectedCategory}
                onValueChange={(value) => {
                  setSelectedCategory(value);
                  handleFilterChange();
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Region
              </label>
              <Select
                value={selectedRegion}
                onValueChange={(value) => {
                  setSelectedRegion(value);
                  handleFilterChange();
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {REGIONS.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Language
              </label>
              <Select
                value={selectedLanguage}
                onValueChange={(value) => {
                  setSelectedLanguage(value);
                  handleFilterChange();
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {LANGUAGES.map((language) => (
                    <SelectItem key={language} value={language}>
                      {language}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {paginatedStories.length} of {filteredStories.length}{" "}
              stories
            </p>
            {(searchQuery ||
              selectedCategory !== "All" ||
              selectedRegion !== "All" ||
              selectedLanguage !== "All") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setSelectedRegion("All");
                  setSelectedLanguage("All");
                  setCurrentPage(1);
                }}
              >
                Clear filters
              </Button>
            )}
          </div>
        </div>

        {/* Stories Grid */}
        {paginatedStories.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {paginatedStories.map((story) => (
                <Card
                  key={story.id}
                  className="flex flex-col hover:shadow-lg transition-shadow"
                >
                  <Image
                    src={story.image || "/placeholder.svg"}
                    alt={story.title}
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{story.category}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {story.language}
                      </span>
                    </div>
                    <CardTitle className="text-xl leading-tight text-balance">
                      {story.title}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      By {story.author} • {story.region}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
                      {story.excerpt}
                    </p>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between border-t pt-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                        <Heart className="h-4 w-4" />
                        <span>{story.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                        <MessageCircle className="h-4 w-4" />
                        <span>{story.comments}</span>
                      </button>
                    </div>
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="min-w-10"
                      >
                        {page}
                      </Button>
                    ),
                  )}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground mb-2">
              No stories found
            </p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your filters or search query
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
