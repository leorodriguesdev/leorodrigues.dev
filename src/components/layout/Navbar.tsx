"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from "motion/react";
import { AlignJustify, X } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/", hash: false },
    { name: "Sobre", path: "/about", hash: false },
    { name: "Habilidades", path: "/#skills", hash: true },
    { name: "Projetos", path: "/projects", hash: false },
    { name: "Contato", path: "/#contact", hash: true },
  ];

  const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (path.includes('#')) {
      e.preventDefault();
      const [basePath, hash] = path.split('#');
      
      if (pathname !== basePath || pathname !== '/') {
        router.push(path);
        setTimeout(() => {
          const element = document.querySelector(hash ? `#${hash}` : '');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        const element = document.querySelector(hash ? `#${hash}` : '');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
      setMobileMenuOpen(false);
    }
  };

  const isActive = (path: string, hash?: boolean) => {
    if (hash) {
      // Para links com hash, verificar se estamos na home e se o hash está visível
      if (pathname === "/") {
        const hashValue = path.split('#')[1];
        if (hashValue) {
          const element = document.querySelector(`#${hashValue}`);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top >= 0 && rect.top <= window.innerHeight / 2;
          }
        }
      }
      return false;
    }
    if (path === "/") {
      return pathname === "/";
    }
    return pathname === path || pathname.startsWith(path + "/");
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <motion.div
              className="tracking-tight font-audiowide"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-primary">Leo</span>
              <span className="text-foreground">Rodrigues</span>
              <span className="text-primary">.dev</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="relative group"
                onClick={(e) => {
                  if (item.hash) {
                    handleHashClick(e, item.path);
                  } else {
                    setMobileMenuOpen(false);
                  }
                }}
              >
                <span
                  className={`transition-colors ${
                    isActive(item.path, item.hash)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.name}
                </span>
                {isActive(item.path, item.hash) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 border border-border rounded-lg text-foreground hover:border-primary hover:text-secondary transition-all"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <AlignJustify size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pt-4 pb-2"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={(e) => {
                  if (item.hash) {
                    handleHashClick(e, item.path);
                  } else {
                    setMobileMenuOpen(false);
                  }
                }}
                className={`block py-3 transition-colors ${
                  isActive(item.path, item.hash)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
