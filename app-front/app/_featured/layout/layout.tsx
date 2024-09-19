import React from 'react';
import Navbar from '../header';
import Footer from '../footer';
import { LayoutProps } from '@/.next/types/app/layout';

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar/>
      <main>{children}</main>
      <Footer />
    </>
  );
}