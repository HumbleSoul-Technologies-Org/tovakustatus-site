import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Image, Upload, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import "@splidejs/splide/css";
import { Splide as SplideReact, SplideSlide } from "@splidejs/react-splide";

const mediaFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  category: z.string().min(1, "Please select a category"),
  url: z.string().optional(),
  videoUrl: z.string().optional(),
});

type MediaFormData = z.infer<typeof mediaFormSchema>;

interface MediaItem {
  _id?: string;
  title: string;
  category: string;
  url: string;
  imageUrls?: string[];
  images?: { url: string; public_id: string }[];
  videoUrls?: string[];
}

// Hook to manage preview URLs
const usePreview = (
  selectedFile: File | null,
  url: string,
  videoUrl: string
) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let objectUrl: string | null = null;

    if (selectedFile) {
      objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
      setPreviewUrls([]);
      setCurrentIndex(0);
    } else if (url) {
      const urls = url
        .split(",")
        .map((u) => u.trim())
        .filter((u) => u.length > 0);
      setPreviewUrls(urls);
      setCurrentIndex(0);
      setPreviewUrl(urls[0] || null);
    } else if (videoUrl) {
      setPreviewUrl(videoUrl);
      setPreviewUrls([]);
      setCurrentIndex(0);
    } else {
      setPreviewUrl(null);
      setPreviewUrls([]);
      setCurrentIndex(0);
    }

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [selectedFile, url, videoUrl]);

  const navigate = (direction: "prev" | "next") => {
    setCurrentIndex((prev) => {
      const newIndex =
        direction === "next"
          ? (prev + 1) % previewUrls.length
          : (prev - 1 + previewUrls.length) % previewUrls.length;
      setPreviewUrl(previewUrls[newIndex]);
      return newIndex;
    });
  };

  return { previewUrl, previewUrls, currentIndex, navigate };
};

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

// Media form component
const MediaForm = ({
  onSubmit,
  isUploading,
}: {
  onSubmit: (data: MediaFormData) => void;
  isUploading: boolean;
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<MediaFormData>({
    resolver: zodResolver(mediaFormSchema),
    defaultValues: { category: "", videoUrl: "" },
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => {
      if (files.length > 0) {
        setSelectedFile(files[0]);
        setValue("url", "");
        setValue("videoUrl", "");
      }
    },
    multiple: false,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const urlValue = watch("url");
  const videoUrlValue = watch("videoUrl");
  const categoryValue = watch("category");
  const { previewUrl, previewUrls, currentIndex, navigate } = usePreview(
    selectedFile,
    urlValue,
    videoUrlValue
  );

  const handleFormSubmit = async (data: MediaFormData) => {
    await onSubmit({ ...data, selectedFile });
    setSelectedFile(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Media</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column - Form Fields */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  {...register("title")}
                  placeholder="Enter image title"
                />
                {errors.title && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={categoryValue || ""}
                  onValueChange={(value) => setValue("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="events">Events</SelectItem>
                    <SelectItem value="talents">Talents</SelectItem>
                    <SelectItem value="tours">Tours</SelectItem>
                    <SelectItem value="others">Others</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="url">Image URL</Label>
                <Input
                  id="url"
                  {...register("url")}
                  placeholder="https://example.com/image.jpg"
                  type="url"
                />
                <span className="text-xs text-muted-foreground">
                  Multiple URLs separated by commas. Leave blank if uploading a
                  file.
                </span>
              </div>

              <div>
                <Label htmlFor="videoUrl">Video URL</Label>
                <Input
                  id="videoUrl"
                  {...register("videoUrl")}
                  placeholder="https://example.com/video.mp4"
                  type="url"
                />
              </div>

              <div>
                <Label>File Upload</Label>
                <div
                  {...getRootProps()}
                  className={`mt-2 border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
                    isDragActive ? "border-accent bg-accent/5" : "border-border"
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <div className="text-sm">
                    {isDragActive
                      ? "Drop the file here..."
                      : "Drag & drop an image here, or click to select"}
                  </div>
                </div>
                {selectedFile && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Selected: {selectedFile.name}
                  </p>
                )}
              </div>
            </div>

            {/* Right Column - Preview */}
            <div className="space-y-4">
              {previewUrl ? (
                <div>
                  <Label>Preview</Label>
                  <div className="mt-2 bg-muted rounded-md overflow-hidden">
                    {videoUrlValue && !selectedFile && !urlValue ? (
                      <video
                        src={previewUrl}
                        controls
                        className="w-full h-64 bg-black"
                      />
                    ) : (
                      // improved preview styling: cover, rounded, lazy loading, consistent aspect
                      <img
                        src={previewUrl}
                        alt={watch("title") || "preview"}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-64 object-cover bg-neutral-900 rounded-md border border-border"
                        style={{
                          objectPosition: "center",
                          aspectRatio: "16/9",
                        }}
                      />
                    )}
                  </div>

                  {previewUrls.length > 1 && (
                    <div className="flex items-center justify-between mt-2 gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => navigate("prev")}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-xs text-muted-foreground">
                        {currentIndex + 1} / {previewUrls.length}
                      </span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => navigate("next")}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}

                  <div className="text-xs text-muted-foreground mt-2">
                    {selectedFile ? (
                      <>
                        <div>File: {selectedFile.name}</div>
                        <div>
                          Size: {(selectedFile.size / 1024 / 1024).toFixed(2)}{" "}
                          MB
                        </div>
                        <div>Type: {selectedFile.type || "image"}</div>
                      </>
                    ) : (
                      <div>
                        {previewUrls.length > 1
                          ? `URLs (${previewUrls.length} total)`
                          : "URL"}
                        : {previewUrl}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-muted-foreground">
                  Use the fields on the left to provide a title, select a
                  category, enter an image URL, a video URL, or upload a file.
                  The preview will appear here.
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isUploading}>
              {isUploading ? "Uploading..." : "Upload Image"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

// Media library component
const MediaLibrary = ({
  items,
  isLoading,
}: {
  items: MediaItem[];
  isLoading: boolean;
}) => {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">Loading media items...</p>
        </CardContent>
      </Card>
    );
  }

  if (items.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Image className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            No media items yet. Start by uploading some!
          </p>
        </CardContent>
      </Card>
    );
  }

  const grouped = items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MediaItem[]>);

  const handleDeleteImage = async (itemId: string | undefined) => {
    if (!itemId) {
      toast.error("Cannot delete image without ID");
      return;
    }

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/gallery/${itemId}`);
      toast.success("Image deleted successfully!");
      // Refresh the library after deletion
      window.location.reload();
    } catch (error) {
      toast.error("Failed to delete image. Please try again.");
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="space-y-8">
      {Object.entries(grouped).map(([category, categoryItems]) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const splideRef = useRef<any>(null);

        const slides = categoryItems.flatMap((item) =>
          getImageSources(item).map((src) => ({
            src,
            title: item.title,
            itemId: item._id,
          }))
        );

        const handlePrevPage = () => {
          splideRef.current?.splide?.go("<");
        };

        const handleNextPage = () => {
          splideRef.current?.splide?.go(">");
        };

        return (
          <div key={category}>
            <h2 className="text-xl font-semibold mb-4 capitalize">
              {category}
            </h2>

            {/* Splide carousel for category images */}
            <div className="w-full">
              <SplideReact
                ref={splideRef}
                options={{
                  perPage: 2,
                  gap: "1rem",
                  pagination: false,
                  arrows: false,
                  drag: true,
                  loop: true,
                  breakpoints: {
                    1024: { perPage: 3 },
                    768: { perPage: 2 },
                    480: { perPage: 1 },
                  },
                }}
                aria-label={`${category} images`}
                className="py-2"
              >
                {slides.map((img, idx) => (
                  <SplideSlide key={idx}>
                    <div className="w-full h-[400px] object-contain overflow-hidden rounded-md shadow-md bg-neutral-900 relative group">
                      <img
                        src={img.src}
                        alt={img.title || `image-${idx + 1}`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                        style={{ objectPosition: "center" }}
                      />

                      {/* Hover overlay with title and delete button */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                        <div className="flex justify-end">
                          <button
                            onClick={() => handleDeleteImage(img.itemId)}
                            className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-colors"
                            title="Delete image"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div>
                          <h3 className="font-semibold text-white text-sm">
                            {img.title || "Untitled"}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </SplideSlide>
                ))}
              </SplideReact>
            </div>

            {/* Pagination buttons */}
            <div className="flex items-center justify-center gap-3 mt-4">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={handlePrevPage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-xs text-muted-foreground">
                {slides.length} images
              </span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={handleNextPage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Main component
export default function ManageMedia() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoadingLibrary, setIsLoadingLibrary] = useState(false);

  useEffect(() => {
    fetchMediaItems();
  }, []);

  const fetchMediaItems = async () => {
    setIsLoadingLibrary(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/gallery/all`
      );

      setMediaItems(res.data.galleries || []);
    } catch (error) {
      console.error("Failed to fetch media items:", error);
      toast.error("Failed to load media items.");
    } finally {
      setIsLoadingLibrary(false);
    }
  };

  const uploadFileToServer = async (file: File) => {
    try {
      const fd = new FormData();
      fd.append("image", file);
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/gallery/upload/image`,
        fd
      );
      return data;
    } catch (error) {
      toast.error("Image upload failed, please try again!");
      return null;
    }
  };

  const handleMediaSubmit = async (data: any) => {
    setIsUploading(true);
    try {
      let imageData;
      if (data.selectedFile) {
        imageData = await uploadFileToServer(data.selectedFile);
        if (!imageData) throw new Error("Image upload failed");
      }

      const { selectedFile, ...payload } = data;
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/gallery/new`,
        { ...payload, imageData }
      );

      if (res.status === 200 || res.status === 201) {
        toast.success("Media uploaded successfully!");
        await fetchMediaItems();
      }
    } catch (error) {
      toast.error("Failed to upload media. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Media Management</h1>
        <p className="text-muted-foreground">
          Upload and manage media assets for your website.
        </p>
      </div>

      <Tabs defaultValue="library" className="space-y-6">
        <TabsList>
          <TabsTrigger value="library">Media Library</TabsTrigger>
          <TabsTrigger value="upload">Upload Media</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <MediaForm onSubmit={handleMediaSubmit} isUploading={isUploading} />
        </TabsContent>

        <TabsContent value="library" className="space-y-6">
          <MediaLibrary items={mediaItems} isLoading={isLoadingLibrary} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
