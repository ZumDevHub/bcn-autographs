import Link from "next/link";
import { notFound } from "next/navigation";
import formatDate from "@/utils/formatDate";
import { getStoryblokApi } from "@/utils/storyblok";
import { render, StoryblokRichtext } from "storyblok-rich-text-react-renderer";
import ContextInfo from "@/app/components/ContextInfo";
import { ContextBlok } from "@/app/types/storyblok";
import ContextMainImage from "@/app/components/ContextMainImage";

export const dynamic = "force-dynamic";

async function getAutographById(idFromUrl: string) {
  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get("cdn/stories", {
    version: "draft",
    starts_with: "autographs/",
    filter_query: { Id: { in: idFromUrl } },
  });
  return data.stories?.[0] ?? null;
}

export default async function AutographPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>; 
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const sp = await searchParams;

  const story = await getAutographById(slug);
  if (!story) notFound();

  const aut = story.content;

  // reconstruir query string de manera segura
  const query = new URLSearchParams(
    Object.entries(sp).reduce((acc, [key, value]) => {
      if (typeof value === "string") acc[key] = value;
      if (Array.isArray(value)) acc[key] = value.join(",");
      return acc;
    }, {} as Record<string, string>)
  ).toString();

  return (
    <main className="w-full mx-auto p-6 bg-gray-100">
      <div className="">
        <Link
          href={query ? `/?${query}` : `/`}
          className="inline-block px-4 py-2 rounded-md mb-2 text-sm hover:bg-gray-200"
        >
          ← Back
        </Link>
      </div>

      <div className="flex items-start gap-4 mt-6">
        {aut.photo?.filename && (
          <div className="relative">
          <ContextMainImage 
            src= {aut.photo.filename}
            alt = {aut.signerName}
          />
          </div>
        )}
        <div className="flex flex-col text-gray-800">
          <h1 className="mt-4 text-2xl font-bold">{aut.signerName}</h1>
          <p className="text-gray-600">
            ({aut.birthYear} – {aut.deathYear})
          </p>
          <p className="text-md">
            {aut.nationality} {aut.occupation}.
          </p>
          <p className="text-md mt-2">
            Autograph date:{" "}
            <span className="font-semibold">
              {aut.exactDate !== ""
                ? formatDate(aut.exactDate, "exact")
                : formatDate(aut.aproxDate, "aprox")}
            </span>
          </p>
          <div className="prose prose-sm mt-6 max-w-2/3">
            {render(aut.content)}
          </div>
        </div>
      </div>
        {aut.context && aut.context.length > 0 && (
          <div className="mt-12 space-y-10">
            {aut.context.map((blok: ContextBlok) => (
              <ContextInfo 
                blok={blok} 
                key={blok._uid} 
              />
            ))}
          </div>
        )}
    </main>
  );
}