import BlogCard from '../BlogCard'
import blogImage from '@assets/generated_images/Community_workshop_outreach_event_photo_3fb17f3c.png'

export default function BlogCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
      <BlogCard
        id="1"
        title="Celebrating One Year of Musical Excellence"
        excerpt="Reflecting on a year of incredible growth, dedication, and beautiful music created by our talented youth."
        author="Maria Johnson"
        date="March 10, 2024"
        category="Success Stories"
        imageUrl={blogImage}
        readTime="5 min read"
      />
      <BlogCard
        id="2"
        title="How Art Transforms Communities"
        excerpt="Exploring the powerful impact of creative expression on young minds and their communities."
        author="John Smith"
        date="March 5, 2024"
        category="Impact"
        readTime="4 min read"
      />
      <BlogCard
        id="3"
        title="Meet Our New Sports Coaches"
        excerpt="Introducing the passionate professionals who are shaping the next generation of athletes."
        author="Sarah Williams"
        date="February 28, 2024"
        category="Team"
        imageUrl={blogImage}
        readTime="3 min read"
      />
    </div>
  )
}
