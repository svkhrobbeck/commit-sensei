import { createOcktokit } from "@/services";
import { getDaysInMs, getUzbekistanTime } from "@/utils";

const getWeeklyActiveRepos = async (username: string, token: string) => {
  const octokit = createOcktokit(token);
  
  // eslint-disable-next-line
  const allRepos: any[] = [];
  let page = 1;

  const today = new Date();
  const aWeekAgo = getUzbekistanTime(today.getTime() - getDaysInMs(7));

  try {
    while (true) {
      const { data: repos } = await octokit.request("GET /user/repos", {
        username,
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

    const activeRepos = allRepos.filter(repo => new Date(repo.updated_at).getTime() >= aWeekAgo.getTime());

    return activeRepos;
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return [];
  }
};

export default getWeeklyActiveRepos;
