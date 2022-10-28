/* eslint-disable @next/next/no-img-element */
// @ts-nocheck
import React from "react";
import Link from "next/link";
import Button from "../Button";
import { getCookie } from "cookies-next";

const Hero = ({ user }) => {
  return (
    <div className="mx-auto flex flex-col items-center px-5 pt-24 pb-8 md:flex-row lg:px-24">
      <div className="mb-16 flex flex-col items-center text-center md:mb-0 md:w-1/2 md:items-start md:pr-16 md:text-left lg:flex-grow lg:pr-24">
        <div className="mb-8 flex flex-row space-x-3"></div>
        <img
          src="https://media.discordapp.net/attachments/1035162754140622868/1035621778724245644/unknown.png"
          alt="float"
          className="w-32 mb-8"
        />
        <h2 className="text-4xl font-medium text-primary-text sm:text-5xl mb-6">
          Muse
        </h2>
        <p className="lg:text-justify font-light text-xl leading-8 text-black mb-6">
          As a music artist, a major part of being successful is popularising
          your tunes. To help in this, our project Muse allows artists to upload
          their songs on our platform where they are sold as visual
          manifestations. We convert the lyrics of your songs into digital
          trading cards that are sold in our marketplace. This will help in
          boosting the music endeavours of various upcoming artists.
        </p>
        <div className="flex space-x-4">
          <Link href="/post">
            <a>
              <Button text="Post NFT" />
            </a>
          </Link>
          <Link href="/auth/register">
            <a>
              <Button text="Get Started" />
            </a>
          </Link>
        </div>
      </div>
      <div className="lg:max-w-lg lg:w-full md:w-full w-5/6">
        <img
          className="object-cover object-center rounded"
          alt="hero"
          src="/images/hero.svg"
        />
      </div>
    </div>
  );
};

export default Hero;

export const getServerSideProps = async (ctx) => {
  const user = getCookie("user", ctx.req);

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  };
};
