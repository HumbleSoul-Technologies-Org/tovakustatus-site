import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bell, Trash2, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NotificationItem {
  id: string;
  title: string;
  body: string;
  date: string;
  read: boolean;
}

const initialNotifications: NotificationItem[] = [
  {
    id: "n1",
    title: "New talent application received",
    body: "A new talent application has been submitted by Amani Grace.",
    date: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    read: false,
  },
  {
    id: "n2",
    title: "Project updated",
    body: "Music Workshop Series was updated with new schedule.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    read: true,
  },
  {
    id: "n3",
    title: "Event reminder",
    body: "Annual Talent Showcase is happening in 3 days.",
    date: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    read: false,
  },
];

export default function ManageNotifications() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const { toast } = useToast();

  const visible = notifications.filter((n) => (filter === "all" ? true : !n.read));

  const markRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    toast({ title: "Marked read" });
  };

  const remove = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast({ title: "Notification removed" });
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast({ title: "All marked read" });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Notifications</h1>
        <p className="text-muted-foreground">System and user notifications for the dashboard.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Inbox</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Label className="text-sm">Filter</Label>
                  <select value={filter} onChange={(e) => setFilter(e.target.value as any)} className="border rounded px-2 py-1">
                    <option value="all">All</option>
                    <option value="unread">Unread</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" onClick={markAllRead} data-testid="button-mark-all">Mark all read</Button>
                  <Button variant="destructive" onClick={() => setNotifications([])}>Clear</Button>
                </div>
              </div>

              {visible.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">No notifications</div>
              ) : (
                <div className="space-y-2">
                  {visible.map((n) => (
                    <div key={n.id} className={`flex items-start justify-between gap-4 py-3 ${n.read ? 'opacity-60' : ''} border-b border-border`}> 
                      <div>
                        <div className="flex items-center gap-2">
                          <Bell className="h-5 w-5 text-accent-foreground" />
                          <div className="font-semibold">{n.title}</div>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">{n.body}</div>
                        <div className="text-xs text-muted-foreground mt-2">{new Date(n.date).toLocaleString()}</div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {!n.read && (
                          <Button size="icon" variant="ghost" onClick={() => markRead(n.id)} title="Mark read"><Check className="h-4 w-4" /></Button>
                        )}
                        <Button size="icon" variant="ghost" onClick={() => remove(n.id)} title="Delete"><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button onClick={() => toast({ title: "Test notification sent" })}>Send test notification</Button>
                <Button variant="outline" onClick={() => setNotifications(initialNotifications)}>Reset sample</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">Configure when and how notifications are shown (client-side demo only).</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
