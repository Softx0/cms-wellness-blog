import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PostCard from "@/components/blog/post-card";
import CategoryList from "@/components/blog/category-list";
import FeaturedPosts from "@/components/blog/featured-posts";
import Newsletter from "@/components/blog/newsletter";
import { getPosts, getCategories } from "@/lib/api";

// Import the Post type from the PostCard component
type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  readingTimeMinutes: number;
  featuredImage: string;
  status?: string;
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

type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
};

type PostsResponse = {
  posts: Post[];
  postsCount: number;
};

type CategoriesResponse = {
  categories: Category[];
};

// This ensures the page is dynamically rendered
export const revalidate = 60; // Revalidate every 60 seconds

async function getInitialData() {
  try {
    // Get recent posts (status = published)
    const { posts: recentPosts } = (await getPosts({
      limit: 6,
      where: {
        status: { equals: "published" },
      },
    })) as PostsResponse;

    // Get categories
    const { categories } = (await getCategories()) as CategoriesResponse;

    return {
      recentPosts: recentPosts || [],
      categories: categories || [],
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      recentPosts: [],
      categories: [],
    };
  }
}

export default async function Home() {
  const { recentPosts, categories } = await getInitialData();

  return (
    <main>
      {/* Hero Section */}
      <section className="relative py-20 bg-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Welcome to Our Blog
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Discover insights, tips, and stories about wellness and healthy
              living.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild>
                <Link href="/blog">Start Reading</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
      {recentPosts.length > 0 && (
        <section className="py-16 bg-secondary/30 dark:bg-secondary/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Latest Articles</h2>
              <p className="text-muted-foreground mt-2">
                Fresh content for your reading pleasure
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post: Post) => (
                <PostCard
                  key={post.id}
                  post={{ ...post, status: post.status || "published" }}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories Section */}
      {categories.length > 0 && <CategoryList categories={categories} />}

      {/* Newsletter Section */}
      <Newsletter />
    </main>
  );
}
