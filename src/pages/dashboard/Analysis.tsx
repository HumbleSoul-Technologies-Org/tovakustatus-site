import StatCard from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FolderOpen, Calendar, BookOpen, Eye } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function Analysis() {
  // Mock statistics
  const stats = [
    { id: "s1", icon: Users, value: "1,234", label: "Total Users" },
    { id: "s2", icon: FolderOpen, value: "48", label: "Active Projects" },
    { id: "s3", icon: Calendar, value: "15", label: "Upcoming Events" },
    { id: "s4", icon: BookOpen, value: "42", label: "Blog Posts" },
  ];

  const visitsData = [
    { month: "Jan", visits: 4000, engagement: 2400 },
    { month: "Feb", visits: 3000, engagement: 1398 },
    { month: "Mar", visits: 2000, engagement: 9800 },
    { month: "Apr", visits: 2780, engagement: 3908 },
    { month: "May", visits: 1890, engagement: 4800 },
    { month: "Jun", visits: 2390, engagement: 3800 },
    { month: "Jul", visits: 3490, engagement: 4300 },
  ];

  // New mock data
  const monthlyPostsData = [
    { month: "Jan", talents: 15, events: 8, blogs: 12 },
    { month: "Feb", talents: 20, events: 12, blogs: 15 },
    { month: "Mar", talents: 18, events: 10, blogs: 18 },
    { month: "Apr", talents: 25, events: 15, blogs: 20 },
    { month: "May", talents: 22, events: 18, blogs: 16 },
    { month: "Jun", talents: 30, events: 20, blogs: 22 },
  ];

  const topPerformers = {
    blogs: [
      { title: "Youth Music Workshop", views: 5230, likes: 423, shares: 125 },
      { title: "Art Exhibition Review", views: 4120, likes: 389, shares: 98 },
      { title: "Dance Workshop Recap", views: 3890, likes: 345, shares: 87 },
    ],
    events: [
      { title: "Summer Music Festival", views: 8450, likes: 756, shares: 234 },
      { title: "Art Workshop Series", views: 6230, likes: 534, shares: 178 },
      { title: "Theater Performance", views: 5890, likes: 467, shares: 156 },
    ],
    talents: [
      { title: "John Doe - Musician", views: 7230, likes: 645, shares: 198 },
      { title: "Jane Smith - Artist", views: 6120, likes: 534, shares: 167 },
      { title: "Mike Johnson - Actor", views: 5670, likes: 478, shares: 145 },
    ],
  };

  const donationsData = [
    { month: "Jan", amount: 2500 },
    { month: "Feb", amount: 3200 },
    { month: "Mar", amount: 4100 },
    { month: "Apr", amount: 3800 },
    { month: "May", amount: 5200 },
    { month: "Jun", amount: 4800 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">
          Overview of platform metrics and trends (mock data).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => (
          <StatCard key={s.id} icon={s.icon} value={s.value} label={s.label} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Visits & Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={visitsData}>
                    <defs>
                      <linearGradient
                        id="colorVisits"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#0088FE"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#0088FE"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorEngagement"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#00C49F"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#00C49F"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="visits"
                      stroke="#0088FE"
                      fillOpacity={1}
                      fill="url(#colorVisits)"
                    />
                    <Area
                      type="monotone"
                      dataKey="engagement"
                      stroke="#00C49F"
                      fillOpacity={1}
                      fill="url(#colorEngagement)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Content Posted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyPostsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="talents" fill="#8884d8" />
                  <Bar dataKey="events" fill="#82ca9d" />
                  <Bar dataKey="blogs" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Donations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={donationsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    fill="#8884d8"
                    stroke="#8884d8"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {["blogs", "events", "talents"].map((category) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle>
                Top {category.charAt(0).toUpperCase() + category.slice(1)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformers[category].map((item: any, index: number) => (
                  <div key={index} className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-2">{item.title}</h4>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <Eye className="h-4 w-4 inline mr-1" />
                        {item.views}
                      </div>
                      <div>👍 {item.likes}</div>
                      <div>🔄 {item.shares}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
