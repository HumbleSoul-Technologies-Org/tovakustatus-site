import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format, isValid, set } from "date-fns";
import { Loader, Reply, Trash2 } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

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
  // status: "new" | "read" | "archived";
}

interface MessageDetailModalProps {
  message: Message | any;
  onOpenChange: (open: boolean) => void;
  onArchive?: (messageId: string) => void;
  refresh?: () => void;
  onUnarchive?: (messageId: string) => void;
}

export function MessageDetailModal({
  message,
  onOpenChange,
  refresh,
}: MessageDetailModalProps) {
  if (!message) return null;

  const [archiving, setArchiving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [replying, setReplying] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");

  const archiveMessage = async (messageId: string) => {
    setArchiving(true);
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/messages/archive/${messageId}`,
        {},
        {
          timeout: 10000,
        }
      );
      if (response.status === 200) {
        refresh && refresh();
        toast.success("Message archived successfully");
        onOpenChange(false);
      }
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    } finally {
      setArchiving(false);
    }
  };

  const deleteMessage = async (messageId: string) => {
    setDeleting(true);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/messages/delete/${messageId}`,
        {
          timeout: 10000,
        }
      );
      if (response.status === 200) {
        refresh && refresh();
        toast.success("Message deleted successfully");
        onOpenChange(false);
      }
    } catch (error) {
      console.log("====================================");
      console.log(error);
      toast.error("Failed to delete message");
      console.log("====================================");
    } finally {
      setDeleting(false);
    }
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

  const replyToMessage = async (id: string) => {
    setLoading(true);
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/messages/reply/${id}`,
        {
          reply: replyMessage,
        }
      );
      if (res.status === 200) {
        toast.success("Reply sent");
        setReplying(false);
        refresh && refresh();
      }
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {replying ? (
        <div>
          <Dialog open={!!message} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl overflow-x-auto">
              <DialogHeader>
                <div className=" justify-between hidden items-center">
                  <DialogTitle className="text-xl">
                    Replying Message
                  </DialogTitle>
                  {/* {getStatusBadge(message.status)} */}
                </div>
              </DialogHeader>

              <div className="mt-4 overflow-y-auto">
                <div className="mb-6 relative">
                  <span className="flex mb-4 items-center  gap-2 ">
                    <p className="text-sm text-muted-foreground">
                      Replying to:
                    </p>
                    <h3 className="text-lg font-medium ">{message.subject}</h3>
                  </span>

                  <div className="space-y-2 hidden text-sm text-gray-600 dark:text-gray-300">
                    <p>
                      <span className="font-semibold">From:</span>
                      {message.fullName}
                    </p>
                    <p>
                      <span className="font-semibold">Email:</span>{" "}
                      {message.email}
                    </p>
                    <p>
                      <span className="font-semibold">Contact:</span>{" "}
                      {message.contact}
                    </p>
                    <p>
                      <span className="font-semibold">Sent On : </span>
                      {message.createdAt && isValid(new Date(message.createdAt))
                        ? format(new Date(message.createdAt), "PPP 'at' p")
                        : "Date not available"}
                    </p>
                  </div>
                </div>

                {/* <Separator className="my-4" /> */}

                <div className="mb-6 hidden">
                  <h4 className="font-medium mb-2">Message:</h4>
                  <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                    {message.message}
                  </p>
                </div>
                <div className="mt-6 p-4 ">
                  <label htmlFor="replyMessage">Reply Message</label>
                  <textarea
                    id="replyMessage"
                    className="w-full min-h-[300px] max-h-[300px] mt-1 p-2 border rounded-md"
                    rows={4}
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                  />
                </div>

                <div className="flex justify-end space-x-2 mt-6">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      replyToMessage(message._id);
                    }}
                  >
                    {loading ? (
                      <span className="flex gap-1 items-center">
                        Sending...
                        <Loader className="text-xs size-3 animate-spin" />
                      </span>
                    ) : (
                      "Send Reply"
                    )}
                  </Button>
                  <Button variant="outline" onClick={() => setReplying(false)}>
                    Back
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <div>
          <Dialog open={!!message} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl overflow-x-auto">
              <DialogHeader>
                <div className="flex justify-between items-center">
                  <DialogTitle className="text-xl">Message Details</DialogTitle>
                  {/* {getStatusBadge(message.status)} */}
                </div>
              </DialogHeader>

              <div className="mt-4">
                <div className="mb-6 relative">
                  <h3 className="text-lg font-medium mb-4">
                    {message.subject}
                  </h3>
                  {deleting ? (
                    <span className="top-0 text-destructive right-0 text-xs flex absolute gap-1 items-center">
                      deleting...
                      <Loader className="text-xs size-3 animate-spin" />
                    </span>
                  ) : (
                    <Trash2
                      onClick={() => deleteMessage(message._id)}
                      className="absolute right-4 size-4 z-20 cursor-pointer text-destructive top-2"
                    />
                  )}

                  {!deleting && (
                    <Reply
                      onClick={() => setReplying(true)}
                      className="absolute right-16 size-4 z-20 cursor-pointer text-primary top-2"
                    />
                  )}

                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <p>
                      <span className="font-semibold">From:</span>{" "}
                      {message.fullName}
                    </p>
                    <p>
                      <span className="font-semibold">Email:</span>{" "}
                      {message.email}
                    </p>
                    <p>
                      <span className="font-semibold">Contact:</span>{" "}
                      {message.contact}
                    </p>
                    <p>
                      <span className="font-semibold">Sent On : </span>
                      {message.createdAt && isValid(new Date(message.createdAt))
                        ? format(new Date(message.createdAt), "PPP 'at' p")
                        : "Date not available"}
                    </p>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="mb-6">
                  <h4 className="font-medium mb-2">Message:</h4>
                  <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                    {message.message}
                  </p>
                </div>

                <div className="flex justify-end space-x-2 mt-6">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      archiveMessage(message._id);
                    }}
                  >
                    {message.isArchived ? (
                      archiving ? (
                        <span className="flex gap-1 items-center">
                          Processing...
                          <Loader className="text-xs size-3 animate-spin" />
                        </span>
                      ) : (
                        "Unarchive"
                      )
                    ) : archiving ? (
                      <span className="flex gap-1 items-center">
                        Processing...
                        <Loader className="text-xs size-3 animate-spin" />
                      </span>
                    ) : (
                      "Archive"
                    )}
                  </Button>
                  <Button variant="outline" onClick={() => onOpenChange(false)}>
                    Close
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </>
  );
}
