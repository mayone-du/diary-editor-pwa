import { Metadata } from "next";
import { MarkdownEditor } from "./_components/markdown-editor";
import { Box } from "@mantine/core";

const Page = async () => {
  return (
    <Box>
      <MarkdownEditor />
    </Box>
  );
};

export default Page;
