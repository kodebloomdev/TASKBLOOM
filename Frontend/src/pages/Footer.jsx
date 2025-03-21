import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#121E33] to-[#182B45] shadow-md py-2 flex items-center justify-center text-white">
      <p>&copy; {new Date().getFullYear()} Kodebloom. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
