import get from "lodash/get";

import { octokit } from "../../services";

const owner = process.env.GITHUB_USERNAME!;

const getTodayPushEvents = async (repo: string) => {
  const { data: events } = await octokit.request("GET /repos/{owner}/{repo}/events", { owner, repo });

  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));

  const pushEvents = events.filter(event => {
    const eventDate = new Date(event.created_at!);
    return event.type === "PushEvent" && eventDate >= startOfDay && eventDate <= endOfDay;
  });

  const commitsLength = pushEvents.reduce((a, b) => a + get(b.payload, "commits.length", 0) || 0, 0);

  return { pushEvents, commitsLength };
};

export default getTodayPushEvents;
