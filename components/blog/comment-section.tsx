"use client";

import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Comment } from "@/types";

interface CommentSectionProps {
  comments: Comment[];
  postId: string;
}

export default function CommentSection({
  comments,
  postId,
}: CommentSectionProps) {
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.trim()) {
      toast.error("Please enter a comment");
      return;
    }

    setIsSubmitting(true);

    // In a real application, you would call your API here
    // For example: await addComment({ content: newComment, postId });

    // Simulating API call
    setTimeout(() => {
      setIsSubmitting(false);
      setNewComment("");
      toast.success("Your comment has been submitted for moderation");
    }, 1000);
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">Comments ({comments.length})</h3>

      {/* Comment form */}
      <div className="mb-8">
        <form onSubmit={handleSubmitComment}>
          <Textarea
            placeholder="Share your thoughts..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="mb-4 min-h-[100px]"
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Post Comment"}
          </Button>
        </form>
      </div>

      {/* Comments list */}
      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <Avatar>
                <AvatarFallback>
                  {comment.author?.name ? comment.author.name.charAt(0) : "A"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-medium">
                    {comment.author?.name || "Anonymous"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(comment.createdAt), {
                      addSuffix: true,
                    })}
                  </div>
                </div>
                <p className="text-sm text-foreground">{comment.content}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground text-center py-6">
            Be the first to share your thoughts on this article
          </p>
        )}
      </div>
    </div>
  );
}
