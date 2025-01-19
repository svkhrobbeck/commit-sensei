import get from "lodash/get";

export const getStr = (row: any[] = [], idx: number, defaultVal: string = "") => {
  if (!Array.isArray(row)) return defaultVal;
  const value = row[idx];

  if (typeof value === "number") return String(value);

  return String(row[idx] || defaultVal).trim();
};

export const getNum = (row: any[] = [], idx: number, defaultVal: number = 0) => {
  if (!Array.isArray(row)) return defaultVal;

  const value = Number(get(row, `[${idx}]`, "") || defaultVal);
  return isNaN(value) ? defaultVal : value;
};
