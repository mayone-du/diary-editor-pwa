import { octokit } from "@/lib/github/client";
import { MarkdownEditor } from "./_components/markdown-editor";
import { GITHUB } from "@/lib/github/constant";
import { Box, Title } from "@mantine/core";
import { EmojiPicker } from "./_components/emoji-picker";

const Page = async () => {
  const latestCommit = (
    await octokit.rest.repos.getBranch({
      owner: GITHUB.OWNER,
      repo: GITHUB.REPO,
      branch: GITHUB.BRANCH,
    })
  ).data.commit;

  return (
    <Box>
      <Title order={1}>Editor Page</Title>

      {/* <Box>{JSON.stringify(latestCommit, null, 2)}</Box> */}

      <EmojiPicker />

      <MarkdownEditor />
    </Box>
  );
};

export default Page;
