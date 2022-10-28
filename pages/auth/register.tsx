import React from "react";
import Button from "../../components/Button";
import Layout from "../../components/Layout/Layout";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";
import type { NextPage } from "next";
import { getCookie } from "cookies-next";

const Register: NextPage = () => {
  const router = useRouter();

  React.useEffect(() => {
    if (getCookie("user")) {
      router.push("/");
    }
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      username: { value: string };
      email: { value: string };
      password: { value: string };
      name: { value: string };
    };

    const username = target.username.value;
    const email = target.email.value;
    const password = target.password.value;
    const name = target.name.value;

    try {
      await axios.post("/api/auth/register", {
        username,
        email,
        password,
        name,
      });
      toast.success("Account created successfully");
      router.push("/auth/login");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Register">
      <ToastContainer />
      <div className="flex justify-center mx-auto px-5 pt-24 pb-8 lg:px-24">
        <form
          onSubmit={handleSubmit}
          className=" border-2 border-black shadow-main px-8 py-12 w-2/4 rounded-lg"
        >
          <h1 className="text-4xl font-medium mb-4">Register</h1>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <input
              name="name"
              type="text"
              placeholder="Name"
              className="rounded-lg border-black border-2 p-4"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="rounded-lg border-black border-2 p-4"
            />
            <input
              name="username"
              type="text"
              placeholder="Username"
              className="rounded-lg border-black border-2 p-4"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="rounded-lg border-black border-2 p-4"
            />
          </div>{" "}
          <button
            type="submit"
            className={`text-xl font-semibold rounded-lg w-full mb-4 shadow-main active:shadow-none hover:opacity-90 px-12 py-4 transition duration-200 ease-in-out bg-black text-white`}
          >
            Register{" "}
          </button>{" "}
          <span className="mt-8 text-black font-normal">
            Have an account?{" "}
            <Link href="/auth/login">
              <a className="underline">Login</a>
            </Link>
          </span>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
