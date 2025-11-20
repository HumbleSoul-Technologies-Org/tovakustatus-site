// Local storage data management for Tova ku Status
// This provides a simple client-side database using localStorage

export interface Talent {
  _id: string;
  name: string;
  age: number;
  talentType: string;
  description: string;
  imageUrl: string;
  image?:{url:string, public_id:string};
  videoUrl?: string;
  fullStory?: string;
  status: string;
  views: [number];
  likes: [string],
  shares:[string]
}

export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  status: "upcoming" | "ongoing" | "past";
  imageUrl?: string;
  image?:{url:string, public_id:string};
  fullDescription?: string;
  videoUrl?: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image?:{url:string, public_id:string};
  imageUrl?: string;
  readTime?: string;
  content?: string;
  videoUrl?: string;
}

export interface NewsletterSubscriber {
  _id: string;
  email: string;
  name: string;
  createdAt: string;
}

// Initialize default data
export const defaultData = {
  talents: [],
  events: [],
  blogPosts: [],
  newsletterSubscribers: []
};

// Storage keys
export const STORAGE_KEYS = {
  TALENTS: 'tova_talents',
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
  const data:any = localStorage.getItem(STORAGE_KEYS.TALENTS);
 
  return JSON.parse(data);
}

export function getTalentById(id: string): Talent | undefined {
  const talents = getTalents();
  return talents.find(t => t._id === id);
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
  const index = talents.findIndex(t => t._id === id);
  if (index !== -1) {
    talents[index] = { ...talents[index], ...updates };
    saveTalents(talents);
    return talents[index];
  }
  return null;
}

export function deleteTalent(id: string) {
  const talents = getTalents().filter(t => t._id !== id);
  saveTalents(talents);
}

// Events
export function getEvents(): Event[] {
  const data:any = localStorage.getItem(STORAGE_KEYS.EVENTS);
   
  return JSON.parse(data);
}

export function getEventById(id: string): Event | undefined {
  const events = getEvents();
  return events.find(e => e._id === id);
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
  const index = events.findIndex(e => e._id === id);
  if (index !== -1) {
    events[index] = { ...events[index], ...updates };
    saveEvents(events);
    return events[index];
  }
  return null;
}

export function deleteEvent(id: string) {
  const events = getEvents().filter(e => e._id !== id);
  saveEvents(events);
}

// Blog Posts
export function getBlogPosts(): BlogPost[] {
  const data = localStorage.getItem(STORAGE_KEYS.BLOG_POSTS);
  
  return data ? JSON.parse(data) : [];
}

export function getBlogPostById(id: string): BlogPost | undefined {
  const posts = getBlogPosts();
  return posts.find(p => p._id === id);
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
  const index = posts.findIndex(p => p._id === id);
  if (index !== -1) {
    posts[index] = { ...posts[index], ...updates };
    saveBlogPosts(posts);
    return posts[index];
  }
  return null;
}

export function deleteBlogPost(id: string) {
  const posts = getBlogPosts().filter(p => p._id !== id);
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
  const subscribers = getNewsletterSubscribers().filter(s => s._id !== id);
  saveNewsletterSubscribers(subscribers);
}

// Authentication
export interface AuthUser {
  token: string;
  isAuthenticated: boolean;
}

export function login(token: string): boolean {
  if (token) {
    const user: AuthUser = { token, isAuthenticated: true };
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
