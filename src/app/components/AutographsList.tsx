import ListElement from "./ListElement";
import type { Locale } from "@/lib/i18n";

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
  _uid:string;
};

type AutographsListProps = {
  autographsList: Autograph[];
  display: string;
  recordsDisplayed: number;
  locale: Locale;
};

export default function AutographsList({ autographsList, display, recordsDisplayed, locale }: AutographsListProps) {

  const t = {
    "en-gb": 'Records displayed: ',
    "ca": 'Número de registres: '
  }

  return (
    <main className="w-full min-h-screen flex flex-col bg-gray-200">
      <div className="flex text-sm pl-5 pt-25">
        {t[locale]}: {recordsDisplayed}
      </div>
      <div className={display === "list" ? "flex flex-col bg-gray-200 p-5" : "flex flex-wrap justify-between bg-gray-200 p-5"}>
        {autographsList.map((story) => (
          <ListElement
            key={story.Id}
            story={story}
            display={display}
          />
        ))}
      </div>
    </main>
  );
}
