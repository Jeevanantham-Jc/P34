import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, Package, LogOut, User, History } from 'lucide-react';
import { useDeliveryAuth } from '../../context/DeliveryAuthContext';
import { deliveryService } from '../../services/deliveryService';
import OrderCard from '../../components/Delivery/OrderCard';

const DeliveryDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [isAccepting, setIsAccepting] = useState(false);
  const { partner, logout, loading } = useDeliveryAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAvailableOrders();
    // eslint-disable-next-line
  }, []);

  const fetchAvailableOrders = async () => {
    // Optionally set local loading state if needed
    try {
      const availableOrders = await deliveryService.getAvailableOrders();
      setOrders(availableOrders);
    } catch (err) {
      // Optionally handle error
    }
  };

  const handleAcceptOrder = async (order) => {
    setIsAccepting(true);
    try {
      await deliveryService.acceptOrder(partner.id, order.orderId);
      // Optionally update local state or navigate
      navigate(`/delivery/order/${order.orderId}`);
    } catch (err) {
      // Optionally handle error
    } finally {
      setIsAccepting(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/delivery/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="bg-orange-600 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-800">
                  Welcome, {partner?.name}!
                </h1>
                <p className="text-sm text-gray-600">
                  Ready to deliver some amazing food?
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate('/delivery/profile')}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <User className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate('/delivery/history')}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <History className="w-5 h-5" />
              </button>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Available Orders ({orders.length})
          </h2>
          <button
            onClick={fetchAvailableOrders}
            disabled={loading}
            className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {loading && !orders.length ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              No orders available right now
            </h3>
            <p className="text-gray-500 mb-4">
              Check back in a few minutes for new delivery opportunities
            </p>
            <button
              onClick={fetchAvailableOrders}
              className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
            >
              Refresh Orders
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {orders.map((order) => (
              <OrderCard
                key={order.orderId}
                order={order}
                onAccept={handleAcceptOrder}
                isAccepting={isAccepting}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryDashboard;