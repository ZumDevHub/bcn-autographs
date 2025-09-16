import Image from "next/image"
import Link from "next/link"
import formatDate from "@/utils/formatDate";

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
  relatedAutographs: string[];
  uuid:string;
  _uid:string;
};

type relatedAutographsListProps = {
  relatedAutographs: Autograph[]
  locale: string
}

export default function RelatedAutographsList({relatedAutographs, locale}:relatedAutographsListProps) {

  return (
    <div className="flex flex-col pt-2 pb-10 px-3 bg-gray-200 rounded-sm">
      <div className="text-base font-semibold text-gray-800 mb-3">
        {locale == 'en-gb' ? 'Related autographs' : 'Relacionats'}
      </div>
        {relatedAutographs.map((rel) => {
          return(
            <div key={rel.uuid} className="flex mb-5">
              {rel.photo?.filename && (
              <Link href={`/${locale}/autographs/${rel.Id}`} prefetch={false}>
                <Image 
                  src={rel.photo?.filename}
                  alt={rel.signerName}
                  width={100}
                  height={100}
                  className="rounded-sm object-contain hover:scale-102"
                />
              </Link>
              )}
              <div className="flex flex-col pl-2">
                <div className="text-sm font-medium text-gray-800">
                  {rel.signerName}
                </div>
                <div className="text-xs font-medium text-gray-600">
                  {rel.exactDate == "" ? rel.aproxDate : formatDate(rel.exactDate,'exact')}
                </div>
              </div>
            </div>
            )
          })
        }          
    </div>
  )
}