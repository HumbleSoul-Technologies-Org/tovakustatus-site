import { ReactNode } from "react";
import { useLocation } from "wouter";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell, LogOut } from "lucide-react";
import { logout } from "@/lib/localStorage";
import { useToast } from "@/hooks/use-toast";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    setLocation("/");
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-border bg-background flex items-center justify-between px-6">
          <div>
            <h2 className="font-semibold text-lg">Tova ku Status Dashboard</h2>
          </div>
          <div className="flex items-center gap-14 justify-between">
            {/* <Button
              variant="ghost"
              size="icon"
              data-testid="button-notifications"
            >
              <Bell className="h-5 w-5" />
            </Button> */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              data-testid="button-logout"
              className="w-20"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </Button>
            <Avatar className="h-9 w-9">
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-8 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
