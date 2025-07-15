import React, { useState, useEffect } from 'react';
import { Navigation, MapPin, Play, Square } from 'lucide-react';
import { useDelivery } from '../../context/DeliveryContext';
import { trackingService } from '../../services/trackingService';

const LocationSharing = ({ orderId }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [watchId, setWatchId] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const { partner, isLocationSharing, startLocationSharing, stopLocationSharing } = useDelivery();

  useEffect(() => {
    return () => {
      // Cleanup on component unmount
      if (watchId) {
        trackingService.stopLocationTracking(watchId);
      }
    };
  }, [watchId]);

  const handleStartTracking = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser');
      return;
    }

    const id = trackingService.startLocationTracking(
      partner.id,
      orderId,
      (location) => {
        setCurrentLocation(location);
        setLocationError(null);
      }
    );

    setWatchId(id);
    startLocationSharing();
  };

  const handleStopTracking = () => {
    if (watchId) {
      trackingService.stopLocationTracking(watchId);
      setWatchId(null);
    }
    stopLocationSharing();
    setCurrentLocation(null);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <Navigation className="w-5 h-5 text-blue-500 mr-2" />
        Live Location Sharing
      </h3>

      {locationError && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg mb-4 text-sm">
          {locationError}
        </div>
      )}

      {currentLocation && (
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-4">
          <div className="flex items-center mb-2">
            <MapPin className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-blue-800">Current Location</span>
          </div>
          <div className="text-xs text-blue-600 space-y-1">
            <p>Latitude: {currentLocation.lat.toFixed(6)}</p>
            <p>Longitude: {currentLocation.lng.toFixed(6)}</p>
            <p className="text-green-600 flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              Location sharing active
            </p>
          </div>
        </div>
      )}

      <div className="space-y-3">
        <p className="text-sm text-gray-600">
          Share your live location with the customer to help them track your delivery progress.
        </p>

        {!isLocationSharing ? (
          <button
            onClick={handleStartTracking}
            className="w-full flex items-center justify-center bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Play className="w-4 h-4 mr-2" />
            Start Location Sharing
          </button>
        ) : (
          <button
            onClick={handleStopTracking}
            className="w-full flex items-center justify-center bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors"
          >
            <Square className="w-4 h-4 mr-2" />
            Stop Location Sharing
          </button>
        )}

        <div className="text-xs text-gray-500 space-y-1">
          <p>• Location updates every 10 seconds when active</p>
          <p>• Only shared during active deliveries</p>
          <p>• Automatically stops when order is completed</p>
        </div>
      </div>
    </div>
  );
};

export default LocationSharing;