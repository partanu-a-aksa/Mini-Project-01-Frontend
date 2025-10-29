export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* === Column 1: Brand === */}
        <div>
          <h2 className="text-2xl font-bold text-indigo-600 mb-3">
            Eventura<span className="text-gray-800">.</span>
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Eventura helps you organize, promote, and manage your events with
            ease. Empowering creators and communities to connect through
            experiences.
          </p>
        </div>

        {/* === Column 2: Company === */}
        <div>
          <h3 className="text-base font-semibold text-gray-800 mb-3">
            Company
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <a href="#" className="hover:text-indigo-600">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-indigo-600">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-indigo-600">
                Press
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-indigo-600">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* === Column 3: Resources === */}
        <div>
          <h3 className="text-base font-semibold text-gray-800 mb-3">
            Resources
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <a href="#" className="hover:text-indigo-600">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-indigo-600">
                Guides
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-indigo-600">
                Security
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-indigo-600">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        {/* === Column 4: Newsletter === */}
        <div>
          <h3 className="text-base font-semibold text-gray-800 mb-3">
            Stay Updated
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            Subscribe to our newsletter for event tips and updates.
          </p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* === Bottom Bar === */}
      <div className="border-t border-gray-200 py-6 mt-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Eventura. All rights reserved.</p>
          <div className="flex gap-4 mt-3 sm:mt-0">
            <a href="#" className="hover:text-indigo-600">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-indigo-600">
              Terms
            </a>
            <a href="#" className="hover:text-indigo-600">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
