import { octokit } from "@/lib/github/client";
import { MarkdownEditor } from "./_components/markdown-editor";
import { GITHUB } from "@/lib/github/constant";
import { Box, Center } from "@mantine/core";
import { EmojiPicker } from "./_components/emoji-picker";

const Page = async () => {
  const latestCommit = (
    await octokit.rest.repos.getBranch({
      owner: GITHUB.OWNER,
      repo: GITHUB.REPO,
      branch: GITHUB.BRANCH,
    })
  ).data;

  return (
    <Box>
      <Center>
        <EmojiPicker />
      </Center>

      <MarkdownEditor />
    </Box>
  );
};

export default Page;
