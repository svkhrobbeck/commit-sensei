import get from "lodash/get";

import { octokit } from "../../services";
import { getUzbekistanTime } from "../../utils";

const owner = process.env.GITHUB_USERNAME!;

const getTodayPushEvents = async (repo: string) => {
  const { data: events } = await octokit.request("GET /repos/{owner}/{repo}/events", { owner, repo });

  const today = getUzbekistanTime(new Date());
  const startOfDay = new Date(today.setHours(0, 0, 0, 0)).getTime();
  const endOfDay = new Date(today.setHours(23, 59, 59, 999)).getTime();

  const pushEvents = events.filter(event => {
    const eventDate = getUzbekistanTime(event.created_at!);
    return (
      event.type === "PushEvent" && eventDate.getTime() >= startOfDay && eventDate.getTime() <= endOfDay
    );
  });

  const commitsLength = pushEvents.reduce((a, b) => {
    const coms = [...(get(b.payload, "commits", []) || [])].flat(Infinity);
    return a + coms.length || 0;
  }, 0);

  return { pushEvents, commitsLength };
};

export default getTodayPushEvents;
