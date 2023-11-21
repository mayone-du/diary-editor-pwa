import { Container } from "@mantine/core";
import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return <Container>{children}</Container>;
};

export default Layout;
