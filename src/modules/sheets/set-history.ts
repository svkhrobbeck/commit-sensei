import { getHistory } from ".";
import { IDeadline } from "../../helpers/interfaces";
import { spreadsheet } from "../../services";

const spreadsheetId = process.env.SPREADSHEET_ID!;

const setHistory = async (deadlines: Partial<Omit<IDeadline, "passed" | "id">>[]) => {
  const history = await getHistory();

  const values = deadlines.map(item => [
    item.date,
    item.done,
    item.limit,
    item.penalty,
    item.total,
    item.penaltyForNextWeek,
  ]);

  await spreadsheet.set(spreadsheetId, `History!A${4 + history.length}`, values);
};

export default setHistory;
