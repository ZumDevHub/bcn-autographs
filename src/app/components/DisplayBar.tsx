'use client'

import DisplayBarSortList from "./DisplayBarSortList"
import { Dispatch, SetStateAction } from "react";
import ListGridButtons from "./ListGridButtons";
import type { Locale } from "@/lib/i18n";
import { SortKey } from "../types/sortKeys";

type DisplayBarProps = {
  sortBy: SortKey;
  setSortBy: Dispatch<SetStateAction<SortKey>>;
  setDisplay: Dispatch<SetStateAction<string>>;
  display: string;
  // sortAlternatives: string[];
  locale: Locale;
};

export default function DisplayBar({sortBy, setSortBy, setDisplay, display, locale}:DisplayBarProps) {

  return (
    <div className="fixed top-15 right-0 w-full flex items-center bg-opacity-0 pb-2 pl-5 pr-5 sm:w-3/4">
      <div className="flex items-center justify-between h-full w-full bg-gray-300 p-1 rounded-md shadow-md shadow-gray-500/50">
     
        <DisplayBarSortList 
          sortBy = {sortBy}
          setSortBy = {setSortBy}
          locale = {locale}
        />
        <div className="relative flex justify-center bg-gray-300">
          <ListGridButtons 
            setDisplay = {setDisplay}
          />

        </div>
      </div>
    </div>
  )
}