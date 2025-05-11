import React from "react";
import { cn } from "@/lib/utils";
import PostCard from "./post-card";

interface FeaturedPostsProps {
  posts: any[];
  className?: string;
}

export default function FeaturedPosts({ posts, className }: FeaturedPostsProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-12 gap-6", className)}>
      {posts.length > 0 && (
        <div className="md:col-span-6 lg:col-span-6">
          <PostCard post={posts[0]} variant="featured" />
        </div>
      )}
      <div className="md:col-span-6 lg:col-span-6 grid grid-cols-1 gap-6">
        {posts.slice(1, 3).map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}