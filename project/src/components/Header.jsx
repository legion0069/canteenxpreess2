import React from 'react';
import { Menu, ShoppingBag, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="fixed w-full top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Menu className="h-6 w-6 text-orange-500 md:hidden" />
            <h1 className="text-2xl font-bold text-orange-500 ml-2">CanteenXpress</h1>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-700 hover:text-orange-500">Home</a>
            <a href="#features" className="text-gray-700 hover:text-orange-500">Features</a>
            <a href="#menu" className="text-gray-700 hover:text-orange-500">Menu</a>
            <a href="#contact" className="text-gray-700 hover:text-orange-500">Contact</a>
          </nav>

          <div className="flex items-center space-x-4">
            <ShoppingBag className="h-6 w-6 text-gray-700 hover:text-orange-500 cursor-pointer" />
            <User className="h-6 w-6 text-gray-700 hover:text-orange-500 cursor-pointer" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;