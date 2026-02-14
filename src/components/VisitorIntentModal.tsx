"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Briefcase, Code2, ArrowRight } from "lucide-react";
import { Drawer } from "vaul";
import { useMediaQuery } from "react-responsive";
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

const intentOptions: IntentOption[] = [
  {
    id: "portfolio",
    icon: Briefcase,
    title: "Portfólio",
    subtitle: "Desenvolvedor para sua equipe técnica",
    description: "Estou procurando um desenvolvedor para trabalhar na minha equipe ou projeto",
    cta: "Ver Portfólio",
  },
  {
    id: "commercial",
    icon: Code2,
    title: "Comercial",
    subtitle: "Apps e sites para sua empresa",
    description: "Quero desenvolver um site ou aplicativo para meu negócio",
    cta: "Ver Serviços",
    badge: "Mais Popular",
  },
];

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

  if (compact) {
    return (
      <motion.button
        onClick={onSelect}
        whileTap={{ scale: 0.98 }}
        className={`${baseClasses} p-4 gap-4 items-center min-h-[72px] touch-manipulation`}
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
      </motion.button>
    );
  }

  return (
    <motion.button
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
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: MOBILE_BREAKPOINT - 1 });

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

  const content = (
    <div className="space-y-4 sm:space-y-6">
      <div className="px-2">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-bold mb-2 text-foreground">
          Olá! Como posso te ajudar?
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          Escolha a opção que melhor descreve sua necessidade
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 mt-4 sm:mt-8">
        {intentOptions.map((option) => (
          <IntentOptionCard
            key={option.id}
            option={option}
            onSelect={() => handleIntentSelect(option.id)}
            compact={isMobile}
          />
        ))}
      </div>

      <p className="text-xs text-muted-foreground pt-2 sm:pt-4 px-2">
        Você pode mudar essa escolha a qualquer momento
      </p>
    </div>
  );

  if (mounted && isMobile) {
    return (
      <Drawer.Root open={showModal} onOpenChange={handleOpenChange}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" />
          <Drawer.Content className="bg-card border-t border-border rounded-t-2xl fixed bottom-0 left-0 right-0 z-[100] outline-none max-h-[90vh] overflow-y-auto pb-[env(safe-area-inset-bottom)]">
            <div className="sticky top-0 bg-card pt-4 pb-2 px-4 z-10">
              <Drawer.Handle className="w-12 h-1.5 bg-muted-foreground/30 rounded-full mx-auto mb-4" />
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                aria-label="Fechar"
              >
                <X size={20} />
              </button>
            </div>
            <div className="px-4 pb-6">{content}</div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    );
  }

  return (
    <AnimatePresence>
      {showModal && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-card border border-border rounded-2xl p-4 sm:p-6 md:p-8 max-w-4xl w-full relative shadow-2xl my-auto mt-20 sm:mt-24">
              <button
                onClick={handleClose}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors z-10"
                aria-label="Fechar"
              >
                <X size={20} />
              </button>
              <div className="text-center">{content}</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
