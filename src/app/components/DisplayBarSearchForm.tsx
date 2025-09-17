import { Dispatch } from "react";

type DisplayBarSearchFormProps = {
  setSearchedName: Dispatch<string>;
}

export default function DisplayBarSearchForm({setSearchedName}:DisplayBarSearchFormProps) {
  
  function handleInputSearch(event:string) {
    setSearchedName(event)
  }
  
  return (
    <div className="mt-8 mb-5 w-2/3">
       <form action="" method="get" className="">
      <div className="flex flex-col">
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