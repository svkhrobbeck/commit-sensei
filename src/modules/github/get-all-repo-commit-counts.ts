import { delay } from "../../utils";
import { getTodayPushEvents, getWeeklyActiveRepos } from ".";

const getAllRepoCommitCounts = async () => {
  const repos = await getWeeklyActiveRepos();
  let count = 0;

  for (const repo of repos) {
    const { commitsLength } = await getTodayPushEvents(repo.name!);
    count += commitsLength;
    await delay(100);
  }

  console.log(count);
  return count;
};

export default getAllRepoCommitCounts;
