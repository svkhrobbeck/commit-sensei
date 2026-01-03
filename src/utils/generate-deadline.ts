import { formatDate } from "@/utils";
import type { IDeadlineCore } from "@/helpers";

const generateDeadline = async (initialDate: Date = new Date()) => {
  const array = new Array(7).fill(null);
  const deadlines: IDeadlineCore[] = array.map((_, i) => {
    const date = new Date();
    date.setDate(initialDate.getDate() - initialDate.getDay() + i + 1);
    const dateString = formatDate(date, "DD-MM-YYYY");

    return {
      date: dateString,
      passed: false,
      done: 0,
    };
  });

  return deadlines;
};

export default generateDeadline;