import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, MapPin, Clock, CreditCard, MessageSquare } from 'lucide-react';
import { useDelivery } from '../../context/DeliveryContext';
import { deliveryService } from '../../services/deliveryService';
import DeliveryStatusButton from '../../components/Delivery/DeliveryStatusButton';
import DeliveryMap from '../../components/Delivery/DeliveryMap';
import LocationSharing from './LocationSharing';

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const { partner, currentOrder, updateOrderStatus, setLoading, setError } = useDelivery();

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  const fetchOrderDetails = async () => {
    setLoading(true);
    try {
      const details = await deliveryService.getOrderDetails(orderId);
      setOrderDetails(details);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    setIsUpdating(true);
    try {
      await deliveryService.updateOrderStatus(partner.id, orderId, newStatus);
      updateOrderStatus(newStatus);
      setOrderDetails(prev => ({ ...prev, status: newStatus }));
      
      if (newStatus === 'DELIVERED') {
        setTimeout(() => {
          navigate('/delivery/dashboard');
        }, 2000);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <button
              onClick={() => navigate('/delivery/dashboard')}
              className="mr-4 p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">
                Order #{orderDetails.orderId}
              </h1>
              <p className="text-sm text-gray-600">
                Status: <span className="font-medium">{orderDetails.status}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Order Details */}
          <div className="space-y-6">
            {/* Restaurant Details */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <MapPin className="w-5 h-5 text-red-500 mr-2" />
                Restaurant Details
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-gray-800">{orderDetails.restaurant.name}</p>
                  <p className="text-sm text-gray-600">{orderDetails.restaurant.address}</p>
                </div>
                <a
                  href={`tel:${orderDetails.restaurant.phone}`}
                  className="flex items-center text-blue-600 hover:text-blue-700"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  {orderDetails.restaurant.phone}
                </a>
              </div>
            </div>

            {/* Customer Details */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <MapPin className="w-5 h-5 text-green-500 mr-2" />
                Customer Details
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-gray-800">{orderDetails.customer.name}</p>
                  <p className="text-sm text-gray-600">{orderDetails.customer.address}</p>
                </div>
                <a
                  href={`tel:${orderDetails.customer.phone}`}
                  className="flex items-center text-blue-600 hover:text-blue-700"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  {orderDetails.customer.phone}
                </a>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Items</h3>
              <div className="space-y-3">
                {orderDetails.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-gray-800">₹{item.price}</p>
                  </div>
                ))}
              </div>
              
              {orderDetails.specialInstructions && (
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-800 flex items-start">
                    <MessageSquare className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span><strong>Special Instructions:</strong> {orderDetails.specialInstructions}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Payment Details */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <CreditCard className="w-5 h-5 text-emerald-500 mr-2" />
                Payment Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-medium">{orderDetails.paymentDetails.method}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium text-emerald-600">{orderDetails.paymentDetails.paymentStatus}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t pt-3">
                  <span>Total Amount:</span>
                  <span className="text-emerald-600">₹{orderDetails.paymentDetails.amount}</span>
                </div>
              </div>
            </div>

            {/* Status Update */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Clock className="w-5 h-5 text-blue-500 mr-2" />
                Update Delivery Status
              </h3>
              <DeliveryStatusButton
                currentStatus={orderDetails.status}
                onStatusUpdate={handleStatusUpdate}
                isUpdating={isUpdating}
              />
            </div>
          </div>

          {/* Right Column - Map and Location */}
          <div className="space-y-6">
            {/* Map */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Delivery Route
              </h3>
              <DeliveryMap
                restaurant={orderDetails.restaurant}
                customer={orderDetails.customer}
              />
            </div>

            {/* Location Sharing */}
            <LocationSharing orderId={orderId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;