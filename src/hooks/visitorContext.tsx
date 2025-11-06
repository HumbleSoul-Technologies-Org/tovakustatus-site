import React, { createContext, useContext, ReactNode } from "react";
import { useVisitorHook } from "./visitors-hook"; // path to your existing hook

interface VisitorContextType {
  user: any;
  visitor: any;
  refreshVisitor: () => Promise<void>;
}

// Create the context
const VisitorContext = createContext<VisitorContextType | undefined>(undefined);

// Provider component
export const VisitorProvider = ({ children }: { children: ReactNode }) => {
  const { user, visitor, refreshVisitor } = useVisitorHook();

  return (
    <VisitorContext.Provider value={{ user, visitor, refreshVisitor }}>
      {children}
    </VisitorContext.Provider>
  );
};

// Hook to consume context
export const useVisitorContext = () => {
  const context = useContext(VisitorContext);
  if (!context) {
    throw new Error("useVisitorContext must be used within a VisitorProvider");
  }
  return context;
};
