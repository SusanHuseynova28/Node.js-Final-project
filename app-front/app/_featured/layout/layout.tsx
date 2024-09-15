import React from 'react';
import Header from '../header/index';
import Footer from '../footer/index';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
