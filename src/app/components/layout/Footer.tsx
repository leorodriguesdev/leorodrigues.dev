// components/Footer.tsx
import React from 'react';
import { FaInstagram, FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="flex flex-col items-center text-center py-8 bg-[var(--bg-card)] text-[var(--text-color)] border-t border-gray-700 space-y-4">
      {/* Logo e texto de assinatura */}
      <div className="text-2xl font-semibold text-[var(--primary-color)] tracking-wider font-audiowide">
        Leorodrigues.dev
      </div>
      <p className="text-sm max-w-md mx-auto text-gray-400 px-3">
        Construindo experiências digitais inovadoras, uma linha de código por vez.
      </p>

      {/* Redes sociais com ícones */}
      <div className="flex space-x-6 text-2xl">
        <a href="https://instagram.com/leorodriguesdev" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--primary-color)] transition duration-300 transform hover:scale-110">
          <FaInstagram />
        </a>
        <a href="https://linkedin.com/in/leorodriguesdev/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--primary-color)] transition duration-300 transform hover:scale-110">
          <FaLinkedin />
        </a>
        <a href="https://x.com/leorodriguesdev" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--primary-color)] transition duration-300 transform hover:scale-110">
          <FaTwitter />
        </a>
        <a href="https://github.com/leorodriguesdev" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--primary-color)] transition duration-300 transform hover:scale-110">
          <FaGithub />
        </a>
      </div>

      {/* Copyright */}
      <div className="text-xs text-gray-500">
        &copy; {new Date().getFullYear()} <span className="text-[var(--primary-color)] font-audiowide">Leorodrigues.dev</span>. Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;
