export const getDateStr = (date: Date): string => {
  const month = (date.getMonth() + 1 + '').padStart(2, '0')
  const day = (date.getDate() + '').padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

export const getDateFromStr = (date: string): Date | undefined => {
  const d = date.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (d) return new Date(+d[1], +d[2] - 1, +d[3])
  return undefined
}
