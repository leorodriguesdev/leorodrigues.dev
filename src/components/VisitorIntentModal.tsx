"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { X, Briefcase, Code2, ArrowRight } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { Drawer } from "vaul";
import { useMediaQuery } from "react-responsive";
import { useTranslations } from "next-intl";
import { VisitorIntent } from "@/hooks/useVisitorIntent";

interface VisitorIntentModalProps {
  intent: VisitorIntent;
  setIntent: (intent: VisitorIntent) => void;
}

const MOBILE_BREAKPOINT = 768;

interface IntentOption {
  id: "portfolio" | "commercial";
  icon: typeof Briefcase;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  badge?: string;
}

function IntentOptionCard({
  option,
  onSelect,
  compact = false,
}: {
  option: IntentOption;
  onSelect: () => void;
  compact?: boolean;
}) {
  const Icon = option.icon;
  const hasBadge = !!option.badge;

  const baseClasses =
    "w-full text-left bg-card border border-border rounded-xl transition-all group relative flex hover:border-muted-foreground/40 hover:bg-secondary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  /** Fundo explícito: no mobile, Motion + transform do Vaul no WebKit podem “comer” o bg de `bg-card`. */
  const opaqueCardStyle = { backgroundColor: "var(--card)" } as const;

  if (compact) {
    return (
      <button
        type="button"
        onClick={onSelect}
        style={opaqueCardStyle}
        className={`${baseClasses} p-4 gap-4 items-center min-h-[72px] touch-manipulation transition-transform active:scale-[0.98]`}
      >
        {hasBadge && (
          <span className="absolute -top-2 left-4 px-2 py-0.5 bg-secondary text-foreground text-[10px] rounded-full font-medium border border-border">
            {option.badge}
          </span>
        )}
        <div className="w-12 h-12 shrink-0 bg-secondary rounded-lg flex items-center justify-center">
          <Icon className="text-muted-foreground group-hover:text-foreground w-6 h-6 transition-colors" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base text-foreground">{option.title}</h3>
          <p className="text-muted-foreground text-sm truncate">
            {option.subtitle}
          </p>
        </div>
        <ArrowRight
          size={18}
          className="text-muted-foreground group-hover:text-primary shrink-0 transition-colors"
          aria-hidden
        />
      </button>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} flex-col p-4 sm:p-6 md:p-8 space-y-3 sm:space-y-4`}
    >
      {hasBadge && (
        <span className="absolute -top-2 sm:-top-3 left-2 sm:left-4 px-2 sm:px-3 py-1 bg-secondary text-foreground text-xs rounded-full font-medium border border-border">
          {option.badge}
        </span>
      )}
      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-secondary rounded-lg flex items-center justify-center shrink-0">
        <Icon className="text-muted-foreground group-hover:text-foreground w-6 h-6 sm:w-8 sm:h-8 transition-colors" />
      </div>
      <div className="text-left w-full">
        <h3 className="text-lg sm:text-xl font-semibold mb-1 text-foreground">{option.title}</h3>
        <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 font-medium">
          {option.subtitle}
        </p>
        <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
          {option.description}
        </p>
      </div>
      <div className="flex items-center gap-2 text-muted-foreground group-hover:text-primary font-medium text-sm sm:text-base w-full transition-colors">
        {option.cta}
        <ArrowRight size={14} className="sm:w-4 sm:h-4" />
      </div>
    </motion.button>
  );
}

export function VisitorIntentModal({ intent, setIntent }: VisitorIntentModalProps) {
  const t = useTranslations("visitorIntent");
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: MOBILE_BREAKPOINT - 1 });
  const intentOptions: IntentOption[] = [
    {
      id: "portfolio",
      icon: Briefcase,
      title: t("portfolioTitle"),
      subtitle: t("portfolioSubtitle"),
      description: t("portfolioDescription"),
      cta: t("portfolioCta"),
    },
    {
      id: "commercial",
      icon: Code2,
      title: t("commercialTitle"),
      subtitle: t("commercialSubtitle"),
      description: t("commercialDescription"),
      cta: t("commercialCta"),
      badge: t("badgePopular"),
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (intent === null) {
      const timer = setTimeout(() => setShowModal(true), 1000);
      return () => clearTimeout(timer);
    } else {
      setShowModal(false);
    }
  }, [intent]);

  const handleIntentSelect = (selectedIntent: "portfolio" | "commercial") => {
    setIntent(selectedIntent);
    setShowModal(false);
  };

  const handleClose = () => {
    setShowModal(false);
    if (intent === null) {
      setIntent("commercial");
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) handleClose();
  };

  const intentOptionCards = intentOptions.map((option) => (
    <IntentOptionCard
      key={option.id}
      option={option}
      onSelect={() => handleIntentSelect(option.id)}
      compact={isMobile}
    />
  ));

  const optionsGrid = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 mt-4 sm:mt-8">
      {intentOptionCards}
    </div>
  );

  const footerNote = (
    <p className="text-xs text-muted-foreground pt-2 sm:pt-4 px-2">{t("footerNote")}</p>
  );

  if (mounted && isMobile) {
    return (
      <Drawer.Root open={showModal} onOpenChange={handleOpenChange}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" />
          <Drawer.Content
            style={{ backgroundColor: "var(--card)" }}
            className="isolate bg-card border-t border-border rounded-t-2xl fixed bottom-0 left-0 right-0 z-[100] outline-none max-h-[90vh] overflow-y-auto pb-[env(safe-area-inset-bottom)]"
          >
            <div
              className="sticky top-0 bg-card pt-4 pb-2 px-4 z-10"
              style={{ backgroundColor: "var(--card)" }}
            >
              <Drawer.Handle className="w-12 h-1.5 bg-muted-foreground/30 rounded-full mx-auto mb-4" />
              <button
                type="button"
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                aria-label={t("close")}
              >
                <X size={20} />
              </button>
            </div>
            <div className="px-4 pb-6 space-y-4 sm:space-y-6">
              <div className="px-2 pt-2">
                <Drawer.Title className="text-xl font-bold mb-2 text-foreground">
                  {t("title")}
                </Drawer.Title>
                <Drawer.Description className="text-sm text-muted-foreground">
                  {t("subtitle")}
                </Drawer.Description>
              </div>
              {optionsGrid}
              {footerNote}
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    );
  }

  // Radix Dialog: role="dialog", aria-modal, título/descrição ligados, foco preso,
  // retorno de foco ao fechar, Esc e clique fora fecham (A11Y-01).
  return (
    <Dialog.Root open={showModal} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[100] w-[calc(100%-2rem)] max-w-4xl max-h-[90vh] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl focus:outline-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-card border border-border rounded-2xl p-4 sm:p-6 md:p-8 relative shadow-2xl"
          >
            <Dialog.Close asChild>
              <button
                type="button"
                className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={t("close")}
              >
                <X size={20} />
              </button>
            </Dialog.Close>
            <div className="text-center space-y-4 sm:space-y-6">
              <div className="px-2">
                <Dialog.Title className="text-xl sm:text-3xl md:text-4xl font-bold mb-2 text-foreground">
                  {t("title")}
                </Dialog.Title>
                <Dialog.Description className="text-sm sm:text-base text-muted-foreground">
                  {t("subtitle")}
                </Dialog.Description>
              </div>
              {optionsGrid}
              {footerNote}
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
