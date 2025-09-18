'use client'

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type Locale } from "@/lib/i18n";


export default function NavBarLangMenu({locale} : {locale: Locale}) {

const router = useRouter();
const pathname = usePathname();
const searchParams = useSearchParams();

// const fullPath = `${pathname}?${searchParams.toString()}`;

const [visibleMenu, setVisibleMenu] = useState(false);

const handleChange = (newLocale: string) => {
  const segments = pathname.split("/");
  segments[1] = newLocale;
  const newPath = segments.join("/");
  const query = searchParams.toString();
  router.push(query ? `${newPath}?${query}` : newPath);
};

const lTrans:Record<string, string> = {
  'en-gb': 'English',
  'ca': 'Català'
}

const langs = ['en-gb', 'ca']
const restOfLangs = langs.filter((lang) => lang !== locale);

return (
  
    <div className="group relative flex justify-between w-25 h-6 bg-white text-sm text-gray-600 rounded-xs p-1 cursor-pointer" onClick={() => setVisibleMenu(!visibleMenu)}>
       <span>{lTrans[locale]}</span>
        <span className="pl-2 group-hover:text-gray-200 transition-colors duration-100 ease-in-out">▼</span> 
          <ul className={`${!visibleMenu ? "hidden" : "absolute block left-0 top-6 w-full h-auto rounded-xs pt-2 pb-2 bg-white "}`}> 
            {restOfLangs.map((lang, i) => 
              <li className="px-2 hover:bg-gray-300 hover:text-white" key={i} onClick={() => handleChange(lang)}>
                {lTrans[lang]}    
              </li>
            )}
          </ul>
    </div>
  )
}