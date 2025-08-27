import { Dispatch } from "react";

type DisplayBarSearchFormProps = {
  setSearchedName: Dispatch<string>;
}

export default function DisplayBarSearchForm({setSearchedName}:DisplayBarSearchFormProps) {
  
  function handleInputSearch(event:any) {
    setSearchedName(event)
  }
  
  return (
    <div className="mt-8 mb-5 w-2/3">
       {/* <div className="flex items-center w-full pl-1 pt-2 pb-1 text-sm font-medium text-white bg-gray-900 rounded-t-sm">
        Search
      </div> */}
       <form action="" method="get" className="">
      <div className="flex flex-col">
        {/* <label htmlFor="name" className="text-sm font-semibold pb-1">Search by name </label> */}
        <input 
          className="bg-white border-1 border-gray-200 p-1 text-sm rounded-sm" 
          type="text" 
          name="name" 
          id="name" 
          placeholder="Search by name"
          onChange={(e) => handleInputSearch(e.target.value)}
        />
      </div>
    </form>
    </div>
   
  )
}