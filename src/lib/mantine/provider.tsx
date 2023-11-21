import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import type { FC, PropsWithChildren, ReactNode } from "react";

export const CustomMantineProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      <ColorSchemeScript defaultColorScheme="auto" />
      <MantineProvider defaultColorScheme="auto">{children}</MantineProvider>
    </>
  );
};
