import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bell, Trash2, Check, Loader } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { set } from "date-fns";
import { format, isValid } from "date-fns";

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  createdAt: string;
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
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(initialNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [deleteLoading, setDeleteLoading] = useState<string | null>("");
  const [loading, setLoading] = useState<string | null>("");
  // toast is imported directly from sonner

  const visible = notifications.filter((n) =>
    filter === "all" ? true : !n.read
  );

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/notifications/all`,
        {
          timeout: 10000,
        }
      );
      if (response.status === 200) {
        setNotifications(response.data.notifications);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const markRead = async (id: string) => {
    setLoading(id);
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/notifications/read/${id}`,
        {},
        {
          timeout: 10000,
        }
      );
      if (response.status === 200) {
        toast.success("Marked as read");
        setNotifications((prev) =>
          prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
        fetchNotifications();
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    } finally {
      setLoading(null);
    }
  };

  const deleteNotification = async (id: string) => {
    setDeleteLoading(id);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/notifications/delete/${id}`,
        {
          timeout: 10000,
        }
      );
      if (response.status === 200) {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
        toast.success("Notification removed");
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
    } finally {
      setDeleteLoading(null);
    }
  };

  const clearNotifications = async () => {
    setDeleteLoading("all");
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/notifications/clear/all`,
        {
          timeout: 10000,
        }
      );
      if (response.status === 200) {
        setNotifications([]);
        toast.success("All notifications cleared");
      }
    } catch (error) {
      console.error("Error clearing notifications:", error);
    } finally {
      setDeleteLoading(null);
    }
  };

  const markAllRead = async () => {
    setLoading("all");
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/notifications/read/all`,
        {},
        {
          timeout: 10000,
        }
      );
      if (response.status === 200) {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
        toast.success("All notifications marked as read");
        fetchNotifications();
      }
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Notifications</h1>
        <p className="text-muted-foreground">
          System and user notifications for the dashboard.
        </p>
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
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as any)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="all">All</option>
                    <option value="unread">Unread</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    onClick={markAllRead}
                    data-testid="button-mark-all"
                  >
                    Mark all read
                  </Button>
                  <Button variant="destructive" onClick={clearNotifications}>
                    Clear
                  </Button>
                </div>
              </div>

              {visible.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No notifications
                </div>
              ) : (
                <div className="space-y-2">
                  {visible.map((n) => (
                    <div
                      key={n.id}
                      className={`flex items-start justify-between gap-4 py-3 ${
                        n.read ? "opacity-60" : ""
                      } border-b border-border`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <Bell
                            className={`h-5 w-5 ${
                              n.read ? "text-muted-foreground" : "text-primary"
                            }`}
                          />
                          <div className="font-semibold">{n.title}</div>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {n.description}
                        </div>
                        <div className="text-xs text-muted-border mt-2">
                          {n.createdAt && isValid(new Date(n.createdAt))
                            ? format(new Date(n.createdAt), "PPP 'at' p")
                            : "Date not available"}
                        </div>
                        {(loading === n._id ||
                          deleteLoading === n._id ||
                          deleteLoading === "all") && (
                          <span className="text-xs text-teal-500 mt-4 items-center flex gap-2">
                            processing...{" "}
                            <Loader className="text-xs size-3 animate-spin" />
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {!n.read && (
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => markRead(n._id)}
                            title="Mark read"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}

                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => deleteNotification(n.id)}
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
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
                <Button onClick={() => toast.success("Test notification sent")}>
                  Send test notification
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setNotifications(initialNotifications)}
                >
                  Reset sample
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Configure when and how notifications are shown (client-side demo
                only).
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
