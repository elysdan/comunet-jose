import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { trpc } from '@/utils/trpc';
import { SessionProvider, signIn, useSession } from 'next-auth/react';
import React from 'react';
import type { NextPage } from 'next';
export { AxiomWebVitals } from 'next-axiom';

type NextPageWithAuthAndLayout = NextPage & {
  auth?: boolean;
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

const measurementId = process.env.NEXT_PUBLIC_MEASUREMENT_ID ?? '';

function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps & { Component: NextPageWithAuthAndLayout }) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <SessionProvider session={session} refetchOnWindowFocus={false}>
      {Component.auth ? (
        <Auth>{getLayout(<Component {...pageProps} />)}</Auth>
      ) : (
        getLayout(<Component {...pageProps} />)
      )}
    </SessionProvider>
  );
}

function Auth({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const isUser = !!session?.user;
  React.useEffect(() => {
    if (status === 'loading') return;
    if (!isUser) signIn();
  }, [isUser, status]);

  if (isUser) {
    return <>{children}</>;
  }
  return null;
}

export default trpc.withTRPC(App);