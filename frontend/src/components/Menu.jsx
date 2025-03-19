import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Plus, Minus } from 'lucide-react';

const categories = [
  'South Indian',
  'North Indian',
  'Chinese',
  'Beverages',
  'Snacks',
  'Desserts'
];

const menuItems = [
  // South Indian Items
  {
    id: 1,
    name: 'Masala Dosa',
    description: 'Crispy rice crepe filled with spiced potato mixture',
    price: 80,
    image: 'https://images.unsplash.com/photo-1630410364547-5bb6d31c8c42?auto=format&fit=crop&q=80',
    category: 'South Indian',
    type: 'Breakfast'
  },
  {
    id: 2,
    name: 'Idli Sambar',
    description: 'Steamed rice cakes served with lentil soup and chutneys',
    price: 60,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80',
    category: 'South Indian',
    type: 'Breakfast'
  },
  
  // North Indian Items
  {
    id: 3,
    name: 'Butter Chicken',
    description: 'Tender chicken in rich tomato-based curry',
    price: 220,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80',
    category: 'North Indian',
    type: 'Main Course'
  },
  {
    id: 4,
    name: 'Paneer Butter Masala',
    description: 'Cottage cheese in creamy tomato gravy',
    price: 180,
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80',
    category: 'North Indian',
    type: 'Main Course'
  },

  // Chinese Items
  {
    id: 5,
    name: 'Veg Hakka Noodles',
    description: 'Stir-fried noodles with vegetables',
    price: 120,
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172789a?auto=format&fit=crop&q=80',
    category: 'Chinese',
    type: 'Main Course'
  },
  {
    id: 6,
    name: 'Manchurian',
    description: 'Vegetable balls in spicy sauce',
    price: 140,
    image: 'https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?auto=format&fit=crop&q=80',
    category: 'Chinese',
    type: 'Appetizer'
  },

  // Beverages
  {
    id: 7,
    name: 'Masala Chai',
    description: 'Indian spiced tea',
    price: 30,
    image: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&q=80',
    category: 'Beverages',
    type: 'Drinks'
  },
  {
    id: 8,
    name: 'Fresh Lime Soda',
    description: 'Refreshing lime-based drink',
    price: 40,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80',
    category: 'Beverages',
    type: 'Drinks'
  },

  // Snacks
  {
    id: 9,
    name: 'Samosa',
    description: 'Crispy pastry with spiced potato filling',
    price: 25,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80',
    category: 'Snacks',
    type: 'Snacks'
  },
  {
    id: 10,
    name: 'Vada Pav',
    description: 'Spiced potato fritter in bread roll',
    price: 30,
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80',
    category: 'Snacks',
    type: 'Snacks'
  },

  // Desserts
  {
    id: 11,
    name: 'Gulab Jamun',
    description: 'Deep-fried milk solids in sugar syrup',
    price: 40,
    image: 'https://images.unsplash.com/photo-1589921307702-69723fcc90eb?auto=format&fit=crop&q=80',
    category: 'Desserts',
    type: 'Dessert'
  },
  {
    id: 12,
    name: 'Rasmalai',
    description: 'Cottage cheese dumplings in sweet milk',
    price: 50,
    image: 'https://images.unsplash.com/photo-1589921307702-69723fcc90eb?auto=format&fit=crop&q=80',
    category: 'Desserts',
    type: 'Dessert'
  }
];

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('South Indian');
  const [sortBy, setSortBy] = useState('store'); // 'store' or 'type'
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (itemId, change) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + change)
    }));
  };

  const handleAddToCart = (item, size) => {
    const quantity = quantities[item.id] || 1;
    addToCart(item, quantity, size);
    setQuantities(prev => ({ ...prev, [item.id]: 0 }));
  };

  const sortedItems = menuItems
    .filter(item => sortBy === 'store' ? 
      item.category === selectedCategory : 
      true
    )
    .sort((a, b) => sortBy === 'store' ? 
      a.category.localeCompare(b.category) : 
      a.type.localeCompare(b.type)
    );

  return (
    <section className="pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Sort Options */}
        <div className="flex justify-end mb-6">
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-900 text-white px-4 py-2 rounded-md appearance-none pr-8 cursor-pointer"
            >
              <option value="store">Sort by Store</option>
              <option value="type">Sort by Food Type</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Categories Navigation */}
        {sortBy === 'store' && (
          <div className="flex overflow-x-auto pb-4 mb-8 gap-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap text-lg font-medium transition-colors
                  ${selectedCategory === category 
                    ? 'text-orange-500 border-b-2 border-orange-500' 
                    : 'text-gray-600 hover:text-orange-500'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                  <span className="text-orange-500 font-bold">₹{item.price}</span>
                </div>
                <p className="text-gray-600 mb-4">{item.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <Minus className="h-4 w-4 text-gray-600" />
                    </button>
                    <span className="text-gray-900 font-medium">
                      {quantities[item.id] || 0}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <Plus className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleAddToCart(item, 'full')}
                      disabled={!quantities[item.id]}
                      className="flex items-center px-3 py-1 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Add
                    </button>
                    {item.category !== 'Beverages' && (
                      <button
                        onClick={() => handleAddToCart(item, 'half')}
                        disabled={!quantities[item.id]}
                        className="flex items-center px-3 py-1 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Half
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;