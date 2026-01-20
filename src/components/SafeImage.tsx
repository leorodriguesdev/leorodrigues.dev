'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Code2 } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  unoptimized?: boolean;
}

export function SafeImage({
  src,
  alt,
  fill,
  width,
  height,
  className = '',
  unoptimized = false,
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Code2 className="text-primary/40" size={48} />
      </div>
    );
  }

  try {
    if (fill) {
      return (
        <Image
          src={src}
          alt={alt}
          fill
          className={className}
          onError={() => setHasError(true)}
          unoptimized={unoptimized || src.endsWith('.svg')}
        />
      );
    }

    return (
      <Image
        src={src}
        alt={alt}
        width={width || 40}
        height={height || 40}
        className={className}
        onError={() => setHasError(true)}
        unoptimized={unoptimized || src.endsWith('.svg')}
      />
    );
  } catch {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Code2 className="text-primary/40" size={48} />
      </div>
    );
  }
}
