import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  Users,
  FolderOpen,
  Calendar,
  BookOpen,
  Image,
  Mail,
  Settings,
  Home,
  BellDot,
  LineChart,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardSidebar() {
  const [location] = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", path: "/dashboard" },
    { icon: Users, label: "Manage Talents", path: "/dashboard/talents" },
    { icon: FolderOpen, label: "Manage Projects", path: "/dashboard/projects" },
    { icon: Calendar, label: "Manage Events", path: "/dashboard/events" },
    { icon: BookOpen, label: "Manage Blog", path: "/dashboard/blog" },
    { icon: Image, label: "Media Uploads", path: "/dashboard/media" },
    { icon: Mail, label: "Newsletter", path: "/dashboard/newsletter" },
    { icon: MessageCircle, label: "Messages", path: "/dashboard/messages" },
    { icon: BellDot, label: "Notifications", path: "/dashboard/notifications" },
    { icon: LineChart, label: "Analytics", path: "/dashboard/analysis" },
    { icon: Settings, label: "Settings", path: "/dashboard/settings" },
  ];

  const isActive = (path: string) => location === path;

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <Link href="/">
          <div className="flex items-center gap-2 hover-elevate rounded-md px-2 -ml-2 py-1">
            <div className="w-10 h-10 bg-accent rounded-md flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-xl">
                T
              </span>
            </div>
            <span className="font-bold text-lg">Dashboard</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.path} href={item.path}>
              <Button
                variant="ghost"
                className={`w-full justify-start gap-3 ${
                  isActive(item.path)
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : ""
                }`}
                data-testid={`sidebar-${item.label
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <Link href="/">
          <Button
            variant="outline"
            className="w-full justify-start gap-3"
            data-testid="sidebar-back-to-site"
          >
            <Home className="h-5 w-5" />
            Back to Site
          </Button>
        </Link>
      </div>
    </aside>
  );
}
