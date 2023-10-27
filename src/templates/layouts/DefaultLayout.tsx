import Head from "next/head";
import { type ReactNode } from "react";
import { Inter } from "next/font/google";
import { AppGrid } from "../AppGrid";
const inter = Inter({ subsets: ["latin"] });

type DefaultLayoutProps = { children: ReactNode };

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <Head>
        <title>Caregiver Reaction Assessment</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <AppGrid
        bg="base.canvas.brand-subtle"
        px="1.5rem"
        bgSize="cover"
        bgRepeat="no-repeat"
        bgPos="bottom right"
      >
        <main className={inter.className}>{children}</main>
      </AppGrid>
    </>
  );
};
