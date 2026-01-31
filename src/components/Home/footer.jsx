export default function Footer() {
  return (
    <footer className="relative z-10 bg-gray-300 px-6 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">CRIVO TECH</h2>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium transition-colors">
              Book a Meet
            </button>
            <a 
              href="#" 
              className="block mt-6 text-gray-700 underline hover:text-gray-900"
            >
              Apply to join
            </a>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <div className="space-y-2 text-gray-700">
              <p>info@crivo.in</p>
              <p>Tel: +91 93842 90323</p>
              <p className="italic">///radius.timesaver.poised</p>
            </div>
          </div>

          {/* Navigation Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Navigation</h3>
            <nav className="space-y-2">
              <a href="#" className="block text-gray-700 hover:text-gray-900">Product</a>
              <a href="#" className="block text-gray-700 hover:text-gray-900">About Us</a>
              <a href="#" className="block text-gray-700 hover:text-gray-900">Blogs</a>
              <a href="#" className="block text-gray-700 hover:text-gray-900">Reach Us</a>
            </nav>
          </div>

          {/* Follow Us Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <nav className="space-y-2">
              <a href="#" className="block text-gray-700 hover:text-gray-900">Instagram</a>
              <a href="#" className="block text-gray-700 hover:text-gray-900">Youtube</a>
              <a href="#" className="block text-gray-700 hover:text-gray-900">Linkedin</a>
              <a href="#" className="block text-gray-700 hover:text-gray-900">X</a>
            </nav>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Legal Links */}
            <div className="flex flex-wrap gap-6 text-gray-700">
              <a href="#" className="hover:text-gray-900">Privacy Policy</a>
              <a href="#" className="hover:text-gray-900">Terms & Conditions</a>
              <a href="#" className="hover:text-gray-900">Accessibility Statement</a>
            </div>

            {/* Copyright */}
            <p className="text-gray-700">© 2025 by Crivo</p>
          </div>
        </div>
      </div>

    </footer>
  );
}