import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import type { PropsWithChildren } from "react";
import { DatesProvider } from "@mantine/dates";
import "dayjs/locale/ja";

export const CustomMantineProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      <ColorSchemeScript defaultColorScheme="auto" />
      <MantineProvider defaultColorScheme="auto">
        <DatesProvider settings={{ locale: "ja", firstDayOfWeek: 0 }}>
          {children}
        </DatesProvider>
      </MantineProvider>
    </>
  );
};
