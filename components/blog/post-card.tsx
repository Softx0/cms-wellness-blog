import React from "react";
import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, Calendar } from "lucide-react";
import { Post } from "@/types";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Card className="overflow-hidden">
      {/* Featured Image */}
      {post.featuredImage && (
        <div className="relative w-full h-48">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <CardHeader>
        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {post.categories.map((category) => (
              <Link key={category.id} href={`/category/${category.slug}`}>
                <Badge variant="secondary" className="hover:bg-secondary/80">
                  {category.name}
                </Badge>
              </Link>
            ))}
          </div>
        )}

        {/* Title */}
        <Link href={`/blog/${post.slug}`}>
          <h3 className="text-xl font-bold hover:text-primary transition-colors">
            {post.title}
          </h3>
        </Link>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
        )}
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <time dateTime={post.publishedAt}>
              {formatDistanceToNow(new Date(post.publishedAt), {
                addSuffix: true,
              })}
            </time>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{post.readingTimeMinutes} min read</span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8">
            {/* <AvatarImage
             src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post?.author?.name}`}
            /> */}
            <AvatarFallback>
              {post.author?.name ? post.author.name.charAt(0) : "A"}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">
            {post.author?.name || "Anonymous"}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
