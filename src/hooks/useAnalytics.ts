"use client";

import { useCallback } from "react";
import { event } from "@/lib/analytics";

export const useAnalytics = () => {
  const trackEvent = useCallback(
    (action: string, category: string, label?: string, value?: number) => {
      event({ action, category, label, value });
    },
    []
  );

  const trackDownload = useCallback(
    (fileName: string) => {
      trackEvent("download", "file", fileName);
    },
    [trackEvent]
  );

  const trackOutboundLink = useCallback(
    (url: string) => {
      trackEvent("click", "outbound", url);
    },
    [trackEvent]
  );

  const trackEmail = useCallback(() => {
    trackEvent("click", "email", "contato@leorodrigues.dev");
  }, [trackEvent]);

  const trackWhatsApp = useCallback(() => {
    trackEvent("click", "whatsapp", "contact");
  }, [trackEvent]);

  const trackProjectView = useCallback(
    (projectTitle: string) => {
      trackEvent("view", "project", projectTitle);
    },
    [trackEvent]
  );

  const trackThemeChange = useCallback(
    (theme: string) => {
      trackEvent("change", "theme", theme);
    },
    [trackEvent]
  );

  const trackSocialLink = useCallback(
    (platform: string) => {
      trackEvent("click", "social", platform);
    },
    [trackEvent]
  );

  const trackProjectClick = useCallback(
    (projectId: number, projectTitle: string) => {
      trackEvent("click", "project", projectTitle, projectId);
    },
    [trackEvent]
  );

  return {
    trackEvent,
    trackDownload,
    trackOutboundLink,
    trackEmail,
    trackWhatsApp,
    trackProjectView,
    trackThemeChange,
    trackSocialLink,
    trackProjectClick,
  };
};
