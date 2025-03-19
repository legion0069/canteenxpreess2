import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import UserProfile from './UserProfile';
import OrderHistory from './OrderHistory';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                  <span className="text-3xl font-bold text-orange-500">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
                <span className="mt-2 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                  {user.role === 'admin' ? 'Admin' : 'Student'}
                </span>
              </div>
              
              <nav className="space-y-2">
                <a href="#profile" className="block px-4 py-2 rounded-md bg-orange-50 text-orange-700 font-medium">
                  Profile
                </a>
                <a href="#orders" className="block px-4 py-2 rounded-md hover:bg-gray-50 text-gray-700">
                  Order History
                </a>
                {user.role === 'admin' && (
                  <a href="#admin" className="block px-4 py-2 rounded-md hover:bg-gray-50 text-gray-700">
                    Admin Panel
                  </a>
                )}
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-2">
            <section id="profile" className="mb-8">
              <UserProfile />
            </section>
            
            <section id="orders">
              <OrderHistory />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;