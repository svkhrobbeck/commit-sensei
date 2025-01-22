import { octokit } from "../../services";
import { getDaysInMs, getUzbekistanTime } from "../../utils";

const getWeeklyActiveRepos = async () => {
  let allRepos: any[] = [];
  let page = 1;

  const today = new Date();
  const oneDayAgo = getUzbekistanTime(today.getTime() - getDaysInMs(7));
  const sinceDate = oneDayAgo.toISOString();
  console.log(sinceDate);

  try {
    while (true) {
      const { data: repos } = await octokit.request("GET /user/repos", {
        username: process.env.GITHUB_USERNAME!,
        per_page: 100,
        sort: "updated",
        page,
        direction: "desc",
      });

      repos.forEach(repo => {
        allRepos.push(repo);
      });

      if (repos.length < 100) break;

      page++;
    }

    const activeRepos = allRepos.filter(repo => new Date(repo.updated_at) >= oneDayAgo);

    return activeRepos;
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return [];
  }
};

export default getWeeklyActiveRepos;
