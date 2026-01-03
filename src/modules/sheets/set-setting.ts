import { spreadsheet } from "@/services";
import { type ISetting } from "@/helpers";

const setSetting = async (setting: Partial<ISetting>) => {
  await spreadsheet.set(process.env.SPREADSHEET_ID!, "Setting!A4", [
    [
      setting.userId,
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
