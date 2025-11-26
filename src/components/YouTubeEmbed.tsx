import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface YouTubeEmbedProps {
  videoUrl?: string;
  title?: string;
  onVideoChange?: (url: string) => void;
  editable?: boolean;
}

// Extract YouTube video ID from various YouTube URL formats
function extractYouTubeId(url: string): string | null {
  if (!url) return null;

  // Handle youtu.be short links
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (shortMatch) return shortMatch[1];

  // Handle youtube.com/watch?v=
  const watchMatch = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/);
  if (watchMatch) return watchMatch[1];

  // Handle youtube.com/embed/
  const embedMatch = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/);
  if (embedMatch) return embedMatch[1];

  // If it's just a video ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;

  return null;
}

export default function YouTubeEmbed({
  videoUrl,
  title = "Video",
  onVideoChange,
  editable = false,
}: YouTubeEmbedProps) {
  const [videoInput, setVideoInput] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  console.log("YouTubeEmbed videoUrl prop:", videoUrl);

  const videoId = extractYouTubeId(videoUrl || "");
  console.log("Extracted videoId:", videoId);

  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  console.log("Final embedUrl:", embedUrl);

  const handleAddVideo = () => {
    if (videoInput.trim()) {
      const extractedId = extractYouTubeId(videoInput);
      if (extractedId) {
        onVideoChange?.(videoInput);
        setVideoInput("");
        setIsEditing(false);
      } else {
        alert("Invalid YouTube URL or Video ID");
      }
    }
  };

  const handleRemoveVideo = () => {
    onVideoChange?.("");
    setIsEditing(false);
  };

  // If video exists, show embed
  if (embedUrl && !isEditing) {
    return (
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={embedUrl}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          {/* {editable && (
            <div className="p-4 bg-muted flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                Change Video
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleRemoveVideo}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )} */}
        </CardContent>
      </Card>
    );
  }

  // If in editing mode and editable, show input
  if (isEditing && editable) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">
                {embedUrl ? "Update Video" : "Add YouTube Video"}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Paste a YouTube URL or video ID:
              </p>
              <div className="flex gap-2">
                <Input
                  placeholder="https://youtube.com/watch?v=... or video ID"
                  value={videoInput}
                  onChange={(e) => setVideoInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") handleAddVideo();
                  }}
                />
                <Button onClick={handleAddVideo}>Add</Button>
              </div>
            </div>
            {embedUrl && (
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  // If no video, return nothing (no input field shown to client)
  return null;
}
