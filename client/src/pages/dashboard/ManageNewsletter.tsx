import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Mail, Users, Send, Trash2 } from "lucide-react";
import { 
  getNewsletterSubscribers, 
  addNewsletterSubscriber,
  deleteNewsletterSubscriber,
  type NewsletterSubscriber 
} from "@/lib/localStorage";

const subscriberFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  interests: z.array(z.string()).min(1, "Please select at least one interest"),
  subscriptionType: z.enum(["weekly", "monthly", "all"]),
  notes: z.string().optional(),
});

const campaignFormSchema = z.object({
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  content: z.string().min(20, "Content must be at least 20 characters"),
  targetAudience: z.enum(["all", "weekly", "monthly"]),
  scheduledDate: z.string().optional(),
});

type SubscriberFormData = z.infer<typeof subscriberFormSchema>;
type CampaignFormData = z.infer<typeof campaignFormSchema>;

export default function ManageNewsletter() {
  const { toast } = useToast();
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>(getNewsletterSubscribers());
  const [selectedSubscribers, setSelectedSubscribers] = useState<string[]>([]);

  const subscriberForm = useForm<SubscriberFormData>({
    resolver: zodResolver(subscriberFormSchema),
    defaultValues: {
      interests: [],
      subscriptionType: "monthly",
    },
  });

  const campaignForm = useForm<CampaignFormData>({
    resolver: zodResolver(campaignFormSchema),
    defaultValues: {
      targetAudience: "all",
    },
  });

  const handleAddSubscriber = (data: SubscriberFormData) => {
    try {
      const newSubscriber = addNewsletterSubscriber({
        email: data.email,
        name: data.name,
        subscribedDate: new Date().toISOString(),
      });

      setSubscribers(prev => [...prev, newSubscriber]);
      subscriberForm.reset();

      toast({
        title: "Subscriber Added",
        description: "The subscriber has been successfully added.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add subscriber. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteSubscriber = (id: string) => {
    try {
      deleteNewsletterSubscriber(id);
      setSubscribers(prev => prev.filter(s => s.id !== id));
      setSelectedSubscribers(prev => prev.filter(s => s !== id));

      toast({
        title: "Subscriber Deleted",
        description: "The subscriber has been successfully removed.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete subscriber. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSendCampaign = (data: CampaignFormData) => {
    // In a real app, this would send the campaign to the selected subscribers
    toast({
      title: "Campaign Scheduled",
      description: "Your newsletter campaign has been scheduled for sending.",
    });
    campaignForm.reset();
  };

  const subscriberInterests = [
    { id: "news", label: "News & Updates" },
    { id: "events", label: "Events" },
    { id: "stories", label: "Success Stories" },
    { id: "opportunities", label: "Opportunities" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Newsletter Management</h1>
        <p className="text-muted-foreground">Manage subscribers and send newsletters.</p>
      </div>

      <Tabs defaultValue="subscribers" className="space-y-6">
        <TabsList>
          <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
        </TabsList>

        <TabsContent value="subscribers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New Subscriber</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={subscriberForm.handleSubmit(handleAddSubscriber)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        {...subscriberForm.register("name")}
                        placeholder="Enter subscriber's name"
                      />
                      {subscriberForm.formState.errors.name && (
                        <p className="text-sm text-destructive mt-1">
                          {subscriberForm.formState.errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        {...subscriberForm.register("email")}
                        placeholder="Enter email address"
                      />
                      {subscriberForm.formState.errors.email && (
                        <p className="text-sm text-destructive mt-1">
                          {subscriberForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="subscriptionType">Subscription Type</Label>
                      <Select
                        onValueChange={(value) =>
                          subscriberForm.setValue("subscriptionType", value as "weekly" | "monthly" | "all")
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekly">Weekly Updates</SelectItem>
                          <SelectItem value="monthly">Monthly Digest</SelectItem>
                          <SelectItem value="all">All Updates</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>Interests</Label>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        {subscriberInterests.map((interest) => (
                          <div key={interest.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={interest.id}
                              onCheckedChange={(checked) => {
                                const interests = subscriberForm.getValues("interests");
                                if (checked) {
                                  subscriberForm.setValue("interests", [...interests, interest.id]);
                                } else {
                                  subscriberForm.setValue(
                                    "interests",
                                    interests.filter((i) => i !== interest.id)
                                  );
                                }
                              }}
                            />
                            <label
                              htmlFor={interest.id}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {interest.label}
                            </label>
                          </div>
                        ))}
                      </div>
                      {subscriberForm.formState.errors.interests && (
                        <p className="text-sm text-destructive mt-1">
                          {subscriberForm.formState.errors.interests.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea
                        id="notes"
                        {...subscriberForm.register("notes")}
                        placeholder="Add any notes about the subscriber"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit">Add Subscriber</Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Subscriber List</CardTitle>
            </CardHeader>
            <CardContent>
              {subscribers.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No subscribers yet. Add your first one above!</p>
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
                              setSelectedSubscribers(subscribers.map((s) => s.id));
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
                    {subscribers.map((subscriber) => (
                      <TableRow key={subscriber.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedSubscribers.includes(subscriber.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedSubscribers((prev) => [...prev, subscriber.id]);
                              } else {
                                setSelectedSubscribers((prev) =>
                                  prev.filter((id) => id !== subscriber.id)
                                );
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell>{subscriber.name}</TableCell>
                        <TableCell>{subscriber.email}</TableCell>
                        <TableCell>
                          {new Date(subscriber.subscribedDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteSubscriber(subscriber.id)}
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
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create Campaign</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={campaignForm.handleSubmit(handleSendCampaign)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="subject">Subject Line</Label>
                      <Input
                        id="subject"
                        {...campaignForm.register("subject")}
                        placeholder="Enter campaign subject"
                      />
                      {campaignForm.formState.errors.subject && (
                        <p className="text-sm text-destructive mt-1">
                          {campaignForm.formState.errors.subject.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="targetAudience">Target Audience</Label>
                      <Select
                        onValueChange={(value) =>
                          campaignForm.setValue("targetAudience", value as "all" | "weekly" | "monthly")
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select audience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Subscribers</SelectItem>
                          <SelectItem value="weekly">Weekly Subscribers</SelectItem>
                          <SelectItem value="monthly">Monthly Subscribers</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="scheduledDate">Schedule Send</Label>
                      <Input
                        id="scheduledDate"
                        type="datetime-local"
                        {...campaignForm.register("scheduledDate")}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="content">Campaign Content</Label>
                    <Textarea
                      id="content"
                      {...campaignForm.register("content")}
                      placeholder="Enter your newsletter content"
                      rows={8}
                    />
                    {campaignForm.formState.errors.content && (
                      <p className="text-sm text-destructive mt-1">
                        {campaignForm.formState.errors.content.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <Button type="submit" variant="outline">
                    Save Draft
                  </Button>
                  <Button type="submit">
                    <Send className="w-4 h-4 mr-2" />
                    Send Campaign
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}