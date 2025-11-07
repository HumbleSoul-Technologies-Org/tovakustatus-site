import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

interface MessageDetailModalProps {
  message: Message | null;
  onOpenChange: (open: boolean) => void;
  onArchive?: (messageId: string) => void;
  onUnarchive?: (messageId: string) => void;
}

export function MessageDetailModal({
  message,
  onOpenChange,
  onArchive,
  onUnarchive,
}: MessageDetailModalProps) {
  if (!message) return null;

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
    <Dialog open={!!message} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl overflow-x-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl">Message Details</DialogTitle>
            {getStatusBadge(message.status)}
          </div>
        </DialogHeader>

        <div className="mt-4">
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">{message.subject}</h3>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <p>
                <span className="font-semibold">From:</span> {message.name}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {message.email}
              </p>
              <p>
                <span className="font-semibold">Date:</span> {message.date}
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
            {message.status !== "archived" && onArchive && (
              <Button
                variant="secondary"
                onClick={() => {
                  onArchive(message.id);
                  onOpenChange(false);
                }}
              >
                Archive
              </Button>
            )}
            {message.status === "archived" && onUnarchive && (
              <Button
                variant="secondary"
                onClick={() => {
                  onUnarchive(message.id);
                  onOpenChange(false);
                }}
              >
                Unarchive
              </Button>
            )}
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
