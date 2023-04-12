export function getDaysDiff(dateTo,dateFrom){
    const to = new Date(dateTo)
    const from = new Date(dateFrom)
    const diffTime = Math.abs(to - from);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1
}

export const makeCapitalize=(string)=>{
  const splitedString  =  string.split(" ")
  const capilalizedString = splitedString.map((word)=>word[0].toUpperCase() + word.substring(1)).join(" ")
  console.log(capilalizedString)
  return capilalizedString
}

export const  substractStandupTime=(min,standuptime)=> {
  const standupTime = standuptime
  let date = new Date("01/01/2000 " + standupTime);
  date.setMinutes(date.getMinutes() - min);

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return hours + ':' + minutes + ' ' + ampm

}

export const compairDates=(date)=>{
    const offset = 330;  // IST offset is 5 hours and 30 minutes ahead of UTC
    const ISTTime = new Date(date.getTime() + offset * 60 * 1000);
    const todaysDate = ISTTime.toISOString().split("T")[0];
    const newDate = new Date(todaysDate).toISOString()
    return newDate
  }
