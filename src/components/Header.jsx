
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";
import { FiSearch, FiShoppingCart, FiMenu, FiX, FiChevronDown } from "react-icons/fi";

// --- Reusable Dropdown Component (Self-Contained) ---
const Dropdown = ({ title, items, isOpen, onToggle, onSelect }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (isOpen) onToggle(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onToggle]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => onToggle(!isOpen)} className="flex items-center gap-1 text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
        {title}
        <FiChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="absolute left-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-50">
            {items.map((item) => (
              <button key={item.value} onClick={() => { onSelect(item.value); onToggle(false); }} className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 first:rounded-t-lg last:rounded-b-lg transition-colors">
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Header() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [isDesktopAgeOpen, setIsDesktopAgeOpen] = useState(false);
  const [isDesktopTypeOpen, setIsDesktopTypeOpen] = useState(false);
  const [isMobileAgeOpen, setIsMobileAgeOpen] = useState(false);
  const [isMobileTypeOpen, setIsMobileTypeOpen] = useState(false);

  const { cartBooks } = useCart();
  const { searchQuery, setSearchQuery, searchType, setSearchType, searchAge, setSearchAge } = useSearch();

  const cartItemCount = cartBooks.length;

  const ageOptions = [{ label: "0-3 years", value: "0-3" }, { label: "4-7 years", value: "4-7" }, { label: "8-12 years", value: "8-12" }];
  const typeOptions = [{ label: "Story", value: "Story" }, { label: "Education", value: "Education" }, { label: "Novel", value: "Novel" }];

  // Function to ONLY close the mobile menu and its sub-states
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileAgeOpen(false);
    setIsMobileTypeOpen(false);
  };

  // Function to reset search and navigate (for main links)
  const handleNavigationClick = () => {
    setSearchAge("");
    setSearchQuery("");
    setSearchType("");
    closeMobileMenu();
  };

  return (
    <>
      <nav className="bg-gradient-to-br from-gray-50 to-gray-100 backdrop-blur-md shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link to="/" onClick={handleNavigationClick} className="text-2xl font-bold text-indigo-600">Bookworm Babies</Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" onClick={handleNavigationClick} className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Home</Link>
              <Dropdown title="Shop by Age" items={ageOptions} isOpen={isDesktopAgeOpen} onToggle={setIsDesktopAgeOpen} onSelect={setSearchAge} />
              <Dropdown title="Type" items={typeOptions} isOpen={isDesktopTypeOpen} onToggle={setIsDesktopTypeOpen} onSelect={setSearchType} />
              <Link to="/about" onClick={handleNavigationClick} className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">About Us</Link>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative flex items-center">
                <FiSearch className="absolute left-3 text-gray-400" />
                <input type="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search books..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
              </div>
              <button onClick={() => navigate("/addToCart")} className="relative p-2 text-gray-700 hover:text-indigo-600 transition-colors duration-200">
                <FiShoppingCart className="h-6 w-6" />
                {cartItemCount > 0 && (<span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{cartItemCount}</span>)}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100"><FiMenu className="h-6 w-6" /></button>
            </div>
          </div>
        </div>
      </nav>

      {/* Slide-in Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div className="fixed inset-0 z-40 bg-black/25 md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeMobileMenu} />
            <motion.div className="fixed top-0 right-0 z-50 h-full w-full max-w-xs bg-white shadow-xl md:hidden" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}>
              <div className="flex items-center justify-between p-4 border-b">
                <span className="text-lg font-semibold text-indigo-600">Menu</span>
                <button onClick={closeMobileMenu} className="p-2 rounded-md text-gray-400 hover:text-gray-500"><FiX className="h-6 w-6" /></button>
              </div>

              <div className="p-4 space-y-1">
                {/* --- FIX: Mobile Search with refined behavior --- */}
                <div className="relative flex items-center mb-4">
                  <FiSearch className="absolute left-3 text-gray-400" />
                  <input
                    type="search"
                    value={searchQuery}
                    // --- FIX: Only update query on change, do not close menu ---
                    onChange={(e) => setSearchQuery(e.target.value)}
                    // --- FIX: Close menu only when "Enter" is pressed ---
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        closeMobileMenu();
                      }
                    }}
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <Link to="/" onClick={handleNavigationClick} className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">Home</Link>
                
                {/* Mobile "Shop by Age" */}
                <div>
                  <button onClick={() => setIsMobileAgeOpen(!isMobileAgeOpen)} className="w-full flex items-center justify-between px-4 py-3 text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">
                    Shop by Age
                    <FiChevronDown className={`h-5 w-5 transition-transform ${isMobileAgeOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isMobileAgeOpen && (
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                        {ageOptions.map((item) => (
                          <button key={item.value} onClick={() => { setSearchAge(item.value); closeMobileMenu(); }} className="block w-full text-left pl-10 pr-4 py-2 text-sm text-gray-600 hover:text-indigo-600">{item.label}</button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile "Type" */}
                <div>
                  <button onClick={() => setIsMobileTypeOpen(!isMobileTypeOpen)} className="w-full flex items-center justify-between px-4 py-3 text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">
                    Type
                    <FiChevronDown className={`h-5 w-5 transition-transform ${isMobileTypeOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isMobileTypeOpen && (
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                        {typeOptions.map((item) => (
                          <button key={item.value} onClick={() => { setSearchType(item.value); closeMobileMenu(); }} className="block w-full text-left pl-10 pr-4 py-2 text-sm text-gray-600 hover:text-indigo-600">{item.label}</button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link to="/about" onClick={handleNavigationClick} className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">About Us</Link>
                
                <button onClick={() => { navigate("/addToCart"); closeMobileMenu(); }} className="w-full flex items-center justify-center gap-3 px-4 py-3 mt-4 text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors">
                  <FiShoppingCart className="h-5 w-5" /> View Cart ({cartItemCount})
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}