import { Dispatch, SetStateAction } from "react"


type ListGridButtonsProps = {
  display: string;
  setDisplay: Dispatch<SetStateAction<string>>;
}

export default function ListGridButtons({display, setDisplay}:ListGridButtonsProps) {
  return(
    <>
      <div className="h-1/2 bg-white text-sm text-gray-500 leading-none border-1 border-gray-200 rounded-full inline-flex text-sm">
        <button 
          className="inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-blue-400 focus:text-blue-400 rounded-l-full px-2 py-2 active cursor-pointer" 
          id="grid"
          onClick={() => setDisplay("grid")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="fill-current w-4 h-4 mr-2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
          <span>Grid</span>
        </button>
        <button 
          className="inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-blue-400 focus:text-blue-400 rounded-r-full px-2 py-2 cursor-pointer" 
          id="list"
          onClick={() => setDisplay("list")}
          >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="fill-current w-4 h-4 mr-2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
          <span>List</span>
        </button>
      </div>
    <style>
  </style>
    </>

  )
}

