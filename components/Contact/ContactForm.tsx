import React from "react";
import { HiOutlineMail, HiPhone, HiLocationMarker } from "react-icons/hi";
import Button from "../Button";

const ContactForm: React.FC = () => {
  return (
    <div className="border-black border-2 px-8 py-12 rounded-lg shadow-main flex flex-col">
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
      <Button text="Submit" />
    </div>
  );
};

export default ContactForm;
