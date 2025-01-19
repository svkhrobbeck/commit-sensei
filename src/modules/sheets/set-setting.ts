import { ISetting } from "../../helpers/interfaces";
import { spreadsheet } from "../../services";

const setSetting = async (setting: Partial<ISetting>) => {
  await spreadsheet.set(process.env.SPREADSHEET_ID!, "Setting!A4", [
    [
      setting.forWeek,
      setting.penalty,
      setting.penaltyFromLastWeek,
      setting.penaltyForNextWeek,
      setting.completed,
      setting.summaryDate,
    ],
  ]);
};

export default setSetting;
