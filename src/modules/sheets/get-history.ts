import { IDeadline } from "../../helpers/interfaces";
import { spreadsheet } from "../../services";

const getHistory = async (): Promise<IDeadline[]> => {
  const values = await spreadsheet.get(process.env.SPREADSHEET_ID!, "History", true);
  return values as IDeadline[];
};

export default getHistory;
