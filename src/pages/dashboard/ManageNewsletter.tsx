import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Users, Trash2, Send } from "lucide-react";
import {
  getNewsletterSubscribers,
  deleteNewsletterSubscriber,
  type NewsletterSubscriber,
} from "@/lib/localStorage";
import axios from "axios";

export default function ManageNewsletter() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [selectedSubscribers, setSelectedSubscribers] = useState<string[]>([]);
  const [showBroadcastForm, setShowBroadcastForm] = useState(false);
  const [broadcastSubject, setBroadcastSubject] = useState("");
  const [broadcastMessage, setBroadcastMessage] = useState("");

  const handleDeleteSubscriber = (id: string) => {
    try {
      deleteNewsletterSubscriber(id);
      setSubscribers((prev) => prev.filter((s) => s._id !== id));
      setSelectedSubscribers((prev) => prev.filter((s) => s !== id));
    } catch (error) {
      console.error("Failed to delete subscriber");
    }
  };

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email to all subscribers
    console.log("Broadcasting to", subscribers.length, "subscribers");
    console.log("Subject:", broadcastSubject);
    console.log("Message:", broadcastMessage);
    setShowBroadcastForm(false);
    setBroadcastSubject("");
    setBroadcastMessage("");
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/news-letter/all`,
        {
          timeout: 10000,
        }
      );

      if (response.status === 200) {
        setSubscribers(response.data.users);
      }
    } catch (error) {
      console.error("Failed to fetch subscribers:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Newsletter Subscribers</h1>
          <p className="text-muted-foreground">
            View and manage newsletter subscribers.
          </p>
        </div>
        <Button onClick={() => setShowBroadcastForm(true)}>
          <Send className="w-4 h-4 mr-2" />
          Broadcast Email
        </Button>
      </div>

      {showBroadcastForm && (
        <Card>
          <CardHeader>
            <CardTitle>Broadcast Email</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleBroadcast} className="space-y-4">
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={broadcastSubject}
                  onChange={(e) => setBroadcastSubject(e.target.value)}
                  placeholder="Enter email subject"
                  required
                />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  placeholder="Enter your message"
                  rows={6}
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowBroadcastForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Send Broadcast</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Subscriber List</CardTitle>
        </CardHeader>
        <CardContent>
          {subscribers.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No subscribers yet.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={
                        subscribers.length > 0 &&
                        selectedSubscribers.length === subscribers.length
                      }
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedSubscribers(subscribers.map((s) => s._id));
                        } else {
                          setSelectedSubscribers([]);
                        }
                      }}
                    />
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Subscribed Date</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscribers.map((subscriber, index) => (
                  <TableRow key={subscriber._id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedSubscribers.includes(subscriber._id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedSubscribers((prev) => [
                              ...prev,
                              subscriber._id,
                            ]);
                          } else {
                            setSelectedSubscribers((prev) =>
                              prev.filter((id) => id !== subscriber._id)
                            );
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      {subscriber.name || `User ${index + 1}`}
                    </TableCell>
                    <TableCell>{subscriber.email}</TableCell>
                    <TableCell>
                      {new Date(subscriber.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteSubscriber(subscriber._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
