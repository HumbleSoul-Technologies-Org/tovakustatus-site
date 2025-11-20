import { useEffect } from "react";
import { useLocation } from "wouter";

export default function Projects() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Projects feature removed — redirect to home
    setLocation("/");
  }, [setLocation]);

  return null;
}
