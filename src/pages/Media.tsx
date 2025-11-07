import { useState } from "react";
import Hero from "@/components/Hero";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import mediaImage1 from "/Community_workshop_outreach_event_photo_3fb17f3c.png";
import mediaImage2 from "/Sports_day_community_event_photo_a4d50b69.png";
import mediaImage3 from "/Talent_showcase_performance_event_photo_037e6d5f.png";
import talentImage1 from "/Talented_girl_with_violin_portrait_f9f1e1a7.png";
import talentImage2 from "/Talented_boy_playing_soccer_portrait_4a119641.png";
import talentImage3 from "/Talented_girl_painting_art_portrait_9df2082c.png";

export default function Media() {
  // TODO: remove mock data functionality
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Events", "Talents", "Projects", "Workshops"];

  const mediaItems = [
    {
      id: "1",
      imageUrl: mediaImage1,
      category: "Workshops",
      title: "Music Workshop",
    },
    { id: "2", imageUrl: mediaImage2, category: "Events", title: "Sports Day" },
    {
      id: "3",
      imageUrl: mediaImage3,
      category: "Events",
      title: "Talent Showcase",
    },
    {
      id: "4",
      imageUrl: talentImage1,
      category: "Talents",
      title: "Young Musician",
    },
    {
      id: "5",
      imageUrl: talentImage2,
      category: "Talents",
      title: "Football Player",
    },
    {
      id: "6",
      imageUrl: talentImage3,
      category: "Talents",
      title: "Young Artist",
    },
    {
      id: "7",
      imageUrl: mediaImage1,
      category: "Projects",
      title: "Community Outreach",
    },
    {
      id: "8",
      imageUrl: mediaImage2,
      category: "Workshops",
      title: "Art Class",
    },
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
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
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
            {filteredMedia.map((item) => (
              <div
                key={item.id}
                className="aspect-square overflow-hidden  rounded-lg hover:opacity-60 cursor-pointer hover-elevate"
                onClick={() => setSelectedImage(item.imageUrl)}
                data-testid={`media-item-${item.id}`}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <p className="absolute bottom-0 left-1 text-white text-xs">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
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
