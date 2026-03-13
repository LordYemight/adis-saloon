import type { ReactNode } from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>Adis Saloon</title>
        <meta name="description" content="The Art of Hair" />
      </Head>
      <Navbar />
      <main className="py-20">{children}</main>
      <Footer />
    </>
  );
}