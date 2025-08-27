'use client'

import Image from "next/image"
import { useState } from "react"

// Tipo para cada imagen del carrousel
type ContextImage = {
  filename: string;
  alt: string;
  id: number;
  title?: string;
}

// Props del componente
type ContextImageCarrouselProps = {
  imageUrl: string;
  alt: string;
  imagesArr: ContextImage[]; // nunca undefined
}

export default function ContextImagesCarrousel({
  imageUrl,
  alt,
  imagesArr,
}: ContextImageCarrouselProps) {
  console.log("ContextImagesCarrousel");
  console.log("imagesArr: ", imagesArr);

  // Si no hay imágenes, retornamos null
  if (imagesArr.length === 0) return null;

  // Inicializamos el índice
  const initialIndex = imagesArr.findIndex(img => img.filename === imageUrl) ?? 0;
  const [index, setIndex] = useState(initialIndex);

  // Función para avanzar el carrousel
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