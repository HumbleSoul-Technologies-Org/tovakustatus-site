import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import EventCard from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { Calendar, Grid, Loader } from "lucide-react";
import { getEvents, Event, saveEvents } from "@/lib/localStorage";
import { format, isValid } from "date-fns";
import { useQuery } from "@tanstack/react-query";

export default function Events() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["events", "all"],
  });
  const [viewMode, setViewMode] = useState<"grid" | "timeline">("grid");
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (data && data.events) {
      setEvents(data.events);
    }
  }, []);

  const upcomingEvents = events.filter(
    (e) => e.status === "upcoming" || e.status === "ongoing"
  );
  const pastEvents = events.filter((e) => e.status === "past");

  return (
    <div>
      <Hero
        title="Events & Activities"
        description="Join us at our upcoming events or explore past highlights"
        minHeight="min-h-[400px] md:min-h-[500px]"
      />

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Upcoming Events({upcomingEvents?.length || 0})
            </h2>
          </div>

          {isLoading ? (
            <span className="flex-1 text-3xl items-center flex gap-1">
              Loading Events... <Loader className="size-10 animate-spin" />
            </span>
          ) : data && data?.events > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {upcomingEvents.map((event) => (
                <EventCard key={event._id} {...event} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <p className="text-muted-foreground">No events yet!</p>
            </div>
          )}

          {pastEvents.length > 0 && (
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Past Events({pastEvents?.length || 0})
            </h2>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pastEvents.map((event) => (
              <EventCard key={event._id} {...event} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
