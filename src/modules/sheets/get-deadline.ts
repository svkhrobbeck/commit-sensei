import { spreadsheet } from "@/services";
import { type IDeadline } from "@/helpers";

const getDeadline = async (range: string = "A1:H10"): Promise<IDeadline[]> => {
  const values = await spreadsheet.get(process.env.SPREADSHEET_ID!, `Deadline!${range}`, true);
  return values as unknown as IDeadline[];
};

export default getDeadline;
