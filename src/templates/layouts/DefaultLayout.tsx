import Head from "next/head";
import { type ReactNode } from "react";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

type DefaultLayoutProps = { children: ReactNode };

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <Head>
        <title>Caregiver Reaction Assessment</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className={inter.className}>{children}</main>
    </>
  );
};
