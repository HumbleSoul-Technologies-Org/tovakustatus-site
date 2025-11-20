import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { getEventById, Event } from "@/lib/localStorage";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Bookmark,
  Calendar,
  Clock,
  Eye,
  Loader,
  MapPin,
  Share2,
  ThumbsUpIcon,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format, isValid } from "date-fns";
import { useQuery } from "@tanstack/react-query";

export default function EventDetail() {
  const { toast } = useToast();
  const [, params] = useRoute("/events/:_id");
  const [event, setEvent] = useState<Event | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["events", `${params?._id}`],
  });
  useEffect(() => {
    if (data) {
      setEvent((data as any)?.event);
    }
  }, [params?._id, data]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Event Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The event you're looking for doesn't exist.
          </p>
          <Link href="/events">
            <Button data-testid="button-back-to-events">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Events
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="flex gap-3 items-center">
            Loading details ... <Loader className="animate-spin size-6" />
          </span>
        </div>
      </div>
    );
  }
  const statusColors = {
    upcoming: "bg-primary/10 text-primary border-primary/20",
    ongoing: "bg-accent/10 text-accent-foreground border-accent/20",
    past: "bg-muted text-muted-foreground border-muted",
  };

  return (
    <div>
      <section className="py-16 w-full md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <Link href="/events">
            <Button variant="ghost" className="mb-6" data-testid="button-back">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Events
            </Button>
          </Link>

          {event.imageUrl ||
            (event?.image?.url && (
              <div className="mb-8">
                <img
                  src={event.imageUrl || event?.image?.url}
                  alt={event.title}
                  className="w-full h-96 object-cover rounded-2xl"
                  data-testid="event-detail-image"
                />
              </div>
            ))}

          <div className="flex items-start justify-between gap-4 mb-6">
            <h1
              className="text-4xl md:text-5xl font-bold flex-1"
              data-testid="event-detail-title"
            >
              {event.title}
            </h1>
            <Badge
              className={statusColors[event.status]}
              data-testid="event-detail-status"
            >
              {event.status}
            </Badge>
          </div>

          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold mb-1">Date</p>
                    <p
                      className="text-sm text-muted-foreground"
                      data-testid="event-detail-date"
                    >
                      {event.date && isValid(new Date(event.date))
                        ? format(new Date(event.date), "PPP")
                        : "Date not available"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold mb-1">Time</p>
                    <p
                      className="text-sm text-muted-foreground"
                      data-testid="event-detail-time"
                    >
                      {event.time}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold mb-1">Location</p>
                    <p
                      className="text-sm text-muted-foreground"
                      data-testid="event-detail-location"
                    >
                      {event.location}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">About This Event</h2>
              <p
                className="text-lg text-muted-foreground leading-relaxed mb-6"
                data-testid="event-detail-description"
              >
                {event.description}
              </p>

              {event.fullDescription && (
                <div className="prose prose-lg max-w-none mt-6">
                  <p
                    className="text-muted-foreground leading-relaxed whitespace-pre-line"
                    data-testid="event-detail-full-description"
                  >
                    {event.fullDescription}
                  </p>
                  <span className="flex-row mt-10 flex items-center gap-4 p-3 text-xs text-muted-foreground">
                    {/* Liking Btn */}
                    <span className="flex-row cursor-pointer flex   items-center gap-2   transition-colors">
                      0 Views
                      <Eye className=" hover:text-primary" size={16} />
                    </span>
                    <span className="flex-row cursor-pointer flex   items-center gap-2   transition-colors">
                      0 Likes
                      <ThumbsUpIcon
                        className="mb-1 hover:text-primary"
                        size={16}
                      />
                    </span>

                    {/* Saving Btn */}
                    <span className="flex-row cursor-pointer flex items-center gap-2   transition-colors">
                      Save
                      <Bookmark size={16} className="hover:text-primary" />
                    </span>

                    {/* Sharing Btn */}
                    <span
                      className="flex-row cursor-pointer flex-1 flex items-center gap-2   transition-colors"
                      onClick={() => {
                        try {
                          const url = `${window.location.origin}/events/${params?._id}`;
                          navigator.clipboard?.writeText(url);
                          toast({ title: "link copied" });
                        } catch (e) {
                          toast({
                            title: "Could not copy link",
                            variant: "destructive",
                          });
                        }
                      }}
                    >
                      <span>Share</span>
                      <Share2 size={16} className="hover:text-primary" />
                    </span>
                    <span className="text-xs text-muted">{event.date}</span>
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {event.status === "upcoming" && (
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">
                  Register for This Event
                </h3>
                <p className="text-muted-foreground mb-4">
                  Interested in attending? Contact us to reserve your spot or
                  learn more about how you can participate.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact">
                    <Button data-testid="button-contact">Contact Us</Button>
                  </Link>
                  <Link href="/get-involved">
                    <Button variant="outline" data-testid="button-volunteer">
                      Volunteer at This Event
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          {event.status === "past" && (
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">
                  Missed This Event?
                </h3>
                <p className="text-muted-foreground mb-4">
                  Check out our upcoming events or view highlights from our past
                  programs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/events">
                    <Button data-testid="button-upcoming-events">
                      View Upcoming Events
                    </Button>
                  </Link>
                  <Link href="/media">
                    <Button
                      variant="outline"
                      data-testid="button-media-gallery"
                    >
                      Media Gallery
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
