'use client'

import DisplayBarSortList from "./DisplayBarSortList"
import { Dispatch, SetStateAction } from "react";
import ListGridButtons from "./ListGridButtons";
import type { Locale } from "@/lib/i18n";
import { SortKey } from "../types/sortKeys";
import { CategoryMusKeys } from "../types/categoryMusKeys";

type DisplayBarProps = {
  sortBy: SortKey;
  setSortBy: Dispatch<SetStateAction<SortKey>>;
  checkedCategories: string[];
  checkedMusCategories: string[];
  musicCategories: CategoryMusKeys[];
  toggleMusCategory: (cat: string) => void;
  setDisplay: Dispatch<SetStateAction<string>>;
  display: string;
  locale: Locale;
};

export default function DisplayBar({sortBy, setSortBy, checkedCategories, checkedMusCategories, musicCategories, toggleMusCategory, setDisplay, locale}:DisplayBarProps) {

  return (
    <div className="fixed top-15 right-0 w-full flex items-center bg-opacity-0 pb-2 pl-5 pr-5 sm:w-3/4">
      <div className="flex items-center justify-between h-full w-full bg-gray-300 p-1 rounded-md shadow-md shadow-gray-500/50">
     
        <DisplayBarSortList 
          sortBy = {sortBy}
          setSortBy = {setSortBy}
          locale = {locale}
        />
        <div>
          {
            checkedCategories.includes("music") 
            ? 
              musicCategories.map((mcat: CategoryMusKeys) => {
                return (
                  <span 
                    key={mcat} 
                    className={checkedMusCategories.includes(mcat) 
                      ? 
                      `text-xs font-thin text-amber-800 mr-2 cursor-pointer`
                      :
                      `text-xs font-thin text-gray-700 mr-2 hover:text-amber-800 cursor-pointer`
                    }
                    onClick={() => toggleMusCategory(mcat)}
                  >
                    {mcat}
                  </span>
                )
              })
            :
              null
          }
        </div>
        <div className="relative flex justify-center bg-gray-300">
          <ListGridButtons 
            setDisplay = {setDisplay}
          />

        </div>
      </div>
    </div>
  )
}