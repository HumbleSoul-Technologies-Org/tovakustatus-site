import {
  Users,
  Heart,
  Target,
  TrendingUp,
  LightbulbIcon,
  Building2Icon,
  Building,
  Loader,
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
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Calendar } from "lucide-react";
import { getTalents, getEvents, getBlogPosts } from "@/lib/localStorage";
export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  // TODO: remove mock data functionality
  const featuredTalents: any = [
    {
      _id: "1",
      name: "Amani Grace",
      age: 12,
      talentType: "Music",
      description:
        "Amani has been playing violin for 3 years and dreams of performing in international orchestras. Her dedication and natural talent shine through every performance.",
      imageUrl: "/Talented_girl_with_violin_portrait_f9f1e1a7.png",
    },
    {
      _id: "2",
      name: "David Kwame",
      age: 14,
      talentType: "Sports",
      description:
        "An exceptional football player with incredible speed and technique. David aspires to play professionally and represent his country on the world stage.",
      imageUrl: "/Talented_boy_playing_soccer_portrait_4a119641.png",
    },
    {
      _id: "3",
      name: "Sarah Nkunda",
      age: 11,
      talentType: "Art",
      description:
        "Sarah's vibrant paintings capture the beauty of her community. She uses art as a powerful medium to tell stories and inspire others.",
      imageUrl: "/Talented_girl_painting_art_portrait_9df2082c.png",
    },
  ];

  const recentProjects: any = [
    {
      _id: "1",
      title: "Music Workshop Series",
      description:
        "A comprehensive music education program providing instruments, training, and performance opportunities to talented young musicians from underprivileged communities.",
      date: "March 15, 2024",
      participants: 45,
      imageUrl: "/Community_workshop_outreach_event_photo_3fb17f3c.png",
    },
  ];

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

  const latestBlogs: any = [
    {
      _id: "1",
      title: "Empowering Young Musicians in Uganda",
      excerpt: "How music education is transforming lives in local communities",
      date: "March 20, 2024",
      author: "Jane Doe",
      readTime: "5 min read",
      imageUrl: "/Community_workshop_outreach_event_photo_3fb17f3c.png",
    },
    {
      _id: "2",
      title: "Success Story: From Street Art to Gallery",
      excerpt: "The inspiring journey of young artists finding their voice",
      date: "March 18, 2024",
      author: "John Smith",
      readTime: "4 min read",
      imageUrl: "/Talented_girl_painting_art_portrait_9df2082c.png",
    },
    {
      _id: "3",
      title: "Sports Development in Rural Schools",
      excerpt: "Building future champions through grassroots programs",
      date: "March 15, 2024",
      author: "Michael Brown",
      readTime: "6 min read",
      imageUrl: "/Talented_boy_playing_soccer_portrait_4a119641.png",
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
            {featuredTalents.map((talent: any) => (
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

      {/* Add this section for Latest Blog Posts */}
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
            {latestBlogs.map((blog: any) => (
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
                  <h3 className="font-semibold text-xl mb-2">{blog.title}</h3>
                  <p className="text-muted-foreground mb-4">{blog.excerpt}</p>
                  <Link href={`/blog/${blog._id}`}>
                    <Button className="px-0">Read More →</Button>
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

      <section className="py-16 md:py-24 bg-card hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Recent Projects
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our latest initiatives making a difference
            </p>
          </div>
          <div className="space-y-8 ">
            {recentProjects.map((project: any) => (
              <ProjectCard key={project._id} {...project} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/projects">
              <Button
                size="lg"
                variant="outline"
                data-testid="button-view-all-projects"
              >
                View All Projects
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
