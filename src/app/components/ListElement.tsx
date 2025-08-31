'use client'

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import formatDate from "@/utils/formatDate";
import { useParams } from "next/navigation";




type Autograph = {
  Id: string;
  signerName: string;
  nationality: string;
  aproxDate: string;
  exactDate: string;
  birthYear: string;
  deathYear: string;
  category: string;
  occupation: string;
  collectionName: string;
  photo?: { filename: string };
  storyName: string;
};

type ListElementProps = {
  story: Autograph;
  display: string;
};

export default function ListElement({ story, display }: ListElementProps) {
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const params = useParams(); // <- de next/navigation
  const locale = params?.locale ?? "en-gb"; // fallback al default
  const href = `/${locale}/autographs/${story.Id}${query ? `?${query}` : ""}`;


  return (
    <Link href={href} prefetch={false}>
      <div
        className={
          display === "list"
            ? "mb-5 bg-white rounded-md p-2 hover:bg-gray-100 cursor-pointer"
            : "w-xs mb-5 bg-white rounded-md p-2 mr-2 hover:bg-gray-100 cursor-pointer"
        }
      >
        <div className="flex p-2">
          {story.photo?.filename && (
            <Image
              src={story.photo.filename}
              width={100}
              height={100}
              alt={story.signerName}
              style={{ objectFit: "contain" }}
              priority
            />
          )}
          <div className="flex flex-col pl-2 text-gray-800">
            <div>
              <span className={display == "list" ? `text-base font-semibold` : `text-sm font-semibold`}>
                {story.signerName}{" "}
              </span>
              <span className={display == "list" ? `text-sm` : `text-xs`}>
                ({story.birthYear} - {story.deathYear})
              </span>
            </div>
            <div className={display == "list" ? `text-sm` : `text-xs`}>
              {story.nationality} {story.occupation}.
            </div>
            <div className={display == "list" ? `text-sm` : `text-xs`}>
              Autograph date:
              <span className="font-semibold">
                {story.exactDate !== ""
                  ? ` ${formatDate(story.exactDate, "exact")}`
                  : ` ${formatDate(story.aproxDate, "aprox")}`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
