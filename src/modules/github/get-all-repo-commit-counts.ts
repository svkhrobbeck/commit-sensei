import { delay } from "../../utils";
import { getWeeklyActiveRepos } from ".";
import getTodaysCommits from "./get-commits";

const getAllRepoCommitCounts = async () => {
  const repos = await getWeeklyActiveRepos();
  let count = 0;

  console.log(repos.map(i => i.name));

  for (const repo of repos) {
    const { commits } = await getTodaysCommits(repo.name!);
    count += commits.length;
    await delay(100);
  }

  console.log(count);
  return count;
};

export default getAllRepoCommitCounts;
