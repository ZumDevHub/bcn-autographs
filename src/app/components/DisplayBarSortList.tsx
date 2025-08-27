'use client'

import { Dispatch, SetStateAction } from "react";
import { useState } from "react";

type DisplayBarSortListProps = {
	sortBy: string;
  setSortBy: Dispatch<SetStateAction<string>>;
  sortAlternatives: string[];
}

export default function DisplayBarSortList({sortBy, setSortBy, sortAlternatives}:DisplayBarSortListProps) {

const [sortDropMenu, setSortDropMenu] = useState<Boolean>(false)

	return(
		<div className="relative w-48">
      <div className="text-sm font-semibold pb-1">Sort by</div>
      <div 
        className="relative w-full flex justify-between bg-white rounded-md border-1 border-gray-300 p-1 text-sm cursor-pointer"
        onClick={()=> setSortDropMenu(!sortDropMenu)}  
      >
        <span>{sortBy}</span>
        <span className="ml-2">▼</span> 
        {sortDropMenu && (
          <div className="absolute flex flex-col top-full left-0 w-full rounded-md bg-white border-1 border-gray-300 p-1 text-sm cursor-pointer shadow-xl shadow-gray-400">
            <div onClick={() => setSortBy(sortAlternatives[0])} className="hover:bg-gray-200">
              {sortAlternatives[0]}
            </div>
            <div onClick={() => setSortBy(sortAlternatives[1])} className="hover:bg-gray-200">
              {sortAlternatives[1]}
            </div>
            <div onClick={() => setSortBy(sortAlternatives[2])} className="hover:bg-gray-200">
              {sortAlternatives[2]}
            </div>
          </div>
        )}
      </div>
    </div>
	)
}