import Head from 'next/head';
import { FC } from 'react';

import styles from 'styles/Previous.module.css';

type Props = {
  title: string;
  children: React.ReactNode;
};

const PreviousLayout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main
        style={{
          background: '#202020',
          height: '100vh',
        }}
      >
        <div>{children}</div>
      </main>
    </>
  );
};

export default PreviousLayout;
