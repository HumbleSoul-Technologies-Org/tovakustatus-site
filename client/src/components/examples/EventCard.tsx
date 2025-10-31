import EventCard from '../EventCard'
import eventImage from '@assets/generated_images/Talent_showcase_performance_event_photo_037e6d5f.png'

export default function EventCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
      <EventCard
        id="1"
        title="Annual Talent Showcase"
        description="A celebration of our talented youth featuring performances, art exhibitions, and sports demonstrations."
        date="June 15, 2024"
        time="2:00 PM - 6:00 PM"
        location="Kigali Convention Centre"
        status="upcoming"
        imageUrl={eventImage}
      />
      <EventCard
        id="2"
        title="Community Outreach Day"
        description="Join us as we visit schools and communities to discover and nurture new talent."
        date="May 20, 2024"
        time="9:00 AM - 4:00 PM"
        location="Nyarugenge District"
        status="ongoing"
        imageUrl={eventImage}
      />
    </div>
  )
}
