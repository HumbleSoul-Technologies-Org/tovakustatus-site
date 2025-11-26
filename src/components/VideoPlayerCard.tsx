import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { Play } from "lucide-react";

interface VideoPlayerCardProps {
  videoUrl?: string;
  title?: string;
  description?: string;
  talentName?: string;
}

export default function VideoPlayerCard({
  videoUrl,
  title,
  description,
  talentName,
}: VideoPlayerCardProps) {
  if (!videoUrl) return null;

  return (
    <Card className="overflow-hidden mt-10 border-2 hover:shadow-lg transition-shadow">
      {/* <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 pb-4">
        <div className="flex items-center gap-2">
          <Play className="h-5 w-5 text-primary fill-primary" />
          <CardTitle className="text-2xl">
            {title || "Featured Video"}
          </CardTitle>
        </div>
        {description && (
          <p className="text-sm text-muted-foreground mt-2">{description}</p>
        )}
      </CardHeader> */}
      <CardContent className="p-0">
        <YouTubeEmbed
          videoUrl={videoUrl}
          title={title || `${talentName}'s Video`}
        />
      </CardContent>
    </Card>
  );
}
