import Head from 'next/head';
import Link from 'next/link';
import { FC } from 'react';

import stylesNav from 'styles/Previous.module.css';

type Props = {
  title: string;
  children: React.ReactNode;
};

const AuthLayout: FC<Props> = ({ children, title }) => {
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
        <div>
          <nav className={stylesNav.navbar}>
            <Link href="/">
              <h2>Cursos OnLine</h2>
            </Link>
          </nav>
          {children}
        </div>
      </main>
    </>
  );
};

export default AuthLayout;
