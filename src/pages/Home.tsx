import {
  Users,
  Heart,
  Target,
  TrendingUp,
  LightbulbIcon,
  Building2Icon,
  Building,
  Loader,
  Calendar as CalendarIcon,
  Clock,
} from "lucide-react";
import { Link } from "wouter";
import Hero from "@/components/Hero";
import StatCard from "@/components/StatCard";
import TalentCard from "@/components/TalentCard";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "/Hero_image_diverse_talented_kids_8dd4ac07.png";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";

import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { Talent, BlogPost, Event } from "@/lib/localStorage";

// Loading skeleton component
const SkeletonCard = () => (
  <Card className="overflow-hidden animate-pulse">
    <div className="aspect-video bg-muted" />
    <CardContent className="p-6">
      <div className="h-4 bg-muted rounded mb-3" />
      <div className="h-6 bg-muted rounded mb-4" />
      <div className="h-4 bg-muted rounded w-2/3" />
    </CardContent>
  </Card>
);

export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [latestBlogs, setLatestBlogs] = useState<BlogPost[]>([]);
  const [featuredTalents, setFeaturedTalents] = useState<Talent[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);

  const { data: blogData, isLoading: isBlogLoading } = useQuery<{
    blogs: BlogPost[];
  } | null>({
    queryKey: ["blogs", "all"],
    queryFn: getQueryFn({ on401: "returnNull", timeout: 5000 }),
    retry: 1,
    retryDelay: 2000,
  });

  const { data: talentData, isLoading: isTalentLoading } = useQuery<{
    talents: Talent[];
  } | null>({
    queryKey: ["talents", "all"],
    queryFn: getQueryFn({ on401: "throw", timeout: 5000 }),
    retry: 1,
    retryDelay: 2000,
  });

  const { data: eventData, isLoading: isEventLoading } = useQuery<{
    events: Event[];
  } | null>({
    queryKey: ["events", "all"],
    queryFn: getQueryFn({ on401: "throw", timeout: 5000 }),
    retry: 1,
    retryDelay: 2000,
  });

  useEffect(() => {
    if (blogData && blogData.blogs && blogData.blogs.length > 0) {
      setLatestBlogs(blogData.blogs);
    }
    if (talentData && talentData.talents && talentData.talents.length > 0) {
      setFeaturedTalents(talentData.talents);
    }
    if (eventData && eventData.events && eventData.events.length > 0) {
      setUpcomingEvents(eventData.events);
    }
  }, [blogData, talentData, eventData]);

  const partners: any = [
    {
      _id: 1,
      name: "MTN Uganda",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvjprybczXjAGqMKIQCWB17enuKvo4OvyRfg&s",
    },
    {
      _id: 2,
      name: "Airtel",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Airtel_logo-01.png",
    },
    {
      _id: 3,
      name: "BTM TV",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBx04aDoMCi7M5pfnDPsGZNZ9GCZzQYQSLJA&s",
    },
    {
      _id: 4,
      name: "Centenary Bank",
      logo: "https://pbs.twimg.com/ext_tw_video_thumb/1376488116601643017/pu/img/R4fZDLnvwDgg9btt.jpg",
    },
    {
      _id: 5,
      name: "Uganda Airlines",
      logo: "https://airhex.com/images/airline-logos/alt/uganda-airlines.png",
    },
    {
      _id: 6,
      name: "Stanbic Bank",
      logo: "https://yt3.googleusercontent.com/ytc/AIdro_lf3Xdg6kJK0OpUubd-c5mBH6tgC65RWLmKLGKlVJBgKg=s900-c-k-c0x00ffffff-no-rj",
    },
    {
      _id: 7,
      name: "New Vision",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOcNFubc_clAAx23JDlUyA2-aFLfLViCvkrQ&s",
    },
    {
      _id: 8,
      name: "KFM",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQjNZnzECFC0PbGq2K-Eh433w3z6xeXXEUAA&s",
    },
  ];

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    const uuid = localStorage.getItem("visitor_id") || "";

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/news-letter/subscribe`,
        { email, uuid }
      );

      if (response.status === 201) {
        toast({
          title: "Subscription Successful",
          description: response.data.message,
          variant: "success",
        });
        setEmail(""); // Clear the input after successful subscription
      }
    } catch (error: any) {
      console.error("Subscription error:", error);
      toast({
        title: "Subscription failed",
        description:
          error.response?.data?.message ||
          "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Hero
        subtitle="Welcome to Tova ku Status"
        title="Looking Beyond For Greater talents"
        description="Identifying and empowering talented & underprivileged youths in schools and ghetos across Uganda."
        primaryCTA={{ label: "Donate Now", href: "/get-involved" }}
        secondaryCTA={{ label: "Discover Talents", href: "/talents" }}
        backgroundImage={heroImage}
        trustIndicator="Empowering 500+ talented youth since 2020"
      />

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard
              icon={LightbulbIcon}
              value="500+"
              label="Talents Discovered"
            />
            <StatCard icon={Target} value="45" label="Active Projects" />
            <StatCard icon={Users} value="120" label="Volunteers" />
            <StatCard
              icon={Building2Icon}
              value="15"
              label="Partner Organizations"
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured Talents
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Meet some of the extraordinary young people we're proud to support
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {isTalentLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))
              : featuredTalents
                  .slice(0, 3)
                  .map((talent: any) => (
                    <TalentCard key={talent._id} {...talent} />
                  ))}
          </div>
          <div className="text-center">
            <Link href="/talents">
              <Button size="lg" data-testid="button-view-all-talents">
                View All Talents
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Latest Blog Posts
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay informed about our activities and impact stories
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {isBlogLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))
              : latestBlogs.slice(0, 3).map((blog: any) => (
                  <Card key={blog._id} className="overflow-hidden">
                    <div className="aspect-video relative">
                      <img
                        src={blog.imageUrl}
                        alt={blog.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center text-sm text-muted-foreground mb-3">
                        <Calendar className="w-4 h-4 mr-2" />
                        {blog.date} • {blog.readTime}
                      </div>
                      <h3 className="font-semibold text-xl mb-2">
                        {blog.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {blog.excerpt}
                      </p>
                      <Link
                        className={`text-primary`}
                        href={`/blog/${blog._id}`}
                      >
                        Read More →
                      </Link>
                    </CardContent>
                  </Card>
                ))}
          </div>
          <div className="text-center">
            <Link href="/blog">
              <Button size="lg">View All Posts</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our three-step process to discover and nurture talent
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Discover</h3>
              <p className="text-muted-foreground">
                We visit schools and communities to identify children with
                exceptional talents in music, sports, and arts.
              </p>
            </Card>
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-accent-foreground">
                  2
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Nurture</h3>
              <p className="text-muted-foreground">
                We provide training, mentorship, equipment, and opportunities to
                help these talents grow and flourish.
              </p>
            </Card>
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Empower</h3>
              <p className="text-muted-foreground">
                We connect talented youth with sponsors, opportunities, and
                platforms to showcase their abilities.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Upcoming Events
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join us at our upcoming events and be part of the talent discovery
              journey
            </p>
          </div>
          <div className="space-y-6">
            {upcomingEvents.slice(0, 3).map((event: any) => (
              <Card key={event._id} className="overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="aspect-video md:aspect-auto relative">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="col-span-2 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-4 mb-3 flex-wrap">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <CalendarIcon className="w-4 h-4 mr-2" />
                          {event.date}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="w-4 h-4 mr-2" />
                          {event.time}
                        </div>
                      </div>
                      <h3 className="font-semibold text-xl mb-2">
                        {event.title}
                      </h3>
                      <p className="text-muted-foreground mb-3">
                        {event.description}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        📍 {event.location} • {event.participants} participants
                      </p>
                    </div>
                    <div className="mt-4">
                      <Button variant="outline">Learn More</Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/events">
              <Button size="lg" variant="outline">
                View All Events
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our Partners
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Working together to make a difference
            </p>
          </div>
          <Splide
            options={{
              perPage: 3,
              gap: "2rem",
              arrows: true,
              pagination: false,
              autoplay: true,
              loop: true,
              interval: 3000,
              breakpoints: {
                768: {
                  perPage: 2,
                },
                480: {
                  perPage: 1,
                },
              },
            }}
          >
            {partners.map((partner: any) => (
              <SplideSlide key={partner._id}>
                <div className="bg-card hover:bg-accent/10  transition-colors duration-300 p-6 rounded-lg flex items-center justify-center h-32">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-[150px]   h-auto opacity-80 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-3xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Stay Updated</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Subscribe to our newsletter to receive updates about our talents and
            upcoming events
          </p>
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
          >
            <input
              value={email}
              type="email"
              placeholder="Enter your email"
              className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              disabled={loading}
              size="lg"
              className="whitespace-nowrap"
            >
              {loading ? (
                <span className="flex gap-2">
                  Subscribing...
                  <Loader className="animate-spin" />
                </span>
              ) : (
                "Subscribe"
              )}
            </Button>
          </form>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join Us in Making a Difference
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Your support can transform lives and unlock extraordinary potential.
            Every contribution helps us discover and nurture the next generation
            of talent.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/get-involved">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-6"
                data-testid="button-donate-cta"
              >
                Donate Now
              </Button>
            </Link>
            <Link href="/get-involved">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20"
                data-testid="button-volunteer-cta"
              >
                Become a Volunteer
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
