import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { getBlogPostById, BlogPost } from "@/lib/localStorage";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  ThumbsUpIcon,
  Bookmark,
  Share2,
  Eye,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format, isValid } from "date-fns";

export default function BlogDetail() {
  const { toast } = useToast();
  const [, params] = useRoute("/blog/:id");
  const [post, setPost] = useState<BlogPost | null>(null);
  const { data, isLoading, error } = useQuery({
    queryKey: ["blogs", `${params?.id}`],
  });

  useEffect(() => {
    if (data) {
      setPost(data?.blog);
    }
  }, [params?.id]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The blog post you're looking for doesn't exist.
          </p>
          <Link href="/blog">
            <Button data-testid="button-back-to-blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <Link href="/blog">
            <Button variant="ghost" className="mb-6" data-testid="button-back">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>

          <article>
            <div className="mb-6">
              <Badge
                variant="secondary"
                className="mb-4"
                data-testid="blog-detail-category"
              >
                {post.category}
              </Badge>
              <h1
                className="text-4xl md:text-5xl font-bold mb-6"
                data-testid="blog-detail-title"
              >
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span data-testid="blog-detail-author">{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span data-testid="blog-detail-date">
                    {post.date && isValid(new Date(post.date))
                      ? format(new Date(post.date), "PPP")
                      : "Date not available"}
                  </span>
                </div>
                {post.readTime && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span data-testid="blog-detail-read-time">
                      {post.readTime}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {post.imageUrl ||
              (post?.image?.url && (
                <div className="mb-8">
                  <img
                    src={post.imageUrl || post?.image?.url}
                    alt={post.title}
                    className="w-full max-h-[500px] object-fill rounded-2xl"
                    data-testid="blog-detail-image"
                  />
                </div>
              ))}

            <div className="prose prose-lg max-w-none mb-12">
              <p
                className="text-xl text-muted-foreground leading-relaxed mb-8"
                data-testid="blog-detail-excerpt"
              >
                {post.excerpt}
              </p>

              {post.content && (
                <div
                  className="text-muted-foreground leading-relaxed whitespace-pre-line"
                  data-testid="blog-detail-content"
                >
                  {post.content}
                </div>
              )}
            </div>

            {/* Likes and Share Section */}
            <span className="flex-row mt-10 flex items-center gap-4 p-3 text-xs text-muted-foreground">
              {/* Liking Btn */}
              <span className="flex-row cursor-pointer flex   items-center gap-2   transition-colors">
                0 Views
                <Eye className=" hover:text-primary" size={16} />
              </span>
              <span className="flex-row cursor-pointer flex   items-center gap-2   transition-colors">
                0 Likes
                <ThumbsUpIcon className="mb-1 hover:text-primary" size={16} />
              </span>

              {/* Saving Btn */}
              <span className="flex-row cursor-pointer flex items-center gap-2   transition-colors">
                Save
                <Bookmark size={16} className="hover:text-primary" />
              </span>

              {/* Sharing Btn */}
              <span
                className="flex-row cursor-pointer flex-1 flex items-center gap-2   transition-colors"
                onClick={() => {
                  try {
                    const url = `${window.location.origin}/blog/${params?.id}`;
                    navigator.clipboard?.writeText(url);
                    toast({ title: "link copied" });
                  } catch (e) {
                    toast({
                      title: "Could not copy link",
                      variant: "destructive",
                    });
                  }
                }}
              >
                <span>Share</span>
                <Share2 size={16} className="hover:text-primary" />
              </span>
              <span className="text-xs text-muted">
                {post.date && isValid(new Date(post.date))
                  ? format(new Date(post.date), "PPP")
                  : "Date not available"}
              </span>
            </span>

            <Card className="p-6 bg-card">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-lg">{post.author}</p>
                  <p className="text-sm text-muted-foreground">
                    Contributor at Tova ku Status
                  </p>
                </div>
              </div>
            </Card>

            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-2xl font-bold mb-6">Continue Reading</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/blog">
                  <Button variant="outline" data-testid="button-all-posts">
                    View All Posts
                  </Button>
                </Link>
                <Link href="/get-involved">
                  <Button data-testid="button-get-involved">
                    Support Our Mission
                  </Button>
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
