// components/Navbar.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed z-50 top-0 w-full z-20 transition-all duration-300 ${
        isScrolled ? 'bg-[var(--bg-card)] shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo com a fonte Audiowide */}
        <div className="text-xl font-bold text-[var(--primary-color)] hover:text-[var(--accent-color)] transition-colors">
          <Link className="font-audiowide text-xl font-bold text-[var(--primary-color)] hover:text-[var(--accent-color)] transition-colors no-underline" href="/">Leorodrigues.dev</Link>
        </div>

        {/* Botão de Menu para Mobile */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-[var(--text-color)] focus:outline-none z-30 p-1 rounded"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
            onClick={closeMenu}
          ></div>
        )}

        {/* Links de Navegação */}
        <nav
          className={`flex-col md:flex md:flex-row md:space-x-6 fixed md:relative top-0 left-0 h-full w-90 md:w-auto md:h-auto bg-[var(--bg-color)] md:bg-transparent p-6 md:p-0 transform md:transform-none transition-transform duration-300 z-20 ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          {/* Título no menu mobile */}
          {isMenuOpen && (
            <div className="mb-4 text-lg font-bold text-[var(--primary-color)] text-center">
                        <Link className="font-audiowide text-xl font-bold text-[var(--primary-color)] hover:text-[var(--accent-color)] transition-colors no-underline" href="/">Leorodrigues.dev</Link>

            </div>
          )}

          {/* Itens do menu */}
          <Link href="/" className="block px-4 py-2 md:px-0 text-[var(--text-color)] hover:text-[var(--primary-color)] transition-colors no-underline" onClick={closeMenu}>
            Home
          </Link>
          <Link href="/#skills" className="block px-4 py-2 md:px-0 text-[var(--text-color)] hover:text-[var(--primary-color)] transition-colors no-underline" onClick={closeMenu}>
            Habilidades
          </Link>
          <Link href="/#projects" className="block px-4 py-2 md:px-0 text-[var(--text-color)] hover:text-[var(--primary-color)] transition-colors no-underline" onClick={closeMenu}>
            Projetos
          </Link>
          <Link href="/#experience" className="block px-4 py-2 md:px-0 text-[var(--text-color)] hover:text-[var(--primary-color)] transition-colors no-underline" onClick={closeMenu}>
            Experiência
          </Link>
          <Link href="/#education" className="block px-4 py-2 md:px-0 text-[var(--text-color)] hover:text-[var(--primary-color)] transition-colors no-underline" onClick={closeMenu}>
            Certificações
          </Link>
          <Link href="/#contact" className="block px-4 py-2 md:px-0 text-[var(--text-color)] hover:text-[var(--primary-color)] transition-colors no-underline" onClick={closeMenu}>
            Contato
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
