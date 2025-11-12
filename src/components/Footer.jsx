// Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-pink-50 border-t border-pink-200 rounded-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand / About */}
          <div>
            <h2 className="text-2xl font-bold text-pink-600 mb-2">📚 Bookworm Babies</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Nurturing a love for reading from an early age.  
              Explore our collection of storybooks made for little dreamers!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-pink-600 transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pink-600 transition-colors">Shop by Age</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pink-600 transition-colors">Bestsellers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pink-600 transition-colors">About Us</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-pink-600 transition-colors">FAQs</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pink-600 transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pink-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pink-600 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-3">Join Our Newsletter</h3>
            <p className="text-gray-600 text-sm mb-3">
              Stay updated with the latest book releases and special offers!
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
              />
              <button
                type="submit"
                className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-pink-200 sm:flex-row pt-7 items-center text-sm text-gray-500">
          <p className="text-center">© {new Date().getFullYear()} Bookworm Babies. All rights reserved.</p>
          {/* <div className="flex space-x-4 mt-3 sm:mt-0">
            <a href="#" aria-label="Facebook" className="hover:text-pink-600">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-pink-600">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-pink-600">
              <i className="fab fa-twitter"></i>
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
