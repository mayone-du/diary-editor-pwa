import { Container } from "@mantine/core";
import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return <Container py={"md"}>{children}</Container>;
};

export default Layout;
