import { useEffect } from "react";
import { useLocation } from "wouter";

export default function ManageProjects() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Manage Projects removed — redirect to dashboard overview
    setLocation("/dashboard");
  }, [setLocation]);

  return null;
}
