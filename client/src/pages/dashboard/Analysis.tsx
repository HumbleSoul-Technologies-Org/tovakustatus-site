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
    { id: 's1', icon: Users, value: '1,234', label: 'Total Users' },
    { id: 's2', icon: FolderOpen, value: '48', label: 'Active Projects' },
    { id: 's3', icon: Calendar, value: '15', label: 'Upcoming Events' },
    { id: 's4', icon: BookOpen, value: '42', label: 'Blog Posts' },
  ];

  const visitsData = [
    { month: 'Jan', visits: 4000, engagement: 2400 },
    { month: 'Feb', visits: 3000, engagement: 1398 },
    { month: 'Mar', visits: 2000, engagement: 9800 },
    { month: 'Apr', visits: 2780, engagement: 3908 },
    { month: 'May', visits: 1890, engagement: 4800 },
    { month: 'Jun', visits: 2390, engagement: 3800 },
    { month: 'Jul', visits: 3490, engagement: 4300 },
  ];

  const projectStatusData = [
    { name: 'Active', value: 18, color: '#0088FE' },
    { name: 'Planned', value: 7, color: '#00C49F' },
    { name: 'Completed', value: 23, color: '#FFBB28' },
  ];

  const eventsBreakdown = [
    { type: 'Workshops', count: 20 },
    { type: 'Seminars', count: 15 },
    { type: 'Conferences', count: 10 },
    { type: 'Meetups', count: 25 },
    { type: 'Other', count: 8 },
  ];

  const trends = [
    { id: 't1', label: 'User Visits', value: 12345 },
    { id: 't2', label: 'Project Engagement', value: 842 },
    { id: 't3', label: 'Event RSVPs', value: 234 },
    { id: 't4', label: 'Blog Reads', value: 5023 },
  ];

  const recentActivity = [
    { id: 'a1', title: 'New talent added', meta: 'Amani Grace • 2 hours ago' },
    { id: 'a2', title: 'Project updated', meta: 'Music Workshop • 5 hours ago' },
    { id: 'a3', title: 'Event created', meta: 'Annual Showcase • 1 day ago' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Overview of platform metrics and trends (mock data).</p>
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
                      <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0088FE" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#0088FE" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00C49F" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#00C49F" stopOpacity={0}/>
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

              <div className="grid grid-cols-2 gap-4">
                {trends.map((t) => (
                  <div key={t.id} className="p-4 bg-muted rounded-md">
                    <div className="text-sm text-muted-foreground">{t.label}</div>
                    <div className="font-semibold text-xl">{t.value.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((r) => (
                <div key={r.id} className="p-3 bg-muted rounded-md">
                  <div className="font-semibold">{r.title}</div>
                  <div className="text-sm text-muted-foreground">{r.meta}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Events Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={eventsBreakdown}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8">
                    {eventsBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 60%)`} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Projects Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={projectStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {projectStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
