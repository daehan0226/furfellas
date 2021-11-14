export const createQueryParams = (params) => {
  return Object.keys(params)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
    .join("&");
};


export const getCurrentStringDatetime = () => {
  const today = new Date();
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return date + 'T' + time;
}


export const getCurrentStringDate = () => {
  const today = new Date();
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  return date;
}


export const addMonthToCurrentDate = ({ months = 0 }) => {
  const today = new Date();
  const d = today.getDate();
  today.setMonth(today.getMonth() + months);
  if (today.getDate() != d) {
    today.setDate(0);
  }
  return today;
}

export const strfDatetime = (datetime) => {
  return datetime.getFullYear() + '-' + (datetime.getMonth() + 1) + '-' + datetime.getDate();
}


export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}



export const changeToDisplayStringDatetime = (datetime) => {
  let temp = datetime.replace("T", " ")
  return temp.includes("00:00:00") ? temp.replace("00:00:00", "") : temp;
}