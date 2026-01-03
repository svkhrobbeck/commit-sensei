import { spreadsheet } from "@/services";
import { type IUser } from "@/helpers";

const getUsers = async (): Promise<IUser[]> => {
  const values = await spreadsheet.get(process.env.SPREADSHEET_ID!, "Users", true);
  const users = values as unknown as IUser[];
  return users.filter(user => user.status);
};

export default getUsers;
