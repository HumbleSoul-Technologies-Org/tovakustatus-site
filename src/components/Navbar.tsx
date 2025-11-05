import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isAuthenticated } from "@/lib/localStorage";

export default function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Talents", path: "/talents" },
    // { label: "Projects", path: "/projects" },
    { label: "Events", path: "/events" },
    { label: "Media", path: "/media" },
    { label: "Blog", path: "/blog" },
    { label: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          <Link href="/" className="flex items-center gap-2 hover-elevate rounded-md px-2 -ml-2 py-1" data-testid="link-home">
            <div className="w-10 h-10 bg-accent rounded-md flex mr-[-5px] items-center justify-center">
              <span className="text-white font-bold text-2xl">T</span>
            </div>
            <span className="font-bold text-lg md:text-xl ">ova ku</span>
            <img className="size-24" src="/public/logo2.png"/>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button
                  variant="ghost"
                  className={isActive(item.path) ? "bg-accent/10 text-accent-foreground" : ""}
                  data-testid={`link-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <Link href="/get-involved">
              <Button variant="default" data-testid="button-get-involved">
                Get Involved
              </Button>
            </Link>
            {isAuthenticated() && (
              <Link href="/dashboard">
                <Button variant="outline" data-testid="button-dashboard">
                  Dashboard
                </Button>
              </Link>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${isActive(item.path) ? "bg-accent/10" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`mobile-link-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
            <div className="pt-2 border-t border-border space-y-2">
              <Link href="/get-involved">
                <Button variant="default" className="w-full" onClick={() => setMobileMenuOpen(false)} data-testid="mobile-button-get-involved">
                  Get Involved
                </Button>
              </Link>
              {isAuthenticated() && (
                <Link href="/dashboard">
                  <Button variant="outline" className="w-full" onClick={() => setMobileMenuOpen(false)} data-testid="mobile-button-dashboard">
                    Dashboard
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
