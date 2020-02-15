export const getCurrentDate = () => {
  let data = new Date();
  return `${data.getFullYear()}-${data.getMonth()+1}-${ data.getDate()}`
}
