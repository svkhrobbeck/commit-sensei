import moment from "moment";

export const delay = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const formatDate = (date: string | Date | number, format: string = "DD-MMMM, YYYY. HH:mm"): string => {
  return date ? moment(date).format(format) : "";
};

export const getKeyByValue = <T extends Record<string, any>>(obj: T, value: any): string | undefined => {
  return Object.keys(obj).find(key => obj[key] === value);
};

export const getDaysInMs = (day: number) => {
  const dayInMs = 1000 * 60 * 60 * 24;
  return dayInMs * day;
};
