import { useState, useEffect, useCallback } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Image, Video, Link, Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";

const mediaFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  type: z.enum(["image", "video"]),
  source: z.enum(["url", "upload"]),
  url: z.string().url("Please enter a valid URL").optional(),
  tags: z.string(),
  altText: z.string().min(5, "Alt text must be at least 5 characters"),
});

type MediaFormData = z.infer<typeof mediaFormSchema>;

interface MediaItem {
  id: string;
  title: string;
  description: string;
  type: "image" | "video";
  url: string;
  tags: string[];
  altText: string;
  createdAt: string;
}

export default function ManageMedia() {
  const { toast } = useToast();
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<MediaFormData>({
    resolver: zodResolver(mediaFormSchema),
    defaultValues: {
      type: "image",
      source: "url",
    },
  });

  const mediaType = watch("type");
  const sourceType = watch("source");
  const urlValue = watch("url");

  useEffect(() => {
    let objectUrl: string | null = null;

    if (sourceType === "upload" && selectedFile) {
      objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
    } else if (sourceType === "url" && urlValue) {
      setPreviewUrl(urlValue as string);
    } else {
      setPreviewUrl(null);
    }

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [selectedFile, sourceType, urlValue]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: mediaType === "image" ? {"image/*": []} : {"video/*": []},
    maxFiles: 1,
  });

  const onSubmit = async (data: MediaFormData) => {
    setIsUploading(true);
    try {
      // In a real app, you would upload the file to a server/storage here
      const mediaUrl = data.source === "url" ? data.url : "mock-uploaded-file-url";
      
      const newMediaItem: MediaItem = {
        id: Date.now().toString(),
        title: data.title,
        description: data.description,
        type: data.type,
        url: mediaUrl || "",
        tags: data.tags.split(",").map(tag => tag.trim()),
        altText: data.altText,
        createdAt: new Date().toISOString(),
      };

      setMediaItems(prev => [newMediaItem, ...prev]);
      
      toast({
        title: "Media Added",
        description: "The media item has been successfully added.",
      });
      
      reset();
      setSelectedFile(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add media item. Please try again.",
        variant: "destructive",
      });
    }
    setIsUploading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Media Management</h1>
        <p className="text-muted-foreground">Upload and manage media assets for your website.</p>
      </div>

      <Tabs defaultValue="upload" className="space-y-6">
        <TabsList>
          <TabsTrigger value="upload">Upload Media</TabsTrigger>
          <TabsTrigger value="library">Media Library</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New Media</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        {...register("title")}
                        placeholder="Enter media title"
                      />
                      {errors.title && (
                        <p className="text-sm text-destructive mt-1">{errors.title.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="type">Media Type</Label>
                      <Select
                        {...register("type")}
                        onValueChange={(value) => {
                          reset({ ...watch(), type: value as "image" | "video" });
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select media type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="image">Image</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="source">Source Type</Label>
                      <Select
                        {...register("source")}
                        onValueChange={(value) => {
                          reset({ ...watch(), source: value as "url" | "upload" });
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select source type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="url">URL</SelectItem>
                          <SelectItem value="upload">File Upload</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {sourceType === "url" ? (
                      <div>
                        <Label htmlFor="url">Media URL</Label>
                        <Input
                          id="url"
                          {...register("url")}
                          placeholder={`Enter ${mediaType} URL`}
                          type="url"
                        />
                        {errors.url && (
                          <p className="text-sm text-destructive mt-1">{errors.url.message}</p>
                        )}
                      </div>
                    ) : (
                      <div>
                        <Label>File Upload</Label>
                        <div
                          {...getRootProps()}
                          className={`mt-2 border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${isDragActive ? 'border-accent bg-accent/5' : 'border-border bg-transparent'}`}
                        >
                          <input {...getInputProps()} />
                          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                          <div className="text-sm">
                            {isDragActive ? (
                              <span>Drop the file here...</span>
                            ) : (
                              <span>Drag & drop a {mediaType} file here, or click to select</span>
                            )}
                          </div>
                        </div>

                        {selectedFile && (
                          <p className="text-sm text-muted-foreground mt-2">
                            Selected: {selectedFile.name}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Shared preview panel for both URL and upload sources */}
                    {previewUrl && (
                      <div className="mt-4 md:mt-0">
                        <Label>Preview</Label>
                        <div className="mt-2 bg-muted rounded-md overflow-hidden">
                          {mediaType === "image" ? (
                            // Image preview
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={previewUrl} alt={watch("altText") || "preview"} className="w-full h-64 object-contain bg-black" />
                          ) : (
                            // Video preview
                            <video src={previewUrl} controls className="w-full h-64 bg-black" />
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground mt-2">
                          {selectedFile ? (
                            <>
                              <div>File: {selectedFile.name}</div>
                              <div>Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</div>
                              <div>Type: {selectedFile.type || mediaType}</div>
                            </>
                          ) : (
                            <div>URL: {previewUrl}</div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        {...register("description")}
                        placeholder="Enter media description"
                        rows={3}
                      />
                      {errors.description && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.description.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="altText">Alt Text</Label>
                      <Input
                        id="altText"
                        {...register("altText")}
                        placeholder="Enter alternative text"
                      />
                      {errors.altText && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.altText.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="tags">Tags</Label>
                      <Input
                        id="tags"
                        {...register("tags")}
                        placeholder="Enter tags (comma separated)"
                      />
                      {errors.tags && (
                        <p className="text-sm text-destructive mt-1">{errors.tags.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={isUploading}>
                    {isUploading ? "Uploading..." : "Upload Media"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="library" className="space-y-6">
          {mediaItems.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <div className="flex justify-center mb-4">
                  {mediaType === "image" ? (
                    <Image className="h-12 w-12 text-muted-foreground" />
                  ) : (
                    <Video className="h-12 w-12 text-muted-foreground" />
                  )}
                </div>
                <p className="text-muted-foreground">No media items yet. Start by uploading some!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mediaItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-4">
                      {item.type === "image" ? (
                        <img
                          src={item.url}
                          alt={item.altText}
                          className="w-full h-full object-cover rounded-md"
                        />
                      ) : (
                        <Video className="h-12 w-12 text-muted-foreground" />
                      )}
                    </div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}