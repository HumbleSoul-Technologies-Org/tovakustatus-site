// Local storage data management for Tova ku Status
// This provides a simple client-side database using localStorage

export interface Talent {
  id: string;
  name: string;
  age: number;
  talentType: string;
  description: string;
  imageUrl: string;
  fullStory?: string;
  status: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  date: string;
  participants: number;
  imageUrl: string;
  fullDescription?: string;
  status: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  status: "upcoming" | "ongoing" | "past";
  imageUrl?: string;
  fullDescription?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  imageUrl?: string;
  readTime?: string;
  content?: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  name: string;
  subscribedDate: string;
}

// Initialize default data
export const defaultData = {
  talents: [
    {
      id: "1",
      name: "Amani Grace",
      age: 12,
      talentType: "Music",
      description: "Amani has been playing violin for 3 years and dreams of performing in international orchestras.",
      fullStory: "Amani Grace discovered her love for music at age 9 when she heard a violin performance at a community event. Despite coming from a family with limited resources, her natural talent was undeniable. Through Tova ku Status, she received her first violin and has been training with professional instructors ever since. Her dedication and natural talent shine through every performance. Amani practices 2 hours daily and has already performed at several local events. Her dream is to attend a prestigious music conservatory and eventually perform in international orchestras.",
      imageUrl: "/public/Talented_girl_with_violin_portrait_f9f1e1a7.png",
      status: "Active",
      views:2
    },
    {
      id: "2",
      name: "David Kwame",
      age: 14,
      talentType: "Sports",
      description: "An exceptional football player with incredible speed and technique.",
      fullStory: "David Kwame grew up playing football with makeshift balls in the streets of his neighborhood. His exceptional speed and natural ball control caught the attention of our talent scouts during a community outreach program. Since joining Tova ku Status, David has received professional coaching and proper equipment. He has become a team captain and leads by example both on and off the field. David aspires to play professionally and represent his country on the world stage, and with his determination and skill, that dream is within reach.",
      imageUrl: "/public/Talented_boy_playing_soccer_portrait_4a119641.png",
      status: "Active",
      views:19
    },
    {
      id: "3",
      name: "Sarah Nkunda",
      age: 11,
      talentType: "Art",
      description: "Sarah's vibrant paintings capture the beauty of her community.",
      fullStory: "Sarah Nkunda has always seen the world differently. Even with limited art supplies, she would create stunning drawings using whatever materials she could find. Her vibrant paintings capture the beauty, struggles, and hopes of her community in ways that words cannot express. Through Tova ku Status, Sarah now has access to quality art supplies and mentorship from professional artists. She uses art as a powerful medium to tell stories and inspire others. Her work has been exhibited in local galleries, and she dreams of becoming a renowned artist who brings African stories to the world.",
      imageUrl: "/public/Talented_girl_painting_art_portrait_9df2082c.png",
      status: "Active",
      views:79
    },
    {
      id: "4",
      name: "Emmanuel Habimana",
      age: 13,
      talentType: "Music",
      description: "A gifted pianist with an incredible ear for music.",
      fullStory: "Emmanuel's journey with music began when he taught himself to play simple melodies on a borrowed keyboard. His incredible ear for music and natural understanding of musical theory amazed everyone who heard him play. Emmanuel composes his own pieces, blending traditional Rwandan melodies with classical piano compositions. Since joining our program, he has studied under accomplished pianists and has performed at several high-profile events. Emmanuel hopes to study music at a prestigious conservatory and become a composer who bridges cultures through music.",
      imageUrl: "/public/Talent_showcase_performance_event_photo_037e6d5f.png",
      status: "Active",
      views:43
    }
  ],
  projects: [
    {
      id: "1",
      title: "Music Workshop Series",
      description: "A comprehensive music education program providing instruments, training, and performance opportunities.",
      fullDescription: "The Music Workshop Series is our flagship program for nurturing musical talent. This comprehensive initiative provides talented young musicians from underprivileged communities with access to professional-grade instruments, weekly training sessions with accomplished instructors, and regular performance opportunities. Students learn music theory, technique, and ensemble playing. The program includes individual lessons, group sessions, and monthly concerts where students showcase their progress. Over 45 students have participated this year, with many going on to perform at prestigious venues across Rwanda.",
      date: "March 15, 2024",
      participants: 45,
      imageUrl: "/public/Talented_girl_with_violin_portrait_f9f1e1a7.png",
      status: "Active"
    },
    {
      id: "2",
      title: "Sports Excellence Camp",
      description: "Intensive training camp bringing together young athletes for skill development and mentorship.",
      fullDescription: "The Sports Excellence Camp is an intensive program designed to develop athletic talent while building character and leadership skills. Young athletes receive professional coaching in football, basketball, and athletics. The camp includes daily training sessions, nutrition education, mental conditioning, and exposure to professional sports standards. Participants learn the importance of discipline, teamwork, and perseverance. This year's camp brought together 60 talented young athletes who trained alongside professional coaches and former national team players.",
      date: "April 2, 2024",
      participants: 60,
      imageUrl: "/public/Sports_day_community_event_photo_a4d50b69.png",
      status: "Active"
    },
    {
      id: "3",
      title: "Annual Talent Showcase",
      description: "Our flagship event celebrating the achievements of talented youth.",
      fullDescription: "The Annual Talent Showcase is our most anticipated event of the year, celebrating the incredible achievements of the talented young people we support. This spectacular event features live musical performances, art exhibitions, sports demonstrations, and dance showcases. It's an opportunity for our talents to demonstrate their skills to a wider audience including potential sponsors, partners, and supporters. The event is open to the public, with all proceeds supporting our future programs. Last year's showcase attracted over 500 attendees and featured performances from 120 talented youth.",
      date: "May 10, 2024",
      participants: 120,
      imageUrl: "/public/Hero_image_diverse_talented_kids_8dd4ac07.png",
      status: "Active"
    }
  ],
  events: [
    {
      id: "1",
      title: "Annual Talent Showcase",
      description: "A celebration of our talented youth featuring performances, art exhibitions, and sports demonstrations.",
      fullDescription: "Join us for our most anticipated event of the year! The Annual Talent Showcase brings together all our talented youth for an inspiring evening of performances, exhibitions, and demonstrations. Watch young musicians perform classical and contemporary pieces, view stunning art exhibitions, and witness athletic demonstrations from our sports programs. This event celebrates not just talent, but determination, hard work, and the power of opportunity. All proceeds support our programs and help us reach even more talented young people.",
      date: "June 15, 2024",
      time: "2:00 PM - 6:00 PM",
      location: "Kigali Convention Centre",
      status: "upcoming" as const,
      imageUrl: "/public/Hero_image_diverse_talented_kids_8dd4ac07.png"
    },
    {
      id: "2",
      title: "Community Outreach Day",
      description: "Join us as we visit schools and communities to discover and nurture new talent.",
      fullDescription: "Our Community Outreach Day is when we take our mission directly to the communities that need it most. Our team of talent scouts, instructors, and volunteers visit schools and neighborhoods across Nyarugenge District to identify talented young people who could benefit from our programs. We conduct mini-workshops, demonstrations, and assessments. This is also a great opportunity for community members to learn more about Tova ku Status and how we can help. Volunteers are always welcome to join us on these important missions!",
      date: "May 20, 2024",
      time: "9:00 AM - 4:00 PM",
      location: "Nyarugenge District",
      status: "ongoing" as const,
      imageUrl: "/public/Community_workshop_outreach_event_photo_3fb17f3c.png"
    },
    {
      id: "3",
      title: "Music Workshop Series - Session 5",
      description: "Advanced violin and piano training for our music program participants.",
      fullDescription: "Session 5 of our Music Workshop Series focuses on advanced techniques for violin and piano students. We're honored to host a guest instructor from the Rwanda Philharmonic Orchestra who will work with our most advanced students. The session will cover performance techniques, stage presence, and preparing for auditions. This is an invaluable opportunity for our young musicians to learn from a professional performer and gain insights into the world of classical music performance.",
      date: "May 25, 2024",
      time: "3:00 PM - 6:00 PM",
      location: "Tova ku Status Music Centre",
      status: "upcoming" as const,
      imageUrl: "/public/Talent_showcase_performance_event_photo_037e6d5f.png"

    },
    {
      id: "4",
      title: "Sports Day Championship",
      description: "Inter-program sports competition featuring football, basketball, and athletics.",
      fullDescription: "Our Sports Day Championship was an incredible display of athletic talent and sportsmanship. Young athletes from our various sports programs competed in football, basketball, and athletics events. The day was filled with exciting matches, personal bests, and inspiring displays of determination. Beyond the competition, the event emphasized the values of fair play, teamwork, and mutual respect. Winners received medals and certificates, but every participant left as a champion, having given their best effort and supported their teammates.",
      date: "April 10, 2024",
      time: "8:00 AM - 5:00 PM",
      location: "Amahoro Stadium",
      status: "past" as const,
      imageUrl: "/public/Sports_day_community_event_photo_a4d50b69.png"
    }
  ],
  blogPosts: [
    {
      id: "1",
      title: "Celebrating One Year of Musical Excellence",
      excerpt: "Reflecting on a year of incredible growth, dedication, and beautiful music created by our talented youth.",
      content: `As we mark one year of our Music Workshop Series, we're filled with pride and gratitude for the incredible journey our young musicians have undertaken. What started with 15 nervous students holding instruments for the first time has blossomed into a thriving musical community of over 45 talented youth.

The transformation has been remarkable. Students who could barely hold their instruments now perform complex pieces with confidence and skill. Our weekly concerts have become community events, drawing audiences eager to witness the power of talent combined with dedication.

We've seen Amani Grace grow from a beginner violinist to a performer who moves audiences to tears. Emmanuel's piano compositions have been featured at local cultural events. The joy on their faces when they master a difficult piece is priceless.

This success wouldn't be possible without our incredible instructors, volunteers, and supporters who believe in the power of music to transform lives. Here's to many more years of musical excellence!`,
      author: "Maria Johnson",
      date: "March 10, 2024",
      category: "Success Stories",
      imageUrl: "/public/Talented_girl_with_violin_portrait_f9f1e1a7.png",
      readTime: "5 min read",
      views: 16
    },
    {
      id: "2",
      title: "How Art Transforms Communities",
      excerpt: "Exploring the powerful impact of creative expression on young minds and their communities.",
      content: `Art is more than creating beautiful images—it's a powerful tool for change, self-expression, and community transformation. Through our art program, we've witnessed firsthand how creative expression can unlock potential and inspire entire communities.

Young artists like Sarah Nkunda use their work to tell stories that need to be heard. Their paintings capture the reality of their communities while also expressing hope and possibility. When Sarah's work was exhibited at the Kigali Arts Centre, it sparked conversations about youth potential and the importance of supporting talent regardless of economic background.

Art builds confidence. Students who were once shy and reserved now proudly present their work to audiences. They've learned that their perspective matters and that they have valuable contributions to make to society.

The ripple effects extend beyond individual artists. When community members see talented youth creating beautiful art, it changes perceptions about what's possible. It inspires younger children to pursue their own creative interests. It brings communities together around shared cultural expression.

We're committed to continuing this important work, providing more young people with the tools, training, and opportunities to express themselves through art.`,
      author: "John Smith",
      date: "March 5, 2024",
      category: "Impact",
      readTime: "4 min read",
      imageUrl: "/public/Talented_girl_painting_art_portrait_9df2082c.png",
      views: 34
       
    },
    {
      id: "3",
      title: "Meet Our New Sports Coaches",
      excerpt: "Introducing the passionate professionals who are shaping the next generation of athletes.",
      content: `We're thrilled to introduce three exceptional coaches who have joined our sports program team. Their dedication, expertise, and passion for youth development are already making a tremendous impact.

Coach Patrick Mugisha brings 15 years of professional football experience, including time with the national team. His approach emphasizes both skill development and character building. "These young athletes have incredible potential," he says. "My job is to help them develop not just as players, but as leaders."

Coach Grace Uwimana specializes in basketball and athletic conditioning. Her innovative training methods have helped students improve their performance while avoiding injuries. She believes in the power of sports to teach life lessons about perseverance, teamwork, and resilience.

Coach Emmanuel Nkusi focuses on athletics and overall fitness. His program helps students build a strong foundation of physical literacy that will serve them well regardless of which sport they ultimately pursue.

Together, these coaches are transforming young lives, proving that with proper guidance and support, talent can flourish and dreams can become reality.`,
      author: "Sarah Williams",
      date: "February 28, 2024",
      category: "Team",
      imageUrl: "/public/Talented_boy_playing_soccer_portrait_4a119641.png",
      readTime: "3 min read",
      views: 2

    }
  ],
  newsletterSubscribers: [
    {
      id: "1",
      email: "john.doe@example.com",
      name: "John Doe",
      subscribedDate: "2024-01-15"
    },
    {
      id: "2",
      email: "jane.smith@example.com",
      name: "Jane Smith",
      subscribedDate: "2024-02-20"
    }
  ]
};

// Storage keys
const STORAGE_KEYS = {
  TALENTS: 'tova_talents',
  PROJECTS: 'tova_projects',
  EVENTS: 'tova_events',
  BLOG_POSTS: 'tova_blog_posts',
  NEWSLETTER: 'tova_newsletter',
  AUTH_USER: 'tova_auth_user'
};

// Initialize storage with default data if empty
export function initializeStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.TALENTS)) {
    localStorage.setItem(STORAGE_KEYS.TALENTS, JSON.stringify(defaultData.talents));
  }
  if (!localStorage.getItem(STORAGE_KEYS.PROJECTS)) {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(defaultData.projects));
  }
  if (!localStorage.getItem(STORAGE_KEYS.EVENTS)) {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(defaultData.events));
  }
  if (!localStorage.getItem(STORAGE_KEYS.BLOG_POSTS)) {
    localStorage.setItem(STORAGE_KEYS.BLOG_POSTS, JSON.stringify(defaultData.blogPosts));
  }
  if (!localStorage.getItem(STORAGE_KEYS.NEWSLETTER)) {
    localStorage.setItem(STORAGE_KEYS.NEWSLETTER, JSON.stringify(defaultData.newsletterSubscribers));
  }
}

// Talents
export function getTalents(): Talent[] {
  const data = defaultData.talents
  return data  
}

export function getTalentById(id: string): Talent | undefined {
  const talents = getTalents();
  return talents.find(t => t.id === id);
}

export function saveTalents(talents: Talent[]) {
  localStorage.setItem(STORAGE_KEYS.TALENTS, JSON.stringify(talents));
}

export function addTalent(talent: Omit<Talent, 'id'>) {
  const talents = getTalents();
  const newTalent = { ...talent, id: Date.now().toString() };
  talents.push(newTalent);
  saveTalents(talents);
  return newTalent;
}

export function updateTalent(id: string, updates: Partial<Talent>) {
  const talents = getTalents();
  const index = talents.findIndex(t => t.id === id);
  if (index !== -1) {
    talents[index] = { ...talents[index], ...updates };
    saveTalents(talents);
    return talents[index];
  }
  return null;
}

export function deleteTalent(id: string) {
  const talents = getTalents().filter(t => t.id !== id);
  saveTalents(talents);
}

// Projects
export function getProjects(): Project[] {
  const data = localStorage.getItem(STORAGE_KEYS.PROJECTS);
  return data ? JSON.parse(data) : [];
}

export function getProjectById(id: string): Project | undefined {
  const projects = getProjects();
  return projects.find(p => p.id === id);
}

export function saveProjects(projects: Project[]) {
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
}

export function addProject(project: Omit<Project, 'id'>) {
  const projects = getProjects();
  const newProject = { ...project, id: Date.now().toString() };
  projects.push(newProject);
  saveProjects(projects);
  return newProject;
}

export function updateProject(id: string, updates: Partial<Project>) {
  const projects = getProjects();
  const index = projects.findIndex(p => p.id === id);
  if (index !== -1) {
    projects[index] = { ...projects[index], ...updates };
    saveProjects(projects);
    return projects[index];
  }
  return null;
}

export function deleteProject(id: string) {
  const projects = getProjects().filter(p => p.id !== id);
  saveProjects(projects);
}

// Events
export function getEvents(): Event[] {
  const data =  defaultData.events
  return data  
}

export function getEventById(id: string): Event | undefined {
  const events = getEvents();
  return events.find(e => e.id === id);
}

export function saveEvents(events: Event[]) {
  localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
}

export function addEvent(event: Omit<Event, 'id'>) {
  const events = getEvents();
  const newEvent = { ...event, id: Date.now().toString() };
  events.push(newEvent);
  saveEvents(events);
  return newEvent;
}

export function updateEvent(id: string, updates: Partial<Event>) {
  const events = getEvents();
  const index = events.findIndex(e => e.id === id);
  if (index !== -1) {
    events[index] = { ...events[index], ...updates };
    saveEvents(events);
    return events[index];
  }
  return null;
}

export function deleteEvent(id: string) {
  const events = getEvents().filter(e => e.id !== id);
  saveEvents(events);
}

// Blog Posts
export function getBlogPosts(): BlogPost[] {
  const data = defaultData.blogPosts
  return data  
}

export function getBlogPostById(id: string): BlogPost | undefined {
  const posts = getBlogPosts();
  return posts.find(p => p.id === id);
}

export function saveBlogPosts(posts: BlogPost[]) {
  localStorage.setItem(STORAGE_KEYS.BLOG_POSTS, JSON.stringify(posts));
}

export function addBlogPost(post: Omit<BlogPost, 'id'>) {
  const posts = getBlogPosts();
  const newPost = { ...post, id: Date.now().toString() };
  posts.push(newPost);
  saveBlogPosts(posts);
  return newPost;
}

export function updateBlogPost(id: string, updates: Partial<BlogPost>) {
  const posts = getBlogPosts();
  const index = posts.findIndex(p => p.id === id);
  if (index !== -1) {
    posts[index] = { ...posts[index], ...updates };
    saveBlogPosts(posts);
    return posts[index];
  }
  return null;
}

export function deleteBlogPost(id: string) {
  const posts = getBlogPosts().filter(p => p.id !== id);
  saveBlogPosts(posts);
}

// Newsletter
export function getNewsletterSubscribers(): NewsletterSubscriber[] {
  const data = localStorage.getItem(STORAGE_KEYS.NEWSLETTER);
  return data ? JSON.parse(data) : [];
}

export function saveNewsletterSubscribers(subscribers: NewsletterSubscriber[]) {
  localStorage.setItem(STORAGE_KEYS.NEWSLETTER, JSON.stringify(subscribers));
}

export function addNewsletterSubscriber(subscriber: Omit<NewsletterSubscriber, 'id'>) {
  const subscribers = getNewsletterSubscribers();
  const newSubscriber = { ...subscriber, id: Date.now().toString() };
  subscribers.push(newSubscriber);
  saveNewsletterSubscribers(subscribers);
  return newSubscriber;
}

export function deleteNewsletterSubscriber(id: string) {
  const subscribers = getNewsletterSubscribers().filter(s => s.id !== id);
  saveNewsletterSubscribers(subscribers);
}

// Authentication
export interface AuthUser {
  username: string;
  isAuthenticated: boolean;
}

export function login(username: string, password: string): boolean {
  // Simple client-side auth - in production this would be server-side
  // Default credentials: admin / admin123
  if (username === 'admin' && password === 'admin123') {
    const user: AuthUser = { username, isAuthenticated: true };
    localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
}

export function getAuthUser(): AuthUser | null {
  const data = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
  return data ? JSON.parse(data) : null;
}

export function isAuthenticated(): boolean {
  const user = getAuthUser();
  return user?.isAuthenticated || false;
}
