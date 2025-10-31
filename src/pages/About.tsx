import Hero from "@/components/Hero";
import StatCard from "@/components/StatCard";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Users, Heart, Target } from "lucide-react";
import founderImage from '@assets/generated_images/Founder_professional_portrait_photo_15a7b392.png';

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

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <Avatar className="w-full h-auto aspect-square rounded-2xl">
                <AvatarImage src={founderImage} alt="Founder" />
                <AvatarFallback className="text-6xl rounded-2xl">TK</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Founder</h2>
              <h3 className="text-xl text-primary font-semibold mb-4">TV Presenter & MC</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                As a well-known TV presenter and MC, I've had the privilege of witnessing incredible talent across Rwanda. However, I've also seen how economic circumstances can limit opportunities for gifted young people from underprivileged backgrounds.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Tova ku Status was born from a simple belief: talent knows no economic boundaries. Every child deserves the chance to develop their gifts, regardless of where they come from.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Through this initiative, we're not just discovering talent—we're creating pathways for young people to rise above their circumstances and reach their full potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Card className="p-8">
              <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To identify, nurture, and empower talented children from underprivileged schools and slums, providing them with the resources, training, and opportunities they need to excel in their chosen fields.
              </p>
            </Card>
            <Card className="p-8">
              <div className="w-12 h-12 bg-accent/10 rounded-md flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                A world where every talented child, regardless of their economic background, has the opportunity to develop their gifts and contribute meaningfully to society.
              </p>
            </Card>
          </div>

          <div className="mt-12">
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-6">Our Core Values</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-lg mb-2 text-primary">Excellence</h4>
                  <p className="text-sm text-muted-foreground">
                    We strive for the highest standards in everything we do, from talent identification to program delivery.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2 text-primary">Inclusivity</h4>
                  <p className="text-sm text-muted-foreground">
                    We believe talent exists everywhere and actively seek out gifted children from all communities.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2 text-primary">Empowerment</h4>
                  <p className="text-sm text-muted-foreground">
                    We equip young people with skills, confidence, and opportunities to take control of their futures.
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
            <StatCard icon={Users} value="500+" label="Talents Discovered" />
            <StatCard icon={Heart} value="45" label="Active Programs" />
            <StatCard icon={Target} value="120" label="Volunteers" />
            <StatCard value="98%" label="Success Rate" />
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
                  <AvatarFallback className="text-2xl">{member.initials}</AvatarFallback>
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
