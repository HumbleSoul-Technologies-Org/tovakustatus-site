import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-card-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-accent rounded-md flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-xl">T</span>
              </div>
              <span className="font-bold text-lg">Tova ku Status</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Identifying and empowering talented kids from underprivileged schools and slums.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-link-about">About Us</Link></li>
              <li><Link href="/talents" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-link-talents">Our Talents</Link></li>
              <li><Link href="/projects" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-link-projects">Projects</Link></li>
              <li><Link href="/events" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-link-events">Events</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-4">Get Involved</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/get-involved" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-link-donate">Donate</Link></li>
              <li><Link href="/get-involved" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-link-volunteer">Volunteer</Link></li>
              <li><Link href="/get-involved" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-link-partner">Partner With Us</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-link-contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Kigali, Rwanda</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:info@tovakustatus.org" className="hover:text-foreground transition-colors" data-testid="footer-email">info@tovakustatus.org</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+250 123 456 789</span>
              </li>
            </ul>
            <div className="flex items-center gap-2 mt-4">
              <a href="#" className="w-9 h-9 bg-muted rounded-md flex items-center justify-center hover-elevate" data-testid="social-facebook">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-muted rounded-md flex items-center justify-center hover-elevate" data-testid="social-twitter">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-muted rounded-md flex items-center justify-center hover-elevate" data-testid="social-instagram">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-muted rounded-md flex items-center justify-center hover-elevate" data-testid="social-youtube">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 md:mt-12 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Tova ku Status. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
