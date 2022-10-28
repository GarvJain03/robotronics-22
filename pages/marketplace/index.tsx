/* eslint-disable react/jsx-key */
// @ts-nocheck
import type { NextPage } from "next";
import Layout from "../../components/Layout/Layout";
import prisma from "../../lib/prisma";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import React from "react";

const MarketplacePage: NextPage = ({ nfts }) => {
  const router = useRouter();
  React.useEffect(() => {
    if (!getCookie("user")) {
      router.push("/auth/login");
    }
  });

  return (
    <Layout title="Marketplace">
      <div className="mx-auto flex flex-col items-center px-5 pt-24 pb-8 lg:px-24">
        <h1 className="text-black text-4xl font-semibold mb-8">Marketplace</h1>
        <div className="grid grid-cols-4">
          {nfts.map((nft) => (
            <div className="bg-white rounded-lg shadow-main border-2 border-black p-4">
              <img src="/images/card.png" alt={nft.songTitle} />
              <h1 className="text-black text-2xl font-semibold">
                {nft.songTitle}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default MarketplacePage;

export const getServerSideProps = async (ctx) => {
  const nfts = await prisma.post.findMany({
    where: {
      isApproved: true,
    },
    include: {
      User: true,
    },
  });

  return {
    props: {
      nfts: JSON.parse(JSON.stringify(nfts)),
    },
  };
};
