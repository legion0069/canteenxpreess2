import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => {
    api.post('/auth/logout');
    localStorage.removeItem('token');
  }
};

// User services
export const userService = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData) => api.put('/users/profile', userData)
};

// Menu services
export const menuService = {
  getAllItems: () => api.get('/menu/items'),
  getItemsByCategory: (category) => api.get(`/menu/items/category/${category}`),
  addItem: (item) => api.post('/menu/items', item),
  updateItem: (id, item) => api.put(`/menu/items/${id}`, item),
  deleteItem: (id) => api.delete(`/menu/items/${id}`)
};

// Order services
export const orderService = {
  createOrder: (order) => api.post('/orders', order),
  getUserOrders: () => api.get('/orders/user'),
  updateOrderStatus: (id, status) => api.put(`/orders/${id}/status`, { status }),
  getOrderDetails: (id) => api.get(`/orders/${id}`)
};

export default api;