import { createOcktokit } from "@/services";
import { getUzbekistanTime } from "@/utils";

async function getTodaysCommits(username: string, token: string, repo: string) {
  const octokit = createOcktokit(token);
  const today = getUzbekistanTime(Date.now());
  const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString();
  const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString();

  try {
    const response = await octokit.request("GET /repos/{owner}/{repo}/commits", {
      owner: username,
      repo,
      since: startOfDay,
      until: endOfDay,
      per_page: 100,
    });

    return { commits: response.data, count: response.data.length };
  } catch (error) {
    console.error("Xatolik yuz berdi:", error);
    return { commits: [], count: 0 };
  }
}

export default getTodaysCommits;
