import Head from "next/head";
import type { AppProps, AppType } from "next/app";
import { trpc } from "../utils/trpc-hooks";
import { NextPageWithLayout } from "../libs/types";
import { Suspense } from "react";
import { Skeleton } from "@chakra-ui/react";
import { DefaultLayout } from "../templates/layouts/DefaultLayout";
import { ThemeProvider } from "@opengovsg/design-system-react";
import { SessionProvider } from "next-auth/react";

type AppPropsWithAuthAndLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ((props: AppPropsWithAuthAndLayout) => {
  return (
    <SessionProvider>
      <ThemeProvider>
        <Suspense fallback={<Skeleton width="100vw" height="100vh" />}>
          <ChildWithLayout {...props} />
        </Suspense>
      </ThemeProvider>
    </SessionProvider>
  );
}) as AppType;

// This is needed so suspense will be triggered for anything within the LayoutComponents which uses useSuspenseQuery
const ChildWithLayout = ({
  Component,
  pageProps,
}: AppPropsWithAuthAndLayout) => {
  const getLayout =
    Component.getLayout ??
    ((page) => (
      <>
        <Head>
          <title>Caregiver Reaction Assessment</title>
          <link rel="icon" href="/favicon.png" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
          />
        </Head>
        <DefaultLayout>{page}</DefaultLayout>
      </>
    ));

  return <>{getLayout(<Component {...pageProps} />)}</>;
};

export default trpc.withTRPC(App);
