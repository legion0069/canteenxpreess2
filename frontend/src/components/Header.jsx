import React from 'react';
import { Menu as MenuIcon, ShoppingBag, User, LogOut, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="fixed w-full top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <MenuIcon className="h-6 w-6 text-orange-500 md:hidden" />
            <Link to="/" className="text-2xl font-bold text-orange-500 ml-2">
              CanteenXpress
            </Link>
            {!isAuthenticated && (
              <Link to="/admin/register" className="ml-4 flex items-center text-gray-600 hover:text-orange-500">
                <Shield className="h-5 w-5 mr-1" />
                <span className="text-sm">Admin</span>
              </Link>
            )}
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-orange-500">Home</Link>
            <Link to="/menu" className="text-gray-700 hover:text-orange-500">Menu</Link>
            <Link to="/contact" className="text-gray-700 hover:text-orange-500">Contact</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingBag className="h-6 w-6 text-gray-700 hover:text-orange-500 cursor-pointer" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            
            {isAuthenticated ? (
              <div className="relative group">
                <div className="flex items-center cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                    <span className="font-bold text-orange-500">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link 
                    to={user.role === 'admin' ? '/admin' : '/dashboard'} 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {user.role === 'admin' ? 'Admin Dashboard' : 'Dashboard'}
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <div className="flex items-center">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign out
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login">
                <User className="h-6 w-6 text-gray-700 hover:text-orange-500 cursor-pointer" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;