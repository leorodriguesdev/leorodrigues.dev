// src/lib/analytics.ts
import { track } from "@vercel/analytics";

// Google Analytics 4
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

// Event tracking
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export type LeadChannel = "email" | "whatsapp";

/** Posição do elemento na UI; a página já vem em `page_location` do GA4. */
export type TrackingLocation =
  | "hero"
  | "services_preview"
  | "pricing"
  | "contact_section"
  | "services_card"
  | "services_cta"
  | "about_hero"
  | "footer";

/**
 * Conversão principal do site (GA4 recommended event `generate_lead`).
 * Marcar `generate_lead` como key event no GA4. Espelhado na Vercel Analytics.
 */
export const trackLead = (channel: LeadChannel, location: TrackingLocation) => {
  if (typeof window === "undefined") return;
  if (window.gtag) {
    window.gtag("event", "generate_lead", { method: channel, location });
  }
  track("generate_lead", { method: channel, location });
};

/** Clique em CTA intermediário do funil (ex.: "Solicitar orçamento" → seção de contato). */
export const trackCtaClick = (ctaId: string, location: TrackingLocation) => {
  if (typeof window === "undefined") return;
  if (window.gtag) {
    window.gtag("event", "select_content", {
      content_type: "cta",
      content_id: ctaId,
      location,
    });
  }
  track("cta_click", { cta: ctaId, location });
};

// Tipos TypeScript
declare global {
  interface Window {
    gtag: (
      command: "config" | "event" | "js" | "set",
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}
