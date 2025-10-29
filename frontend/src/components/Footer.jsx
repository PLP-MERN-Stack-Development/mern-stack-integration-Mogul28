import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white shadow-inner mt-10 py-4 text-center text-gray-500 text-sm">
      © {new Date().getFullYear()} MERN Blog. All rights reserved.
    </footer>
  );
};

export default Footer;
