import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";

// Icons
const HamburgerIcon = () => (
  <svg
    className="block h-6 w-6"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    className="block h-6 w-6"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

export default function Header() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [openType, setOpenType] = useState(false); // dropdown toggle
  const [openAge, setOpenAge] = useState(false); // dropdown toggle

  const { cartBooks } = useCart();
  const { searchQuery, setSearchQuery, searchType, setSearchType, searchAge, setSearchAge } = useSearch();
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const count = cartBooks.length;

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (menuRef.current &&
      !menuRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)) {
      setIsOpen(false);
      console.log("Clicked outside, closing menu.");
    }
  };

  if (isOpen) {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
    document.removeEventListener("touchstart", handleClickOutside);
  };
}, [isOpen]);

  return (
    <nav className="bg-pink-50 shadow-md sticky top-0 z-50 rounded-xl w-full overflow-visible">
      <div className="w-screen mx-auto px-4 sm:px-6 lg:px-8">
        {/* AUTO HEIGHT NAVBAR */}
        <div className="flex items-center min-h-16 py-3 gap-[100px]">

          {/* Desktop Nav */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link
              onClick={() => {searchAge(""); searchQuery(""); searchType("")}}
              to="/"
              className="text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>

            <div className="relative">
              <button
                onClick={() => setOpenAge(!openAge)}
                className="text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Shop by Age
              </button>

              {openAge && (
                <div className="absolute left-0 top-full mt-1 min-w-[10rem] bg-white border shadow-lg rounded-md z-50 max-h-60 overflow-auto">
                  <div
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => {
                      setSearchAge("0-3");
                      setOpenAge(false);
                    }}
                  >
                    0-3 years
                  </div>

                  <div
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => {
                      setSearchAge("4-7");
                      setOpenAge(false);
                    }}
                  >
                    4-7 years
                  </div>

                  <div
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => {
                      setSearchAge("8-12");
                      setOpenAge(false);
                    }}
                  >
                    8-12 years
                  </div>
                </div>
              )}
            </div>

            {/* DROPDOWN FILTER */}
            <div className="relative">
              <button
                onClick={() => setOpenType(!openType)}
                className="text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Type
              </button>

              {openType && (
                <div className="absolute left-0 top-full mt-1 min-w-[10rem] bg-white border shadow-lg rounded-md z-50 max-h-60 overflow-auto">
                  <div
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => {
                      setSearchType("Story");
                      setOpenType(false);
                    }}
                  >
                    Story
                  </div>

                  <div
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => {
                      setSearchType("Education");
                      setOpenType(false);
                    }}
                  >
                    Education
                  </div>

                  <div
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => {
                      setSearchType("Novel");
                      setOpenType(false);
                    }}
                  >
                    Novel
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/"
              className="text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              About Us
            </Link>
          </div>

          {/* Cart + Search */}
          <div className="flex md:items-center space-x-4">
            {/* Cart */}
            <div className="relative">
              <button
                onClick={() => navigate("/addToCart")}
                className="relative p-1"
              >
                <i className="fa-solid fa-cart-shopping text-pink-600 text-3xl" />
                {count > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
                    {count}
                  </span>
                )}
              </button>
            </div>

            {/* Search */}
            <input
              value={searchQuery}
              type="search"
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search books..."
              className="border border-pink-100 rounded-full px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
            />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center mx-[-30px]">
            <button
              ref={buttonRef}
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-pink-600 p-2 rounded-md focus:ring-2 focus:ring-pink-500"
            >
              {isOpen ? <CloseIcon /> : <HamburgerIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu: hamburger opens a panel that mirrors desktop nav with expandable submenus */}
      {isOpen && (
        <div  ref={menuRef} className="md:hidden bg-pink-50 shadow-lg">
          <div className="px-4 pt-3 pb-4 space-y-2">
            <Link
              onClick={() => { setIsOpen(false); searchAge(""); setSearchQuery(""); setSearchType(""); }}
              to="/"
              className="block px-3 py-2 text-left text-gray-700 hover:bg-pink-100 rounded-md"
            >
              Home
            </Link>

            {/* Shop by Age (expandable in mobile) */}
            <div>
              <button
                onClick={() => setOpenAge(!openAge)}
                className="w-full text-left px-3 py-2 text-gray-700 hover:bg-pink-100 rounded-md"
              >
                Shop by Age
              </button>

              {openAge && (
                <div className="mt-1 ml-4 border-l pl-3">
                  <button
                    onClick={() => { setSearchAge("0-3"); setIsOpen(false); setOpenAge(false); }}
                    className="block w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    0-3 years
                  </button>

                  <button
                    onClick={() => { setSearchAge("4-7"); setIsOpen(false); setOpenAge(false); }}
                    className="block w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    4-7 years
                  </button>

                  <button
                    onClick={() => { setSearchAge("8-12"); setIsOpen(false); setOpenAge(false); }}
                    className="block w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    8-12 years
                  </button>
                </div>
              )}
            </div>

            {/* Type (expandable in mobile) */}
            <div>
              <button
                onClick={() => setOpenType(!openType)}
                className="w-full text-left px-3 py-2 text-gray-700 hover:bg-pink-100 rounded-md"
              >
                Type
              </button>

              {openType && (
                <div className="mt-1 ml-4 border-l pl-3">
                  <button
                    onClick={() => { setSearchType("Story"); setIsOpen(false); setOpenType(false); }}
                    className="block w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Story
                  </button>

                  <button
                    onClick={() => { setSearchType("Education"); setIsOpen(false); setOpenType(false); }}
                    className="block w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Education
                  </button>

                  <button
                    onClick={() => { setSearchType("Novel"); setIsOpen(false); setOpenType(false); }}
                    className="block w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Novel
                  </button>
                </div>
              )}
            </div>

            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-left text-gray-700 hover:bg-pink-100 rounded-md"
            >
              About Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
