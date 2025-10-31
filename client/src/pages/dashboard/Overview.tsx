import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatCard from "@/components/StatCard";
import { Users, FolderOpen, Calendar, BookOpen, TrendingUp, Heart } from "lucide-react";

export default function DashboardOverview() {
  // TODO: remove mock data functionality
  const recentActivity = [
    { id: 1, action: "New talent added", name: "Emmanuel Habimana", time: "2 hours ago" },
    { id: 2, action: "Project updated", name: "Music Workshop Series", time: "5 hours ago" },
    { id: 3, action: "Event created", name: "Annual Talent Showcase", time: "1 day ago" },
    { id: 4, action: "Blog post published", name: "Celebrating One Year", time: "2 days ago" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with Tova ku Status.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Users} value="524" label="Total Talents" description="+12 this month" />
        <StatCard icon={FolderOpen} value="48" label="Active Projects" description="+3 this month" />
        <StatCard icon={Calendar} value="15" label="Upcoming Events" description="Next: June 15" />
        <StatCard icon={BookOpen} value="42" label="Blog Posts" description="+6 this month" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start justify-between gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium text-sm">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.name}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Music Talents</span>
                <span className="font-semibold">156</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Sports Talents</span>
                <span className="font-semibold">214</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Art Talents</span>
                <span className="font-semibold">98</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Other Talents</span>
                <span className="font-semibold">56</span>
              </div>
              <div className="pt-4 border-t border-border flex items-center justify-between">
                <span className="text-sm font-semibold">Newsletter Subscribers</span>
                <span className="font-bold text-primary">1,234</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
