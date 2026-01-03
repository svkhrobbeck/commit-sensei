import { spreadsheet } from "@/services";
import { type IHistory } from "@/helpers/interfaces";

const getHistory = async (): Promise<IHistory[]> => {
  const values = await spreadsheet.get(process.env.SPREADSHEET_ID!, "History", true);
  return values as unknown as IHistory[];
};

export default getHistory;
