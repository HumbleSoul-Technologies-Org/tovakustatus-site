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
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import {
  getBlogPosts,
  addBlogPost,
  updateBlogPost,
  deleteBlogPost,
  BlogPost,
} from "@/lib/localStorage";

export default function ManageBlog() {
  // toast is imported directly from sonner
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const [formData, setFormData] = useState({
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
  const [imageInputType, setImageInputType] = useState<"url" | "file">("url");
  const [fileInputRef, setFileInputRef] = useState<HTMLInputElement | null>(
    null
  );

  useEffect(() => {
    loadBlogPosts();
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
        content: post.content || "",
        author: post.author,
        date: post.date,
        category: post.category,
        imageUrl: post.imageUrl || "",
        readTime: post.readTime || "",
        videoUrl: post.videoUrl || "", // Include videoUrl
      });
      setImagePreview(post.imageUrl || null);
      setImageInputType("url");
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingPost) {
      updateBlogPost(editingPost.id, formData);
      toast.success("Blog post has been successfully updated.");
    } else {
      addBlogPost(formData);
      toast.success("New blog post has been successfully added.");
    }

    loadBlogPosts();
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteBlogPost(id);
      loadBlogPosts();
      toast.success(`"${title}" has been removed.`);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "file" && e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setFormData({ ...formData, imageUrl: URL.createObjectURL(file) });
    } else if (e.target.type === "text") {
      setImagePreview(e.target.value);
      setFormData({ ...formData, imageUrl: e.target.value });
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
                  <Input
                    id="post-category"
                    placeholder="e.g., Success Stories, Impact, Team"
                    required
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    data-testid="input-post-category"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="post-date">Date</Label>
                  <Input
                    id="post-date"
                    placeholder="e.g., March 10, 2024"
                    required
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    data-testid="input-post-date"
                  />
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
                    {imageInputType === "url" ? (
                      <Input
                        id="post-image-url"
                        type="text"
                        placeholder="Enter image URL"
                        value={formData.imageUrl}
                        onChange={handleImageChange}
                        data-testid="input-post-image-url"
                      />
                    ) : (
                      <div>
                        <input
                          id="post-image-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                          ref={setFileInputRef}
                          data-testid="input-post-image-upload"
                        />
                        <Button
                          type="button"
                          onClick={() => fileInputRef?.click()}
                          variant="outline"
                          className="w-full"
                        >
                          Choose Image File
                        </Button>
                      </div>
                    )}
                    {imagePreview && (
                      <div className="relative aspect-video rounded-md overflow-hidden bg-muted">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="object-cover w-full h-full"
                        />
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
                {editingPost ? "Update" : "Add"} Post
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
                  <th className="text-right py-3 px-4 font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map((post) => (
                  <tr
                    key={post.id}
                    className="border-b border-border hover:bg-muted/50"
                    data-testid={`post-row-${post.id}`}
                  >
                    <td className="py-3 px-4 font-medium">{post.title}</td>
                    <td className="py-3 px-4">{post.author}</td>
                    <td className="py-3 px-4">
                      <Badge variant="secondary">{post.category}</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {post.date}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenDialog(post)}
                          data-testid={`button-edit-${post.id}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(post.id, post.title)}
                          data-testid={`button-delete-${post.id}`}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
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
