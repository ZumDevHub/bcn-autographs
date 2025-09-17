import NavBarLangMenu from "./NavBarLangMenu"
import { type Locale } from "@/lib/i18n"


export default function NavBar({locale}: {locale: Locale}) {

  return (
    <header className="flex justify-end fixed bg-gray-400 w-full h-10 z-20 py-2 pr-10">
      <NavBarLangMenu 
          locale={locale}
      />
    </header>
  )
}