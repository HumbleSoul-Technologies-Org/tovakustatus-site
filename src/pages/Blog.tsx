import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import BlogCard from "@/components/BlogCard";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { getBlogPosts, BlogPost } from "@/lib/localStorage";
import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import { Loader } from "lucide-react";

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const { data, isLoading, error } = useQuery<{ blogs: BlogPost[] } | null>({
    queryKey: ["blogs", "all"],
    queryFn: getQueryFn({ on401: "returnNull", timeout: 5000 }),
    retry: 1,
    retryDelay: 2000,
  });
  useEffect(() => {
    // window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (data && data.blogs && data.blogs.length > 0) {
      setBlogPosts(data.blogs);
    }
  }, [data]);

  return (
    <div>
      <Hero
        title="Blog & News"
        description="Stories, updates, and insights from our community"
        minHeight="min-h-[400px] md:min-h-[500px]"
      />

      {isLoading && (
        <section className="py-16 bg-background flex items-center justify-center flex-1 md:py-24 ">
          <span className="flex gap-3 items-center">
            Loading Posts ... <Loader className="animate-spin size-6" />
          </span>
        </section>
      )}

      {!isLoading && blogPosts && blogPosts.length > 0 ? (
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            {/* Featured Video Section */}
            {blogPosts.some((post) => post.videoUrl) && (
              <div className="mb-16">
                <h2 className="text-3xl font-bold mb-8">Featured Video</h2>
                <YouTubeEmbed
                  videoUrl={blogPosts.find((post) => post.videoUrl)?.videoUrl}
                  title="Featured Blog Video"
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts?.map((post) => (
                <BlogCard key={post._id} {...post} />
              ))}
            </div>
          </div>
        </section>
      ) : (
        !isLoading && (
          <section className="py-16 bg-background flex items-center justify-center flex-1 md:py-24 ">
            <p>No posts availabe!</p>
          </section>
        )
      )}
    </div>
  );
}
