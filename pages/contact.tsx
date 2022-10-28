import type { NextPage } from "next";
import ContactForm from "../components/Contact/ContactForm";
import Layout from "../components/Layout/Layout";

const Contact: NextPage = () => {
  return (
    <Layout title="Contact Us">
      <div className="flex flex-col items-center justify-center py-24 px-5">
        <h1 className="lg:text-4xl text-3xl font-medium text-black mb-4">
          Have Any Questions?
        </h1>
        <span className="text-black font-normal text-xl mb-12 text-center">
          contact us on our socials or through the form below
        </span>
        <ContactForm />
      </div>
    </Layout>
  );
};

export default Contact;
