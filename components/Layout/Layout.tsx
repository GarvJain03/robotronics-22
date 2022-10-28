/* eslint-disable @next/next/no-page-custom-font */

import React from "react";
import Header from "./Header";
import Head from "next/head";

interface ILayoutProps {
  children: React.ReactNode;
  title: string;
}

const Layout: React.FC<ILayoutProps> = ({ children, title }: ILayoutProps) => {
  return (
    <div>
      <Head>
        <title>{title} | Exun</title>
        <meta name="description" content="Exun" />
      </Head>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
