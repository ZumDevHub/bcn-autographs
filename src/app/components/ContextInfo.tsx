'use client'

import { render } from "storyblok-rich-text-react-renderer";
import Image from "next/image";
import { ContextBlok } from "../types/storyblok";
import ContextImagesCarrousel from "./ContextImagesCarrousel";
import { useState, useMemo } from "react";
import { ExpandIcon } from "./ExpandIcon";
import React from "react";

type ContextImage = {
  filename: string;
  alt?: string;
  id: number;
  title?: string;
};

interface ContextInfoProps {
  blok: ContextBlok;
}

export default function ContextInfo({ blok }: ContextInfoProps) {
  const [selectedImage, setSelectedImage] = useState<null | { filename: string; alt?: string }>(null);

  // Normalizamos: siempre un array, aunque venga undefined
  const images: ContextImage[] = useMemo(
    () => (Array.isArray(blok.contextImages) ? blok.contextImages : []),
    [blok.contextImages]
  );

  const hasImages = images.length > 0;

  return (
    <section className="grid grid-cols-[3.5fr_2.5fr]">
      {/* Rich Text */}
      {blok.contextInfo && (
        <div className="prose prose-sm text-gray-800 pr-10">
          {render(blok.contextInfo)}
        </div>
      )}

      {/* Imágenes relacionadas */}
      {hasImages && (
        <div className="relative flex flex-col items-start bg-gray-200 pl-8 py-8 rounded-md">
         {images.map((img, index) => (
          <React.Fragment key={img.id}>
            <figure>
              <div className="group relative flex justify-start w-7/10">
                <Image
                  src={img.filename}
                  alt={img.alt || ""}
                  width={600}
                  height={400}
                  className="w-7/10 max-h-70 cursor-pointer hover:outline hover:outline-1 hover:outline-black"
                  style={{ objectFit: "contain" }}
                  onClick={() => setSelectedImage({ filename: img.filename, alt: img.alt })}
                />
                <ExpandIcon
                  className="absolute top-2 left-2 w-6 h-6 text-white hidden group-hover:block transition-colors duration-200"
                />
              </div>

              {img.title && (
                <figcaption className="text-sm text-gray-600 pt-3 max-w-7/10">
                  {img.title}
                </figcaption>
              )}
            </figure>

            {/* 👉 Línea separadora (excepto después del último) */}
            {index < images.length - 1 && (
              <div className="h-px w-7/10 bg-gray-300 my-8" />
            )}
          </React.Fragment>
        ))}
        </div>
      )}

      {/* Modal a pantalla completa */}
      {selectedImage && hasImages && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-30">
          <button
            className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-gray-300 cursor-pointer z-40"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>

          <ContextImagesCarrousel
            imageUrl={selectedImage.filename}
            alt={selectedImage.alt ?? ""}
            imagesArr={images}
          />
        </div>
      )}
    </section>
  );
}
