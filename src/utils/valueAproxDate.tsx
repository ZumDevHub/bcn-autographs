export default function valueAproxDate(aproxDate:string) {
   // Extraemos el año
  const year = aproxDate.match(/\d{4}/)?.[0];
  if (!year) return null;

  // Extraemos el mes (si existe)
  const monthMatch = aproxDate.match(
    /\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/i
  )?.[0];

  // Tabla para convertir mes -> número (0 = enero en JS)
  const monthMap: Record<string, number> = {
    January: 0, February: 1, March: 2, April: 3,
    May: 4, June: 5, July: 6, August: 7,
    September: 8, October: 9, November: 10, December: 11,
  };

  let month = 0; // por defecto enero
  if (monthMatch) {
    const found = Object.keys(monthMap).find(m => 
      m.toLowerCase() === monthMatch.toLowerCase()
    );
    if (found) month = monthMap[found];
  }

  // Construimos la fecha
  const date = new Date(Number(year), month, 1, 0, 0, 0);

  return date.getTime();

}