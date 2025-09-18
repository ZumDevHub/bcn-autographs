'use client'

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useState, useEffect, useMemo, useRef } from "react";
import extreuAny from "@/utils/extreuAny";
import DisplayBar from "./DisplayBar";
import DisplayBarSearchForm from "./DisplayBarSearchForm";
import AutographsList from "./AutographsList";
import Categories from "./Categories";
import Years from "./Years";
import valueAproxDate from "@/utils/valueAproxDate";
import { type Locale } from "@/lib/i18n";
import { CategoryKey } from "../types/categoryKeys";
import { SortKey } from "../types/sortKeys";

// Tipo final usado en la UI
export interface Autograph {
  Id: string;
  signerName: string;
  nationality: string;
  aproxDate: string;
  exactDate: string;
  birthYear: string;
  deathYear: string;
  category: string;
  occupation: string;
  collectionName: string;
  photo?: { filename: string };
  storyName: string;
  relatedAutographs: string[];
  _uid:string;
}

// Tipo crudo que viene de Storyblok
interface StoryblokStory {
  name: string;
  content: Omit<Autograph, "storyName">;
}

interface HomeClientProps {
  data: StoryblokStory[];
  locale: Locale;
}

export default function HomeClient({ data, locale }: HomeClientProps) {

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const hydratedFromUrl = useRef(false);

  // Estados iniciales leídos de la URL
  const [sortBy, setSortBy] = useState<SortKey>(() => {
  const sort = searchParams.get("sort");
  if (sort === "Name Asc" || sort === "Name Desc" || sort === "Date Asc" || sort === "Date Desc") {
    return sort;
  }
  return "Name Asc";
  });
  const [checkedCategories, setCheckedCategories] = useState<string[]>(searchParams.get("categories")?.split(",") || []);
  const [checkedYears, setCheckedYears] = useState<number[]>(searchParams.get("years")?.split(",").map(Number) || []);
  const [display, setDisplay] = useState(searchParams.get("display") || "list");
  const [searchedName, setSearchedName] = useState(searchParams.get("searched") || "");

  const [autographsList, setAutographsList] = useState<Autograph[]>([]);
  const [recordsDisplayed, setRecordsDisplayed] = useState<number>(0);
  const [years, setYears] = useState<number[]>([]);

  const categories: CategoryKey[] = ["music", "literature", "theatre", "science", "chess", "politics", "unusual"];
  
  // Normalizamos datos de Storyblok
  useEffect(() => {
    if (!data) return;
    const normalized: Autograph[] = data.map((item) => ({
      ...item.content,
      exactDate: item.content.exactDate ?? "",
      storyName: item.name,
    }));
    setAutographsList(normalized);
    setRecordsDisplayed(normalized.length);
  }, [data]);

  // Extraemos años únicos
  useEffect(() => {
    const yearsEntry = autographsList
      .map((aut: Autograph) => {
        if (aut.exactDate) return extreuAny(aut.exactDate, "exactDate");
        if (aut.aproxDate) return extreuAny(aut.aproxDate, "aproxDate");
        return null;
      })
      .filter((num): num is number => num !== null)
      .filter((num, i, arr) => arr.indexOf(num) === i)
      .sort((a, b) => a - b);

    setYears(yearsEntry);
  }, [autographsList]);

  // Marcar que ya leímos parámetros de la URL para evitar bucle
  useEffect(() => {
    hydratedFromUrl.current = true;
  }, []);

  // Sincronizar filtros con URL (solo si cambia)
  useEffect(() => {
    if (!hydratedFromUrl.current) return;

    const params = new URLSearchParams();
    if (checkedCategories.length) params.set("categories", checkedCategories.join(","));
    if (checkedYears.length) params.set("years", checkedYears.join(","));
    if (sortBy !== "Name Asc") params.set("sort", sortBy);
    if (display !== "list") params.set("display", display);

    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    const currentUrl = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname;

    if (newUrl !== currentUrl) router.replace(newUrl, { scroll: false });
  }, [checkedCategories, checkedYears, sortBy, display, pathname, router, searchParams]);

  // Ordenar y filtrar
  const sortedList = useMemo<Autograph[]>(() => {
    let list = [...autographsList];

    if (checkedCategories.length > 0) {
      list = list.filter((aut) => checkedCategories.includes(aut.category));
    }

    if (checkedYears.length > 0) {
      list = list.filter((aut) => {
        const year = aut.exactDate
          ? Number(extreuAny(aut.exactDate, "exactDate"))
          : aut.aproxDate
          ? Number(extreuAny(aut.aproxDate, "aproxDate"))
          : null;
        return year !== null && checkedYears.includes(year);
      });
    }

    switch (sortBy) {
      case "Name Asc":
        list.sort((a, b) => (a.signerName ?? "").localeCompare(b.signerName ?? ""));
        break;
      case "Name Desc":
        list.sort((a, b) => (b.signerName ?? "").localeCompare(a.signerName ?? ""));
        break;
      case "Date Asc":
        list.sort(
          (a, b) =>
            (a.exactDate ? new Date(a.exactDate).getTime() : valueAproxDate(a.aproxDate) ?? 0) -
            (b.exactDate ? new Date(b.exactDate).getTime() : valueAproxDate(b.aproxDate) ?? 0)
        );
        break;
      case "Date Desc":
        list.sort(
          (a, b) =>
            (b.exactDate ? new Date(b.exactDate).getTime() : valueAproxDate(b.aproxDate) ?? 0) -
            (a.exactDate ? new Date(a.exactDate).getTime() : valueAproxDate(a.aproxDate) ?? 0)
        );
        break;
    }

    if (searchedName.length >= 3) {
      const regex = new RegExp(searchedName, "i");
      list = list.filter((aut) => regex.test(aut.signerName));
    }

    setRecordsDisplayed(list.length);

    return list;
  }, [checkedCategories, checkedYears, autographsList, sortBy, searchedName]);

  function toggleCategory(cat: string) {
    setCheckedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  }

  function toggleYear(year: number) {
    setCheckedYears((prev) => (prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]));
  }

  return (
    <div className="relative flex pt-10 bg-gray-200 sm:grid sm:grid-cols-[1.5fr_4.5fr]">
      <div className="hidden pt-5 p-2 sm:flex sm:flex-col ">
        <div className="fixed w-1/3">
          <DisplayBarSearchForm setSearchedName={setSearchedName} />
          <Categories locale={locale} categories={categories} toggleCategory={toggleCategory} checkedCategories={checkedCategories} />
          {/* <hr className="border-gray-300 my-5 w-1/3" /> */}
          <div className="my-5"></div>
          <Years years={years} toggleYear={toggleYear} checkedYears={checkedYears} />
        </div>
      </div>
      <div className="w-full flex flex-col">
        <DisplayBar
          sortBy={sortBy}
          setSortBy={setSortBy}
          setDisplay={setDisplay}
          display={display}
          locale = {locale}
        />
        <AutographsList 
          autographsList={sortedList} 
          display={display} 
          recordsDisplayed={recordsDisplayed} 
          locale= {locale}
        />
      </div>
    </div>
  );
}
