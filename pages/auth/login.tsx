import React from "react";
import Layout from "../../components/Layout/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

    const email = target.email.value;
    const password = target.password.value;

    try {
      await axios.post("/api/auth/login", {
        email,
        password,
      });
      toast.success("Login successful");
      router.push("/");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Login">
      <ToastContainer />
      <div className="flex justify-center mx-auto px-5 pt-24 pb-8 lg:px-24">
        <div className="grid grid-cols-2 gap-4">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4 w-3/4 border-2 border-black shadow-main px-8 py-12 rounded-lg"
          >
            <h1 className="text-4xl font-medium mb-4">Login</h1>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="rounded-lg border-black border-2 p-4 w-full"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="rounded-lg border-black border-2 p-4 w-full"
            />
            <button
              type="submit"
              className={`text-xl font-semibold rounded-lg w-full mb-4 shadow-main active:shadow-none hover:opacity-90 px-12 py-4 transition duration-200 ease-in-out bg-black text-white`}
            >
              Login{" "}
            </button>{" "}
            <span className="mt-8 text-black font-normal">
              No account?{" "}
              <Link href="/auth/register">
                <a className="underline">Register</a>
              </Link>
            </span>
          </form>
          <div>
            <img src="/images/auth.svg" alt="login_hero" className="w-2/3" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
