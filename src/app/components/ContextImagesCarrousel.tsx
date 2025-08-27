'use client'

import Image from "next/image"
import { useState } from "react"

type ContextImage = {
  filename: string;
  alt: string;
  id: number;
  title?: string;
}

type ContextImageCarrouselProps = {
  imageUrl: string;
  alt: string;
  imagesArr: ContextImage[];
}

export default function ContextImagesCarrousel({
  imageUrl,
  alt,
  imagesArr,
}: ContextImageCarrouselProps) {

  // Inicializamos el índice primero, antes de cualquier return
  const initialIndex = imagesArr.findIndex(img => img.filename === imageUrl) ?? 0;
  const [index, setIndex] = useState(initialIndex);

  // Si no hay imágenes, retornamos null dentro del render
  if (imagesArr.length === 0) return null;

  function handleCarrousel() {
    setIndex(prevIndex => (prevIndex + 1) % imagesArr.length);
  }

  return (
    <div
      className="relative w-full h-full flex items-center justify-center p-4 z-30 cursor-pointer"
      onClick={handleCarrousel}
    >
      <Image
        src={imagesArr[index].filename ?? imageUrl}
        alt={alt}
        width={1200}
        height={1200}
        className="max-h-full max-w-full object-contain rounded-lg"
      />
    </div>
  )
}