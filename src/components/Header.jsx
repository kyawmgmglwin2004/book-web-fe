import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';




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


export default function Header() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { cartBooks } = useCart();
  const count = cartBooks.length;

  return (
   <nav className="bg-pink-50   shadow-md sticky top-0 z-50 rounded-xl w-full overflow-x-hidden">
  <div className="w-screen mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex  items-center h-16 gap-[100px]">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/" className="text-2xl font-bold text-pink-600">
          📚 Bookworm Babies
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex md:items-center md:space-x-8">
        <Link to="/" className="text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Home</Link>
        <Link to="/" className="text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Shop by Age</Link>
        <Link to="/" className="text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Bestsellers</Link>
        <Link to="/" className="text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">About Us</Link>
      </div>

      <div className='hidden md:flex md:items-center space-x-4'>
        <div className="relative">
          <button onClick={() => navigate('/addToCart')} className="relative p-1">
            <i className="fa-solid fa-cart-shopping text-pink-600 text-3xl" />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
                {count}
              </span>
            )}
          </button>
        </div>
        <input
          type="search"
          placeholder="Search books..."
          className="hidden md:inline-block border border-pink-100 rounded-full px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
        />
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
        <Link to="/" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-pink-600 hover:bg-pink-100 block px-3 py-2 rounded-md text-base font-medium">Home</Link>
        <Link to="/" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-pink-600 hover:bg-pink-100 block px-3 py-2 rounded-md text-base font-medium">Shop by Age</Link>
        <Link to="/" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-pink-600 hover:bg-pink-100 block px-3 py-2 rounded-md text-base font-medium">Bestsellers</Link>
        <Link to="/" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-pink-600 hover:bg-pink-100 block px-3 py-2 rounded-md text-base font-medium">About Us</Link>
        <button onClick={() => { setIsOpen(false); navigate('/addToCart'); }} className="w-full text-left px-3 py-2 text-gray-700 hover:text-pink-600 hover:bg-pink-100 rounded-md">View Cart ({count})</button>
      </div>
    </div>
  )}
</nav>

  );
}