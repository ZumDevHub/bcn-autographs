'use client'

import { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import { SortKey } from "../types/sortKeys";

const t = {
  "en-gb": {
    "Name Asc": "Name Asc",
    "Name Desc": "Name Desc",
    "Date Asc": "Date Asc",
    "Date Desc": "Date Desc",
  },
  "ca": {
    "Name Asc": "Nom Asc",
    "Name Desc": "Nom Desc",
    "Date Asc": "Data Asc",
    "Date Desc": "Data Desc",
  }
}

type DisplayBarSortListProps = {
	sortBy: SortKey;
  setSortBy: Dispatch<SetStateAction<SortKey>>;
  locale: Locale;
}

export default function DisplayBarSortList({sortBy, setSortBy, locale}:DisplayBarSortListProps) {

const [sortDropMenu, setSortDropMenu] = useState<boolean>(false)

const sortOptions: SortKey[] = ["Name Asc", "Name Desc", "Date Asc", "Date Desc"];
const sortAlternatives = sortOptions.filter(opt => opt !== sortBy);

	return(
		<div className="relative w-48">
      <div className="text-sm font-semibold pb-1">Sort by</div>
      <div 
        className="relative w-full flex justify-between bg-white rounded-md border-1 border-gray-300 p-1 text-sm cursor-pointer"
        onClick={()=> setSortDropMenu(!sortDropMenu)}  
      >
        <span>{t[locale][sortBy]}</span>
        <span className="ml-2">▼</span> 
        {sortDropMenu && (
          <div className="absolute flex flex-col top-full left-0 w-full rounded-md bg-white border-1 border-gray-300 p-1 text-sm cursor-pointer shadow-xl shadow-gray-400">
            <div onClick={() => setSortBy(sortAlternatives[0])} className="hover:bg-gray-200">
              {t[locale][sortAlternatives[0]]}
            </div>
            <div onClick={() => setSortBy(sortAlternatives[1])} className="hover:bg-gray-200">
              {t[locale][sortAlternatives[1]]}
            </div>
            <div onClick={() => setSortBy(sortAlternatives[2])} className="hover:bg-gray-200">
              {t[locale][sortAlternatives[2]]}
            </div>
          </div>
        )}
      </div>
    </div>
	)
}