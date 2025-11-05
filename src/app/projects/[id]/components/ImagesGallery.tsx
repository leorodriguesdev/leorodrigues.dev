'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Download from 'yet-another-react-lightbox/plugins/download';

import 'yet-another-react-lightbox/plugins/thumbnails.css';

type Props = {
  images: string[];
  projectTitle: string;
};

export default function ImageGallery({ images, projectTitle }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const slides = images.map((src) => ({ src }));

  // Função para determinar o layout baseado no número de imagens
  const getLayoutClass = (index: number, total: number) => {
    if (total === 1) return 'col-span-full row-span-2';
    if (total === 2) return 'col-span-1 row-span-2';
    if (total === 3) {
      if (index === 0) return 'col-span-2 row-span-2';
      return 'col-span-1 row-span-1';
    }
    if (total === 4) return 'col-span-1 row-span-1';
    if (total === 5) {
      if (index === 0) return 'col-span-2 row-span-2';
      return 'col-span-1 row-span-1';
    }
    if (total === 6) {
      if (index === 0) return 'col-span-2 row-span-2';
      if (index === 1) return 'col-span-1 row-span-2';
      return 'col-span-1 row-span-1';
    }
    // Para 7+ imagens, layout padrão
    if (index === 0) return 'col-span-2 row-span-2';
    if (index === 1) return 'col-span-1 row-span-2';
    return 'col-span-1 row-span-1';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px] md:auto-rows-[250px]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {images.map((src, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            onClick={() => {
              setIndex(idx);
              setOpen(true);
            }}
            className={`relative cursor-pointer rounded-2xl overflow-hidden shadow-lg group ${getLayoutClass(idx, images.length)}`}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          >
            <div className="relative w-full h-full flex items-center justify-center bg-gray-900/20">
              <Image
                src={src}
                alt={`${projectTitle} imagem ${idx + 1}`}
                fill
                className="object-contain group-hover:scale-110 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            
            {/* Overlay com efeito de gradiente */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Ícone de zoom */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <motion.div
                className="bg-white/20 backdrop-blur-sm rounded-full p-3"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <svg 
                  className="w-6 h-6 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" 
                  />
                </svg>
              </motion.div>
            </div>

            {/* Número da imagem */}
            <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-sm font-medium px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {idx + 1} / {images.length}
            </div>

            {/* Borda com efeito de brilho */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[var(--primary-color)]/30 transition-all duration-300" />
          </motion.div>
        ))}
      </motion.div>

      {/* Indicador de quantidade de imagens */}
      <motion.div 
        className="text-center mt-6 text-gray-400"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-sm">
          Clique em qualquer imagem para visualizar em tela cheia • {images.length} {images.length === 1 ? 'imagem' : 'imagens'} {images.length > 1 ? 'disponíveis' : 'disponível'}
        </p>
      </motion.div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={index}
        on={{ view: ({ index }) => setIndex(index) }}
        plugins={[Thumbnails, Zoom, Fullscreen, Download]}
        carousel={{ finite: false }}
        animation={{ fade: 300, swipe: 300 }}
        thumbnails={{
          position: "bottom",
          width: 120,
          height: 80,
          padding: 4,
          gap: 8,
          imageFit: "contain",
        }}
      />
    </>
  );
}
