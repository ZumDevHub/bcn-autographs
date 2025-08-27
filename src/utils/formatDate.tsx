
export default function formatDate(data:string, format:string) {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  if(format === "exact") {
    let formDate = new Date(data)
    let formatedDate = `${monthNames[formDate.getMonth()]} ${formDate.getDate()}, ${formDate.getFullYear()}`
    return formatedDate;
  } else return data;
}