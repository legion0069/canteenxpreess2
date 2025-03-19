import React from 'react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { isAuthenticated, user } = useAuth();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  const deliveryFee = 40;
  const total = getCartTotal() + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center py-16">
            <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              to="/menu"
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-orange-500 hover:bg-orange-600"
            >
              View Menu
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="md:col-span-2 space-y-4">
              {cartItems.map((item) => {
                const itemPrice = item.size === 'half' ? item.price * 0.6 : item.price;
                return (
                  <div key={`${item.id}-${item.size}`} className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="ml-4 flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                            <p className="text-sm text-gray-500">{item.category}</p>
                            {item.size === 'half' && (
                              <span className="inline-block px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">
                                Half Portion
                              </span>
                            )}
                          </div>
                          <span className="text-lg font-semibold text-gray-900">
                            ₹{(itemPrice * item.quantity).toFixed(2)}
                          </span>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                              className="p-1 rounded-md hover:bg-gray-100"
                            >
                              <Minus className="h-4 w-4 text-gray-600" />
                            </button>
                            <span className="text-gray-900 font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                              className="p-1 rounded-md hover:bg-gray-100"
                            >
                              <Plus className="h-4 w-4 text-gray-600" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id, item.size)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-md p-6 h-fit">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900 font-medium">₹{getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="text-gray-900 font-medium">₹{deliveryFee.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-gray-900 font-semibold">Total</span>
                    <span className="text-orange-500 font-bold">₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {isAuthenticated ? (
                <button
                  className="w-full mt-6 bg-orange-500 text-white py-3 px-4 rounded-md hover:bg-orange-600 transition-colors flex items-center justify-center"
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              ) : (
                <div className="mt-6 space-y-4">
                  <Link
                    to="/login"
                    className="w-full bg-orange-500 text-white py-3 px-4 rounded-md hover:bg-orange-600 transition-colors flex items-center justify-center"
                  >
                    Login to Checkout
                  </Link>
                  <p className="text-sm text-gray-500 text-center">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-orange-500 hover:text-orange-600">
                      Sign up
                    </Link>
                  </p>
                </div>
              )}

              {isAuthenticated && user?.classroomAddress && (
                <div className="mt-6 p-4 bg-gray-50 rounded-md">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Delivery Address</h3>
                  <p className="text-sm text-gray-600">{user.classroomAddress}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;