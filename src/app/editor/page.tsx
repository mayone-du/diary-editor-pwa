import { Metadata } from "next";
import { MarkdownEditor } from "./_components/markdown-editor";
import { Box } from "@mantine/core";

export const metadata: Metadata = {
  title: "Diary Editor",
  manifest: "/manifest.json",
  robots: {
    index: false,
  },
};

const Page = async () => {
  return (
    <Box>
      <MarkdownEditor />
    </Box>
  );
};

export default Page;
