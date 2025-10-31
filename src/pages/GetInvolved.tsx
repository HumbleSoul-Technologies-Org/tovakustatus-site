import { useState } from "react";
import Hero from "@/components/Hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Heart, Users, Handshake } from "lucide-react";

export default function GetInvolved() {
  const { toast } = useToast();
  const [activeForm, setActiveForm] = useState<"donate" | "volunteer" | "partner">("donate");

  const handleSubmit = (e: React.FormEvent, formType: string) => {
    e.preventDefault();
    console.log(`${formType} form submitted`);
    toast({
      title: "Form Submitted!",
      description: `Thank you for your interest in ${formType}ing with us. We'll be in touch soon.`,
    });
  };

  return (
    <div>
      <Hero
        title="Get Involved"
        description="Join us in making a difference in talented young lives"
        minHeight="min-h-[400px] md:min-h-[500px]"
      />

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card 
              className={`cursor-pointer hover-elevate ${activeForm === "donate" ? "border-primary" : ""}`}
              onClick={() => setActiveForm("donate")}
              data-testid="card-donate"
            >
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Donate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Your financial support helps us provide instruments, training, and opportunities to talented youth.
                </p>
              </CardContent>
            </Card>

            <Card 
              className={`cursor-pointer hover-elevate ${activeForm === "volunteer" ? "border-primary" : ""}`}
              onClick={() => setActiveForm("volunteer")}
              data-testid="card-volunteer"
            >
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-md flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-accent-foreground" />
                </div>
                <CardTitle>Volunteer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Share your skills and time to mentor, teach, or support our programs and events.
                </p>
              </CardContent>
            </Card>

            <Card 
              className={`cursor-pointer hover-elevate ${activeForm === "partner" ? "border-primary" : ""}`}
              onClick={() => setActiveForm("partner")}
              data-testid="card-partner"
            >
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center mb-4">
                  <Handshake className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Partner With Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Organizations and businesses can partner with us for sponsorships and collaborations.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-3xl mx-auto">
            {activeForm === "donate" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Make a Donation</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={(e) => handleSubmit(e, "donat")} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="donor-name">Full Name</Label>
                        <Input id="donor-name" placeholder="John Doe" required data-testid="input-donor-name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="donor-email">Email</Label>
                        <Input id="donor-email" type="email" placeholder="john@example.com" required data-testid="input-donor-email" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amount">Donation Amount (RWF)</Label>
                      <Input id="amount" type="number" placeholder="50000" required data-testid="input-amount" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="donation-type">Donation Type</Label>
                      <Select required>
                        <SelectTrigger id="donation-type" data-testid="select-donation-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="one-time">One-time</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="donor-message">Message (Optional)</Label>
                      <Textarea id="donor-message" placeholder="Your message of support..." data-testid="textarea-donor-message" />
                    </div>
                    <Button type="submit" size="lg" className="w-full" data-testid="button-submit-donation">
                      Proceed to Payment
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {activeForm === "volunteer" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Volunteer Application</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={(e) => handleSubmit(e, "volunteer")} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="volunteer-name">Full Name</Label>
                        <Input id="volunteer-name" placeholder="John Doe" required data-testid="input-volunteer-name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="volunteer-email">Email</Label>
                        <Input id="volunteer-email" type="email" placeholder="john@example.com" required data-testid="input-volunteer-email" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="volunteer-phone">Phone Number</Label>
                      <Input id="volunteer-phone" type="tel" placeholder="+250 123 456 789" required data-testid="input-volunteer-phone" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="skills">Skills & Expertise</Label>
                      <Select required>
                        <SelectTrigger id="skills" data-testid="select-skills">
                          <SelectValue placeholder="Select your primary skill" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="music">Music Instruction</SelectItem>
                          <SelectItem value="sports">Sports Coaching</SelectItem>
                          <SelectItem value="art">Art Instruction</SelectItem>
                          <SelectItem value="admin">Administrative Support</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="availability">Availability</Label>
                      <Textarea id="availability" placeholder="When are you available to volunteer?" required data-testid="textarea-availability" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="volunteer-message">Why do you want to volunteer?</Label>
                      <Textarea id="volunteer-message" placeholder="Tell us about your motivation..." required data-testid="textarea-volunteer-message" />
                    </div>
                    <Button type="submit" size="lg" className="w-full" data-testid="button-submit-volunteer">
                      Submit Application
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {activeForm === "partner" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Partnership Inquiry</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={(e) => handleSubmit(e, "partner")} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="org-name">Organization Name</Label>
                      <Input id="org-name" placeholder="Your Organization" required data-testid="input-org-name" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contact-name">Contact Person</Label>
                        <Input id="contact-name" placeholder="John Doe" required data-testid="input-contact-name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-email">Email</Label>
                        <Input id="contact-email" type="email" placeholder="john@organization.com" required data-testid="input-contact-email" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="partnership-type">Partnership Type</Label>
                      <Select required>
                        <SelectTrigger id="partnership-type" data-testid="select-partnership-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sponsorship">Sponsorship</SelectItem>
                          <SelectItem value="collaboration">Program Collaboration</SelectItem>
                          <SelectItem value="resource">Resource Sharing</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="partner-message">Tell us about your organization and partnership idea</Label>
                      <Textarea 
                        id="partner-message" 
                        placeholder="Describe your organization and how you'd like to partner with us..." 
                        className="min-h-[150px]" 
                        required 
                        data-testid="textarea-partner-message"
                      />
                    </div>
                    <Button type="submit" size="lg" className="w-full" data-testid="button-submit-partner">
                      Submit Inquiry
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
