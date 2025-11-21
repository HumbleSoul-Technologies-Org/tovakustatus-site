import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Calendar as CalendarIcon,
  Loader,
} from "lucide-react";
import {
  getBlogPosts,
  addBlogPost,
  updateBlogPost,
  deleteBlogPost,
  BlogPost,
  STORAGE_KEYS,
  saveBlogPosts,
} from "@/lib/localStorage";
import axios from "axios";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format, isValid } from "date-fns";

export default function ManageBlog() {
  // toast is imported directly from sonner
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const [formData, setFormData] = useState<any>({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    date: "",
    category: "",
    imageUrl: "",
    readTime: "",
    videoUrl: "",
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean | null>(false);
  const [isUploading, setIsUploading] = useState<boolean | null>(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>("");
  const [imageInputType, setImageInputType] = useState<"url" | "file">("url");
  const [fileInputRef, setFileInputRef] = useState<HTMLInputElement | null>(
    null
  );

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const loadBlogPosts = () => {
    const data = getBlogPosts();
    setBlogPosts(data);
  };

  const handleOpenDialog = (post?: BlogPost) => {
    if (post) {
      setEditingPost(post);
      setFormData({
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        author: post.author,
        date: post.date,
        category: post.category,
        imageUrl: post.imageUrl || "",
        readTime: post.readTime,
        videoUrl: post.videoUrl, // Include videoUrl
      });
      setImagePreview(post.imageUrl || post?.image?.url || null);
      setImageInputType("url");
      setSelectedImage(null);
    } else {
      setEditingPost(null);
      setImageInputType("url");
      setFormData({
        title: "",
        excerpt: "",
        content: "",
        author: "",
        date: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        category: "",
        imageUrl: "",
        readTime: "",
        videoUrl: "", // Reset videoUrl
      });
      setImagePreview(null);
      setSelectedImage(null);
    }
    setIsDialogOpen(true);
  };

  const fetchBlogPosts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/blogs/all`
      );
      if (response.status === 200) {
        saveBlogPosts(response.data.blogs);
        loadBlogPosts();
      }
    } catch (error) {
      toast.error("Failed to retrieve blog posts data!");
    }
  };

  // upload the selected image to the server
  const uploadFileToServer = async (file: File) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/blogs/upload/image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data;
    } catch (error) {
      toast.error("Image upload failed, please try again!");
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpdate = async (payload: any) => {
    setLoading(true);
    try {
      const id = editingPost?._id;

      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/blogs/update/${id}`,
        payload,
        {
          headers: { Authorization: `Bearer ${payload.token}` },
          timeout: 10000,
        }
      );

      if (res.status === 200) {
        saveBlogPosts(res.data.blogs);
        fetchBlogPosts();
        toast.success("Blog post has been successfully updated.");

        // Reset form
        setFormData({
          title: "",
          description: "",
          date: "",
          time: "",
          location: "",
          status: "upcoming",
          imageUrl: "",
          videoUrl: "",
        });
        setSelectedImage(null);
        setImagePreview(null);
        setIsDialogOpen(false);
        return true;
      } else {
        console.warn("Unexpected response on update:", res.status, res.data);
        return false;
      }
    } catch (error: any) {
      console.error("❌ Update error:", error.response || error);
      toast.error(error.response?.data?.err || "Failed to update post!");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (payload: any) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/blogs/new`,
        payload,
        {
          headers: { Authorization: `Bearer ${payload.token}` },
          timeout: 10000,
        }
      );

      if (res.status === 201) {
        toast.success("New blog post has been successfully added.");

        saveBlogPosts(res.data.blogs);
        fetchBlogPosts();

        setFormData({
          title: "",
          excerpt: "",
          content: "",
          author: "",
          date: new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
          category: "",
          imageUrl: "",
          readTime: "",
          videoUrl: "", // Reset videoUrl
        });
        setIsDialogOpen(false);
        setSelectedImage(null);
        setImagePreview(null);
        return true;
      } else {
        console.warn("Unexpected response on create:", res.status, res.data);
        return false;
      }
    } catch (error: any) {
      console.error("❌ Create error:", error.response || error);
      toast.error(error.response?.data?.err || "Failed to create talent!");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const storedUser = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
      const user = storedUser ? JSON.parse(storedUser) : null;
      const token = user?.token;
      let imageData = null;

      if (selectedImage) {
        imageData = await uploadFileToServer(selectedImage);
        if (!imageData) {
          setLoading(false);
          return;
        }
      }

      const payload = {
        ...formData,
        token,
        imageData: imageData || formData.imageUrl,
      };

      console.log("====================================");
      console.log(imageData);
      console.log("====================================");

      // if (editingPost) {
      //   await handleUpdate(payload);
      // } else {
      //   await handleCreate(payload);
      // }

      // Cleanup
      if (imagePreview && selectedImage) {
        URL.revokeObjectURL(imagePreview);
      }
    } catch (error) {
      toast.error("Failed to save blog post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    const storedUser = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
    const user = storedUser ? JSON.parse(storedUser) : null;
    const token = user?.token;
    setDeleteLoading(id);
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/blogs/delete/${id}`,
        { headers: { Authorization: `Bearer ${token}` }, timeout: 10000 }
      );
      if (res.status === 200) {
        toast.success(`"${title}" has been successfully deleted.`);
        fetchBlogPosts();
        deleteBlogPost(id);
      }
    } catch (error) {
      toast.error("Failed to delete the blog post. Please try again.");
    } finally {
      setDeleteLoading("");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "file" && e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileUrl = URL.createObjectURL(file);
      setSelectedImage(file);
      setImagePreview(fileUrl);
      setFormData((prev: any) => ({ ...prev, imageUrl: "" }));
    } else if (e.target.type === "text") {
      const url = e.target.value;
      setSelectedImage(null);
      setFormData((prev: any) => ({ ...prev, imageUrl: url }));
      if (url) {
        // Only set preview if URL is not empty
        setImagePreview(url);
      } else {
        setImagePreview(null);
      }
    }
  };

  const filteredPosts = blogPosts.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Manage Blog</h1>
          <p className="text-muted-foreground">
            Add, edit, and manage blog posts
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => handleOpenDialog()}
              data-testid="button-add-post"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPost ? "Edit" : "Add New"} Blog Post
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="post-title">Title</Label>
                <Input
                  id="post-title"
                  placeholder="Enter post title"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  data-testid="input-post-title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="post-excerpt">Excerpt</Label>
                <Textarea
                  id="post-excerpt"
                  placeholder="Brief summary of the post..."
                  required
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  data-testid="textarea-post-excerpt"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="post-content">Full Content</Label>
                <Textarea
                  id="post-content"
                  placeholder="Full blog post content..."
                  rows={8}
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  data-testid="textarea-post-content"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="post-author">Author</Label>
                  <Input
                    id="post-author"
                    placeholder="Author name"
                    required
                    value={formData.author}
                    onChange={(e) =>
                      setFormData({ ...formData, author: e.target.value })
                    }
                    data-testid="input-post-author"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="post-category">Category</Label>
                  <Select
                    required
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger
                      id="post-category"
                      data-testid="select-post-category"
                    >
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="success stories">
                        Success Stories
                      </SelectItem>
                      <SelectItem value="impact">Impact</SelectItem>
                      <SelectItem value="team stories">Team Stories</SelectItem>
                      <SelectItem value="events">Events</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="post-date">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                        data-testid="input-post-date"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.date ? (
                          format(new Date(formData.date), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={
                          formData.date ? new Date(formData.date) : undefined
                        }
                        onSelect={(date) =>
                          setFormData({
                            ...formData,
                            date: date ? format(date, "MMMM dd, yyyy") : "",
                          })
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="post-read-time">Read Time (Optional)</Label>
                  <Input
                    id="post-read-time"
                    placeholder="e.g., 5 min read"
                    value={formData.readTime}
                    onChange={(e) =>
                      setFormData({ ...formData, readTime: e.target.value })
                    }
                    data-testid="input-post-read-time"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <Label className="text-base">Featured Image</Label>
                    <div className="flex gap-4 mt-2">
                      <Button
                        type="button"
                        variant={
                          imageInputType === "url" ? "default" : "outline"
                        }
                        onClick={() => setImageInputType("url")}
                        className="flex-1"
                      >
                        Image URL
                      </Button>
                      <Button
                        type="button"
                        variant={
                          imageInputType === "file" ? "default" : "outline"
                        }
                        onClick={() => setImageInputType("file")}
                        className="flex-1"
                      >
                        Upload File
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    {imageInputType === "url" && (
                      <div className="space-y-2">
                        <Input
                          id="post-image-url"
                          type="text"
                          placeholder="Enter image URL"
                          value={formData.imageUrl}
                          onChange={(e) => handleImageChange(e)}
                          data-testid="input-post-image-url"
                        />
                        {formData.imageUrl && (
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setFormData((prev: any) => ({
                                ...prev,
                                imageUrl: "",
                              }));
                              setImagePreview(null);
                            }}
                          >
                            Clear URL
                          </Button>
                        )}
                      </div>
                    )}
                    {imageInputType === "file" && (
                      <div className="space-y-2">
                        <input
                          id="post-image-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                          ref={setFileInputRef}
                        />
                        <Button
                          type="button"
                          onClick={() => fileInputRef?.click()}
                          variant="outline"
                          className="w-full"
                        >
                          {selectedImage ? "Change Image" : "Choose Image File"}
                        </Button>
                        {selectedImage && (
                          <p className="text-sm text-muted-foreground">
                            Selected: {selectedImage.name}
                          </p>
                        )}
                      </div>
                    )}
                    {imagePreview && (
                      <div className="relative aspect-video rounded-md overflow-hidden bg-muted">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="object-contain w-full h-full"
                          onError={() => {
                            setImagePreview(null);
                            if (imageInputType === "url") {
                              // Only clear URL if in URL mode
                              setFormData((prev: any) => ({
                                ...prev,
                                imageUrl: "",
                              }));
                              toast.error("Failed to load image from URL");
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => {
                            setImagePreview(null);
                            setSelectedImage(null);
                            setFormData((prev: any) => ({
                              ...prev,
                              imageUrl: "",
                            }));
                            if (fileInputRef) fileInputRef.value = "";
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="post-video">Video URL (Optional)</Label>
                  <Input
                    id="post-video"
                    placeholder="Enter video URL (e.g., YouTube, Vimeo)"
                    value={formData.videoUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, videoUrl: e.target.value })
                    }
                    data-testid="input-post-video"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                data-testid="button-submit-post"
              >
                {editingPost ? (
                  isUploading || loading ? (
                    <span className="flex justify-center items-center gap-2">
                      Processing...
                      <Loader className="animate-spin text-white" />
                    </span>
                  ) : (
                    "Update Post"
                  )
                ) : isUploading || loading ? (
                  <span className="flex justify-center items-center gap-2">
                    Processing... <Loader className="animate-spin text-white" />
                  </span>
                ) : (
                  "Add Post"
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Blog Posts ({filteredPosts.length})</CardTitle>
          <div className="relative max-w-md mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search posts..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="input-search-posts-dashboard"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">Title</th>
                  <th className="text-left py-3 px-4 font-semibold">Author</th>
                  <th className="text-left py-3 px-4 font-semibold">
                    Category
                  </th>
                  <th className="text-left py-3 px-4 font-semibold">Date</th>
                  <th className="text-left py-3 px-4 font-semibold">
                    Thumbnail
                  </th>
                  <th className="text-right py-3 px-4 font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map((post) => (
                  <tr
                    key={post._id}
                    className="border-b border-border hover:bg-muted/50"
                    data-testid={`post-row-${post._id}`}
                  >
                    <td className="py-3 px-4 font-medium">{post.title}</td>
                    <td className="py-3 px-4">{post.author}</td>
                    <td className="py-3 px-4">
                      <Badge variant="secondary">{post.category}</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {post.date && isValid(new Date(post.date))
                        ? format(new Date(post.date), "PPP 'at' p")
                        : "Date not available"}
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      <img
                        src={post?.image?.url || post?.imageUrl}
                        className="size-20 rounded-md"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenDialog(post)}
                          data-testid={`button-edit-${post._id}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(post._id, post.title)}
                          data-testid={`button-delete-${post._id}`}
                        >
                          {deleteLoading === post._id ? (
                            <Loader className="animate-spin text-muted-foreground h-4 w-4" />
                          ) : (
                            <Trash2 className="h-4 w-4 text-destructive" />
                          )}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredPosts.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No blog posts found matching your search.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
