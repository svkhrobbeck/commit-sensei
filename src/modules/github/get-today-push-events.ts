import get from "lodash/get";

import { createOcktokit } from "@/services";
import { getUzbekistanTime } from "@/utils";

const getTodayPushEvents = async (username: string, token: string, repo: string) => {
  const octokit = createOcktokit(token);
  const { data: events } = await octokit.request("GET /repos/{owner}/{repo}/events", { owner: username, repo });

  const today = getUzbekistanTime(new Date());
  const startOfDay = new Date(today.setHours(0, 0, 0, 0)).getTime();
  const endOfDay = new Date(today.setHours(23, 59, 59, 999)).getTime();

  const pushEvents = events.filter(event => {
    const eventDate = getUzbekistanTime(event.created_at!);
    return event.type === "PushEvent" && eventDate.getTime() >= startOfDay && eventDate.getTime() <= endOfDay;
  });

  const commitsLength = pushEvents.reduce((a, b) => {
    const coms = [...(get(b.payload, "commits", []) || [])].flat(Infinity);
    return a + coms.length || 0;
  }, 0);

  return { pushEvents, commitsLength };
};

export default getTodayPushEvents;
