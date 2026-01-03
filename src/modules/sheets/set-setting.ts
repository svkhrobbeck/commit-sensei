import { spreadsheet } from "@/services";
import { type ISetting } from "@/helpers";

const setSetting = async (startRange: string, setting: Partial<ISetting>) => {
  await spreadsheet.set(process.env.SPREADSHEET_ID!, `Settings!${startRange}`, [
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
