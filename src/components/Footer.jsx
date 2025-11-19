// Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-background border-t border-secondary rounded-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand / About */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-2">📚 Bookworm Babies</h2>
            <p className="text-secondary text-sm leading-relaxed">
              Nurturing a love for reading from an early age.  
              Explore our collection of storybooks made for little dreamers!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-secondary font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-secondary hover:text-primary transition-colors">Home</a></li>
              <li><a href="#" className="text-secondary hover:text-primary transition-colors">Shop by Age</a></li>
              <li><a href="#" className="text-secondary hover:text-primary transition-colors">Bestsellers</a></li>
              <li><a href="#" className="text-secondary hover:text-primary transition-colors">About Us</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-secondary font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-secondary hover:text-primary transition-colors">FAQs</a></li>
              <li><a href="#" className="text-secondary hover:text-primary transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="text-secondary hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-secondary hover:text-primary transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-secondary font-semibold mb-3">Join Our Newsletter</h3>
            <p className="text-secondary text-sm mb-3">
              Stay updated with the latest book releases and special offers!
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
              <button
                type="submit"
                className="bg-secondary hover:bg-primary text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-secondary sm:flex-row pt-7 items-center text-sm text-secondary">
          <p className="text-center">© {new Date().getFullYear()} Bookworm Babies. All rights reserved.</p>
  
        </div>
      </div>
    </footer>
  );
}
