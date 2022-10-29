/* eslint-disable @next/next/no-img-element */
// @ts-nocheck
import React from "react";
import Link from "next/link";
import Button from "../Button";
import { getCookie } from "cookies-next";

const Hero = () => {
  return (
    <>
    <div className="h-full bg-[url('/images/hero.webp')] bg-no-repeat bg-cover bg-center mx-auto flex flex-col justify-center items-center p-24 pb-60 relative">
      <h1 className="text-[82px] text-center font-bold text-white tracking-wide leading-snug z-10 main-heading">Enjoy The Best Music Marketplace.</h1>
      <h5 className="w-[900px] text-[22px] text-dark pt-7 text-center z-10">
          Browse through trillions of world-wide collection of songs for free
      </h5>
      <div className="flex space-x-12 pt-8 mb-60 z-10">
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
        <div className="layered-image z-0"></div>
    </div>
    <div className="flex w-full justify-center items-center mt-[-350px] z-10 absolute">
    <img
          src="images/web-player.jpeg"
          alt="float"
          className="w-2/3 h-2/3 mb-8 rounded-xl"
        />
    </div>
    </>
  );
};

export default Hero;
