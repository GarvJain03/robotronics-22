// @ts-nocheck
import type { NextPage } from "next";
import prisma from "../../../lib/prisma";
import Head from "next/head";
import Link from "next/link";
import type { Post } from "@prisma/client";

const AdminRequests: NextPage<{ requests: Post }> = ({
  requests,
}: {
  requests: Post;
}) => {
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
              <th className="px-4 py-2">Posted By</th>
              <th className="px-4 py-2">Open</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr key={request.id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{request.songTitle}</td>
                <td className="border px-4 py-2">{request.User.name}</td>
                <Link href={`/admin/requests/${request.id}`}>
                  <a>
                    <td className="border px-4 py-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </td>
                  </a>
                </Link>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRequests;

export async function getServerSideProps() {
  const requests = await prisma.post.findMany({
    include: {
      User: true,
    },
    where: {
      isApproved: false,
    },
  });
  return {
    props: {
      requests: JSON.parse(JSON.stringify(requests)),
    },
  };
}
