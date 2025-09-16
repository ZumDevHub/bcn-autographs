import Link from "next/link";
import { notFound } from "next/navigation";
import formatDate from "@/utils/formatDate";
import { getStoryblokApi } from "@/utils/storyblok";
import { render } from "storyblok-rich-text-react-renderer";
import ContextInfo from "@/app/components/ContextInfo";
import { ContextBlok } from "@/app/types/storyblok";
import ContextMainImage from "@/app/components/ContextMainImage";
import Image from "next/image";
import RelatedAutographsList from "@/app/components/RelatedAutographs";

export const dynamic = "force-dynamic";

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

async function getAutographById(idFromUrl: string, locale:string) {
  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get("cdn/stories", {
    version: "draft",
    starts_with: "autographs/",
    filter_query: { Id: { in: idFromUrl } },
    language: locale,
  });
  return data.stories?.[0] ?? null;
}

 async function getAllAutographs(locale: string) {
    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.get("cdn/stories", {
      version: "draft",
      starts_with: "autographs/",
      language: locale,
      per_page: 100,
    });
      return data.stories.map((s: any) => ({
      ...s.content,   // todos los campos de la story (tu modelo Autograph)
      uuid: s.uuid,   // uuid único de la story
      storyId: s.id,  // id numérico de la story (opcional)
      slug: s.slug,   // slug de la story (opcional, puede servir para links)
    }));
  }

function fixRelAutographs(relAutographs:string[], autographList:Autograph[]) {
  let idsArr: Autograph[] = []

  if(relAutographs === undefined) {
    idsArr = []
  }
  else {
    for(let x = 0; x < relAutographs.length; x++) {
      for(let y = 0; y < autographList.length; y++){
       if(autographList[y].uuid === relAutographs[x]) {
        idsArr.push(autographList[y])
       }
      }
    }
  }
  return idsArr;
}

type SearchParams = { [key: string]: string | string[] | undefined };

export default async function AutographPage({
  params,
  searchParams,
}: {
  params: { slug: string; locale: string };
  searchParams: SearchParams;
}) {

  const { slug, locale } = await params;
  const sp = await searchParams;

  const story = await getAutographById(slug, locale);
  if (!story) notFound();

  const aut = story.content;

  const query = new URLSearchParams(
    Object.entries(sp).reduce((acc, [key, value]) => {
      if (typeof value === "string") acc[key] = value;
      if (Array.isArray(value)) acc[key] = value.join(",");
      return acc;
    }, {} as Record<string, string>)
  ).toString();

  const allAutographs = await getAllAutographs(locale);
  const relatedAutographs = fixRelAutographs(aut.relatedAutographs, allAutographs);

  return (
    <main className="w-full mx-auto p-6 bg-gray-100">
      <div>
        <Link
          href={query ? `/${locale}?${query}` : `/${locale}`}
          className="inline-block px-4 py-2 rounded-md mb-2 text-sm hover:bg-gray-200"
        >
         {locale == 'en-gb' ? `← Home` : `← Inici`} 
        </Link>
      </div>

      <div className="flex justify-between">
        <div className="flex flex-col items-center mt-6 sm:flex-row sm:items-start bg-gray-100 ">
          {aut.photo?.filename && (
            <div className="relative">
              <ContextMainImage 
                src={aut.photo.filename} 
                alt={aut.signerName} 
              />
            </div>
          )}
          <div className="flex flex-col text-gray-800 sm:ml-5">
            <h1 className="mt-4 text-2xl font-bold">{aut.signerName}</h1>
            <p className="text-gray-600">
              ({aut.birthYear} – {aut.deathYear})
            </p>
            <p className="text-md">
              {locale == 'en-gb' 
                ? `${aut.nationality} ${aut.occupation}.` 
                : `${aut.occupation} ${aut.nationality}.`}
            </p>
            <p className="text-md mt-2">
              {locale == 'en-gb' ? `Autograph date:`+" " : `Data de l'autògraf:`+" "} 
              <span className="font-semibold">
                {aut.exactDate !== ""
                  ? formatDate(aut.exactDate, "exact")
                  : formatDate(aut.aproxDate, "aprox")}
              </span>
            </p>
            <div className="prose prose-sm mt-6 w-full sm:max-w-2/3">
              {render(aut.content)}
            </div>
          </div>
        </div>
        {relatedAutographs.length > 0 ?
        <div className="w-2/10 mt-5">
          <RelatedAutographsList 
            relatedAutographs = {relatedAutographs}
            locale = {locale}
          />
        </div>
          :
          null
        }
      </div>

      {aut.context && aut.context.length > 0 && (
        <div className="mt-12 justify-center">
          {aut.context.map((blok: ContextBlok) => (
            <ContextInfo 
              blok={blok} 
              key={blok._uid} />
          ))}
        </div>
      )}
    </main>
  );
}