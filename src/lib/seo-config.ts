/**
 * SEO Configuration Reference
 * Copy and customize for each page
 */

// Example: Talents Page
export const TALENTS_PAGE_SEO = {
  title: "Discover Talented Youth - Tova ku Status",
  description: "Browse and discover extraordinary talented kids from underprivileged schools. Meet emerging artists, athletes, and innovators with incredible potential.",
  keywords: [
    "talented youth",
    "talent discovery",
    "young talents",
    "skill showcase",
    "emerging artists",
    "youth empowerment",
    "mentorship programs",
  ],
  imageUrl: "https://res.cloudinary.com/ghost150/image/upload/v1762586138/tovakustatus-removebg-preview_ys9avx.png",
};

// Example: Blog Page
export const BLOG_PAGE_SEO = {
  title: "Blog & News - Tova ku Status",
  description: "Read stories, insights, and updates about youth empowerment, talent development, and social impact initiatives.",
  keywords: [
    "blog",
    "news",
    "insights",
    "youth stories",
    "social impact",
    "empowerment stories",
    "talent development",
  ],
  imageUrl: "https://res.cloudinary.com/ghost150/image/upload/v1762586138/tovakustatus-removebg-preview_ys9avx.png",
};

// Example: Events Page
export const EVENTS_PAGE_SEO = {
  title: "Events & Workshops - Tova ku Status",
  description: "Join us for community events, workshops, talent showcases, and networking opportunities to celebrate and support emerging talents.",
  keywords: [
    "events",
    "workshops",
    "talent showcase",
    "webinars",
    "community events",
    "networking",
    "skills training",
  ],
  imageUrl: "https://res.cloudinary.com/ghost150/image/upload/v1762586138/tovakustatus-removebg-preview_ys9avx.png",
};

// Example: Get Involved Page
export const GET_INVOLVED_PAGE_SEO = {
  title: "Get Involved - Support Talented Youth",
  description: "Join our mission! Volunteer, partner, sponsor, or donate to support talented kids from underprivileged communities.",
  keywords: [
    "volunteer",
    "partnership",
    "sponsorship",
    "donate",
    "support youth",
    "social cause",
    "community service",
  ],
  imageUrl: "https://res.cloudinary.com/ghost150/image/upload/v1762586138/tovakustatus-removebg-preview_ys9avx.png",
};

// Example: About Page
export const ABOUT_PAGE_SEO = {
  title: "About Us - Tova ku Status",
  description: "Learn about our mission, vision, and impact. Discover how Tova ku Status is changing lives by empowering talented youth.",
  keywords: [
    "about us",
    "mission",
    "vision",
    "our team",
    "organization",
    "social impact",
    "empowerment initiative",
  ],
  imageUrl: "https://res.cloudinary.com/ghost150/image/upload/v1762586138/tovakustatus-removebg-preview_ys9avx.png",
};

// Example: Contact Page
export const CONTACT_PAGE_SEO = {
  title: "Contact Us - Tova ku Status",
  description: "Get in touch with Tova ku Status. Send us a message or reach out to learn more about partnerships and sponsorships.",
  keywords: [
    "contact",
    "get in touch",
    "support",
    "inquiries",
    "partnerships",
    "sponsorship",
  ],
  imageUrl: "https://res.cloudinary.com/ghost150/image/upload/v1762586138/tovakustatus-removebg-preview_ys9avx.png",
};

// Example: Talent Detail Page (Dynamic)
export const getTalentDetailSEO = (talentName: string, talentType: string) => ({
  title: `${talentName} - ${talentType} | Tova ku Status`,
  description: `Meet ${talentName}, an extraordinary ${talentType} talent. Discover their story and potential at Tova ku Status.`,
  keywords: [
    talentName,
    talentType,
    "talented youth",
    "emerging talent",
    "skill showcase",
    talentType.toLowerCase(),
  ],
  type: "profile",
});

// Example: Blog Detail Page (Dynamic)
export const getBlogDetailSEO = (
  title: string,
  excerpt: string,
  author: string
) => ({
  title: `${title} | Blog - Tova ku Status`,
  description: excerpt || "Read this insightful article on Tova ku Status blog.",
  keywords: [
    "blog",
    "article",
    title,
    author,
    "youth empowerment",
    "social impact",
  ],
  type: "article",
});

// Example: Event Detail Page (Dynamic)
export const getEventDetailSEO = (eventTitle: string, location: string) => ({
  title: `${eventTitle} - Tova ku Status Events`,
  description: `Join us for ${eventTitle} at ${location}. A community event celebrating and supporting talented youth.`,
  keywords: [
    "event",
    eventTitle,
    location,
    "workshop",
    "talent showcase",
    "community event",
  ],
  type: "event",
});
