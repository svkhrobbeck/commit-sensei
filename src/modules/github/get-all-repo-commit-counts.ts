import { delay } from "utilzify";

import { getWeeklyActiveRepos, getTodaysCommits } from ".";
import { get } from "lodash";

const getAllRepoCommitCounts = async (username: string, token: string) => {
  const repos = await getWeeklyActiveRepos(username, token);
  let count = 0;

  for (const repo of repos) {
    const repoName = get(repo, "name");
    const repoFullName = get(repo, "full_name");
    const repoOwnerLogin = get(repo, "owner.login");

    if (repoOwnerLogin !== username || !repoFullName.includes(username)) continue;
    const { commits } = await getTodaysCommits(username, token, repoName!);
    count += commits.length;
    await delay(100);
  }

  console.log(count);
  return count;
};

export default getAllRepoCommitCounts;
