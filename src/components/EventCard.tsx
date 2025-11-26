import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Link } from "wouter";
import { format, isValid } from "date-fns";

interface EventCardProps {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  status: "upcoming" | "ongoing" | "past";
  imageUrl?: string;
  image?: { url: string; public_id: string };
}

export default function EventCard({
  _id,
  title,
  description,
  date,
  time,
  location,
  status,
  imageUrl,
  image,
}: EventCardProps) {
  const statusColors = {
    upcoming: "bg-primary/10 text-primary border-primary/20",
    ongoing: "bg-accent/10 text-accent-foreground border-accent/20",
    past: "bg-muted text-muted-foreground border-muted",
  };

  return (
    <Card className="overflow-hidden hover-elevate">
      {(imageUrl || image?.url) && (
        <div className="h-[400px]  overflow-hidden">
          <img
            src={imageUrl || image?.url}
            alt={title}
            className="w-full h-full object-contain"
            data-testid={`event-image-${_id}`}
          />
        </div>
      )}
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3
            className="text-xl font-bold text-foreground flex-1"
            data-testid={`event-title-${_id}`}
          >
            {title}
          </h3>
          <Badge
            className={statusColors[status]}
            data-testid={`event-status-${_id}`}
          >
            {status}
          </Badge>
        </div>

        <p
          className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2"
          data-testid={`event-description-${_id}`}
        >
          {description}
        </p>

        <div className="space-y-2 mb-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span data-testid={`event-date-${_id}`}>
              {date && isValid(new Date(date))
                ? format(new Date(date), "PPP")
                : "Date not available"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span data-testid={`event-time-${_id}`}>{time}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span data-testid={`event-location-${_id}`}>{location}</span>
          </div>
        </div>

        <Link href={`/events/${_id}`}>
          <Button
            variant="outline"
            className="w-full"
            data-testid={`button-view-details-${_id}`}
          >
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
