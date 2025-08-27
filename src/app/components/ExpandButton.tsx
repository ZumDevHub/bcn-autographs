'use client'

import { ExpandIcon } from "./ExpandIcon"
import Image from "next/image";
import { useEffect, useState } from "react"
import ContextImagesCarrousel from "./ContextImagesCarrousel";

type ExpandButtonProps= {
  imageUrl: string;
  alt: string;
  xAxis: string;
  imagesArr:  {filename: string; alt: string; id: number; title?: string | undefined; }[] | undefined;
}

export default function ExpandButton({imageUrl, alt, xAxis, imagesArr}:ExpandButtonProps) {

  const [open, setOpen] = useState(false);

  return (
    <>
    <div 
      className={`absolute top-2 ${xAxis} border border-white rounded-xs hover:border-black cursor-pointer`}
      onClick={() => setOpen(true)}  
    >
      <ExpandIcon 
        className="w-6 h-6 text-white hover:text-black"
      />
    </div>
    {console.log("ExpandButton imageUrl: ", imageUrl)}
      {/* Modal a pantalla completa */}
      {open && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-30">
          {/* Botón de cerrar */}
          <button
            className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-gray-300 cursor-pointer z-40"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
          
          {imagesArr !== undefined
            ?
            <ContextImagesCarrousel 
              imageUrl = {imageUrl}
              alt = {alt}
              imagesArr = {imagesArr}
            />
            :
            <Image
              src={imageUrl}
              alt={alt}
              width={1200}
              height={1200}
              className="max-h-full max-w-full object-contain rounded-lg"
            />
          }
            
        </div>
      )}

    </>
  )
}