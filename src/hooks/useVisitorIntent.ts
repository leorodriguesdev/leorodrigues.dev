"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { trackIntentSelection, type IntentSource } from "@/lib/analytics";

export type VisitorIntent = "portfolio" | "commercial" | null;

const STORAGE_KEY = "visitorIntent";

/**
 * Store único por aba (sessionStorage + assinantes): home, Navbar e Footer leem o
 * mesmo valor, então trocar a intenção atualiza todos sem recarregar a página.
 */
const listeners = new Set<() => void>();
let currentIntent: VisitorIntent = null;
let hasReadStorage = false;

function readStoredIntent(): VisitorIntent {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    return saved === "portfolio" || saved === "commercial" ? saved : null;
  } catch {
    return null;
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): VisitorIntent {
  if (!hasReadStorage) {
    currentIntent = readStoredIntent();
    hasReadStorage = true;
  }
  return currentIntent;
}

function getServerSnapshot(): VisitorIntent {
  return null;
}

function writeIntent(intent: VisitorIntent) {
  currentIntent = intent;
  hasReadStorage = true;
  try {
    if (intent) {
      sessionStorage.setItem(STORAGE_KEY, intent);
    } else {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // Armazenamento indisponível (modo privado): mantém só em memória.
  }
  listeners.forEach((listener) => listener());
}

export function useVisitorIntent() {
  const intent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const setIntent = useCallback(
    (newIntent: Exclude<VisitorIntent, null>, source: IntentSource) => {
      writeIntent(newIntent);
      trackIntentSelection(newIntent, source);
    },
    []
  );

  return { intent, setIntent, isLoading };
}
