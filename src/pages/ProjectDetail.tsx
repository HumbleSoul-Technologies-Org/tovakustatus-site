import { useEffect } from "react";
import { useLocation } from "wouter";

export default function ProjectDetail() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Project detail removed — redirect to home
    setLocation("/");
  }, [setLocation]);

  return null;
}
