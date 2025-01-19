import { spreadsheet } from "../../services";
import { ISetting } from "../../helpers/interfaces";

const getSetting = async (): Promise<ISetting> => {
  const commitSenseiSettings = await spreadsheet.get(process.env.SPREADSHEET_ID!, "Setting", true);
  const commitSenseiSetting: ISetting = commitSenseiSettings.length > 0 ? commitSenseiSettings[0] : {};
  return commitSenseiSetting;
};

export default getSetting;
