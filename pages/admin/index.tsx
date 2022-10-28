import type { NextPage } from "next";
import Link from "next/link";
import prisma from "../../lib/prisma";

const AdminPage: NextPage<{
  userCount: number;
  requestCount: number;
  queriesCount: number;
}> = ({
  userCount,
  requestCount,
  queriesCount,
}: {
  userCount: number;
  requestCount: number;
  queriesCount: number;
}) => {
  return (
    <div className="flex flex-col mx-auto lg:px-24 px-5 py-24 items-center">
      <h1 className="font-bold text-4xl text-black mb-8">Admin</h1>
      <div className="lg:grid grid-cols-2 lg:space-y-0 space-y-4 gap-4">
        <Link href="/admin/users">
          <a className="shadow-main border-2 border-black p-4 rounded-lg flex flex-col space-y-4">
            <div className="font-semibold text-3xl text-black">{userCount}</div>
            <div className="font-semibold text-3xl text-black">Users</div>
          </a>
        </Link>
        <Link href="/admin/requests">
          <a className="shadow-main border-2 border-black p-4 rounded-lg flex flex-col space-y-4">
            <div className="font-semibold text-3xl text-black">
              {requestCount}
            </div>
            <div className="font-semibold text-3xl text-black">Requests</div>
          </a>
        </Link>
        <Link href="/admin/queries">
          <a className="shadow-main border-2 border-black p-4 rounded-lg flex flex-col space-y-4">
            <div className="font-semibold text-3xl text-black">
              {queriesCount}
            </div>
            <div className="font-semibold text-3xl text-black">
              Contact Queries
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default AdminPage;

export async function getServerSideProps() {
  const userCount = await prisma.user.count();
  const requestCount = await prisma.post.count({
    where: {
      isApproved: false,
    },
  });
  const queriesCount = await prisma.contactQuery.count();
  return {
    props: {
      userCount,
      requestCount,
      queriesCount,
    },
  };
}
