import Head from 'next/head';
import { FC } from 'react';
import { Navbar } from '../ui';

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>CookieMaster</title>
      </Head>
      <nav>
        <Navbar />
      </nav>
      <main style={{ padding: '20px 50px' }}>{children}</main>
    </>
  );
};
