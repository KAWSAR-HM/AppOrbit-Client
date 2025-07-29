import React from "react";
import {
  FaXTwitter,
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#0C121C] text-white py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section */}
        <div>
          <h1 className="text-2xl font-bold mb-2 text-white">AppOrbit</h1>
          <p className="text-sm text-gray-300">
            Discover and share the most innovative tech products. Join our
            community of tech enthusiasts and creators.
          </p>
          <div className="flex gap-4 mt-4 text-gray-300">
            <FaXTwitter className="hover:text-white cursor-pointer" />
            <FaLinkedinIn className="hover:text-white cursor-pointer" />
            <FaFacebookF className="hover:text-white cursor-pointer" />
            <FaInstagram className="hover:text-white cursor-pointer" />
          </div>
        </div>

        {/* Center Section - Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a href="/" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/products" className="hover:text-white">
                Products
              </a>
            </li>
            <li>
              <a href="/submit-product" className="hover:text-white">
                Submit Product
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Right Section - Legal */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Legal</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a href="/terms" className="hover:text-white">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/cookies" className="hover:text-white">
                Cookie Policy
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-400">
        © 2025 AppOrbit. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
