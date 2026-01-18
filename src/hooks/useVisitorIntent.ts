"use client";

import { useState, useEffect } from "react";

export type VisitorIntent = "portfolio" | "commercial" | null;

const STORAGE_KEY = "visitorIntent";

export function useVisitorIntent() {
  const [intent, setIntentState] = useState<VisitorIntent>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lê do sessionStorage na inicialização
    if (typeof window !== "undefined") {
      const savedIntent = sessionStorage.getItem(STORAGE_KEY) as VisitorIntent;
      if (savedIntent === "portfolio" || savedIntent === "commercial") {
        setIntentState(savedIntent);
      }
      setIsLoading(false);
    }
  }, []);

  const setIntent = (newIntent: VisitorIntent) => {
    setIntentState(newIntent);
    if (typeof window !== "undefined") {
      if (newIntent) {
        sessionStorage.setItem(STORAGE_KEY, newIntent);
      } else {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    }
  };

  return { intent, setIntent, isLoading };
}
