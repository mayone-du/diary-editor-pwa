"use client";

import { Box } from "@mantine/core";
import { useState } from "react";

export const MarkdownEditor = () => {
  const [value, setValue] = useState("");

  return <Box>{value}</Box>;
};
