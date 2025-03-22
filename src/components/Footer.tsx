import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/container';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* First Section - About Us */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-4">About Us</h4>
            <p className="text-sm text-gray-500">
              We are dedicated to providing high-quality products and exceptional customer service.
              Learn more about our story and mission.
            </p>
            <ul className="mt-4 flex space-x-4">
              <li>
                <a href="#" className="text-gray-500 hover:text-gray-600 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-gray-600 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-gray-600 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-gray-600 transition-colors">
                  <Youtube className="h-5 w-5" />
                </a>
              </li>
            </ul>
          </div>

          {/* Second Section - Customer Service */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-4">Customer Service</h4>
            <ul>
              <li className="mb-2">
                <Link to="/contact" className="text-sm text-gray-500 hover:text-gray-600 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/shipping" className="text-sm text-gray-500 hover:text-gray-600 transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/faq" className="text-sm text-gray-500 hover:text-gray-600 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Third Section - Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-4">Quick Links</h4>
            <ul>
              <li className="mb-2">
                <Link to="/products" className="text-sm text-gray-500 hover:text-gray-600 transition-colors">
                  Shop Products
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/wishlist" className="text-sm text-gray-500 hover:text-gray-600 transition-colors">
                  View Wishlist
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/cart" className="text-sm text-gray-500 hover:text-gray-600 transition-colors">
                  View Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Fourth Section - Stay Connected */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-4">Stay Connected</h4>
            <p className="text-sm text-gray-500">
              Subscribe to our newsletter for the latest updates and exclusive offers.
            </p>
            <div className="mt-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="mt-12 text-center">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} E-Commerce Store. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
