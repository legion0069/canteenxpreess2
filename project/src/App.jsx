import React from 'react';
import Header from './components/Header';
import Features from './components/Features';
import Footer from './components/Footer';


function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
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
              <button className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors">
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

      <Features />
      
      {/* Stats Section */}
      <section className="py-16 bg-orange-500 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">0+</div>
              <div className="text-orange-100">Daily Orders</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">0+</div>
              <div className="text-orange-100">Menu Items</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">0min</div>
              <div className="text-orange-100">Avg. Delivery Time</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">0.0/5</div>
              <div className="text-orange-100">Customer Rating</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;

