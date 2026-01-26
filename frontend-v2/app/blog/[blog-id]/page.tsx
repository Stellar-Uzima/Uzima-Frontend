"use client";

import { use, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, type Article } from "@/data/articles";
import { Header } from "@/components/header";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarIcon, Clock, ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function BlogDetailPage({
  params,
}: {
  params: Promise<{ "blog-id": string }>;
}) {
  const { "blog-id": blogId } = use(params);

  const article = articles.find((a) => a.id === blogId);

  if (!article) {
    notFound();
  }

  const relatedArticles = useMemo(() => {
    return articles
      .filter((a) => a.category === article.category && a.id !== article.id)
      .slice(0, 3);
  }, [article]);

  return (
    <main className="min-h-screen bg-background pb-20">
      <Header />

      <article className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>

        {/* Article Header */}
        <header className="mb-10 space-y-6 text-center">
          <div className="flex items-center justify-center gap-2">
            <Badge variant="secondary">{article.category}</Badge>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-full">
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span>{article.author.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4" /> {article.date}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" /> {article.readingTime}
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative mb-12 h-64 w-full overflow-hidden rounded-xl md:h-126 shadow-lg">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert mx-auto ">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>

        {/* Share / Tags Footer */}
        <div className="mt-12 border-t pt-8">
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-sm">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Related Articles
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedArticles.map((related) => (
                <RelatedArticleCard key={related.id} article={related} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

function RelatedArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/blog/${article.id}`} className="group">
      <Card className="h-full overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <CardHeader className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Badge variant="secondary" className="text-[10px] h-5">
              {article.category}
            </Badge>
            <span>{article.readingTime}</span>
          </div>
          <CardTitle className="line-clamp-2 text-lg group-hover:text-primary transition-colors">
            {article.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {article.excerpt}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
