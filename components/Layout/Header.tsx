// @ts-nocheck
import React from "react";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import type { User } from "@prisma/client";

const links: { name: string; url: string }[] = [
  {
    name: "home",
    url: "/",
  },
  {
    name: "contact us",
    url: "/contact",
  },
  {
    name: "sign in",
    url: "/auth/login",
  },
  {
    name: "marketplace",
    url: "/marketplace",
  },
];

const Header: React.FC<{ user: User }> = ({ user }: { user: User }) => {
  const [showNavbar, setShowNavbar] = React.useState(false);
  const router = useRouter();

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowNavbar(!showNavbar);
  };

  const handleLogout = () => {
    deleteCookie("user");
    router.push("/");
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white">
        <div className="flex p-5 px-8 lg:items-center lg:px-12">
          <Link href="/">
            <a className="text-3xl font-extrabold text-black">muse.</a>
          </Link>
          <button
            onClick={handleToggle}
            className="ml-auto flex items-center space-x-6 text-2xl text-black lg:hidden"
          >
            {showNavbar ? <ImCross /> : <GiHamburgerMenu />}
          </button>
          <div className="hidden space-x-6 lg:ml-auto lg:flex lg:items-center">
            {links.map((link) => (
              <Link key={link.name} href={link.url}>
                <p className="relative group cursor-pointer">
                  <a className="text-xl font-medium text-black">{link.name}</a>
                  <span className="absolute -bottom-1 left-1/2 w-0 h-1 duration-500 bg-neon transition-all group-hover:w-1/2"></span>
                  <span className="absolute -bottom-1 right-1/2 w-0 h-1 duration-500 bg-neon transition-all group-hover:w-1/2"></span>
                </p>
              </Link>
            ))}
          </div>
        </div>
        {showNavbar && (
          <div className="flex flex-col space-y-1 bg-primary-dark py-5 px-4 transition duration-200 ease-in-out lg:hidden">
            {links.map((link) => (
              <Link href={link.url} key={link.name}>
                <a className="rounded-md p-4 text-2xl font-medium text-black hover:bg-secondary-dark">
                  {link.name}
                </a>
              </Link>
            ))}
          </div>
        )}
      </header>
    </>
  );
};

export default Header;

export const getServerSideProps = async (ctx) => {
  const user = getCookie("user", ctx.req);

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  };
};
