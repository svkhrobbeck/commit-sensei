import { spreadsheet } from "../../services";
import { IDeadline } from "../../helpers/interfaces";

const getDeadline = async (): Promise<IDeadline[]> => {
  const values = await spreadsheet.get(process.env.SPREADSHEET_ID!, "Deadline!A1:H10", true);
  return values as IDeadline[];
};

export default getDeadline;
