'use client'

import Image from "next/image";
import ArrowLeft from "./icons/ArrowLeft";
import ArrowRight from "./icons/ArroRight";
import { useState } from "react";

type ContextImage = {
  filename: string;
  alt?: string;
  id: number;
  title?: string;
}

type ContextImageCarrouselProps = {
  imageUrl: string;
  alt?: string;
  imagesArr: ContextImage[];
}

export default function ContextImagesCarrousel({ imageUrl, alt, imagesArr }: ContextImageCarrouselProps) {

  const found = imagesArr.findIndex(img => img.filename === imageUrl);
  const initialIndex = found >= 0 ? found : 0;
  const [index, setIndex] = useState(initialIndex);

  if (!imagesArr || imagesArr.length === 0) return null;

  function handleRight() {
    setIndex(prev => (prev + 1) % imagesArr.length);
  }

  function handleLeft() {
    index !== 0 
      ? setIndex(prev => (prev - 1) % imagesArr.length) 
      : setIndex(imagesArr.length - 1)
    }

  return (

      <div
        className="relative flex justify-around w-full h-full flex items-center justify-center p-4 z-30 cursor-pointer"
      >
        <ArrowLeft className="w-8 text-white" onClick={()=> handleLeft()}/>
        <Image
          src={imagesArr[index].filename}
          alt={alt ?? ""}
          width={1200}
          height={1200}
          className="max-h-full max-w-full object-contain rounded-lg"
        />
        <ArrowRight className="w-8 text-white" onClick={()=> handleRight()}/>
      </div>
  );
}