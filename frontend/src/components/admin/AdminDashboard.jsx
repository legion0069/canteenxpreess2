import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  ShoppingBag, 
  Users, 
  Coffee,
  Package,
  Tag,
  Settings,
  FileText
} from 'lucide-react';

const AdminDashboard = () => {
  // Mock data for demonstration
  const stats = {
    totalOrders: 156,
    activeMenuItems: 42,
    totalUsers: 324,
    todaySales: 2489.99,
    pendingOrders: 8,
    topSellingItems: [
      { name: 'Grilled Sandwich', sales: 45 },
      { name: 'Fresh Orange Juice', sales: 38 },
      { name: 'Cappuccino', sales: 32 }
    ]
  };

  const cards = [
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Menu Items',
      value: stats.activeMenuItems,
      icon: Coffee,
      color: 'bg-green-500'
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-purple-500'
    },
    {
      title: "Today's Sales",
      value: `$${stats.todaySales}`,
      icon: BarChart3,
      color: 'bg-orange-500'
    }
  ];

  const quickLinks = [
    {
      title: 'Menu Management',
      description: 'Add or edit food items',
      icon: Coffee,
      path: '/admin/menu'
    },
    {
      title: 'Stock Control',
      description: 'Manage item availability',
      icon: Package,
      path: '/admin/stock'
    },
    {
      title: 'User Management',
      description: 'View and manage users',
      icon: Users,
      path: '/admin/users'
    },
    {
      title: 'Offers & Discounts',
      description: 'Manage special offers',
      icon: Tag,
      path: '/admin/offers'
    },
    {
      title: 'Reports',
      description: 'View analytics and reports',
      icon: FileText,
      path: '/admin/reports'
    },
    {
      title: 'Settings',
      description: 'Configure system settings',
      icon: Settings,
      path: '/admin/settings'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`${card.color} p-3 rounded-lg`}>
                <card.icon className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-500">{card.title}</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{card.value}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {quickLinks.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center mb-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <link.icon className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="ml-4 text-lg font-semibold text-gray-900">{link.title}</h3>
            </div>
            <p className="text-gray-600">{link.description}</p>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Pending Orders</h2>
        <div className="bg-orange-50 border border-orange-200 rounded-md p-4 mb-4">
          <div className="flex items-center">
            <ShoppingBag className="h-5 w-5 text-orange-500 mr-2" />
            <span className="font-medium text-orange-700">
              {stats.pendingOrders} orders waiting to be processed
            </span>
          </div>
        </div>

        <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Selling Items</h2>
        <div className="space-y-4">
          {stats.topSellingItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-gray-600">{item.name}</span>
              <span className="font-medium text-gray-900">{item.sales} orders</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;