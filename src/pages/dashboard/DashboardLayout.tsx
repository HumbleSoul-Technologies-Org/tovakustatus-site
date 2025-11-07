import { ReactNode, useState } from "react";
import { useLocation } from "wouter";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Menu, LogOut } from "lucide-react";
import { logout } from "@/lib/localStorage";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    setLocation("/");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile sidebar backdrop */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${
          isMobile
            ? `fixed inset-y-0 left-0 z-50 transform ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
              }`
            : "relative"
        } transition-transform duration-300 ease-in-out lg:translate-x-0`}
      >
        <DashboardSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-border bg-background flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h2 className="font-semibold text-lg">Tova ku Status Dashboard</h2>
          </div>
          <div className="flex items-center gap-4 lg:gap-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              data-testid="button-logout"
              className="w-auto lg:w-20"
            >
              <LogOut className="h-5 w-5 lg:mr-2" />
              <span className="hidden lg:inline">Logout</span>
            </Button>
            <Avatar className="h-8 w-8 lg:h-9 lg:w-9">
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 bg-background">
          <div className="container mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
