import { type ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import { Inter } from "next/font/google";
import NavMenu from "@/components/NavMenu";
const inter = Inter({ subsets: ["latin"] });

type DefaultLayoutProps = { children: ReactNode };

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <Box p="10" justifyContent="center" h="full">
        <main className={inter.className}>{children}</main>
      </Box>
      <NavMenu />
    </>
  );
};
