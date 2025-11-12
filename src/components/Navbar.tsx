import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isAuthenticated, getBlogPosts, getEvents } from "@/lib/localStorage";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";

export default function Navbar() {
  const { data: eventsData } = useQuery({
    queryKey: ["events", "all"],
    refetchInterval: 5000, // every 30s
  });

  const { data: blogsData } = useQuery({
    queryKey: ["blogs", "all"],
    refetchInterval: 5000, // every 5s
  });

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
          <Link
            href="/"
            className="flex items-center gap-2 hover-elevate rounded-md px-2 -ml-2 py-1"
            data-testid="link-home"
          >
            <img
              className="size-20"
              src="https://res.cloudinary.com/ghost150/image/upload/v1762586138/tovakustatus-removebg-preview_ys9avx.png"
            />

            <span className="font-bold ml-[-20px] text-lg md:text-xl ">
              ova ku Status
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              return (
                <Link className={`relative`} key={item.path} href={item.path}>
                  <Button
                    variant="ghost"
                    className={
                      isActive(item.path)
                        ? "bg-accent/10 text-accent-foreground"
                        : ""
                    }
                    data-testid={`link-${item.label.toLowerCase()}`}
                  >
                    {item.label}
                    {item.path === "/blog" && blogsData?.blogs.length > 0 && (
                      <Badge
                        className={`bg-primary absolute size-5 right-1 flex items-center justify-center rounded-full ${
                          isActive("/blog") ? "hidden" : ""
                        }`}
                      >
                        {blogsData?.blogs.length}
                      </Badge>
                    )}
                    {item.path === "/events" &&
                      eventsData?.events.length > 0 && (
                        <Badge
                          className={`bg-primary absolute size-5 right-1 flex items-center justify-center rounded-full ${
                            isActive("/events") ? "hidden" : ""
                          }`}
                        >
                          {eventsData?.events.length}
                        </Badge>
                      )}
                  </Button>
                </Link>
              );
            })}
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
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
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
                  className={`w-full justify-start ${
                    isActive(item.path) ? "bg-accent/10" : ""
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`mobile-link-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
            <div className="pt-2 border-t border-border space-y-2">
              <Link href="/get-involved">
                <Button
                  variant="default"
                  className="w-full"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid="mobile-button-get-involved"
                >
                  Get Involved
                </Button>
              </Link>
              {isAuthenticated() && (
                <Link href="/dashboard">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid="mobile-button-dashboard"
                  >
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
