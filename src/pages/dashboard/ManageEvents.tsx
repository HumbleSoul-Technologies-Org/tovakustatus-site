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
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
  Event,
} from "@/lib/localStorage";

export default function ManageEvents() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fullDescription: "",
    date: "",
    time: "",
    location: "",
    status: "upcoming" as "upcoming" | "ongoing" | "past",
    imageUrl: "",
    videoUrl: "", // Added videoUrl
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    // Cleanup preview URL when component unmounts
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const loadEvents = () => {
    const data = getEvents();
    setEvents(data);
  };

  const handleOpenDialog = (event?: Event) => {
    if (event) {
      setEditingEvent(event);
      setFormData({
        title: event.title,
        description: event.description,
        fullDescription: event.fullDescription || "",
        date: event.date,
        time: event.time,
        location: event.location,
        status: event.status,
        imageUrl: event.imageUrl || "",
        videoUrl: event.videoUrl || "", // Added videoUrl
      });
    } else {
      setEditingEvent(null);
      setFormData({
        title: "",
        description: "",
        fullDescription: "",
        date: "",
        time: "",
        location: "",
        status: "upcoming",
        imageUrl: "",
        videoUrl: "", // Added videoUrl
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingEvent) {
      updateEvent(editingEvent.id, formData);
      toast({
        title: "Event Updated",
        description: "Event has been successfully updated.",
      });
    } else {
      addEvent(formData);
      toast({
        title: "Event Added",
        description: "New event has been successfully added.",
      });
    }

    loadEvents();
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteEvent(id);
      loadEvents();
      toast({
        title: "Event Removed",
        description: `"${title}" has been removed.`,
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, imageUrl: URL.createObjectURL(file) }));
    }
  };

  const filteredEvents = events.filter(
    (e) =>
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statusColors = {
    upcoming: "bg-primary/10 text-primary border-primary/20",
    ongoing: "bg-accent/10 text-accent-foreground border-accent/20",
    past: "bg-muted text-muted-foreground border-muted",
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Manage Events</h1>
          <p className="text-muted-foreground">
            Add, edit, and manage events and activities
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => handleOpenDialog()}
              data-testid="button-add-event"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingEvent ? "Edit" : "Add New"} Event
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="event-title">Event Title</Label>
                <Input
                  id="event-title"
                  placeholder="Enter event title"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  data-testid="input-event-title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-description">Short Description</Label>
                <Textarea
                  id="event-description"
                  placeholder="Brief description of the event..."
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  data-testid="textarea-event-description"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-full-description">
                  Full Description (Optional)
                </Label>
                <Textarea
                  id="event-full-description"
                  placeholder="Detailed description..."
                  rows={5}
                  value={formData.fullDescription}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fullDescription: e.target.value,
                    })
                  }
                  data-testid="textarea-event-full-description"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-date">Date</Label>
                <Input
                  id="event-date"
                  placeholder="e.g., June 15, 2024"
                  required
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  data-testid="input-event-date"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-time">Time</Label>
                <Input
                  id="event-time"
                  placeholder="e.g., 2:00 PM - 6:00 PM"
                  required
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                  data-testid="input-event-time"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-location">Location</Label>
                <Input
                  id="event-location"
                  placeholder="Enter location"
                  required
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  data-testid="input-event-location"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-status">Status</Label>
                <Select
                  required
                  value={formData.status}
                  onValueChange={(value: "upcoming" | "ongoing" | "past") =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger
                    id="event-status"
                    data-testid="select-event-status"
                  >
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                    <SelectItem value="past">Past</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-image">Event Image</Label>
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
                        id="event-image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          document.getElementById("event-image")?.click()
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
                      alt="Event preview"
                      className="w-40 h-40 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="event-video">Video URL (Optional)</Label>
                <Input
                  id="event-video"
                  placeholder="Enter video URL (YouTube, Vimeo, etc.)"
                  value={formData.videoUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, videoUrl: e.target.value })
                  }
                  data-testid="input-event-video"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                data-testid="button-submit-event"
              >
                {editingEvent ? "Update" : "Add"} Event
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Events ({filteredEvents.length})</CardTitle>
          <div className="relative max-w-md mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search events..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="input-search-events-dashboard"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">Title</th>
                  <th className="text-left py-3 px-4 font-semibold">Date</th>
                  <th className="text-left py-3 px-4 font-semibold">
                    Location
                  </th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                  <th className="text-right py-3 px-4 font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map((event) => (
                  <tr
                    key={event.id}
                    className="border-b border-border hover:bg-muted/50"
                    data-testid={`event-row-${event.id}`}
                  >
                    <td className="py-3 px-4 font-medium">{event.title}</td>
                    <td className="py-3 px-4">{event.date}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {event.location}
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={statusColors[event.status]}>
                        {event.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenDialog(event)}
                          data-testid={`button-edit-${event.id}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(event.id, event.title)}
                          data-testid={`button-delete-${event.id}`}
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
          {filteredEvents.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No events found matching your search.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
