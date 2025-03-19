import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService, userService } from '../services/api';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Decode token to get basic user info
          const decoded = jwtDecode(token);
          
          // Fetch full user profile from API
          const response = await userService.getProfile();
          setUser({ ...decoded, ...response.data });
        } catch (error) {
          console.error('Error loading user:', error);
          localStorage.removeItem('token');
          setUser(null);
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = async (credentials) => {
    try {
      setError(null);
      const response = await authService.login(credentials);
      const { token } = response.data;
      localStorage.setItem('token', token);
      
      const decoded = jwtDecode(token);
      setUser(decoded);
      
      return true;
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...userDataToSend } = userData;
      
      const response = await authService.register(userDataToSend);
      const { token } = response.data;
      localStorage.setItem('token', token);
      
      const decoded = jwtDecode(token);
      setUser(decoded);
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.response?.data?.message || 'Registration failed');
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    localStorage.removeItem('token');
    setUser(null);
  };

  const updateProfile = async (userData) => {
    try {
      const response = await userService.updateProfile(userData);
      setUser(prev => ({ ...prev, ...response.data }));
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Profile update failed');
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      updateProfile,
      error,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};