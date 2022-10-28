import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";

const ContactForm: React.FC = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      name: { value: string };
      email: { value: string };
      message: { value: string };
    };

    const name = target.name.value;
    const email = target.email.value;
    const message = target.message.value;

    try {
      await axios.post("/api/contact", {
        name,
        email,
        message,
      });
      toast.success("Post successful. Kindly check back later for a response");
      target.name.value = "";
      target.email.value = "";
      target.message.value = "";
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="border-black border-2 px-8 py-12 rounded-lg shadow-main flex flex-col"
    >
      <div className="lg:grid lg:grid-cols-2 gap-8 space-y-4 lg:space-y-0 mb-8">
        <div className="flex flex-col space-y-4">
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
        </div>
        <div>
          <textarea
            className="rounded-lg border-black border-2 p-4"
            name="message"
            id="message"
            cols={30}
            rows={4}
            placeholder="Message"
          ></textarea>
        </div>
      </div>
      <button
        type="submit"
        className={`text-xl font-semibold rounded-lg shadow-main active:shadow-none hover:opacity-90 px-12 py-4 transition duration-200 ease-in-out bg-black text-white`}
      >
        Submit
      </button>{" "}
    </form>
  );
};

export default ContactForm;
