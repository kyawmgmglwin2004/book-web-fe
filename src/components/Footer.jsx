import React from "react";
import { useNavigate } from "react-router-dom";

export default function Footer() {

  const navigate = useNavigate();
  return (
    <footer className="bg-gradient-to-br from-gray-50 to-gray-100 border-t border-text-gray-500 rounded-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand / About */}
          <div>
            <h2 className="text-2xl font-bold text-text-gray-500 mb-2">📚 Bookworm Babies</h2>
            <p className="text-text-gray-500 text-sm leading-relaxed">
              Nurturing a love for reading from an early age.  
              Explore our collection of storybooks made for little dreamers!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-text-gray-500 font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => navigate("/")} className="text-text-gray-500 hover:text-indigo-600 transition-colors">Home</button></li>
              <li><button onClick={() => navigate("/")} className="text-text-gray-500 hover:text-indigo-600 transition-colors">Shop by Age</button></li>
              <li><button onClick={() => navigate("/")} className="text-text-gray-500 hover:text-indigo-600 transition-colors">Shop by Type</button></li>
              <li><button onClick={() => navigate("/about")} className="text-text-gray-500 hover:text-indigo-600 transition-colors">About Us</button></li>
            </ul>
          </div>

          {/* Support */}
          {/* <div>
            <h3 className="text-text-gray-500 font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-text-gray-500 hover:text-indigo-600 transition-colors">FAQs</a></li>
              <li><a href="#" className="text-text-gray-500 hover:text-indigo-600 transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="text-text-gray-500 hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-text-gray-500 hover:text-indigo-600 transition-colors">Contact Us</a></li>
            </ul>
          </div> */}

          {/* Newsletter */}
          <div>
            <h3 className="text-text-gray-500 font-semibold mb-3">Join Our Newsletter</h3>
            <p className="text-text-gray-500 text-sm mb-3">
              Stay updated with the latest book releases and special offers!
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-text-gray-500 sm:flex-row pt-7 items-center text-sm text-text-gray-500">
          <p className="text-center">© {new Date().getFullYear()} Bookworm Babies. All rights reserved.</p>
  
        </div>
      </div>
    </footer>
  );
}
