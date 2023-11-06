import { type ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import NavMenu from "@/components/NavMenu";

type DefaultLayoutProps = { children: ReactNode };

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <Box p="10" justifyContent="center" h="full">
        {children}
      </Box>
      <NavMenu />
    </>
  );
};
