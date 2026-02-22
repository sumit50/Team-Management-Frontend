import React, { useState } from 'react';
import LoadingButton from '../common/LoadingButton';

const ExampleForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (isLoading) return;
    
    setIsLoading(true);
    
    try {
      // Make your API call here
      const response = await fetch('/api/your-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      console.log('API Response:', data);
      
      // Handle success
      alert('Form submitted successfully!');
      
    } catch (error) {
      console.error('API Error:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      // Always set loading to false when done
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Example Form with Loader</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <LoadingButton
          type="submit"
          isLoading={isLoading}
          loadingText="Submitting..."
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit Form
        </LoadingButton>
      </form>
    </div>
  );
};

export default ExampleForm;
