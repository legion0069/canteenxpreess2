import React, { useState, useEffect } from 'react';
import { orderService } from '../../services/api';
import { Clock, Star } from 'lucide-react';
import OrderFeedback from '../feedback/OrderFeedback';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // This would be replaced with actual API call when backend is ready
        // const response = await orderService.getUserOrders();
        // setOrders(response.data);
        
        // Mock data for now
        setTimeout(() => {
          setOrders([
            {
              id: 'ORD-1234',
              date: new Date(Date.now() - 86400000).toISOString(),
              status: 'delivered',
              total: 12.99,
              items: [
                { name: 'Grilled Sandwich', quantity: 1, price: 5.99 },
                { name: 'Fresh Orange Juice', quantity: 1, price: 2.99 },
                { name: 'French Fries', quantity: 1, price: 2.99 }
              ]
            },
            {
              id: 'ORD-1235',
              date: new Date(Date.now() - 172800000).toISOString(),
              status: 'delivered',
              total: 9.98,
              items: [
                { name: 'Pasta Bowl', quantity: 1, price: 5.99 },
                { name: 'Cola', quantity: 2, price: 1.99 }
              ]
            }
          ]);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to fetch orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleFeedbackSubmit = (orderId, feedback) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, feedback } 
          : order
      )
    );
    setSelectedOrder(null);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6">Order History</h2>
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6">Order History</h2>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-6">Order History</h2>
      
      {orders.length === 0 ? (
        <div className="text-center py-8">
          <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No orders yet</h3>
          <p className="mt-1 text-gray-500">
            When you place orders, they will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
                <div>
                  <span className="font-medium">{order.id}</span>
                  <span className="text-gray-500 ml-4">
                    {new Date(order.date).toLocaleDateString()}
                  </span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              
              <div className="p-4">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Item
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Qty
                      </th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {order.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 text-sm text-gray-900">{item.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{item.quantity}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">${item.price.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="2" className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                        Total:
                      </td>
                      <td className="px-4 py-3 text-sm font-bold text-gray-900 text-right">
                        ${order.total.toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>

                {order.status === 'delivered' && !order.feedback && (
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => setSelectedOrder(order.id)}
                      className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                    >
                      <Star className="h-4 w-4 mr-2" />
                      Rate Order
                    </button>
                  </div>
                )}

                {order.feedback && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-md">
                    <div className="flex items-center mb-2">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-2 font-medium">{order.feedback.rating}/5</span>
                    </div>
                    {order.feedback.comments && (
                      <p className="text-gray-600 text-sm">{order.feedback.comments}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <OrderFeedback
                orderId={selectedOrder}
                onFeedbackSubmit={(feedback) => handleFeedbackSubmit(selectedOrder, feedback)}
              />
            </div>
            <div className="px-6 py-4 bg-gray-50 rounded-b-lg">
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;