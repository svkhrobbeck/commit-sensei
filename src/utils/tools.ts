import { getFormattedDate } from "utilzify";

export const formatDate = (date: string | Date | number, format: string = "DD-MMMM, YYYY. HH:mm"): string => {
  return getFormattedDate(new Date(date), format);
};

// eslint-disable-next-line
export const getKeyByValue = <T extends Record<string, any>>(obj: T, value: any): string | undefined => {
  return Object.keys(obj).find(key => obj[key] === value);
};

export const getDaysInMs = (days: number = 1) => {
  const dayInMs = 1000 * 60 * 60 * 24;
  return dayInMs * days;
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
