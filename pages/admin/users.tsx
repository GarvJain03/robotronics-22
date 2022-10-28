// @ts-nocheck
import type { NextPage } from "next";
import Head from "next/head";
import prisma from "../../lib/prisma";
import type { User } from "@prisma/client";
import Link from "next/link";
// import Layout from "../../../components/Layout/Layout";

const UsersPage: NextPage<{ users: User }> = ({ users }: { users: User }) => {
  return (
    <div className="flex flex-col mx-auto lg:px-24 px-5 py-24 items-center">
      <Head>
        <title>Users</title>
      </Head>
      <div className="flex flex-col items-start">
        <Link href="/admin">
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mb-8 font-semibold"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </a>
        </Link>

        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.username}</td>
                <td className="border px-4 py-2">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;

export async function getServerSideProps() {
  const users = await prisma.user.findMany();
  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
    },
  };
}
