
export default function extreuAny(autographDate:string, dateType:string): number | null { 

    let date;
    let autographYear: number | null = null;
switch (dateType) {
  case "exactDate":
    date = new Date(autographDate);
    autographYear = date.getFullYear();   
    break;
  case "aproxDate":
    const coincidencia = autographDate.match(/\d{4,}/); // Nombre amb, com a mínim 4 dígits seguits.
    coincidencia ? autographYear = parseInt(coincidencia[0].slice(0, 4), 10) : null;  
    break;
  default:
    console.log(`Sorry, ${dateType} is not acceptable year.`);
}
return autographYear;
}