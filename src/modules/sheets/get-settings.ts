import { spreadsheet } from "@/services";
import { type ISetting } from "@/helpers";

const getSettings = async (): Promise<ISetting[]> => {
  const values = await spreadsheet.get(process.env.SPREADSHEET_ID!, "Settings", true);
  return values as unknown as ISetting[];
};

export default getSettings;
