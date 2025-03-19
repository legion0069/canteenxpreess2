import React from 'react';
import { Clock, MapPin, Truck, CreditCard } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Clock className="h-8 w-8 text-orange-500" />,
      title: "Quick Delivery",
      description: "Get your food delivered right to your classroom within minutes"
    },
    {
      icon: <MapPin className="h-8 w-8 text-orange-500" />,
      title: "Classroom Tracking",
      description: "Precise delivery with our smart classroom location system"
    },
    {
      icon: <Truck className="h-8 w-8 text-orange-500" />,
      title: "Live Tracking",
      description: "Track your order in real-time from kitchen to classroom"
    },
    {
      icon: <CreditCard className="h-8 w-8 text-orange-500" />,
      title: "Easy Payment",
      description: "Multiple secure payment options for your convenience"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose CanteenXpress?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center">
                {feature.icon}
                <h3 className="mt-4 mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;