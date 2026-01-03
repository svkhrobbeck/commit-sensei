import { spreadsheet } from "@/services";
import { type IHistory } from "@/helpers";

import { getHistory } from ".";

const spreadsheetId = process.env.SPREADSHEET_ID!;

const setHistory = async (pastDeadlines: Partial<Omit<IHistory, "passed" | "id" | "total" | "penaltyForNextWeek">>[]) => {
  const history = await getHistory();

  const values = pastDeadlines.map(item => [item.userId, item.date, item.done, item.limit, item.penalty]);

  await spreadsheet.set(spreadsheetId, `History!A${4 + history.length}`, values);
};

export default setHistory;
