import { spreadsheet } from "../../services";

interface IShorterDeadline {
  date: string;
  passed: boolean;
  done: number;
}

const setDeadline = async (idx: number, deadline: Partial<IShorterDeadline>[]) => {
  const values = deadline.map(item => [item.date, item.passed, item.done]);
  await spreadsheet.set(process.env.SPREADSHEET_ID!, `Deadline!A${idx + 4}`, values);
};

export default setDeadline;
