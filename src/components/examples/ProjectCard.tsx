import ProjectCard from '../ProjectCard'
import projectImage from '@assets/generated_images/Community_workshop_outreach_event_photo_3fb17f3c.png'

export default function ProjectCardExample() {
  return (
    <div className="space-y-8 p-8">
      <ProjectCard
        id="1"
        title="Music Workshop Series"
        description="A comprehensive music education program providing instruments, training, and performance opportunities to talented young musicians from underprivileged communities."
        date="March 15, 2024"
        participants={45}
        imageUrl={projectImage}
      />
      <ProjectCard
        id="2"
        title="Sports Excellence Camp"
        description="Intensive training camp bringing together young athletes for skill development, mentorship, and exposure to professional coaching standards."
        date="April 2, 2024"
        participants={60}
        imageUrl={projectImage}
      />
    </div>
  )
}
