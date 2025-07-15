import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { MapPin, Navigation } from 'lucide-react';

const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with your actual API key

const mapContainerStyle = {
  width: '100%',
  height: '400px'
};

const DeliveryMap = ({ restaurant, customer, currentLocation }) => {
  const [directions, setDirections] = useState(null);
  const [map, setMap] = useState(null);

  const center = restaurant?.location || { lat: 12.9716, lng: 77.5946 };

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const calculateRoute = useCallback(() => {
    if (!restaurant?.location || !customer?.location) return;

    const directionsService = new google.maps.DirectionsService();
    
    const origin = currentLocation || restaurant.location;
    const destination = customer.location;
    const waypoints = currentLocation ? [{ location: restaurant.location }] : [];

    directionsService.route(
      {
        origin,
        destination,
        waypoints,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        }
      }
    );
  }, [restaurant, customer, currentLocation]);

  React.useEffect(() => {
    if (map && restaurant && customer) {
      calculateRoute();
    }
  }, [map, restaurant, customer, calculateRoute]);

  // Fallback UI when Google Maps is not available
  if (!GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY === 'YOUR_GOOGLE_MAPS_API_KEY') {
    return (
      <div className="bg-gray-100 rounded-lg p-8 text-center">
        <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Map Integration</h3>
        <p className="text-gray-600 mb-4">
          Google Maps integration requires an API key to display the route.
        </p>
        <div className="space-y-2 text-sm text-left max-w-md mx-auto">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
            <span><strong>Restaurant:</strong> {restaurant?.name} - {restaurant?.address}</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
            <span><strong>Customer:</strong> {customer?.name} - {customer?.address}</span>
          </div>
          {currentLocation && (
            <div className="flex items-center">
              <Navigation className="w-3 h-3 text-orange-500 mr-3" />
              <span><strong>Your Location:</strong> Live tracking active</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg overflow-hidden shadow-md">
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={13}
          onLoad={onLoad}
        >
          {restaurant?.location && (
            <Marker
              position={restaurant.location}
              icon={{
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="16" r="16" fill="#ef4444"/>
                    <circle cx="16" cy="16" r="8" fill="white"/>
                  </svg>
                `),
                scaledSize: new google.maps.Size(32, 32)
              }}
            />
          )}
          
          {customer?.location && (
            <Marker
              position={customer.location}
              icon={{
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="16" r="16" fill="#10b981"/>
                    <circle cx="16" cy="16" r="8" fill="white"/>
                  </svg>
                `),
                scaledSize: new google.maps.Size(32, 32)
              }}
            />
          )}
          
          {currentLocation && (
            <Marker
              position={currentLocation}
              icon={{
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="16" r="16" fill="#443bf6"/>
                    <circle cx="16" cy="16" r="8" fill="white"/>
                  </svg>
                `),
                scaledSize: new google.maps.Size(32, 32)
              }}
            />
          )}
          
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default DeliveryMap;