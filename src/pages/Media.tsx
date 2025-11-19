import { useState } from "react";
import Hero from "@/components/Hero";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Loader } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";

interface MediaItem {
  _id?: string;
  title: string;
  category: string;
  url: string;
  imageUrls?: string[];
  images?: [{ url: string; public_id: string }];
}

// Helper to normalize image sources from different formats
const getImageSources = (item: MediaItem): string[] => {
  const fromImages: string[] = Array.isArray(item.images)
    ? item.images
        .map((i: any) => {
          if (!i) return "";
          if (typeof i === "string") return i;
          if (i.url && typeof i.url === "string") return i.url;
          return "";
        })
        .filter(Boolean)
    : [];

  let fromImageUrls: string[] = [];
  if (Array.isArray(item.imageUrls)) {
    fromImageUrls = (item.imageUrls as any[])
      .map((v) => {
        if (!v) return "";
        if (typeof v === "string") return v;
        if (v.url && typeof v.url === "string") return v.url;
        return "";
      })
      .filter(Boolean);
  } else if (item.imageUrls && typeof (item.imageUrls as any) === "string") {
    fromImageUrls = (item.imageUrls as unknown as string)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  const fallback = item.url ? [item.url] : [];

  const all = [...fromImages, ...fromImageUrls, ...fallback]
    .map((s) => (s || "").trim())
    .filter(Boolean);

  const seen = new Set<string>();
  return all.filter((s) => (seen.has(s) ? false : seen.add(s)));
};

export default function Media() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const { data, isLoading } = useQuery<{ galleries: MediaItem[] } | null>({
    queryKey: ["gallery", "all"],
    queryFn: getQueryFn({ on401: "returnNull", timeout: 5000 }),
    retry: 1,
    retryDelay: 2000,
  });

  const mediaItems = data?.galleries || [];

  const categories = [
    "All",
    ...Array.from(
      new Set(
        mediaItems
          .filter((item) => getImageSources(item).length > 0)
          .map((item) => item.category)
      )
    ),
  ];

  const filteredMedia =
    selectedCategory === "All"
      ? mediaItems
      : mediaItems.filter((item) => item.category === selectedCategory);

  return (
    <div>
      <Hero
        title="Media Gallery"
        description="Explore photos and videos from our programs and events"
        minHeight="min-h-[400px] md:min-h-[500px]"
      />

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {isLoading ? (
            <div className="flex items-center justify-center gap-2 py-12">
              <Loader className="animate-spin size-7 text-muted-foreground" />
              <p className="text-muted-foreground">
                Loading media from gallery...
              </p>
            </div>
          ) : mediaItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No media items available.</p>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap gap-2 mb-8">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={
                      selectedCategory === category ? "default" : "outline"
                    }
                    className={`cursor-pointer hover-elevate ${
                      selectedCategory === category
                        ? "bg-accent text-accent-foreground"
                        : ""
                    }`}
                    onClick={() => setSelectedCategory(category)}
                    data-testid={`category-${category.toLowerCase()}`}
                  >
                    {category}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredMedia.flatMap((item) =>
                  getImageSources(item).map((imageUrl, idx) => (
                    <div
                      key={`${item._id}-${idx}`}
                      className="aspect-square overflow-hidden rounded-lg hover:opacity-60 cursor-pointer hover-elevate"
                      onClick={() => setSelectedImage(imageUrl)}
                      data-testid={`media-item-${item._id}-${idx}`}
                    >
                      <img
                        src={imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                      <p className="absolute bottom-0 left-1 text-white text-xs">
                        {item.title}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </section>

      <Dialog
        open={!!selectedImage}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className="max-w-4xl p-0">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Full size"
              className="w-full h-auto"
              data-testid="lightbox-image"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
