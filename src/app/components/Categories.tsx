import type { Locale } from "@/lib/i18n"

type CategoryKey =
  | "music"
  | "literature"
  | "theatre"
  | "science"
  | "chess"
  | "politics"
  | "unusual";

type CategoriesProps = {
  locale: Locale;
  categories: CategoryKey[];
  toggleCategory: (cat: string) => void;
  checkedCategories: string[];
}

const t = {
  "en-gb": {
    "music": "music",
    "literature": "literature",
    "theatre": "theatre",
    "science": "science",
    "chess": "chess",
    "politics": "politics",
    "unusual": "inusual"
  },
  "ca": {
    "music": "Música",
    "literature": "Literatura",
    "theatre": "Teatre",
    "science": "Ciència",
    "chess": "Escacs",
    "politics": "Poítica",
    "unusual": "Inusual"
  }
}


export default function Categories({locale, categories, toggleCategory, checkedCategories}:CategoriesProps) {
  return (
    <div>
      <div className="flex items-center w-2/3 pl-1 pt-2 pb-1 text-sm font-medium text-white bg-gray-900 rounded-t-sm">
        Categories
      </div>
      <div className="flex flex-col h-auto w-2/3 pl-1 pt-2 pb-1 text-sm font-light text-black bg-white">
        {categories.map((cat) => {
          return(
            <label key={cat} className="cursor-pointer hover:bg-gray-100">
              <input
                type="checkbox"
                name={cat}
                value={cat}
                checked={checkedCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="ml-1 mr-1 cursor-pointer"
              />
              {t[locale][cat]}
            </label>
          )
        })}

      </div>
    </div>
  )
}