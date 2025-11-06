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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import {
  getTalents,
  updateTalent,
  deleteTalent,
  Talent,
} from "@/lib/localStorage";

export default function ManageTalents() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [talents, setTalents] = useState<Talent[]>([]);
  const [editingTalent, setEditingTalent] = useState<Talent | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    talentType: "",
    description: "",
    fullStory: "",
    imageUrl: "",
    videoUrl: "",
    status: "Active",
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    loadTalents();
  }, []);

  const loadTalents = () => {
    const data = getTalents();
    setTalents(data);
  };

  useEffect(() => {
    // Cleanup preview URL when component unmounts
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleOpenDialog = (talent?: Talent) => {
    if (talent) {
      setEditingTalent(talent);
      setFormData({
        name: talent.name,
        age: talent.age.toString(),
        talentType: talent.talentType,
        description: talent.description,
        fullStory: talent.fullStory || "",
        imageUrl: talent.imageUrl,
        videoUrl: talent.videoUrl || "",
        status: talent.status,
      });
    } else {
      setEditingTalent(null);
      setFormData({
        name: "",
        age: "",
        talentType: "",
        description: "",
        fullStory: "",
        imageUrl: "",
        videoUrl: "",
        status: "Active",
      });
    }
    setIsDialogOpen(true);
  };

  // Creating talent
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      // You would typically upload this file to your server/storage and get back a URL
      // For now, we'll just store the local preview URL
      setFormData((prev) => ({ ...prev, imageUrl: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingTalent) {
      updateTalent(editingTalent.id, {
        ...formData,
        age: parseInt(formData.age),
      });
      toast({
        title: "Talent Updated",
        description: "Talent profile has been successfully updated.",
      });
    } else {
      // try {
      //   const res =  await axios.post(`${process.env.VITE_API_URL}/talents/new`,formData,token)
      // } catch (error) {
      //   console.log(error);
      //    toast({
      //         title: "Error",
      //      description: "Failed to add talent, please try again!",
      //         variant:'destructive'
      //       });

      // }

      toast({
        title: "Talent Added",
        description: "New talent has been successfully added.",
      });
    }

    loadTalents();
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      deleteTalent(id);
      loadTalents();
      toast({
        title: "Talent Removed",
        description: `${name} has been removed.`,
      });
    }
  };

  const filteredTalents = talents.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.talentType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Manage Talents
          </h1>
          <p className="text-muted-foreground">
            Add, edit, and manage talented youth profiles
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => handleOpenDialog()}
              data-testid="button-add-talent"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Talent
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingTalent ? "Edit" : "Add New"} Talent
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="talent-name">Full Name</Label>
                <Input
                  id="talent-name"
                  placeholder="Enter full name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  data-testid="input-talent-name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="talent-age">Age</Label>
                <Input
                  id="talent-age"
                  type="number"
                  placeholder="Enter age"
                  required
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                  data-testid="input-talent-age"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="talent-type">Talent Type</Label>
                <Select
                  required
                  value={formData.talentType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, talentType: value })
                  }
                >
                  <SelectTrigger
                    id="talent-type"
                    data-testid="select-talent-type"
                  >
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Music">Music</SelectItem>
                    <SelectItem value="Sports">Sports</SelectItem>
                    <SelectItem value="Art">Art</SelectItem>
                    <SelectItem value="Dance">Dance</SelectItem>
                    <SelectItem value="Drama">Drama</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="talent-description">Short Description</Label>
                <Textarea
                  id="talent-description"
                  placeholder="Tell us about this talent..."
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  data-testid="textarea-talent-description"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="talent-story">Full Story</Label>
                <Textarea
                  id="talent-story"
                  placeholder="Detailed story about the talent..."
                  rows={5}
                  value={formData.fullStory}
                  onChange={(e) =>
                    setFormData({ ...formData, fullStory: e.target.value })
                  }
                  data-testid="textarea-talent-story"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="talent-image">Profile Image</Label>
                <div className="flex flex-col gap-4">
                  <Input
                    id="image-url"
                    placeholder="Enter image URL"
                    value={formData.imageUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, imageUrl: e.target.value })
                    }
                    data-testid="input-image-url"
                  />
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <Input
                        id="talent-image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          document.getElementById("talent-image")?.click()
                        }
                      >
                        Or Upload Image
                      </Button>
                    </div>
                    {selectedImage && (
                      <span className="text-sm text-muted-foreground">
                        {selectedImage.name}
                      </span>
                    )}
                  </div>
                </div>
                {(previewUrl || formData.imageUrl) && (
                  <div className="mt-4">
                    <img
                      src={previewUrl || formData.imageUrl}
                      alt="Profile preview"
                      className="w-40 h-40 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="talent-video">Video URL (Optional)</Label>
                <Input
                  id="talent-video"
                  placeholder="Enter video URL (YouTube, Vimeo, etc.)"
                  value={formData.videoUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, videoUrl: e.target.value })
                  }
                  data-testid="input-talent-video"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                data-testid="button-submit-talent"
              >
                {editingTalent ? "Update" : "Add"} Talent
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Talent Database ({filteredTalents.length})</CardTitle>
          <div className="relative max-w-md mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search talents..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="input-search-talents-dashboard"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">Name</th>
                  <th className="text-left py-3 px-4 font-semibold">Age</th>
                  <th className="text-left py-3 px-4 font-semibold">
                    Talent Type
                  </th>
                  <th className="text-left py-3 px-4 font-semibold">
                    Description
                  </th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                  <th className="text-right py-3 px-4 font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTalents.map((talent) => (
                  <tr
                    key={talent.id}
                    className="border-b border-border hover:bg-muted/50"
                    data-testid={`talent-row-${talent.id}`}
                  >
                    <td className="py-3 px-4 font-medium">{talent.name}</td>
                    <td className="py-3 px-4">{talent.age}</td>
                    <td className="py-3 px-4">
                      <Badge variant="secondary">{talent.talentType}</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground max-w-xs truncate">
                      {talent.description}
                    </td>
                    <td className="py-3 px-4">
                      <Badge className="bg-primary/10 text-primary">
                        {talent.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenDialog(talent)}
                          data-testid={`button-edit-${talent.id}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(talent.id, talent.name)}
                          data-testid={`button-delete-${talent.id}`}
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
          {filteredTalents.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No talents found matching your search.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
