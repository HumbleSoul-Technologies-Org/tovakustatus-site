import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { MessageDetailModal } from "@/components/MessageDetailModal";
import { toast } from "sonner";
import axios from "axios";
import { format, isValid } from "date-fns";

interface Message {
  _id: string;
  name: string;
  email: string;
  contact: string;
  subject: string;
  message: string;
  date: string;
  isRead: boolean;
  isArchived: boolean;
  // status: "isRead" | "isArchived";
}

export default function ManageMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [activeTab, setActiveTab] = useState("new");

  const filteredMessages = messages.filter((msg) => msg.isRead === false);

  const handleStatusChange = (
    messageId: string,
    newStatus: "isRead" | "isArchived"
  ) => {
    setMessages(
      messages.map((msg) =>
        msg._id === messageId ? { ...msg, status: newStatus } : msg
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

  // const getStatusBadge = (status: Message["status"]) => {
  //   if (status === "read") return null;
  //   const variants = {
  //     new: "bg-green-500 hover:bg-green-600",
  //     read: "bg-blue-500 hover:bg-blue-600",
  //     archived: "bg-gray-500 hover:bg-gray-600",
  //   };
  //   return (
  //     <Badge className={variants[status]}>
  //       {status.charAt(0).toUpperCase() + status.slice(1)}
  //     </Badge>
  //   );
  // };

  useEffect(() => {
    // Fetch messages from backend/storage here and setMessages
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/messages/all`,
          {
            timeout: 10000,
          }
        );
        if (response.status === 200) {
          setMessages(response.data.messages);
        }
      } catch (error) {
        toast.error("Failed to fetch messages");
      }
    };

    fetchMessages();
  }, []);

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
            Unread ({messages.filter((m) => m.isRead === false).length})
          </Button>
          <Button
            variant={activeTab === "read" ? "default" : "outline"}
            onClick={() => setActiveTab("read")}
            className={`flex-1 ${
              activeTab === "read" ? "bg-primary" : "bg-background"
            } p-1`}
          >
            Read ({messages.filter((m) => m.isRead === true).length})
          </Button>
          <Button
            variant={activeTab === "archived" ? "default" : "outline"}
            onClick={() => setActiveTab("archived")}
            className={`flex-1 ${
              activeTab === "archived" ? "bg-primary" : "bg-background"
            } p-1`}
          >
            Archived ({messages.filter((m) => m.isArchived === true).length})
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {messages.map((message) => (
              <div key={message._id}>
                <div
                  className={`p-4 rounded-lg border cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground`}
                  onClick={() => {
                    setSelectedMessage(message);
                    // if (message.isRead === false) {
                    //   handleStatusChange(message._id, "read");
                    // }
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{message.subject}</h3>
                    {/* {getStatusBadge(message.status)} */}
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
          // onArchive={(messageId) => handleStatusChange(messageId, "archived")}
          // onUnarchive={(messageId) => handleStatusChange(messageId, "read")}
        />
      </Card>
    </div>
  );
}
