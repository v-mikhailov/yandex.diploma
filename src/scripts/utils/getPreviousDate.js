export const getPreviousDate = (dayAgo, isStandart) => {
  let data = new Date();
  let from = data.setDate(data.getDate() - dayAgo);
  if (isStandart) {
    return data 
  } else {
    return `${data.getFullYear()}-${data.getMonth()+1}-${data.getDate()}`;
  }
}