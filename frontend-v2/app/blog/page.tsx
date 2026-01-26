"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Header } from "@/components/header";
import { articles, type Article } from "@/data/articles";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { CalendarIcon, Clock, SearchIcon, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { BlogCard } from "@/components/blog/blog-card";

const ITEMS_PER_PAGE = 9;
const CATEGORIES = ["Medical", "Traditional Medicine", "Wellness", "News"];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();

  // Reset pagination when filters change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
    setCurrentPage(1);
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag((prev) => (prev === tag ? null : tag));
    setCurrentPage(1);
  };

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesSearch = article.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory
        ? article.category === selectedCategory
        : true;
      const matchesTag = selectedTag
        ? article.tags.includes(selectedTag)
        : true;
      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [searchQuery, selectedCategory, selectedTag]);

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const currentArticles = filteredArticles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const heroArticle = currentPage === 1 ? currentArticles[0] : null;
  const gridArticles =
    currentPage === 1 ? currentArticles.slice(1) : currentArticles;

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8 space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Health & Wellness Blog
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore the latest in medical science, traditional remedies, and
            daily wellness.
          </p>
        </div>

        {/* Filters Section */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-xs">
            <SearchIcon className="h-4 w-4 absolute left-3 top-1/2 transform text-gray-500 -translate-y-1/2" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full rounded-full pl-8 transition-all duration-300"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer px-4 py-2 text-sm hover:bg-primary/90 hover:text-primary-foreground transition-colors duration-300 rounded-full"
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Selected Tag Indicator */}
        {selectedTag && (
          <div className="mb-6 flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Filtered by tag:
            </span>
            <Badge variant="secondary" className="flex items-center gap-1">
              {selectedTag}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 rounded-full p-0 ml-1 hover:bg-transparent"
                onClick={() => handleTagClick(selectedTag)}
              >
                ×
              </Button>
            </Badge>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Hero Article */}
          {heroArticle && (
            <BlogCard article={heroArticle} key={heroArticle.id} />
          )}

          {/* Regular Grid Articles */}
          {gridArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onTagClick={handleTagClick}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <div className="flex h-64 flex-col items-center justify-center text-center">
            <p className="text-lg text-muted-foreground">
              No articles found matching your criteria.
            </p>
            <Button
              variant="link"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory(null);
                setSelectedTag(null);
              }}
            >
              Clear all filters
            </Button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage((p) => p - 1);
                    }}
                    aria-disabled={currentPage === 1}
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(i + 1);
                      }}
                      isActive={currentPage === i + 1}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages)
                        setCurrentPage((p) => p + 1);
                    }}
                    aria-disabled={currentPage === totalPages}
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </main>
  );
}

function ArticleCard({
  article,
  onTagClick,
}: {
  article: Article;
  onTagClick: (tag: string) => void;
}) {
  return (
    <Card className="flex flex-col overflow-hidden transition-shadow duration-200 hover:shadow-lg">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {article.category}
          </Badge>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" /> {article.readingTime}
          </span>
        </div>
        <CardTitle className="line-clamp-2 text-xl">{article.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 text-sm text-muted-foreground">
          {article.excerpt}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {article.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="cursor-pointer text-xs text-primary hover:underline"
              onClick={(e) => {
                e.stopPropagation();
                onTagClick(tag);
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="mt-auto border-t pt-4">
        <div className="flex items-center gap-2">
          <div className="relative h-8 w-8 overflow-hidden rounded-full">
            <Image
              src={article.author.avatar}
              alt={article.author.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col text-xs">
            <span className="font-medium">{article.author.name}</span>
            <span className="text-muted-foreground">{article.date}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
