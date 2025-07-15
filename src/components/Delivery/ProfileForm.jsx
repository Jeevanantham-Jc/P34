import React, { useState } from 'react';
import { User, Phone, Car, Camera } from 'lucide-react';

const ProfileForm = ({ partner, onUpdate, isUpdating }) => {
  const [formData, setFormData] = useState({
    name: partner?.name || '',
    phone: partner?.phone || '',
    vehicleType: partner?.vehicleType || 'Bike',
    profilePic: partner?.profilePic || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <div className="relative w-24 h-24 mx-auto mb-4">
          <img
            src={formData.profilePic || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
          />
          <button
            type="button"
            className="absolute bottom-0 right-0 bg-orange-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
          >
            <Camera className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <User className="w-4 h-4 inline mr-2" />
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Phone className="w-4 h-4 inline mr-2" />
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Car className="w-4 h-4 inline mr-2" />
            Vehicle Type
          </label>
          <select
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="Bike">Bike</option>
            <option value="Scooter">Scooter</option>
            <option value="Car">Car</option>
            <option value="Bicycle">Bicycle</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={partner?.email || ''}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
            disabled
          />
          <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
        </div>
      </div>

      <button
        type="submit"
        disabled={isUpdating}
        className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isUpdating ? 'Updating Profile...' : 'Update Profile'}
      </button>
    </form>
  );
};

export default ProfileForm;