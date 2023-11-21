import { Octokit } from "octokit";

const PERSONAL_ACCESS_TOKEN = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;

export const octokit = new Octokit({ auth: PERSONAL_ACCESS_TOKEN });
