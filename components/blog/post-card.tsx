import React from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User } from "lucide-react";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  readingTimeMinutes: number;
  featuredImage: string;
  author: {
    id: string;
    name: string;
  };
  categories: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  tags?: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
};

interface PostCardProps {
  post: Post;
  variant?: "default" | "featured";
}

export default function PostCard({ post, variant = "default" }: PostCardProps) {
  const isFeatured = variant === "featured";
  const formattedDate = formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true });

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md h-full flex flex-col">
      <div className="overflow-hidden">
        <Link href={`/blog/${post.slug}`}>
          <div className="relative h-48 md:h-56 w-full">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </Link>
      </div>
      <CardContent className="pt-6 flex-grow">
        <div className="flex items-center gap-2 mb-3">
          {post.categories[0] && (
            <Link href={`/category/${post.categories[0].slug}`}>
              <Badge variant="secondary">{post.categories[0].name}</Badge>
            </Link>
          )}
          <span className="text-xs text-muted-foreground">{formattedDate}</span>
        </div>
        <Link href={`/blog/${post.slug}`} className="hover:underline">
          <h3 className={`font-bold ${isFeatured ? 'text-2xl' : 'text-xl'} mb-2`}>{post.title}</h3>
        </Link>
        <p className="text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>
      </CardContent>
      <CardFooter className="pt-0 pb-6 flex justify-between border-t border-border/30 mt-auto">
        <div className="flex items-center">
          <User className="h-4 w-4 mr-1 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{post.author.name}</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{post.readingTimeMinutes} min read</span>
        </div>
      </CardFooter>
    </Card>
  );
}