import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PostCard from "@/components/blog/post-card";
import CategoryList from "@/components/blog/category-list";
import FeaturedPosts from "@/components/blog/featured-posts";
import Newsletter from "@/components/blog/newsletter";

// This would normally come from your API
const mockFeaturedPosts = [
  {
    id: "1",
    title: "10 Simple Habits for Better Sleep",
    slug: "10-simple-habits-for-better-sleep",
    excerpt: "Discover scientifically-backed techniques to improve your sleep quality and wake up refreshed.",
    publishedAt: "2025-03-15T12:00:00Z",
    readingTimeMinutes: 8,
    featuredImage: "https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg",
    author: { id: "1", name: "Dr. Sarah Chen" },
    categories: [{ id: "1", name: "Wellness", slug: "wellness" }],
    tags: [{ id: "1", name: "Sleep", slug: "sleep" }],
  },
  {
    id: "2",
    title: "Mediterranean Diet: A Complete Guide",
    slug: "mediterranean-diet-complete-guide",
    excerpt: "Learn about one of the healthiest diets in the world and how to incorporate it into your lifestyle.",
    publishedAt: "2025-03-10T14:30:00Z",
    readingTimeMinutes: 12,
    featuredImage: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg",
    author: { id: "2", name: "Marco Oliveira, RD" },
    categories: [{ id: "2", name: "Nutrition", slug: "nutrition" }],
    tags: [{ id: "2", name: "Diet", slug: "diet" }],
  },
  {
    id: "3",
    title: "5 Meditation Techniques for Anxiety Relief",
    slug: "meditation-techniques-anxiety-relief",
    excerpt: "Effective meditation practices that can help reduce anxiety and bring more calm to your day.",
    publishedAt: "2025-03-05T09:15:00Z",
    readingTimeMinutes: 7,
    featuredImage: "https://images.pexels.com/photos/3759661/pexels-photo-3759661.jpeg",
    author: { id: "3", name: "Leila Patel" },
    categories: [{ id: "3", name: "Mental Health", slug: "mental-health" }],
    tags: [{ id: "3", name: "Meditation", slug: "meditation" }],
  },
];

const mockRecentPosts = [
  {
    id: "4",
    title: "Understanding Macronutrients: Protein, Fats, and Carbs",
    slug: "understanding-macronutrients",
    excerpt: "A comprehensive breakdown of macronutrients and how to balance them for optimal health.",
    publishedAt: "2025-03-01T10:45:00Z",
    readingTimeMinutes: 10,
    featuredImage: "https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg",
    author: { id: "2", name: "Marco Oliveira, RD" },
    categories: [{ id: "2", name: "Nutrition", slug: "nutrition" }],
    tags: [{ id: "4", name: "Macronutrients", slug: "macronutrients" }],
  },
  {
    id: "5",
    title: "The Ultimate Guide to Home Workouts",
    slug: "ultimate-guide-home-workouts",
    excerpt: "No equipment? No problem. Learn how to get fit and strong without leaving your home.",
    publishedAt: "2025-02-28T15:20:00Z",
    readingTimeMinutes: 15,
    featuredImage: "https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg",
    author: { id: "4", name: "Alex Johnson" },
    categories: [{ id: "4", name: "Fitness", slug: "fitness" }],
    tags: [{ id: "5", name: "Home Workout", slug: "home-workout" }],
  },
  {
    id: "6",
    title: "Digital Detox: Why and How to Disconnect",
    slug: "digital-detox-disconnect",
    excerpt: "Learn about the benefits of taking a break from screens and how to implement a digital detox.",
    publishedAt: "2025-02-25T11:30:00Z",
    readingTimeMinutes: 9,
    featuredImage: "https://images.pexels.com/photos/196655/pexels-photo-196655.jpeg",
    author: { id: "3", name: "Leila Patel" },
    categories: [{ id: "5", name: "Lifestyle", slug: "lifestyle" }],
    tags: [{ id: "6", name: "Digital Wellbeing", slug: "digital-wellbeing" }],
  },
];

const mockCategories = [
  { id: "1", name: "Wellness", slug: "wellness" },
  { id: "2", name: "Nutrition", slug: "nutrition" },
  { id: "3", name: "Mental Health", slug: "mental-health" },
  { id: "4", name: "Fitness", slug: "fitness" },
  { id: "5", name: "Lifestyle", slug: "lifestyle" },
];

export default function Home() {
  return (
    <div className="pt-16 pb-8">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/5 dark:to-secondary/5" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            <div className="w-full md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                Your Journey to <br />
                <span className="text-primary">Wellness</span> Starts Here
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
                Discover expert-backed articles on nutrition, fitness, mental health, and holistic approaches to well-being.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/category/wellness">Explore Articles</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="w-full md:w-1/2 rounded-2xl overflow-hidden shadow-xl transform transition-all hover:scale-[1.01] duration-500">
              <Image
                src="https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg"
                alt="Wellness lifestyle"
                width={600}
                height={400}
                className="w-full h-auto object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-secondary/30 dark:bg-secondary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Explore Topics</h2>
            <p className="text-muted-foreground mt-2">Discover content curated for your well-being journey</p>
          </div>
          <CategoryList categories={mockCategories} />
        </div>
      </section>

      {/* Featured Posts Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold">Featured Articles</h2>
              <p className="text-muted-foreground mt-2">Handpicked content by our editorial team</p>
            </div>
            <Button variant="link" asChild className="hidden md:flex">
              <Link href="/blog">View all articles →</Link>
            </Button>
          </div>
          <FeaturedPosts posts={mockFeaturedPosts} />
          <div className="text-center mt-8 md:hidden">
            <Button variant="outline" asChild>
              <Link href="/blog">View all articles</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="py-16 bg-secondary/30 dark:bg-secondary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Latest Articles</h2>
            <p className="text-muted-foreground mt-2">Fresh content for your reading pleasure</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockRecentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Newsletter />
        </div>
      </section>
    </div>
  );
}