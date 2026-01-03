import { createOcktokit } from "@/services";

type GithubUserQueryResponse = {
  user: {
    contributionsCollection: {
      commitContributionsByRepository: {
        repository: {
          name: string;
          owner: {
            login: string;
          };
        };
        contributions: {
          totalCount: number;
        };
      }[];
      contributionCalendar: {
        totalContributions: number;
        weeks: {
          contributionDays: {
            contributionCount: number;
            date: string;
            weekday: number;
          }[];
        }[];
      };
    };
    repositories: {
      nodes: {
        stargazerCount: number;
        primaryLanguage: {
          name: string;
        } | null;
      }[];
    };
  };
};

const getUserAllContributions = async (username: string, token: string) => {
  const octokit = createOcktokit(token);

  const query = `
      query($username: String!) {
        user(login: $username) {
          contributionsCollection {
            commitContributionsByRepository {
              repository {
                name
                owner {
                  login
                }
              }
              contributions {
                totalCount
              }
            }
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                  weekday
                }
              }
            }
          }
          repositories(first: 100, ownerAffiliations: OWNER, orderBy: {field: STARGAZERS, direction: DESC}) {
            nodes {
              stargazerCount
              primaryLanguage {
                name
              }
            }
          }
        }
      }
    `;

  const response = await octokit.graphql<GithubUserQueryResponse>(query, { username });

  const user = response.user;
  const totalCommits = user.contributionsCollection.contributionCalendar.totalContributions;

  const totalOwnerCommits = user.contributionsCollection.commitContributionsByRepository
    .filter(item => item.repository.owner.login === username)
    .reduce((sum: number, item) => sum + item.contributions.totalCount, 0);

  return { ...response, totalCommits, totalOwnerCommits };
};

export default getUserAllContributions;
