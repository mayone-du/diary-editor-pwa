import { CustomMantineProvider } from "@/lib/mantine/provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PropsWithChildren } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Diary Editor",
  description: "Diary Editor App",
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <CustomMantineProvider>{children}</CustomMantineProvider>
      </body>
    </html>
  );
};

export default RootLayout;
