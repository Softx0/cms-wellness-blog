import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PostCard from "@/components/blog/post-card";

export async function generateStaticParams() {
  // This would typically fetch from your API/database
  return [
    { slug: "wellness" },
    { slug: "nutrition" },
    { slug: "mental-health" },
    { slug: "fitness" },
    { slug: "lifestyle" }
  ];
}

// This would be replaced with data from your API
const getCategoryData = (slug: string) => {
  // Mock categories data
  const categories = {
    "wellness": {
      id: "1",
      name: "Wellness",
      slug: "wellness",
      description: "Articles about overall health and wellness to help you live your best life.",
      posts: [
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
          id: "7",
          title: "How to Create a Bedtime Routine for Adults",
          slug: "bedtime-routine-for-adults",
          excerpt: "Learn how to establish a relaxing bedtime routine to improve your sleep quality.",
          publishedAt: "2025-02-20T16:15:00Z",
          readingTimeMinutes: 6,
          featuredImage: "https://images.pexels.com/photos/5082567/pexels-photo-5082567.jpeg",
          author: { id: "1", name: "Dr. Sarah Chen" },
          categories: [{ id: "1", name: "Wellness", slug: "wellness" }],
          tags: [{ id: "1", name: "Sleep", slug: "sleep" }],
        },
        {
          id: "8",
          title: "The Science of Sleep Cycles",
          slug: "science-of-sleep-cycles",
          excerpt: "Understanding your sleep cycles and how they affect your overall health and well-being.",
          publishedAt: "2025-02-18T09:00:00Z",
          readingTimeMinutes: 11,
          featuredImage: "https://images.pexels.com/photos/3771045/pexels-photo-3771045.jpeg",
          author: { id: "1", name: "Dr. Sarah Chen" },
          categories: [{ id: "1", name: "Wellness", slug: "wellness" }],
          tags: [{ id: "1", name: "Sleep", slug: "sleep" }],
        },
      ]
    },
    "nutrition": {
      id: "2",
      name: "Nutrition",
      slug: "nutrition",
      description: "Discover the latest research and advice on food, diet, and nutrition for optimal health.",
      posts: [
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
        }
      ]
    },
    "mental-health": {
      id: "3",
      name: "Mental Health",
      slug: "mental-health",
      description: "Articles focused on mental wellbeing, mindfulness, and strategies for reducing stress and anxiety.",
      posts: [
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
        }
      ]
    },
    "fitness": {
      id: "4",
      name: "Fitness",
      slug: "fitness",
      description: "Exercise tips, workout plans, and fitness advice for all levels, from beginners to advanced athletes.",
      posts: [
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
        }
      ]
    },
    "lifestyle": {
      id: "5",
      name: "Lifestyle",
      slug: "lifestyle",
      description: "Tips and guides for implementing healthy habits, routines, and practices in your daily life.",
      posts: [
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
        }
      ]
    }
  };

  return categories[slug as keyof typeof categories] || null;
};

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategoryData(params.slug);
  
  if (!category) {
    return (
      <div className="pt-24 pb-16 text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
          <p className="text-muted-foreground mb-8">The category you are looking for does not exist.</p>
          <Button asChild>
            <Link href="/blog">Back to Blog</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {category.description}
          </p>
        </header>

        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">All Articles in {category.name}</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Latest
              </Button>
              <Button variant="ghost" size="sm">
                Popular
              </Button>
            </div>
          </div>

          {category.posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No articles found in this category.</p>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <Button variant="outline" asChild>
            <Link href="/blog">Back to All Articles</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}