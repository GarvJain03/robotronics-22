import React from "react";

const Button: React.FC<{ text: string }> = ({ text }: { text: string }) => {
  return (
    <button
      className={`text-xl font-semibold rounded-lg shadow-main active:shadow-none hover:opacity-90 px-12 py-4 transition duration-200 ease-in-out bg-black text-white`}
    >
      {text}
    </button>
  );
};

export default Button;
