"use client";

import { motion, AnimatePresence } from "motion/react";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { StructuredData } from '@/components/StructuredData';
import { VisitorIntentModal } from '@/components/VisitorIntentModal';
import { PortfolioHome } from '@/components/sections/PortfolioHome';
import { CommercialHome } from '@/components/sections/CommercialHome';
import { useVisitorIntent } from '@/hooks/useVisitorIntent';

export default function HomePageClient() {
  const { intent, setIntent, isLoading } = useVisitorIntent();
  
  // Se ainda está carregando, mostra versão comercial (padrão)
  const displayIntent = isLoading ? "commercial" : (intent || "commercial");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <StructuredData type="Person" data={{}} />
      <StructuredData type="WebSite" data={{}} />
      <StructuredData type="ProfessionalService" data={{}} />
      <StructuredData type="LocalBusiness" data={{}} />
      
      <VisitorIntentModal intent={intent} setIntent={setIntent} />
      
      <Navbar />

      <AnimatePresence mode="wait">
        {displayIntent === "portfolio" ? (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PortfolioHome />
          </motion.div>
        ) : (
          <motion.div
            key="commercial"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CommercialHome />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
