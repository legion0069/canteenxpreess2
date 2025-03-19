import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Menu from './components/Menu';
import Contact from './components/Contact';
import Cart from './components/Cart';
import Footer from './components/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import FacultyRegister from './components/auth/FacultyRegister';
import AdminRegister from './components/auth/AdminRegister';
import Dashboard from './components/dashboard/Dashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import MenuManagement from './components/admin/MenuManagement';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';

function App() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <Routes>
        <Route path="/" element={
          <>
            {/* Hero Section */}
            <section className="pt-24 pb-12 bg-gradient-to-r from-orange-50 to-orange-100">
              <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="md:w-1/2 mb-8 md:mb-0">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                      Delicious Food,<br />Delivered to Your Class
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                      Skip the cafeteria lines. Order your favorite meals and get them delivered right to your classroom.
                    </p>
                    <button 
                      onClick={() => navigate('/menu')}
                      className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors"
                    >
                      Order Now
                    </button>
                  </div>
                  <div className="md:w-1/2">
                    <img 
                      src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80"
                      alt="Delicious Food"
                      className="rounded-lg shadow-xl"
                    />
                  </div>
                </div>
              </div>
            </section>
            
            {/* Stats Section */}
            <section className="py-16 bg-orange-500 text-white">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  <div>
                    <div className="text-4xl font-bold mb-2">1000+</div>
                    <div className="text-orange-100">Daily Orders</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold mb-2">50+</div>
                    <div className="text-orange-100">Menu Items</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold mb-2">15min</div>
                    <div className="text-orange-100">Avg. Delivery Time</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold mb-2">4.8/5</div>
                    <div className="text-orange-100">Customer Rating</div>
                  </div>
                </div>
              </div>
            </section>
          </>
        } />
        <Route path="/menu" element={<Menu />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/faculty/register" element={<FacultyRegister />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        
        {/* Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/menu" element={<MenuManagement />} />
        </Route>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;