import React from "react";
import { FaGithub, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white text-center py-4 mt-auto">
      <p>Created by Shiva</p>
      <div className="flex justify-center gap-4 mt-2">
        <a
          href="https://github.com/SHIVA-SINGHx"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400"
        >
          <FaGithub size={24} />
        </a>
        <a
          href="https://x.com/Shivatwd1"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400"
        >
          <FaTwitter size={24} />
        </a>
      </div>
    </footer>
  );
};

export default Footer; 
