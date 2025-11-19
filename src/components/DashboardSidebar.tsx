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
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "./ui/badge";

interface DashboardSidebarProps {
  onClose?: () => void;
}

export default function DashboardSidebar({ onClose }: DashboardSidebarProps) {
  const [location] = useLocation();
  const isMobile = useIsMobile();
  const { data: notificationsData } = useQuery({
    queryKey: ["notifications", "all"],
    refetchInterval: 5000, // every 30s
  });
  const { data: newsletter } = useQuery({
    queryKey: ["newsletter", "all"],
    refetchInterval: 5000, // every 30s
  });
  const { data: messagesData } = useQuery({
    queryKey: ["messages", "all"],
    refetchInterval: 5000, // every 30s
  });
  const menuItems = [
    // { icon: LayoutDashboard, label: "Overview", path: "/dashboard" },
    { icon: Users, label: "Manage Talents", path: "/dashboard/talents" },
    // { icon: FolderOpen, label: "Manage Projects", path: "/dashboard/projects" },
    { icon: Calendar, label: "Manage Events", path: "/dashboard/events" },
    { icon: BookOpen, label: "Manage Blog", path: "/dashboard/blog" },
    { icon: Image, label: "Media Uploads", path: "/dashboard/media" },
    { icon: Mail, label: "Newsletter", path: "/dashboard/newsletter" },
    { icon: MessageCircle, label: "Messages", path: "/dashboard/messages" },
    { icon: BellDot, label: "Notifications", path: "/dashboard/notifications" },
    // { icon: LineChart, label: "Analytics", path: "/dashboard/analysis" },
    // { icon: Settings, label: "Settings", path: "/dashboard/settings" },
  ];

  const isActive = (path: string) => location === path;

  return (
    <aside className="w-[280px] lg:w-64 bg-sidebar border-r border-sidebar-border h-screen flex flex-col">
      <div className="p-4 lg:p-6 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          <Link href="/" onClick={isMobile ? onClose : undefined}>
            <div className="flex items-center gap-2 hover-elevate rounded-md px-2 -ml-2 py-1">
              <div className="w-10 h-10 bg-accent rounded-md flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-xl">
                  T
                </span>
              </div>
              <span className="font-bold text-lg">Dashboard</span>
            </div>
          </Link>
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              href={item.path}
              onClick={isMobile ? onClose : undefined}
            >
              <Button
                variant="ghost"
                className={`w-full justify-start gap-3 text-sm lg:text-base ${
                  isActive(item.path)
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : ""
                }`}
                data-testid={`sidebar-${item.label
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span className="truncate flex gap-3">
                  {item.label}

                  {item.path === "/dashboard/messages" &&
                    (messagesData as any)?.messages.length > 0 && (
                      <Badge
                        className={`bg-primary  p-1 size-8  flex items-center justify-center rounded-full `}
                      >
                        <p className="text-xs">
                          {(messagesData as any)?.messages.length}
                        </p>
                      </Badge>
                    )}
                  {item.path === "/dashboard/notifications" &&
                    (notificationsData as any)?.notifications.filter(
                      (n: any) => n.read === false
                    ).length > 0 && (
                      <Badge
                        className={`bg-primary ${
                          item.path === "/dashboard/notifications"
                            ? "hidden"
                            : ""
                        }  p-1 size-5  flex items-center justify-center rounded-full `}
                      >
                        <p className="text-xs">
                          {
                            (notificationsData as any).notifications.filter(
                              (n: any) => n.read === false
                            ).length
                          }
                        </p>
                      </Badge>
                    )}
                </span>
              </Button>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <Link href="/" onClick={isMobile ? onClose : undefined}>
          <Button
            variant="outline"
            className="w-full justify-start gap-3 text-sm lg:text-base"
            data-testid="sidebar-back-to-site"
          >
            <Home className="h-5 w-5 flex-shrink-0" />
            <span className="truncate">Back to Site</span>
          </Button>
        </Link>
      </div>
    </aside>
  );
}
