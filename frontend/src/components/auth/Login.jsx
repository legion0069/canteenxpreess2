import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AlertCircle, User, Shield, GraduationCap } from 'lucide-react';

const Login = () => {
  const [credentials, setCredentials] = useState({ 
    email: '', 
    password: '',
    role: 'student' // Default role
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await login(credentials);
      navigate(credentials.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="text-3xl font-bold text-center text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-center text-gray-600">
            Or{' '}
            <Link to="/register" className="font-medium text-orange-500 hover:text-orange-600">
              create a new account
            </Link>
          </p>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Role Selection */}
          <div className="grid grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => setCredentials(prev => ({ ...prev, role: 'student' }))}
              className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-colors
                ${credentials.role === 'student'
                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                  : 'border-gray-200 hover:border-orange-200'
                }`}
            >
              <GraduationCap className="h-6 w-6 mb-2" />
              <span className="font-medium text-sm">Student</span>
            </button>
            
            <button
              type="button"
              onClick={() => setCredentials(prev => ({ ...prev, role: 'faculty' }))}
              className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-colors
                ${credentials.role === 'faculty'
                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                  : 'border-gray-200 hover:border-orange-200'
                }`}
            >
              <User className="h-6 w-6 mb-2" />
              <span className="font-medium text-sm">Faculty</span>
            </button>
            
            <button
              type="button"
              onClick={() => setCredentials(prev => ({ ...prev, role: 'admin' }))}
              className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-colors
                ${credentials.role === 'admin'
                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                  : 'border-gray-200 hover:border-orange-200'
                }`}
            >
              <Shield className="h-6 w-6 mb-2" />
              <span className="font-medium text-sm">Admin</span>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                University Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                placeholder="example@mallareddyuniversity.ac.in"
              />
              <p className="mt-1 text-xs text-gray-500">
                Please use your university email address
              </p>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-orange-500 hover:text-orange-600">
                Forgot your password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
            ) : (
              'Sign in'
            )}
          </button>

          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link 
                to={
                  credentials.role === 'admin' 
                    ? '/admin/register' 
                    : credentials.role === 'faculty'
                    ? '/faculty/register'
                    : '/register'
                } 
                className="font-medium text-orange-500 hover:text-orange-600"
              >
                Register as {credentials.role === 'admin' ? 'Admin' : credentials.role === 'faculty' ? 'Faculty' : 'Student'}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;