'use client'

import DisplayBarSortList from "./DisplayBarSortList"
import { Dispatch, SetStateAction } from "react";
import ListGridButtons from "./ListGridButtons";

type DisplayBarProps = {
  sortBy: string;
  setSortBy: Dispatch<SetStateAction<string>>;
  setDisplay: Dispatch<SetStateAction<string>>;
  display: string;
  sortAlternatives: string[];
};

export default function DisplayBar({sortBy, setSortBy, setDisplay, display, sortAlternatives}:DisplayBarProps) {

  return (
    <div className="flex h-full items-center bg-gray-200 pt-5 pb-2 pl-5 pr-5">
      <div className="flex items-bottom justify-between h-full w-full bg-gray-300 p-1 rounded-md">
        <DisplayBarSortList 
          sortBy = {sortBy}
          setSortBy = {setSortBy}
          sortAlternatives = {sortAlternatives}
        />
        
        <div className="flex items-end justify-center h-full bg-gray-300">
          <ListGridButtons 
            display = {display}
            setDisplay = {setDisplay}
          />
        </div>
      </div>
    </div>
  )
}