export const getDateStr = (date: Date): string => {
  const month = (date.getMonth() + 1 + '').padStart(2, '0')
  const day = (date.getDate() + '').padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}
