'use client'

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function NavBarLangMenu({locale} : {locale: string}) {

const router = useRouter();
const pathname = usePathname();

const [visibleMenu, setVisibleMenu] = useState(false);

const handleChange = (newLocale: string) => {
  // reemplazar el locale en la URL
  const segments = pathname.split("/");
  segments[1] = newLocale;
  router.push(segments.join("/"));
};

const lTrans:Record<string, string> = {
  'en-gb': 'English',
  'ca': 'Català'
}

const langs = ['en-gb', 'ca']
const restOfLangs = langs.filter((lang) => lang !== locale);

return (
  
    <div className="text-sm relative w-40 h-6 bg-white text-gray-600 rounded-xs p-1 cursor-pointer hover:bg-gray-200 hover:text-white" onClick={() => setVisibleMenu(!visibleMenu)}>
       {lTrans[locale]}
      <ul className={`${!visibleMenu ? "hidden" : "absolute block left-0 top-7 w-full h-auto rounded-sm p-1 pb-4 bg-white "}`}> 
        {restOfLangs.map((lang, i) => 
          <li className="text-gray-600 px-2 hover:bg-gray-300 hover:text-white" key={i} onClick={() => handleChange(lang)}>
            {lTrans[lang]}    
          </li>
        )}
        
      </ul>
  </div>
  )
}