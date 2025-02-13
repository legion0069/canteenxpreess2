import React from 'react';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-orange-500 mb-4">CanteenXpress</h3>
            <p className="text-gray-400">Bringing delicious meals directly to your classroom.</p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-400 hover:text-orange-500">About Us</a></li>
              <li><a href="#menu" className="text-gray-400 hover:text-orange-500">Menu</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-orange-500">Contact</a></li>
              <li><a href="#faq" className="text-gray-400 hover:text-orange-500">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Malla Reddy University</li>
              <li>Main Cafeteria</li>
              <li>Phone: +91 7013162615</li>
              <li>Email: tejaverukonda@gmail.com</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} CanteenXpress. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

