import type { NextPage } from "next";
import React from "react";
import Layout from "../components/Layout/Layout";
import Button from "../components/Button";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const PostPage: NextPage = () => {
  const router = useRouter();
  React.useEffect(() => {
    if (!getCookie("user")) {
      router.push("/auth/login");
    }
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      songTitle: { value: string };
      preferences: { value: string };
      price: { value: number };
      card: { value: string };
    };

    const songTitle = target.songTitle.value;
    const preferences = target.preferences.value;
    const price = target.price.value;
    const card = target.card.value;
    const userId = getCookie("user");

    try {
      await axios.post("/api/post", {
        songTitle,
        preferences,
        price,
        card,
        userId,
      });
      toast.success("Post successful. Kindly check back later for a response");
      target.songTitle.value = "";
      target.preferences.value = "";
      target.price.value = 0;
      target.card.value = "";
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Post">
      <ToastContainer />
      <div className="flex flex-col items-center justify-center py-24 px-5">
        <form
          onSubmit={handleSubmit}
          className="border-black border-2 px-8 py-12 rounded-lg shadow-main flex flex-col"
        >
          <h1 className="text-4xl font-medium mb-8">Post NFT Request</h1>
          <div className="lg:grid lg:grid-cols-2 gap-8 space-y-4 lg:space-y-0 mb-8">
            <input
              name="songTitle"
              type="text"
              placeholder="Song Title"
              className="rounded-lg border-black border-2 p-4"
            />
            <div className="rounded-lg border-black border-2 p-4">
              <label htmlFor="fileUrl">Upload Song</label>
              <input
                name="fileUrl"
                id="fileUrl"
                type={`file`}
                style={{ visibility: "hidden" }}
                className=""
              />
            </div>
            <input
              name="price"
              type="text"
              placeholder="Price in $"
              className="rounded-lg border-black border-2 p-4"
            />
            <select
              name="card "
              id="card"
              className="rounded-lg border-black border-2 p-4"
            >
              <option value="">Card</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <textarea
            className="rounded-lg border-black border-2 p-4 mb-4"
            name="preferences"
            id="preferences"
            cols={30}
            rows={4}
            placeholder="Preferences"
          ></textarea>
          <button
            type="submit"
            className={`text-xl font-semibold rounded-lg w-full shadow-main active:shadow-none hover:opacity-90 px-12 py-4 transition duration-200 ease-in-out bg-black text-white`}
          >
            Submit{" "}
          </button>{" "}
        </form>
      </div>
    </Layout>
  );
};

export default PostPage;
