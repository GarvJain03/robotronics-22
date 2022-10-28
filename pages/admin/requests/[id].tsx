// @ts-nocheck
import React from "react";
import prisma from "../../../lib/prisma";
import type { Post } from "@prisma/client";
import Head from "next/head";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import type { NextPage } from "next";

const Request: NextPage<{ request: Request }> = ({
  request,
}: {
  request: Request;
}) => {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = {
      id: e.currentTarget.id.value,
    };

    try {
      await fetch("/api/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      router.push("/admin");
      toast.success("Post approved.");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col mx-auto lg:px-24 px-5 py-24 items-center">
      <Head>
        <title></title>
      </Head>
      <div className="border-2 border-black p-4 rounded-lg shadow-main flex flex-col items-start">
        <h1 className="text-3xl font-semibold text-black mb-8">
          {request.songTitle}
        </h1>
        <span className="text-black font-normal text-xl mb-8 text-center">
          {request.User.name}
        </span>
        <span className="text-black font-normal text-xl mb-8 text-center">
          {request.preferences}
        </span>
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="id" value={request.id} />
          <button
            className={`text-xl w-full font-semibold rounded-lg shadow-main active:shadow-none hover:opacity-90 px-12 py-4 transition duration-200 ease-in-out bg-black text-white`}
          >
            Approve
          </button>{" "}
        </form>
      </div>
    </div>
  );
};

export default Request;

export const getServerSideProps = async (context) => {
  const { id } = context.query;
  const request = await prisma.post.findUnique({
    where: {
      id: id,
    },
    include: {
      User: true,
    },
  });
  return {
    props: {
      request: JSON.parse(JSON.stringify(request)),
    },
  };
};
