"use server";

import { octokit } from "@/lib/github/client";
import { GITHUB } from "@/lib/github/constant";
import dayjs from "dayjs";

export type DiaryArgs = {
  title: string;
  description: string;
  emoji: string;
  body: string;
  isPublished: boolean;
  createdAt: Date;
};

export const createDiary = async (args: DiaryArgs) => {
  try {
    const formattedDate = dayjs(args.createdAt).format("YYYY-MM-DD");
    const [year, month] = formattedDate.split("-");

    const implementedBody = `---
title: ${args.title}
description: ${args.description}
emoji: ${args.emoji}
is_published: ${args.isPublished}
---

${args.body}
`;

    const latestCommit = await octokit.rest.repos.getBranch({
      owner: GITHUB.OWNER,
      repo: GITHUB.REPO,
      branch: GITHUB.BRANCH,
    });

    const newTree = await octokit.rest.git.createTree({
      owner: GITHUB.OWNER,
      repo: GITHUB.REPO,
      branch: GITHUB.BRANCH,
      base_tree: latestCommit.data.commit.sha,
      tree: [
        {
          path: `diary/${year}/${month}/${formattedDate}.md`, // 追加したいファイルのpath
          mode: "100644", //100 はファイル 644は実行不可なファイルであるという意味。100644はファイルで実行不可
          content: implementedBody,
        },
      ],
    });

    const newCommit = await octokit.rest.git.createCommit({
      owner: GITHUB.OWNER,
      repo: GITHUB.REPO,
      message: `create ${formattedDate}.md`,
      tree: newTree.data.sha,
      parents: [latestCommit.data.commit.sha],
    });

    await octokit.rest.git.updateRef({
      owner: GITHUB.OWNER,
      repo: GITHUB.REPO,
      ref: `heads/${GITHUB.BRANCH}`,
      sha: newCommit.data.sha,
    });
  } catch (err) {
    console.error(err);
  }
};
