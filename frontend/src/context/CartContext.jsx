import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item, quantity = 1, size = 'full') => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(
        i => i.id === item.id && i.size === size
      );

      if (existingItem) {
        return prevItems.map(i =>
          i.id === item.id && i.size === size
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }

      return [...prevItems, { ...item, quantity, size }];
    });
  };

  const removeFromCart = (itemId, size) => {
    setCartItems(prevItems => 
      prevItems.filter(item => !(item.id === itemId && item.size === size))
    );
  };

  const updateQuantity = (itemId, size, quantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId && item.size === size
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.size === 'half' ? item.price * 0.6 : item.price;
      return total + (price * item.quantity);
    }, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};