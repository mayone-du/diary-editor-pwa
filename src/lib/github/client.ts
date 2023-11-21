import { Octokit } from "octokit";
import { GITHUB } from "./constant";

export const octokit = new Octokit({ auth: GITHUB.PERSONAL_ACCESS_TOKEN });
