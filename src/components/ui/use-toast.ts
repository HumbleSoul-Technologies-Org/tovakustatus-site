import { toast as sonnerToast, ToastT } from "sonner";

type ToastProps = {
  title: string;
  description?: string;
  variant?: "default" | "destructive" | "success";
};

export function toast({ title, description, variant = "default" }: ToastProps) {
  const styles = {
    default: {},
    success: {
      style: {
        background: "var(--success)",
        border: "1px solid var(--success-border)",
        color: "var(--success-foreground)",
      },
    },
    destructive: {
      style: {
        background: "var(--destructive)",
        border: "1px solid var(--destructive-border)",
        color: "var(--destructive-foreground)",
      },
    },
  };

  return sonnerToast(title, {
    description,
    ...styles[variant],
    className: `toast-${variant}`,
  });
}