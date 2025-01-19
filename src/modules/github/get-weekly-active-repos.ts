import { octokit } from "../../services";

const getWeeklyActiveRepos = async () => {
  let allRepos: any[] = [];
  let page = 1;

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const sinceDate = oneWeekAgo.toISOString();

  try {
    while (true) {
      const { data: repos } = await octokit.request("GET /user/repos", {
        per_page: 100,
        page,
        since: sinceDate,
      });

      allRepos = [...allRepos, ...repos];

      if (repos.length < 100) break;

      page++;
    }

    return allRepos;
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return [];
  }
};

export default getWeeklyActiveRepos;
