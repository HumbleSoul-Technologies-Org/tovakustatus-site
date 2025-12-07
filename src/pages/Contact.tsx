import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Loader,
  AlertCircle,
} from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { FaTiktok } from "react-icons/fa";

const validateForm = (data: any) => {
  const errors: Record<string, string> = {};

  if (!data.name?.trim()) {
    errors.name = "Full name is required";
  } else if (data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!data.email?.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!data.contact?.trim()) {
    errors.contact = "Contact number is required";
  } else if (!/^\+?[\d\s\-()]{7,}$/.test(data.contact.replace(/\s/g, ""))) {
    errors.contact = "Please enter a valid contact number";
  }

  if (!data.subject?.trim()) {
    errors.subject = "Subject is required";
  } else if (data.subject.trim().length < 3) {
    errors.subject = "Subject must be at least 3 characters";
  }

  if (!data.message?.trim()) {
    errors.message = "Message is required";
  } else if (data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters";
  }

  return errors;
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/messages/new`,
        formData,
        {
          timeout: 10000,
        }
      );
      if (res.status === 201) {
        setFormData({
          name: "",
          email: "",
          contact: "",
          subject: "",
          message: "",
        });
        setErrors({});
        toast.success("Your message has been sent successfully.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
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
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          value={formData.name}
                          id="contact-name"
                          placeholder="John Doe"
                          required
                          data-testid="input-contact-name"
                          className={errors.name ? "border-destructive" : ""}
                        />
                        {errors.name && (
                          <p className="text-sm text-destructive flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-email">Email</Label>
                        <Input
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          value={formData.email}
                          id="contact-email"
                          type="email"
                          placeholder="john@example.com"
                          required
                          data-testid="input-contact-email"
                          className={errors.email ? "border-destructive" : ""}
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors.email}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-phone">Contact</Label>
                        <Input
                          onChange={(e) =>
                            handleInputChange("contact", e.target.value)
                          }
                          value={formData.contact}
                          id="contact-phone"
                          type="tel"
                          placeholder="(123) 456-7890"
                          required
                          data-testid="input-contact-phone"
                          className={errors.contact ? "border-destructive" : ""}
                        />
                        {errors.contact && (
                          <p className="text-sm text-destructive flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors.contact}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-subject">Subject</Label>
                      <Input
                        onChange={(e) =>
                          handleInputChange("subject", e.target.value)
                        }
                        value={formData.subject}
                        id="contact-subject"
                        placeholder="How can we help you?"
                        required
                        data-testid="input-contact-subject"
                        className={errors.subject ? "border-destructive" : ""}
                      />
                      {errors.subject && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.subject}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-message">Message</Label>
                      <Textarea
                        onChange={(e) =>
                          handleInputChange("message", e.target.value)
                        }
                        value={formData.message}
                        id="contact-message"
                        placeholder="Your message..."
                        className={`min-h-[150px] ${
                          errors.message ? "border-destructive" : ""
                        }`}
                        required
                        data-testid="textarea-contact-message"
                      />
                      {errors.message && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.message}
                        </p>
                      )}
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      data-testid="button-submit-contact"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          Sending...
                          <Loader className="animate-spin" />
                        </span>
                      ) : (
                        "Send Message"
                      )}
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
                        kampala, Uganda
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold mb-1">Email</p>
                      <a
                        href="mailto:tovakustatus.org.ug@gmail.com"
                        className="text-sm text-primary hover:underline"
                        data-testid="email-link"
                      >
                        tovakustatus.org.ug@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold mb-1">Phone</p>
                      <p className="text-sm text-muted-foreground">
                        +256 708-805-040
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
                      target="_blank"
                      className="w-10 h-10 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-md flex items-center justify-center hover-elevate"
                      data-testid="social-facebook"
                    >
                      <Facebook className="h-5 w-5 " />
                    </a>
                    <a
                      href="#"
                      target="_blank"
                      className="w-10 h-10 bg-primary/10 text-primary hover:bg-blue-300 hover:text-white rounded-md flex items-center justify-center hover-elevate"
                      data-testid="social-twitter"
                    >
                      <Twitter className="h-5 w-5  " />
                    </a>
                    <a
                      href="#"
                      target="_blank"
                      className="w-10 h-10 bg-primary/10 text-primary hover:bg-black hover:text-white rounded-md flex items-center justify-center hover-elevate"
                      data-testid="social-instagram"
                    >
                      <FaTiktok className="h-5 w-5 " />
                    </a>
                    <a
                      href="#"
                      target="_blank"
                      className="w-10 h-10 bg-primary/10 text-primary hover:bg-destructive hover:text-white rounded-md flex items-center justify-center hover-elevate"
                      data-testid="social-youtube"
                    >
                      <Youtube className="h-5 w-5  hover:text-white" />
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
