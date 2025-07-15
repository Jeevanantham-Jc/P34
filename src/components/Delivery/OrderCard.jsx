import React from 'react';
import { MapPin, Clock, CreditCard, Banknote } from 'lucide-react';

const OrderCard = ({ order, onAccept, isAccepting }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            {order.restaurantName}
          </h3>
          <p className="text-sm text-gray-600 flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            {order.restaurantAddress}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-emerald-600">₹{order.amount}</p>
          <p className="text-sm text-gray-600 flex items-center justify-end">
            {order.paymentStatus === 'Paid' ? (
              <CreditCard className="w-4 h-4 mr-1 text-emerald-500" />
            ) : (
              <Banknote className="w-4 h-4 mr-1 text-orange-500" />
            )}
            {order.paymentStatus}
          </p>
        </div>
      </div>
      
      <div className="border-t border-gray-100 pt-4 mb-4">
        <p className="text-sm text-gray-600 mb-2">
          <strong>Delivery to:</strong> {order.customerAddress}
        </p>
        <div className="flex justify-between items-center text-sm">
          <span className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-1" />
            {order.distance} • {order.estimatedTime}
          </span>
        </div>
      </div>
      
      <button
        onClick={() => onAccept(order)}
        disabled={isAccepting}
        className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isAccepting ? 'Accepting...' : 'Accept Order'}
      </button>
    </div>
  );
};

export default OrderCard;