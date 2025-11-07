import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { MessageDetailModal } from "@/components/MessageDetailModal";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: "new" | "read" | "archived";
}

// This would typically come from your backend/storage
const dummyMessages: Message[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@techstart.com",
    subject: "Volunteer Opportunity Inquiry",
    message:
      "Hi there,\n\nI'm a software developer with 5 years of experience in web development and I'm interested in volunteering for your upcoming projects. I'm particularly interested in helping with the youth coding workshops you mentioned on your website.\n\nCould you please provide more information about the volunteer opportunities and the time commitment required?\n\nBest regards,\nSarah",
    date: "2025-11-06",
    status: "new",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "m.chen@edutech.org",
    subject: "Educational Partnership Proposal",
    message:
      "Dear Team,\n\nI represent EduTech, a non-profit organization focusing on bringing technology education to underserved communities. We're impressed by your initiatives and would love to explore a potential collaboration.\n\nWould you be interested in discussing how we could work together to expand the reach of both our organizations?\n\nKind regards,\nMichael Chen\nProgram Director, EduTech",
    date: "2025-11-05",
    status: "read",
  },
  {
    id: "3",
    name: "Emma Thompson",
    email: "emma.t@gmail.com",
    subject: "Question about upcoming events",
    message:
      "Hello,\n\nI saw on your website that you're planning some events for December. I'm interested in attending but couldn't find specific dates. Could you please provide more information about the schedule and registration process?\n\nThanks,\nEmma",
    date: "2025-11-04",
    status: "archived",
  },
  {
    id: "4",
    name: "David Martinez",
    email: "david.m@communityfund.org",
    subject: "Funding Opportunity",
    message:
      "Dear Status App Team,\n\nI'm reaching out from the Community Innovation Fund. We're currently accepting applications for our 2026 grant cycle, and based on your organization's mission and impact, we believe you would be a strong candidate.\n\nThe grant ranges from $25,000 to $100,000. Would you be interested in learning more about the application process?\n\nBest regards,\nDavid Martinez\nGrant Program Manager",
    date: "2025-11-03",
    status: "new",
  },
  {
    id: "5",
    name: "Lisa Anderson",
    email: "lisa.anderson@localschool.edu",
    subject: "School Visit Request",
    message:
      "Hi,\n\nI'm a high school computer science teacher at Local High School. Our students are working on social impact projects, and we would love to have someone from your team visit our class to share insights about using technology for social good.\n\nWould this be something you might be interested in? We're flexible with dates and can work around your schedule.\n\nThank you for considering this request.\n\nBest,\nLisa Anderson",
    date: "2025-11-02",
    status: "read",
  },
];

export default function ManageMessages() {
  const [messages, setMessages] = useState<Message[]>(dummyMessages);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [activeTab, setActiveTab] = useState<Message["status"]>("new");

  const filteredMessages = messages.filter((msg) => msg.status === activeTab);

  const handleStatusChange = (
    messageId: string,
    newStatus: "new" | "read" | "archived"
  ) => {
    setMessages(
      messages.map((msg) =>
        msg.id === messageId ? { ...msg, status: newStatus } : msg
      )
    );
  };

  const truncateMessage = (message: string, lines: number = 2) => {
    const splitMessage = message.split("\n").slice(0, lines);
    return (
      splitMessage.join("\n") +
      (message.split("\n").length > lines ? "..." : "")
    );
  };

  const getStatusBadge = (status: Message["status"]) => {
    if (status === "read") return null;
    const variants = {
      new: "bg-green-500 hover:bg-green-600",
      read: "bg-blue-500 hover:bg-blue-600",
      archived: "bg-gray-500 hover:bg-gray-600",
    };
    return (
      <Badge className={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Messages</h1>

      <Card className="p-2 ">
        <div className="flex space-x-2 mb-4">
          <Button
            variant={activeTab === "new" ? "default" : "outline"}
            onClick={() => setActiveTab("new")}
            className={`flex-1 ${
              activeTab === "new" ? "bg-primary" : "bg-background"
            } p-1`}
          >
            Unread ({messages.filter((m) => m.status === "new").length})
          </Button>
          <Button
            variant={activeTab === "read" ? "default" : "outline"}
            onClick={() => setActiveTab("read")}
            className={`flex-1 ${
              activeTab === "read" ? "bg-primary" : "bg-background"
            } p-1`}
          >
            Read ({messages.filter((m) => m.status === "read").length})
          </Button>
          <Button
            variant={activeTab === "archived" ? "default" : "outline"}
            onClick={() => setActiveTab("archived")}
            className={`flex-1 ${
              activeTab === "archived" ? "bg-primary" : "bg-background"
            } p-1`}
          >
            Archived ({messages.filter((m) => m.status === "archived").length})
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredMessages.map((message) => (
              <div key={message.id}>
                <div
                  className={`p-4 rounded-lg border cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground`}
                  onClick={() => {
                    setSelectedMessage(message);
                    if (message.status === "new") {
                      handleStatusChange(message.id, "read");
                    }
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{message.subject}</h3>
                    {getStatusBadge(message.status)}
                  </div>
                  <p className="text-sm text-gray-500">{message.name}</p>
                  <p className="text-xs text-gray-400 mb-2">{message.date}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                    {message.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {filteredMessages.length === 0 && (
            <div className="text-center text-gray-500 p-4">
              No {activeTab} messages
            </div>
          )}
        </ScrollArea>

        <MessageDetailModal
          message={selectedMessage}
          onOpenChange={(open) => {
            if (!open) setSelectedMessage(null);
          }}
          onArchive={(messageId) => handleStatusChange(messageId, "archived")}
          onUnarchive={(messageId) => handleStatusChange(messageId, "read")}
        />
      </Card>
    </div>
  );
}
