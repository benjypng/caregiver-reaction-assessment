import Head from "next/head";
import { type ReactNode } from "react";
import { Inter } from "next/font/google";
import { Box } from "@chakra-ui/react";
const inter = Inter({ subsets: ["latin"] });

type DefaultLayoutProps = { children: ReactNode };

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <Head>
        <title>Caregiver Reaction Assessment</title>
        <link rel="icon" href="/favicon.png" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      <Box p="10" justifyContent="center">
        <main className={inter.className}>{children}</main>
      </Box>
    </>
  );
};
