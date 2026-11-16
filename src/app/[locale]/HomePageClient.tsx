"use client";

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CommercialHome } from '@/components/sections/CommercialHome';

export default function HomePageClient() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <CommercialHome />
      <Footer />
    </div>
  );
}
