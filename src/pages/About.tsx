import Hero from "@/components/Hero";
import StatCard from "@/components/StatCard";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Users,
  Heart,
  Target,
  CheckCircle2,
  LightbulbIcon,
  BookOpen,
  Users2,
  TrendingUpIcon,
} from "lucide-react";
import { FaBeer } from "react-icons/fa";
// import founderImage from '@assets/generated_images/Founder_professional_portrait_photo_15a7b392.png';

export default function About() {
  // TODO: remove mock data functionality
  const teamMembers = [
    { name: "Sarah Johnson", role: "Program Director", initials: "SJ" },
    { name: "Michael Uwase", role: "Music Coordinator", initials: "MU" },
    { name: "Grace Mutesi", role: "Sports Coordinator", initials: "GM" },
    { name: "David Nkunda", role: "Arts Coordinator", initials: "DN" },
  ];

  return (
    <div>
      <Hero
        title="About Tova ku Status"
        description="Dedicated to discovering and nurturing extraordinary talent in underprivileged communities"
        minHeight="min-h-[400px] md:min-h-[500px]"
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative w-full aspect-square">
              <div className="absolute inset-0 bg-gradient-to-l from-white/100 to-transparent z-10 border-0 rounded-2xl" />
              <img
                src="https://plus.unsplash.com/premium_photo-1661627681947-4431c8c97659?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29vbCUyMGd1eXxlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000"
                alt="Founder"
                className="w-full aspect-square border-0 rounded-2xl object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Meet Our Founder
              </h2>
              <h3 className="text-xl text-primary font-semibold mb-4">
                TV Presenter & MC
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                As a well-known TV presenter and MC, I've had the privilege of
                witnessing incredible talent across Uganda. However, I've also
                seen how economic circumstances can limit opportunities for
                gifted young people from underprivileged backgrounds.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Tova ku Status was born from a simple belief: talent knows no
                economic boundaries. Every child deserves the chance to develop
                their gifts, regardless of where they come from.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Through this initiative, we're not just discovering talent—we're
                creating pathways for young people to rise above their
                circumstances and reach their full potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Programs</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Practical programs that provide training, equipment and
              performance opportunities for children across music, arts and
              sports.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6 bg-white">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 px-3 rounded-md flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">
                    Music Workshop Series
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    A comprehensive music education programme providing
                    instruments, weekly lessons, and regular performance
                    opportunities for young musicians from underprivileged
                    communities.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 px-3 rounded-md flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">
                    Sports Excellence Camp
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Intensive training camps that develop athletic skill,
                    discipline and teamwork — combining coaching, nutrition
                    guidance and character development.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6 bg-white">
              <h4 className="font-semibold mb-2">Annual Talent Showcase</h4>

              <p className="text-sm text-muted-foreground">
                Our flagship event where beneficiaries showcase their skills to
                the public, partners and potential sponsors — helping open
                pathways to further opportunities.
              </p>
            </Card>

            <Card className="p-6 bg-white">
              <h4 className="font-semibold mb-2">Community Outreach Day</h4>
              <p className="text-sm text-muted-foreground">
                Regular outreach and scouting across schools and communities to
                find hidden talent and invite them into our programmes.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Partners & Supporters</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We work with local schools, volunteers and organisations to
              provide resources and scale impact. If your organisation would
              like to partner with us, we'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <h4 className="font-semibold">Local Schools</h4>
              <p className="text-sm text-muted-foreground mt-2">
                Talent identification and hosting spaces for activities.
              </p>
            </Card>
            <Card className="p-6">
              <h4 className="font-semibold">Volunteers</h4>
              <p className="text-sm text-muted-foreground mt-2">
                Coaches, mentors and event staff who give time and expertise.
              </p>
            </Card>
            <Card className="p-6">
              <h4 className="font-semibold">Sponsors</h4>
              <p className="text-sm text-muted-foreground mt-2">
                Financial and in-kind support to sustain programmes and provide
                equipment.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Get Involved</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
            You can support Tova ku Status by volunteering, partnering, or
            sponsoring a programme. Every contribution helps unlock a child's
            potential.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="/contact"
              className="btn btn-primary inline-block px-6 py-3 rounded-md bg-primary text-white"
            >
              Contact Us
            </a>
            <a
              href="/donate"
              className=" hidden px-6 py-3 rounded-md border border-primary text-primary"
            >
              Donate
            </a>
          </div>

          <div className="mt-8 text-sm text-muted-foreground">
            <p>
              For partnership enquiries:{" "}
              <a href="mailto:info@tovakustatus.org" className="underline">
                info@tovakustatus.org
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Card className="p-8 bg-white">
              <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center mb-4">
                <TrendingUpIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To identify, nurture, and empower talented children from
                underprivileged schools and slums, providing them with the
                resources, training, and opportunities they need to excel in
                their chosen fields.
              </p>
            </Card>
            <Card className="p-8 bg-white">
              <div className="w-12 h-12 bg-accent/10 rounded-md flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                A world where every talented child, regardless of their economic
                background, has the opportunity to develop their gifts and
                contribute meaningfully to society.
              </p>
            </Card>
          </div>

          <div className="mt-12">
            <Card className="p-8 bg-white">
              <h3 className="text-2xl font-bold mb-6">Our Core Values</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-lg mb-2 text-primary">
                    Excellence
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    We strive for the highest standards in everything we do,
                    from talent identification to program delivery.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2 text-primary">
                    Inclusivity
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    We believe talent exists everywhere and actively seek out
                    gifted children from all communities.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2 text-primary">
                    Empowerment
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    We equip young people with skills, confidence, and
                    opportunities to take control of their futures.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Impact</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Making a measurable difference in young lives
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard
              icon={LightbulbIcon}
              value="500+"
              label="Talents Discovered"
            />
            <StatCard icon={Target} value="45" label="Active Programs" />
            <StatCard icon={Users2} value="120" label="Volunteers" />
            <StatCard icon={CheckCircle2} value="98%" label="Success Rate" />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Dedicated professionals committed to nurturing talent
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <Avatar className="w-32 h-32 mx-auto mb-4">
                  <AvatarFallback className="text-2xl">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
