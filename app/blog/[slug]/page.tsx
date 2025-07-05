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
import { Clock, Calendar, User } from "lucide-react";
import { getPostBySlug } from "@/lib/api";
import { Post } from "@/types";

// Ensure dynamic rendering for blog posts
export const revalidate = 60; // Revalidate every 60 seconds

interface PostResponse {
  post: Post;
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const { post } = await getPostBySlug(params.slug);

    if (!post || post.status !== "published") {
      return notFound();
    }

    const renderContent = (content: Post["content"]) => {
      if (!content?.document) return null;

      return content.document.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={index} className="mb-4 text-lg leading-relaxed">
                {block.children.map((child, childIndex) => (
                  <React.Fragment key={childIndex}>{child.text}</React.Fragment>
                ))}
              </p>
            );
          case "heading":
            const HeadingTag = `h${block.level}` as keyof JSX.IntrinsicElements;
            return (
              <HeadingTag
                key={index}
                className="mt-8 mb-4 font-bold tracking-tight"
                style={{ fontSize: `${2.5 - (block.level || 2) * 0.25}rem` }}
              >
                {block.children.map((child, childIndex) => (
                  <React.Fragment key={childIndex}>{child.text}</React.Fragment>
                ))}
              </HeadingTag>
            );
          default:
            return null;
        }
      });
    };

    return (
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Article Header */}
        <header className="mb-12">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories?.map((category) => (
              <Link key={category.id} href={`/category/${category.slug}`}>
                <Badge variant="secondary" className="hover:bg-secondary/80">
                  {category.name}
                </Badge>
              </Link>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.publishedAt}>
                {formatDistanceToNow(new Date(post.publishedAt), {
                  addSuffix: true,
                })}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readingTimeMinutes} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author?.name || "Anonymous"}</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="relative w-full h-[400px] md:h-[500px] mb-12 rounded-lg overflow-hidden">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {renderContent(post.content)}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12">
            <Separator className="mb-6" />
            <div className="flex flex-wrap gap-2">
              <span className="text-muted-foreground">Tags:</span>
              {post.tags.map((tag) => (
                <Link key={tag.id} href={`/tag/${tag.slug}`}>
                  <Badge variant="outline" className="hover:bg-secondary">
                    {tag.name}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Author Bio */}
        {post.author?.bio && (
          <div className="mt-12 p-6 bg-card rounded-lg">
            <div className="flex items-start gap-4">
              <Avatar className="w-12 h-12">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${
                    post.author?.name || "anonymous"
                  }`}
                />
                <AvatarFallback>
                  {post.author?.name ? post.author.name.charAt(0) : "A"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold mb-2">
                  About {post.author?.name || "Anonymous"}
                </h3>
                <p className="text-muted-foreground">{post.author?.bio}</p>
              </div>
            </div>
          </div>
        )}

        {/* Comments Section */}
        <CommentSection postId={post.id} comments={post.comments || []} />

        {/* Related Posts */}
        <RelatedPosts
          currentPostId={post.id}
          categories={post.categories || []}
        />
      </article>
    );
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return notFound();
  }
}
