import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; 

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Brand */}
        <Link to="/" className="text-2xl font-bold">
          Quiz App
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/upcoming" className="hover:underline">
            Upcoming
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact Us
          </Link>
          <Link to="/about" className="hover:underline">
            About
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-blue-700 py-4 px-6">
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="hover:underline" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link to="/upcoming" className="hover:underline" onClick={() => setIsOpen(false)}>
              Upcoming
            </Link>
            <Link to="/contact" className="hover:underline" onClick={() => setIsOpen(false)}>
              Contact Us
            </Link>
            <Link to="/about" className="hover:underline" onClick={() => setIsOpen(false)}>
              About
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
