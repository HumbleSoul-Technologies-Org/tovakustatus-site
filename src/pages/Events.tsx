import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import EventCard from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { Calendar, Grid } from "lucide-react";
import { getEvents, Event } from "@/lib/localStorage";

export default function Events() {
  const [viewMode, setViewMode] = useState<"grid" | "timeline">("grid");
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const data = getEvents();
    setEvents(data);
  }, []);

  const upcomingEvents = events.filter(e => e.status === "upcoming" || e.status === "ongoing");
  const pastEvents = events.filter(e => e.status === "past");

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
            <h2 className="text-3xl md:text-4xl font-bold">Upcoming Events({upcomingEvents?.length||0})</h2>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
                data-testid="button-view-grid"
              >
                <Grid className="h-5 w-5" />
              </Button>
              <Button
                variant={viewMode === "timeline" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("timeline")}
                data-testid="button-view-timeline"
              >
                <Calendar className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-8">Past Events({pastEvents?.length||0})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pastEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
