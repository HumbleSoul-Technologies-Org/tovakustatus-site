import { useState } from "react";
import Hero from "@/components/Hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";

export default function Contact() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted");
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We'll get back to you soon.",
    });
  };

  return (
    <div>
      <Hero
        title="Contact Us"
        description="Get in touch with our team"
        minHeight="min-h-[400px] md:min-h-[500px]"
      />

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contact-name">Full Name</Label>
                        <Input
                          id="contact-name"
                          placeholder="John Doe"
                          required
                          data-testid="input-contact-name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-email">Email</Label>
                        <Input
                          id="contact-email"
                          type="email"
                          placeholder="john@example.com"
                          required
                          data-testid="input-contact-email"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-subject">Subject</Label>
                      <Input
                        id="contact-subject"
                        placeholder="How can we help you?"
                        required
                        data-testid="input-contact-subject"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-message">Message</Label>
                      <Textarea
                        id="contact-message"
                        placeholder="Your message..."
                        className="min-h-[150px]"
                        required
                        data-testid="textarea-contact-message"
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      data-testid="button-submit-contact"
                    >
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold mb-1">Address</p>
                      <p className="text-sm text-muted-foreground">
                        KG 123 St, kampala
                        <br />
                        Uganda
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold mb-1">Email</p>
                      <a
                        href="mailto:info@tovakustatus.org"
                        className="text-sm text-primary hover:underline"
                        data-testid="email-link"
                      >
                        info@tovakustatus.org
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold mb-1">Phone</p>
                      <p className="text-sm text-muted-foreground">
                        +250 123 456 789
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Follow Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <a
                      href="#"
                      className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center hover-elevate"
                      data-testid="social-facebook"
                    >
                      <Facebook className="h-5 w-5 text-primary" />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center hover-elevate"
                      data-testid="social-twitter"
                    >
                      <Twitter className="h-5 w-5 text-primary" />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center hover-elevate"
                      data-testid="social-instagram"
                    >
                      <Instagram className="h-5 w-5 text-primary" />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center hover-elevate"
                      data-testid="social-youtube"
                    >
                      <Youtube className="h-5 w-5 text-primary" />
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Office Hours</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Monday - Friday
                    </span>
                    <span className="font-semibold">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday</span>
                    <span className="font-semibold">10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday</span>
                    <span className="font-semibold">Closed</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
