import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { AlertCircle, CheckCircle, Bell, BellOff } from 'lucide-react';

const UserProfile = () => {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    classroomAddress: user?.classroomAddress || '',
    preferences: {
      dietaryRestrictions: user?.preferences?.dietaryRestrictions || [],
      favoriteItems: user?.preferences?.favoriteItems || [],
      notifications: user?.preferences?.notifications ?? true
    }
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const dietaryOptions = [
    'Vegetarian',
    'Vegan',
    'Halal',
    'Gluten-Free',
    'Dairy-Free',
    'Nut-Free'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePreferenceChange = (e) => {
    const { name, checked, value } = e.target;
    
    if (name === 'notifications') {
      setFormData(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          notifications: checked
        }
      }));
    } else if (name === 'dietaryRestrictions') {
      setFormData(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          dietaryRestrictions: checked
            ? [...prev.preferences.dietaryRestrictions, value]
            : prev.preferences.dietaryRestrictions.filter(item => item !== value)
        }
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      await updateProfile(formData);
      setSuccess('Profile updated successfully');
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Profile Information</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
          >
            Edit Profile
          </button>
        )}
      </div>
      
      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span>{error}</span>
        </div>
      )}
      
      {success && (
        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          <span>{success}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 ${
                  !isEditing ? 'bg-gray-50' : ''
                }`}
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 ${
                  !isEditing ? 'bg-gray-50' : ''
                }`}
              />
            </div>
            
            <div>
              <label htmlFor="classroomAddress" className="block text-sm font-medium text-gray-700">
                Classroom Address
              </label>
              <textarea
                id="classroomAddress"
                name="classroomAddress"
                rows="3"
                value={formData.classroomAddress}
                onChange={handleChange}
                disabled={!isEditing}
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 ${
                  !isEditing ? 'bg-gray-50' : ''
                }`}
              ></textarea>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Preferences</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dietary Restrictions
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {dietaryOptions.map(option => (
                    <label key={option} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="dietaryRestrictions"
                        value={option}
                        checked={formData.preferences.dietaryRestrictions.includes(option)}
                        onChange={handlePreferenceChange}
                        disabled={!isEditing}
                        className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                      />
                      <span className="text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="notifications"
                    checked={formData.preferences.notifications}
                    onChange={handlePreferenceChange}
                    disabled={!isEditing}
                    className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">Receive order notifications</span>
                  {formData.preferences.notifications ? (
                    <Bell className="h-4 w-4 text-orange-500" />
                  ) : (
                    <BellOff className="h-4 w-4 text-gray-400" />
                  )}
                </label>
              </div>
            </div>
          </div>
          
          {isEditing && (
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    name: user?.name || '',
                    email: user?.email || '',
                    classroomAddress: user?.classroomAddress || '',
                    preferences: {
                      dietaryRestrictions: user?.preferences?.dietaryRestrictions || [],
                      favoriteItems: user?.preferences?.favoriteItems || [],
                      notifications: user?.preferences?.notifications ?? true
                    }
                  });
                }}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserProfile;