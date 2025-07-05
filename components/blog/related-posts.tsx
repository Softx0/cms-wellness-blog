import React from "react";
import PostCard from "./post-card";
import { getPosts } from "@/lib/api";
import { Separator } from "@/components/ui/separator";
import { Post, Category, PostsResponse } from "@/types";

interface RelatedPostsProps {
  currentPostId: string;
  categories: Category[];
}

async function getRelatedPosts(currentPostId: string, categories: Category[]) {
  if (!categories.length) return [];

  const categoryIds = categories.map((cat) => cat.id);
  const { posts } = (await getPosts({
    limit: 3,
    where: {
      status: { equals: "published" },
      id: { not: { equals: currentPostId } },
      categories: { some: { id: { in: categoryIds } } },
    },
  })) as PostsResponse;

  return posts;
}

export default async function RelatedPosts({
  currentPostId,
  categories,
}: RelatedPostsProps) {
  const relatedPosts = await getRelatedPosts(currentPostId, categories);

  if (!relatedPosts.length) return null;

  return (
    <section className="mt-16">
      <Separator className="mb-8" />
      <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
