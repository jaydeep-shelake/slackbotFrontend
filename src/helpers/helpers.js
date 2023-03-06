export function getDaysDiff(dateTo,dateFrom){
    const to = new Date(dateTo)
    const from = new Date(dateFrom)
    const diffTime = Math.abs(to - from);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays
}
