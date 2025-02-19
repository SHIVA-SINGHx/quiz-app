import React from "react";
import { Link } from "react-router";

const Header = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white p-4 shadow-lg fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-8">
        <Link to="/" className="text-2xl font-bold tracking-wide transition-all hover:scale-105">Quiz App</Link>
        <ul className="hidden md:flex space-x-6 text-lg">
          <li>
            <Link to="/" className="hover:text-gray-200 transition-all">Home</Link>
          </li>
          <li>
            <Link to="/upcoming" className="hover:text-gray-200 transition-all">Upcoming</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-200 transition-all">About</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-gray-200 transition-all">Contact Us</Link>
          </li>
        </ul>
        <button className="md:hidden p-2 rounded-md focus:outline-none" id="mobile-menu-button">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
      {/* Mobile Menu */}
      <div className="md:hidden hidden bg-blue-600 p-4" id="mobile-menu">
        <ul className="flex flex-col space-y-4 text-center text-lg">
          <li>
            <Link to="/" className="block py-2 hover:text-gray-200">Home</Link>
          </li>
          <li>
            <Link to="/upcoming" className="block py-2 hover:text-gray-200">Upcoming</Link>
          </li>
          <li>
            <Link to="/about" className="block py-2 hover:text-gray-200">About</Link>
          </li>
          <li>
            <Link to="/contact" className="block py-2 hover:text-gray-200">Contact Us</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
