import Image from "next/image";
import { Card, CardTitle } from "../ui/card";
import { useRouter } from "next/navigation";
import { Badge } from "../ui/badge";
import { CalendarIcon, Clock } from "lucide-react";
import { Article, calculateReadingTime } from "@/data/articles";

export function BlogCard({
  article,
  onTagClick,
}: {
  article: Article;
  onTagClick?: (tag: string) => void;
}) {
  const router = useRouter();
  return (
    <Card
      onClick={() => router.push(`/blog/${article.id}`)}
      className="col-span-full cursor-pointer overflow-hidden transition-shadow duration-200 hover:shadow-lg grid md:grid-cols-2 group min-h-96"
    >
      <div className="relative h-64 md:h-full w-full overflow-hidden">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col justify-center p-6 md:p-8 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Badge
              variant="secondary"
              onClick={() => onTagClick?.(article.category)}
            >
              {article.category}
            </Badge>
            <span className="flex items-center gap-1">
              <CalendarIcon className="h-3 w-3" /> {article.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />{" "}
              {calculateReadingTime(article.content)}
            </span>
          </div>
          <CardTitle className="text-2xl md:text-3xl lg:text-4xl leading-tight">
            {article.title}
          </CardTitle>
          <p className="text-muted-foreground text-lg">{article.excerpt}</p>
        </div>

        <div className="flex items-center gap-3 pt-4">
          <div className="relative h-10 w-10 overflow-hidden rounded-full">
            <Image
              src={article.author.avatar}
              alt={article.author.name}
              fill
              className="object-cover"
            />
          </div>
          <span className="font-medium text-sm">{article.author.name}</span>
        </div>
      </div>
    </Card>
  );
}
