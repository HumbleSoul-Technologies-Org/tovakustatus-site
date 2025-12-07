import { useEffect, useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
}

interface Visitor {
  _id: string;
  visitorId: string;
  uuid: string;
  profileImage: { url: string; public_id: string };
  reminders: any[];
  banned: { status: boolean; reason: string };
  isVerified: boolean;
  email: string;
}

interface VisitorAuth {
  user: User | null;
  visitor: Visitor | null;

  refreshVisitor: () => Promise<void>;
}

/**
 * Custom hook for managing visitor authentication and session
 */
export const useVisitorHook = (): VisitorAuth => {
  const [user, setUser] = useState<User | null>(null);
  const [visitor, setVisitor] = useState<Visitor | null>(null);
  const [visitorId, setVisitorId] = useState<string | null>(
    localStorage.getItem("tovakustatus_visitor_id")
  );

  const API_URL = import.meta.env.VITE_API_URL; // ✅ safer than process.env for Vite

  const MAX_RETRIES = 3;
  const RETRY_DELAY = 1000; // 1 second

  // Utility delay
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  /**
   * Create or fetch a visitor profile.
   * Retries up to MAX_RETRIES on failure.
   */
  const createVisitorProfile = useCallback(
    async (retryCount = 0): Promise<Visitor | null> => {
      const storedVisitorId = localStorage.getItem("tovakustatus_visitor_id");
      const visitorUuid = storedVisitorId || uuidv4();
      const isNewVisitor = !storedVisitorId;

      try {
        const { data, status } = await axios.post(`${API_URL}/visitor/new`, {
          uuid: visitorUuid,
        });

        if ((status === 200 || status === 201) && data.visitor) {
          if (isNewVisitor)
            localStorage.setItem("tovakustatus_visitor_id", visitorUuid);
          setVisitorId(visitorUuid);
          setVisitor(data.visitor);

          return data.visitor;
        }

        throw new Error("Invalid server response");
      } catch (error) {
        console.error("❌ Visitor creation failed:", error);

        if (retryCount < MAX_RETRIES) {
          await delay(RETRY_DELAY * (retryCount + 1));
          return createVisitorProfile(retryCount + 1);
        }

        return null;
      }
    },
    [API_URL]
  );

  /**
   * Refresh visitor data from the backend.
   */
  const refreshVisitor = useCallback(async (): Promise<void> => {
    if (!visitorId) return;

    try {
      const { data, status } = await axios.get(
        `${API_URL}/visitor/new/${visitorId}`
      );

      if (status === 200 && data.visitor) {
        setVisitor(data.visitor);
        console.log("♻️ Visitor refreshed");
      } else {
        throw new Error("Failed to refresh visitor profile");
      }
    } catch (error) {
      console.error("⚠️ Error refreshing visitor profile:", error);
    }
  }, [API_URL, visitorId]);

  /**
   * Initialize user and visitor data on mount.
   */
  useEffect(() => {
    let active = true;
    const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

    const initialize = async () => {
      // Load stored user (auth session)
      const storedUser = localStorage.getItem("auth_user");
      if (storedUser && active) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          localStorage.removeItem("auth_user");
        }
      }

      // Ensure visitor profile exists
      await createVisitorProfile();
    };

    initialize();

    const interval = setInterval(() => {
      if (visitorId) refreshVisitor();
    }, REFRESH_INTERVAL);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [visitorId, createVisitorProfile, refreshVisitor]);

  return {
    user,
    visitor,
    refreshVisitor,
  };
};
