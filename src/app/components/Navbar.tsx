// components/Navbar.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Adiciona uma sombra no menu ao rolar a página
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-10 transition-all duration-300 ${
        isScrolled ? 'bg-[var(--bg-card)] shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo com a fonte Audiowide */}
        <div className="text-xl font-bold text-[var(--primary-color)] hover:text-[var(--accent-color)] transition-colors">
          <Link  className="font-audiowide text-xl font-bold text-[var(--primary-color)] hover:text-[var(--accent-color)] transition-colors no-underline" href="/">Leonardo.dev</Link>
        </div>
        
        {/* Botão de Menu para Mobile */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-[var(--text-color)] focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Links de Navegação */}
        <nav
          className={`flex-col md:flex md:flex-row md:space-x-6 absolute md:relative top-0 left-0 w-full md:w-auto md:bg-transparent bg-[var(--bg-color)] p-6 md:p-0 rounded-lg md:rounded-none transition-all duration-300 ${
            isMenuOpen ? 'flex' : 'hidden'
          }`}
        >
          <Link href="#features" className="block px-4 py-2 md:px-0 text-[var(--text-color)] hover:text-[var(--primary-color)] transition-colors">
            Features
          </Link>
          <Link href="#clients" className="block px-4 py-2 md:px-0 text-[var(--text-color)] hover:text-[var(--primary-color)] transition-colors">
            Clientes
          </Link>
          <Link href="#contact" className="block px-4 py-2 md:px-0 text-[var(--text-color)] hover:text-[var(--primary-color)] transition-colors">
            Contato
          </Link>
          <Link href="#cta" className="block bg-[var(--primary-color)] text-white px-4 py-2 rounded-lg md:bg-transparent md:text-[var(--primary-color)] md:hover:bg-[var(--primary-color)] md:hover:text-white transition-all duration-300">
            Fale com Especialista
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
