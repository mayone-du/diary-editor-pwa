const OWNER = "mayone-du";

const REPO = "blog-contents";

const BRANCH = "main";

const PERSONAL_ACCESS_TOKEN = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;

export const GITHUB = {
  OWNER,
  REPO,
  BRANCH,
  PERSONAL_ACCESS_TOKEN,
} as const;
