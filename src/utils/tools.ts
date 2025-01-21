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

export const getUzbekistanTime = (date: Date | number | string): Date => {
  const now = new Date(date);
  const utcYear = now.getUTCFullYear();
  const utcMonth = now.getUTCMonth();
  const utcDate = now.getUTCDate();
  const utcHours = now.getUTCHours();
  const utcMinutes = now.getUTCMinutes();
  const utcSeconds = now.getUTCSeconds();
  const utcMilliseconds = now.getUTCMilliseconds();

  const uzbTime = new Date(utcYear, utcMonth, utcDate, utcHours + 5, utcMinutes, utcSeconds, utcMilliseconds);
  return uzbTime;
};
