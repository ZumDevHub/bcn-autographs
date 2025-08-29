'use client'

import Image from "next/image"
import ContextImagesCarrousel from "./ContextImagesCarrousel"
import { useState } from "react"

type ContextMainImageProps = {
  src: string;
  alt: string;
}


export default function ContextMainImage({src, alt}:ContextMainImageProps) {

  const [open, setOpen] = useState(false)

  return (
    <>
      <Image
        src={src}
        width={400}
        height={400}
        alt={alt}
        style={{ objectFit: "contain" }}
        className="cursor-zoom-in"
        onClick={() => setOpen(true)}
      />
            {/* Modal a pantalla completa */}
            {open === true &&
              <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-30">
                <button
                  className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-gray-300 cursor-pointer z-40"
                  onClick={() => setOpen(false)}
                >
                  ×
                </button>
                  <Image
                    src={src}
                    alt={alt}
                    width={1200}
                    height={1200}
                    className="max-h-full max-w-full object-contain rounded-lg"
                  />
              </div>
            }
    </>
  )
}