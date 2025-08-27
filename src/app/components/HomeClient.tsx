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

type Autograph = {
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
};

export default function HomeClient({ data }: any) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const hydratedFromUrl = useRef(false);

  // Estados iniciales leídos de la URL
  const [sortBy, setSortBy] = useState<string>(searchParams.get("sort") || "Name Asc");
  const [checkedCategories, setCheckedCategories] = useState<string[]>(searchParams.get("categories")?.split(",") || []);
  const [checkedYears, setCheckedYears] = useState<number[]>(searchParams.get("years")?.split(",").map(Number) || []);
  const [display, setDisplay] = useState(searchParams.get("display") || "list");
  const [searchedName,setSearchedName] = useState(searchParams.get("searched") || "");

  const [autographsList, setAutographsList] = useState<Autograph[]>([]);
  const [recordsDisplayed, setRecordsDisplayed] = useState<number>(autographsList.length);
  const [years, setYears] = useState<number[]>([]);

  const categories = ["music", "literature", "theatre", "painting", "science", "chess", "politics", "unusual"];
  const sortOptions = ["Name Asc", "Name Desc", "Date Asc", "Date Desc"];
  const sortAlternatives = sortOptions.filter(opt => opt !== sortBy);

  // Normalizamos datos de Storyblok
  useEffect(() => {
    if (!data) return;
    const normalized: Autograph[] = data.map((item: any) => ({
      ...item.content,
      exactDate: item.content.exactDate ?? "",
      storyName: item.name,
    }));
    setAutographsList(normalized);
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
  const sortedList = useMemo(() => {
    let list = [...autographsList];
    if (checkedCategories.length > 0) list = list.filter((aut) => checkedCategories.includes(aut.category));
    if (checkedYears.length > 0) {
      list = list.filter((aut) => {
        const year = aut.exactDate ? Number(extreuAny(aut.exactDate, "exactDate")) : Number(extreuAny(aut.aproxDate, "aproxDate"));
        return year !== null && checkedYears.includes(year);
      });
    }
    switch (sortBy) {
      case "Name Asc": list.sort((a, b) => (a.signerName ?? "").localeCompare(b.signerName ?? "")); break;
      case "Name Desc": list.sort((a, b) => (b.signerName ?? "").localeCompare(a.signerName ?? "")); break;
      case "Date Asc": list.sort((a, b) => (a.exactDate ? new Date(a.exactDate).getTime() : valueAproxDate(a.aproxDate) ?? 0) - (b.exactDate ? new Date(b.exactDate).getTime() : valueAproxDate(b.aproxDate) ?? 0)); break;
      case "Date Desc": list.sort((a, b) => (b.exactDate ? new Date(b.exactDate).getTime() : valueAproxDate(b.aproxDate) ?? 0) - (a.exactDate ? new Date(a.exactDate).getTime() : valueAproxDate(a.aproxDate) ?? 0)); break;
    }

    if (searchedName.length >= 3) {
      const regex = new RegExp(searchedName, "i"); // "i" = case insensitive
      list = list.filter((name) => regex.test(name.signerName));
    }

    setRecordsDisplayed(list.length);

    return list;
  }, [checkedCategories, checkedYears, autographsList, sortBy, searchedName]);

  function toggleCategory(cat: string) {
    setCheckedCategories(checkedCategories.includes(cat) ? checkedCategories.filter(c => c !== cat) : [...checkedCategories, cat]);
  }

  function toggleYear(year: number) {
    setCheckedYears(checkedYears.includes(year) ? checkedYears.filter(y => y !== year) : [...checkedYears, year]);
  }

  return (
    <div className="grid grid-cols-[1.5fr_4.5fr]">
      <div className="flex flex-col bg-gray-200 pt-5 p-2">
        <div className="fixed w-1/3">
         <DisplayBarSearchForm 
          setSearchedName = {setSearchedName}
        />
          <Categories categories={categories} toggleCategory={toggleCategory} checkedCategories={checkedCategories} />
          <Years years={years} toggleYear={toggleYear} checkedYears={checkedYears} />
        </div>
      </div>
      <div className="flex flex-col">
        <DisplayBar 
          sortBy={sortBy} 
          setSortBy={setSortBy} 
          sortAlternatives={sortAlternatives} 
          setDisplay={setDisplay} 
          display={display} 
        />
        <AutographsList 
          autographsList={sortedList} 
          display={display} 
          recordsDisplayed={recordsDisplayed} 
        />
      </div>
    </div>
  );
}