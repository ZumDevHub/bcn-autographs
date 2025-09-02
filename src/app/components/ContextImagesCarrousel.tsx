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

  const circleMenu:number[] = []
 

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

      <div className="relative flex justify-around w-full h-full flex items-center justify-center p-4 z-30 cursor-pointer">

        {imagesArr.length < 2 ? null : <ArrowLeft className="w-8 text-white" onClick={()=> handleLeft()}/>}
        <Image
          src={imagesArr[index].filename}
          alt={alt ?? ""}
          width={1200}
          height={1200}
          className="max-h-full max-w-full object-contain rounded-lg"
        />
        {imagesArr.length < 2 ? null : <ArrowRight className="w-8 text-white" onClick={()=> handleRight()}/>}
        {imagesArr.length > 1 &&
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-evenly items-center w-2/5 bg-gray-200/60 rounded-lg py-1">
          {imagesArr.map((img, ind:number) => {
            circleMenu.push(ind)
            return(
              <div key={img.id} onClick={()=> setIndex(ind)}>
                <div className={ind === index ? "w-4 h-4 bg-gray-600 rounded-full border-2" : "w-3 h-3 bg-gray-600 rounded-full"}></div>
              </div>
            )
          })}
        </div>}
      </div>
  );
}