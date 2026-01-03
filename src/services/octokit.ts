import { Octokit } from "@octokit/rest";

export const createOcktokit = (githubToken: string) => {
  const octokit = new Octokit({ auth: githubToken });
  return octokit;
};

export default createOcktokit;
