import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, AlertCircle } from 'lucide-react';

const MenuManagement = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: 'Grilled Sandwich',
      category: 'Lunch Express',
      price: 5.99,
      available: true,
      image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80'
    },
    {
      id: 2,
      name: 'Fresh Orange Juice',
      category: 'Juice Cafe',
      price: 2.99,
      available: true,
      image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    'all',
    'Juice Cafe',
    'Snacks Break',
    'Lunch Express',
    'Tea & Coffee Hub',
    'Beverages',
    'Waffle Factory'
  ];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const toggleAvailability = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, available: !item.available } : item
    ));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Menu Management</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Item
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
          <div className="flex-1 mb-4 md:mb-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>
          <div className="flex-shrink-0">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                <span className="text-orange-500 font-bold">${item.price}</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">{item.category}</p>
              
              <div className="flex items-center justify-between">
                <button
                  onClick={() => toggleAvailability(item.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    item.available
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {item.available ? 'Available' : 'Unavailable'}
                </button>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {/* Handle edit */}}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-md"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-md"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No items found</h3>
          <p className="mt-2 text-gray-500">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      )}

      {/* Add/Edit Modal would go here */}
    </div>
  );
};

export default MenuManagement;