import React from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CommentSection from "@/components/blog/comment-section";
import RelatedPosts from "@/components/blog/related-posts";
import { Clock, Calendar, User, Share2 } from "lucide-react";

export async function generateStaticParams() {
  // This would typically fetch from your API/database
  // For now, we'll include our hello-world example
  return [
    { slug: "hello-world" },
    { slug: "10-simple-habits-for-better-sleep" }
  ];
}

// This would be replaced with actual data from your API
const getPostData = (slug: string) => {
  // Mock posts data
  const posts = {
    "hello-world": {
      id: "hello",
      title: "Welcome to Our Blog",
      slug: "hello-world",
      status: "published",
      publishedAt: "2025-03-20T12:00:00Z",
      excerpt: "Get started with our comprehensive guide to wellness and healthy living.",
      content: {
        document: [
          {
            type: "paragraph",
            children: [
              {
                text: "Welcome to our blog! Here, we're dedicated to sharing valuable insights about health, wellness, and living your best life. This post serves as an introduction to our content and what you can expect from our platform."
              }
            ]
          },
          {
            type: "heading",
            level: 2,
            children: [{ text: "What We Cover" }]
          },
          {
            type: "paragraph",
            children: [
              {
                text: "Our blog focuses on various aspects of wellness, including physical health, mental well-being, nutrition, fitness, and lifestyle improvements. We believe in providing evidence-based information that you can trust and implement in your daily life."
              }
            ]
          },
          {
            type: "heading",
            level: 2,
            children: [{ text: "Our Commitment" }]
          },
          {
            type: "paragraph",
            children: [
              {
                text: "We are committed to delivering high-quality, actionable content that helps you make informed decisions about your health and wellness journey. Our team of experts ensures that all information is thoroughly researched and up-to-date."
              }
            ]
          },
          {
            type: "heading",
            level: 2,
            children: [{ text: "Join Our Community" }]
          },
          {
            type: "paragraph",
            children: [
              {
                text: "We invite you to join our growing community of health-conscious individuals. Share your thoughts in the comments, engage with other readers, and be part of meaningful discussions about health and wellness."
              }
            ]
          }
        ]
      },
      readingTimeMinutes: 5,
      featuredImage: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
      author: {
        id: "1",
        name: "Emma Wilson",
        bio: "Emma Wilson is our lead content creator with expertise in health and wellness journalism."
      },
      categories: [{ id: "1", name: "Getting Started", slug: "getting-started" }],
      tags: [{ id: "1", name: "Welcome", slug: "welcome" }],
      comments: [
        {
          id: "1",
          content: "Looking forward to reading more articles!",
          createdAt: "2025-03-21T10:30:00Z",
          author: { id: "5", name: "Alex Thompson" }
        }
      ],
      seoMetadata: {
        title: "Welcome to Our Blog - Your Guide to Wellness",
        description: "Get started with our comprehensive guide to wellness and healthy living.",
        keywords: "wellness, health, lifestyle, blog, introduction",
        ogImage: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
        canonicalUrl: "https://wellnessblog.com/blog/hello-world",
      }
    },
    "10-simple-habits-for-better-sleep": {
      id: "1",
      title: "10 Simple Habits for Better Sleep",
      slug: "10-simple-habits-for-better-sleep",
      status: "published",
      publishedAt: "2025-03-15T12:00:00Z",
      excerpt: "Discover scientifically-backed techniques to improve your sleep quality and wake up refreshed.",
      content: {
        document: [
          {
            type: "paragraph",
            children: [
              {
                text: "Sleep is essential for our physical and mental well-being. Yet, in our busy lives, quality sleep often takes a backseat. This comprehensive guide explores ten scientifically-backed habits that can significantly improve your sleep quality."
              }
            ]
          },
          {
            type: "heading",
            level: 2,
            children: [{ text: "1. Maintain a Consistent Sleep Schedule" }]
          },
          {
            type: "paragraph",
            children: [
              {
                text: "Our bodies thrive on routine. Going to bed and waking up at the same time every day—even on weekends—helps regulate your body's internal clock. This consistency reinforces your sleep-wake cycle and can help you fall asleep and stay asleep for the night."
              }
            ]
          },
          {
            type: "heading",
            level: 2,
            children: [{ text: "2. Create a Restful Environment" }]
          },
          {
            type: "paragraph",
            children: [
              {
                text: "Your bedroom should be a sanctuary for sleep. Keep it cool, quiet, and dark. Consider using blackout curtains, eye masks, earplugs, or white noise machines. Ensure your mattress and pillows are comfortable and supportive."
              }
            ]
          },
          {
            type: "heading",
            level: 2,
            children: [{ text: "3. Limit Exposure to Screens Before Bed" }]
          },
          {
            type: "paragraph",
            children: [
              {
                text: "The blue light emitted by phones, tablets, and computers can interfere with your ability to fall asleep. Try to disconnect from electronic devices at least 30 minutes before bedtime to signal to your brain that it's time to wind down."
              }
            ]
          },
          {
            type: "heading",
            level: 2,
            children: [{ text: "4. Watch What You Eat and Drink" }]
          },
          {
            type: "paragraph",
            children: [
              {
                text: "Avoid large meals, caffeine, and alcohol before bedtime. These can disrupt sleep patterns and quality. If you're hungry before bed, opt for a light, sleep-promoting snack like a banana or a small bowl of whole-grain cereal."
              }
            ]
          },
          {
            type: "heading",
            level: 2,
            children: [{ text: "5. Incorporate Physical Activity" }]
          },
          {
            type: "paragraph",
            children: [
              {
                text: "Regular physical activity can help you fall asleep faster and enjoy deeper sleep. Just be sure not to exercise too close to bedtime, as it might interfere with your ability to fall asleep."
              }
            ]
          },
          {
            type: "heading",
            level: 2,
            children: [{ text: "6. Manage Stress and Anxiety" }]
          },
          {
            type: "paragraph",
            children: [
              {
                text: "Stress and anxiety can make it hard to fall asleep and stay asleep. Try relaxation techniques such as meditation, deep breathing, or progressive muscle relaxation before bedtime."
              }
            ]
          },
          {
            type: "heading",
            level: 2,
            children: [{ text: "7. Establish a Pre-Sleep Routine" }]
          },
          {
            type: "paragraph",
            children: [
              {
                text: "Develop a relaxing routine before bedtime to help your body recognize that it's time to sleep. This could include taking a warm bath, reading a book, or practicing gentle yoga or stretching."
              }
            ]
          },
          {
            type: "heading",
            level: 2,
            children: [{ text: "8. Limit Daytime Naps" }]
          },
          {
            type: "paragraph",
            children: [
              {
                text: "Long daytime naps can interfere with nighttime sleep. If you choose to nap, limit yourself to about 20-30 minutes and make it during the early afternoon."
              }
            ]
          },
          {
            type: "heading",
            level: 2,
            children: [{ text: "9. Expose Yourself to Natural Light" }]
          },
          {
            type: "paragraph",
            children: [
              {
                text: "Natural light exposure during the day helps keep your circadian rhythm healthy. Try to get outside in natural sunlight for at least 30 minutes each day."
              }
            ]
          },
          {
            type: "heading",
            level: 2,
            children: [{ text: "10. Seek Professional Help When Needed" }]
          },
          {
            type: "paragraph",
            children: [
              {
                text: "If you're still struggling with sleep after implementing these habits, it might be time to talk to a healthcare provider. Sleep disorders are common and treatable."
              }
            ]
          },
          {
            type: "heading",
            level: 2,
            children: [{ text: "Conclusion" }]
          },
          {
            type: "paragraph",
            children: [
              {
                text: "Quality sleep is not a luxury—it's a necessity for optimal health and well-being. By incorporating these ten habits into your daily routine, you can set yourself up for better sleep and, consequently, better health."
              }
            ]
          },
        ]
      },
      readingTimeMinutes: 8,
      featuredImage: "https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg",
      author: { 
        id: "1", 
        name: "Dr. Sarah Chen",
        bio: "Dr. Sarah Chen is a sleep researcher with over 10 years of experience in the field of sleep medicine."
      },
      categories: [{ id: "1", name: "Wellness", slug: "wellness" }],
      tags: [{ id: "1", name: "Sleep", slug: "sleep" }],
      comments: [
        {
          id: "1",
          content: "Great article! I've been struggling with sleep for years and these tips are really helpful.",
          createdAt: "2025-03-16T10:30:00Z",
          author: { id: "5", name: "Jamie Smith" }
        },
        {
          id: "2",
          content: "I've found that limiting screen time before bed made the biggest difference for me. Thanks for sharing these tips!",
          createdAt: "2025-03-17T15:45:00Z",
          author: { id: "6", name: "Taylor Johnson" }
        }
      ],
      seoMetadata: {
        title: "10 Simple Habits for Better Sleep - Wellness Blog",
        description: "Discover scientifically-backed techniques to improve your sleep quality and wake up refreshed.",
        keywords: "sleep, better sleep, sleep habits, sleep quality, insomnia, sleep tips",
        ogImage: "https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg",
        canonicalUrl: "https://wellnessblog.com/blog/10-simple-habits-for-better-sleep",
      }
    }
  };

  const post = posts[slug];
  
  if (!post) {
    return null;
  }

  return post;
};

// This would be replaced with data from your API
const mockRelatedPosts = [
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
  {
    id: "9",
    title: "Natural Remedies for Insomnia",
    slug: "natural-remedies-for-insomnia",
    excerpt: "Explore natural and effective ways to combat insomnia without relying on medication.",
    publishedAt: "2025-02-15T14:45:00Z",
    readingTimeMinutes: 9,
    featuredImage: "https://images.pexels.com/photos/267189/pexels-photo-267189.jpeg",
    author: { id: "3", name: "Leila Patel" },
    categories: [{ id: "1", name: "Wellness", slug: "wellness" }],
    tags: [{ id: "1", name: "Sleep", slug: "sleep" }],
  },
];

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostData(params.slug);
  
  if (!post) {
    notFound();
  }

  const formattedDate = formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true });

  // Simple renderer for the document content
  const renderContent = (content: any) => {
    return content.document.map((block: any, index: number) => {
      if (block.type === 'paragraph') {
        return (
          <p key={index} className="mb-6 leading-relaxed">
            {block.children.map((child: any, childIndex: number) => child.text)}
          </p>
        );
      }
      if (block.type === 'heading') {
        const HeadingTag = `h${block.level}` as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag key={index} className="font-bold mt-8 mb-4">
            {block.children.map((child: any, childIndex: number) => child.text)}
          </HeadingTag>
        );
      }
      return null;
    });
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <article className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((category) => (
                <Link href={`/category/${category.slug}`} key={category.id}>
                  <Badge variant="secondary">{category.name}</Badge>
                </Link>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{post.title}</h1>
            <p className="text-lg text-muted-foreground mb-6">{post.excerpt}</p>
            
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center">
                <Avatar className="mr-3">
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{post.author.name}</div>
                  <div className="text-sm text-muted-foreground">Author</div>
                </div>
              </div>
              
              <div className="flex gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{post.readingTimeMinutes} min read</span>
                </div>
              </div>
            </div>
          </header>
          
          {/* Featured Image */}
          <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden mb-8">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
              className="object-cover"
              priority
            />
          </div>
          
          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            {renderContent(post.content)}
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <Link href={`/tag/${tag.slug}`} key={tag.id}>
                <Badge variant="outline">#{tag.name}</Badge>
              </Link>
            ))}
          </div>
          
          {/* Author Bio */}
          <div className="bg-secondary/30 dark:bg-secondary/10 rounded-lg p-6 mb-12">
            <div className="flex items-start gap-4">
              <Avatar className="w-12 h-12">
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-lg">{post.author.name}</h3>
                <p className="text-muted-foreground mt-1">{post.author.bio}</p>
              </div>
            </div>
          </div>
          
          {/* Comment Section */}
          <Separator className="mb-8" />
          <CommentSection comments={post.comments} postId={post.id} />
          
          {/* Related Posts */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <RelatedPosts posts={mockRelatedPosts} />
          </div>
        </article>
      </div>
    </div>
  );
}