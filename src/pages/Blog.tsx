import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import BlogCard from "@/components/BlogCard";
import { getBlogPosts, BlogPost } from "@/lib/localStorage";

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const data = getBlogPosts();
    setBlogPosts(data);
  }, []);

  return (
    <div>
      <Hero
        title="Blog & News"
        description="Stories, updates, and insights from our community"
        minHeight="min-h-[400px] md:min-h-[500px]"
      />

      {blogPosts && blogPosts.length > 0 ? (
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts?.map((post) => (
                <BlogCard key={post._id} {...post} />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="py-16 bg-background flex items-center justify-center flex-1 md:py-24 ">
          <p>No posts availabe!</p>
        </section>
      )}
    </div>
  );
}
