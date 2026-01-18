"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Briefcase, Code2, ArrowRight } from "lucide-react";
import { VisitorIntent } from "@/hooks/useVisitorIntent";

interface VisitorIntentModalProps {
  intent: VisitorIntent;
  setIntent: (intent: VisitorIntent) => void;
}

export function VisitorIntentModal({ intent, setIntent }: VisitorIntentModalProps) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Se não há intenção salva, mostra modal após 1 segundo
    if (intent === null) {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 1000);
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
    // Se fechar sem escolher, define comercial como padrão
    if (intent === null) {
      setIntent("commercial");
    }
  };

  if (!showModal) return null;

  return (
    <AnimatePresence>
      {showModal && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={handleClose}
          />

          {/* Modal */}
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
                className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 hover:bg-secondary rounded-lg transition-colors z-10"
                aria-label="Fechar"
              >
                <X size={20} />
              </button>

              <div className="text-center space-y-4 sm:space-y-6">
                <div className="px-2">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                    Olá! Como posso te ajudar?
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Escolha a opção que melhor descreve sua necessidade
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-8">
                  {/* Opção 1: Portfólio */}
                  <motion.button
                    onClick={() => handleIntentSelect("portfolio")}
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-4 sm:p-6 md:p-8 bg-card border-2 border-border rounded-xl hover:border-primary transition-all text-left space-y-3 sm:space-y-4 group w-full"
                  >
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Briefcase className="text-primary w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-1">
                        Portfólio
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 font-medium">
                        Desenvolvedor para sua equipe técnica
                      </p>
                      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                        Estou procurando um desenvolvedor para trabalhar na minha equipe ou projeto
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-primary font-medium text-sm sm:text-base">
                      Ver Portfólio
                      <ArrowRight size={14} className="sm:w-4 sm:h-4" />
                    </div>
                  </motion.button>

                  {/* Opção 2: Comercial */}
                  <motion.button
                    onClick={() => handleIntentSelect("commercial")}
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-4 sm:p-6 md:p-8 bg-card border-2 border-primary rounded-xl hover:border-primary/80 transition-all text-left space-y-3 sm:space-y-4 group relative w-full"
                  >
                    <span className="absolute -top-2 sm:-top-3 left-2 sm:left-4 px-2 sm:px-3 py-1 bg-primary text-primary-foreground text-xs rounded-full font-medium">
                      Mais Popular
                    </span>
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                      <Code2 className="text-primary w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-1">
                        Comercial
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 font-medium">
                        Apps e sites para sua empresa
                      </p>
                      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                        Quero desenvolver um site ou aplicativo para meu negócio
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-primary font-medium text-sm sm:text-base">
                      Ver Serviços
                      <ArrowRight size={14} className="sm:w-4 sm:h-4" />
                    </div>
                  </motion.button>
                </div>

                <p className="text-xs text-muted-foreground pt-2 sm:pt-4 px-2">
                  Você pode mudar essa escolha a qualquer momento
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
