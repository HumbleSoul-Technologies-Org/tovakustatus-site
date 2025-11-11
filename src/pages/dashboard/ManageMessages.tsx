import { useState, useEffect, act } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { MessageDetailModal } from "@/components/MessageDetailModal";
import { toast } from "sonner";
import axios from "axios";
import { format, isValid } from "date-fns";
import { Trash, Trash2 } from "lucide-react";

interface Message {
  _id: string;
  fullName: string;
  email: string;
  contact: string;
  subject: string;
  message: string;
  createdAt: string;
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

  const readMessage = async (id: string) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/messages/read/${id}`,
        {},
        {
          timeout: 10000,
        }
      );
      if (response.status === 200) {
        setMessages(response.data.messages);

        // toast.success("Message marked as read");
      }
    } catch (error) {
      toast.error("Failed to mark message as read");
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
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
          <div>
            {activeTab === "new" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {messages.filter(
                  (m) => m.isRead === false && m.isArchived === false
                ).length > 0 ? (
                  messages
                    .filter((m) => m.isRead === false)
                    .map((message) => (
                      <div key={message._id}>
                        <div
                          className={`p-4 mt-2 mb-2 shadow-md rounded-lg relative border cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground`}
                          onClick={() => {
                            setSelectedMessage(message);
                            if (message.isRead === false) {
                              readMessage(message._id);
                            }
                          }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium">{message.subject}</h3>
                            <Badge className="bg-green-200 text-green-600">
                              New
                            </Badge>
                            {/* {getStatusBadge(message.status)} */}
                          </div>
                          <p className="text-sm text-gray-500">
                            {message.fullName}
                          </p>

                          <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                            {message.message}
                          </p>
                          <p className="text-xs mt-5 text-gray-400 mb-2">
                            {message.createdAt &&
                            isValid(new Date(message.createdAt))
                              ? format(
                                  new Date(message.createdAt),
                                  "PPP 'at' p"
                                )
                              : "Date not available"}
                          </p>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="text-center absolute top-52 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center flex-1  text-gray-500 p-4">
                    No {activeTab} messages
                  </div>
                )}
              </div>
            )}
            {activeTab === "read" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {messages.filter(
                  (m) => m.isRead === true && m.isArchived === false
                ).length > 0 ? (
                  messages
                    .filter((m) => m.isRead === true)
                    .map((message) => (
                      <div key={message._id}>
                        <div
                          className={`p-4 rounded-lg relative border cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground`}
                          onClick={() => {
                            setSelectedMessage(message);
                            if (message.isRead === false) {
                              readMessage(message._id);
                            }
                          }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium">{message.subject}</h3>

                            {/* {getStatusBadge(message.status)} */}
                          </div>
                          <p className="text-sm text-gray-500">
                            {message.fullName}
                          </p>

                          <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                            {message.message}
                          </p>
                          <p className="text-xs mt-5 text-gray-400 mb-2">
                            {message.createdAt &&
                            isValid(new Date(message.createdAt))
                              ? format(
                                  new Date(message.createdAt),
                                  "PPP 'at' p"
                                )
                              : "Date not available"}
                          </p>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="text-center absolute top-52 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center flex-1  text-gray-500 p-4">
                    No {activeTab} messages
                  </div>
                )}
              </div>
            )}
            {activeTab === "archived" && (
              <div className="grid relative grid-cols-1 lg:grid-cols-2 gap-4">
                {messages.filter((m) => m.isArchived === true).length > 0 ? (
                  messages
                    .filter((m) => m.isArchived === true)
                    .map((message) => (
                      <div key={message._id}>
                        <div
                          className={`p-4 rounded-lg relative border cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground`}
                          onClick={() => {
                            setSelectedMessage(message);
                            if (message.isRead === false) {
                              readMessage(message._id);
                            }
                          }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium">{message.subject}</h3>
                            {message.isArchived === false &&
                              message.isRead === true && (
                                <Badge className="bg-blue-200 text-blue-600">
                                  Archieved
                                </Badge>
                              )}
                            {/* {getStatusBadge(message.status)} */}
                          </div>
                          <p className="text-sm text-gray-500">
                            {message.fullName}
                          </p>

                          <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                            {message.message}
                          </p>
                          <p className="text-xs mt-5 text-gray-400 mb-2">
                            {message.createdAt &&
                            isValid(new Date(message.createdAt))
                              ? format(
                                  new Date(message.createdAt),
                                  "PPP 'at' p"
                                )
                              : "Date not available"}
                          </p>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="text-center absolute top-52 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center flex-1  text-gray-500 p-4">
                    No {activeTab} messages
                  </div>
                )}
              </div>
            )}
          </div>
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
