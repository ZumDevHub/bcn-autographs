import ListElement from "./ListElement";

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
};

export default function AutographsList({ autographsList, display, recordsDisplayed }: AutographsListProps) {

  return (
    <main className="w-full flex flex-col bg-gray-200">
      <div className="flex text-sm pl-5 pt-25">
        Records displayed: {recordsDisplayed}
      </div>
      <div className={display === "list" ? "flex flex-col bg-gray-200 p-5" : "flex flex-wrap bg-gray-200 p-5"}>
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
