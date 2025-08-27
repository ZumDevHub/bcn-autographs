'use client'

import Image from "next/image"
import { useState, useEffect } from "react"

type ContextImageCarrouselProps = {
  imageUrl: string;
  alt: string;
  imagesArr:  {filename: string; alt: string; id: number; title?: string | undefined; }[] | undefined;
}

export default function ContextImagesCarrousel({imageUrl, alt, imagesArr}:ContextImageCarrouselProps){
  console.log("ContextImagesCarrousel");
  console.log("imagesArr: ", imagesArr);
  
  if (!imagesArr || imagesArr.length === 0) return null;
  
  const [index, setIndex] = useState(imagesArr?.findIndex((img) => img.filename == imageUrl))

  function handleCarrousel() {
    index + 1 !== imagesArr?.length 
    ? setIndex(index + 1) 
    : setIndex(0);
  }
  console.log("index: ", index);
  console.log("imagesArr[0].filename: ", imagesArr[0].filename);
  return (
    
    <div 
      className="relative w-full h-full flex items-center justify-center p-4 z-30 cursor-pointer" 
      onClick={() => handleCarrousel()}
    >
      
      <Image
        src={imagesArr[index].filename === undefined 
          ? imageUrl 
          : imagesArr[index].filename
        }
        alt={alt}
        width={1200}
        height={1200}
        className="max-h-full max-w-full object-contain rounded-lg"
      />
    </div>
  )
}