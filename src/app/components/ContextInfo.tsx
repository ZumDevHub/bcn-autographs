import { render } from "storyblok-rich-text-react-renderer";
import Image from "next/image";
import ExpandButton from "./ExpandButton";


interface ContextInfoProps {
  blok: {
    contextInfo?: any;
    contextImages?: Array<{
      filename: string;
      alt: string;
      id: number;
      title?: string;
    }>;
  };
}

export default function ContextInfo({ blok }: ContextInfoProps) {

  return (
    <section className="grid grid-cols-[3.5fr_2.5fr]">
      {/* Rich Text */}

      {blok.contextInfo && (
        <div className="prose prose-sm text-gray-800">
          {render(blok.contextInfo)}
        </div>
      )}

      {/* Imágenes relacionadas */}
      {Array.isArray(blok.contextImages) && blok.contextImages.length > 0 && (
        <div className="relative flex flex-col bg-white pl-8">
          {blok.contextImages.map((img) => (
            <figure key={img.id} className="mb-8">
              <div className="relative">
                <Image
                  src={img.filename}
                  alt={img.alt || ""}
                  width={600}
                  height={400}
                  className="object-cover w-7/10 cursor-pointer"
                  style={{ objectFit: "contain" }}
                />
                <ExpandButton 
                  imageUrl = {img.filename}
                  alt = {img.alt || ""}
                  xAxis = "left-2"
                  imagesArr = {blok.contextImages}
                />
              </div>
              {img.title && (
                <figcaption className="text-sm text-gray-600 pt-3 max-w-7/10">
                  {img.title}
                </figcaption>
              )}
            </figure>
          ))}

        </div>
      )}
    </section>
  );
}