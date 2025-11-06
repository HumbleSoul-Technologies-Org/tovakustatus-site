import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Messages List Section */}
        <Card className="p-4">
          <div className="flex space-x-2 mb-4">
            <Button
              variant={activeTab === "new" ? "default" : "outline"}
              onClick={() => setActiveTab("new")}
              className="flex-1"
            >
              Unread ({messages.filter((m) => m.status === "new").length})
            </Button>
            <Button
              variant={activeTab === "read" ? "default" : "outline"}
              onClick={() => setActiveTab("read")}
              className="flex-1"
            >
              Read ({messages.filter((m) => m.status === "read").length})
            </Button>
            <Button
              variant={activeTab === "archived" ? "default" : "outline"}
              onClick={() => setActiveTab("archived")}
              className="flex-1"
            >
              Archived ({messages.filter((m) => m.status === "archived").length}
              )
            </Button>
          </div>
          <ScrollArea className="h-[600px]">
            {filteredMessages.map((message) => (
              <div key={message.id} className="mb-4">
                <div
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    selectedMessage?.id === message.id
                      ? "bg-gray-100 dark:bg-gray-800"
                      : "hover:bg-gray-50 dark:hover:bg-gray-900"
                  }`}
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
                  <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                    {truncateMessage(message.message)}
                  </p>
                </div>
                <Separator className="my-2" />
              </div>
            ))}
            {filteredMessages.length === 0 && (
              <div className="text-center text-gray-500 p-4">
                No {activeTab} messages
              </div>
            )}
          </ScrollArea>
        </Card>

        {/* Message Detail Section */}
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Message Details</h2>
          {selectedMessage ? (
            <div>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">
                    {selectedMessage.subject}
                  </h3>
                  {getStatusBadge(selectedMessage.status)}
                </div>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <p>
                    <span className="font-semibold">From:</span>{" "}
                    {selectedMessage.name}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    {selectedMessage.email}
                  </p>
                  <p>
                    <span className="font-semibold">Date:</span>{" "}
                    {selectedMessage.date}
                  </p>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="mb-6">
                <h4 className="font-medium mb-2">Message:</h4>
                <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                  {selectedMessage.message}
                </p>
              </div>

              <div className="flex space-x-2">
                {selectedMessage.status !== "archived" && (
                  <Button
                    variant="secondary"
                    onClick={() =>
                      handleStatusChange(selectedMessage.id, "archived")
                    }
                  >
                    Archive
                  </Button>
                )}
                {selectedMessage.status === "archived" && (
                  <Button
                    variant="secondary"
                    onClick={() =>
                      handleStatusChange(selectedMessage.id, "read")
                    }
                  >
                    Unarchive
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400">
              Select a message to view details
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
