import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';




// You can replace these with your preferred icon library (e.g., Heroicons, React Icons)
const HamburgerIcon = () => (
  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
);


export default function Header(cartCount) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
 console.log("header :", cartCount.cartCount)
 const count = cartCount.cartCount;
  return (
   <nav className="bg-pink-50   shadow-md sticky top-0 z-50 rounded-xl w-full overflow-x-hidden">
  <div className="w-screen mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex  items-center h-16 gap-[100px]">
      {/* Logo */}
      <div className="flex items-center">
        <a href="#" className="text-2xl font-bold text-pink-600">
          📚 Bookworm Babies
        </a>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex md:items-center md:space-x-8">
        <a href="#" className="text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Home</a>
        <a href="#" className="text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Shop by Age</a>
        <a href="#" className="text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Bestsellers</a>
        <a href="#" className="text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">About Us</a>
      </div>

      <div className='hidden md:flex md:items-center '>
         <button onClick={() => navigate("/addToCart")}  className="!bg-transparent !border-0 !shadow-none p-0">
            <i className="fa-solid fa-cart-shopping text-pink-600 text-3xl !bg-transparent !shadow-none" />
            {count > 0 && (
          <span className="bg-pink-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
            {count}
          </span>
        )}
        </button>
         {/* badge */}
        

      </div>
      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-600 hover:text-pink-600 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500"
          aria-label="Main menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <CloseIcon /> : <HamburgerIcon />}
        </button>
      </div>
    </div>
  </div>

  {/* Mobile Menu */}
  {isOpen && (
    <div className="md:hidden bg-pink-50 shadow-lg">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <a href="#" className="text-gray-700 hover:text-pink-600 hover:bg-pink-100 block px-3 py-2 rounded-md text-base font-medium">Home</a>
        <a href="#" className="text-gray-700 hover:text-pink-600 hover:bg-pink-100 block px-3 py-2 rounded-md text-base font-medium">Shop by Age</a>
        <a href="#" className="text-gray-700 hover:text-pink-600 hover:bg-pink-100 block px-3 py-2 rounded-md text-base font-medium">Bestsellers</a>
        <a href="#" className="text-gray-700 hover:text-pink-600 hover:bg-pink-100 block px-3 py-2 rounded-md text-base font-medium">About Us</a>
      </div>
    </div>
  )}
</nav>

  );
}