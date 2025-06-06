'use client';

import React, { useState } from 'react';
import Image from 'next/image';
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

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {images.map((src, idx) => (
          <div
            key={idx}
            onClick={() => {
              setIndex(idx);
              setOpen(true);
            }}
            className="relative cursor-pointer h-52 rounded-2xl overflow-hidden shadow-md group"
          >
            <Image
              src={src}
              alt={`${projectTitle} imagem ${idx + 1}`}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={index}
        on={{ view: ({ index }) => setIndex(index) }}
        plugins={[Thumbnails, Zoom, Fullscreen, Download]}
        carousel={{ finite: false }}
      />
    </>
  );
}
