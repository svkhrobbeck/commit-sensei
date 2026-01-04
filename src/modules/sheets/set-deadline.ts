import type { IDeadlineCore } from "@/helpers";
import { spreadsheet } from "@/services";

const setDeadline = async (startCol: string = "A", idx: number, deadline: Partial<IDeadlineCore>[]) => {
  const values = deadline.map(item => [item.date, item.passed, item.done]);
  await spreadsheet.set(process.env.SPREADSHEET_ID!, `Deadline!${startCol}${idx + 4}`, values);
};

export default setDeadline;
