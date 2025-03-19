import React, { useState } from 'react';
import { Star, AlertCircle, CheckCircle } from 'lucide-react';
import axios from 'axios';

const OrderFeedback = ({ orderId, onFeedbackSubmit }) => {
  const [feedback, setFeedback] = useState({
    rating: 5,
    foodQuality: 5,
    deliveryService: 5,
    comments: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRatingChange = (type, value) => {
    setFeedback(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('/api/feedback', {
        orderId,
        ...feedback
      });

      setSuccess('Thank you for your feedback!');
      if (onFeedbackSubmit) {
        onFeedbackSubmit(response.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit feedback');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStars = (value, onChange) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="focus:outline-none"
          >
            <Star
              className={`h-6 w-6 ${
                star <= value
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Rate Your Order</h3>

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

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Overall Rating
          </label>
          {renderStars(feedback.rating, (value) => handleRatingChange('rating', value))}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Food Quality
          </label>
          {renderStars(feedback.foodQuality, (value) => handleRatingChange('foodQuality', value))}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Delivery Service
          </label>
          {renderStars(feedback.deliveryService, (value) => handleRatingChange('deliveryService', value))}
        </div>

        <div>
          <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-2">
            Additional Comments
          </label>
          <textarea
            id="comments"
            rows="3"
            value={feedback.comments}
            onChange={(e) => setFeedback(prev => ({ ...prev, comments: e.target.value }))}
            placeholder="Tell us about your experience..."
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
    </div>
  );
};

export default OrderFeedback;