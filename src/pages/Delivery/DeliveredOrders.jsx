import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Calendar, TrendingUp } from 'lucide-react';
import { useDelivery } from '../../context/DeliveryContext';
import { deliveryService } from '../../services/deliveryService';
import DeliveredOrderCard from '../../components/Delivery/DeliveredOrderCard';

const DeliveredOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalDeliveries: 0,
    totalEarnings: 0,
    averageRating: 0,
    thisMonth: 0
  });
  const { partner, loading, setLoading, setError } = useDelivery();

  useEffect(() => {
    fetchDeliveredOrders();
  }, []);

  const fetchDeliveredOrders = async () => {
    setLoading(true);
    try {
      const deliveredOrders = await deliveryService.getDeliveredOrders(partner.id);
      setOrders(deliveredOrders);
      
      // Calculate stats
      const totalEarnings = deliveredOrders.reduce((sum, order) => sum + order.amount, 0);
      const totalRating = deliveredOrders.reduce((sum, order) => sum + (order.customerRating || 0), 0);
      const averageRating = deliveredOrders.length > 0 ? (totalRating / deliveredOrders.length) : 0;
      
      const currentMonth = new Date().getMonth();
      const thisMonthOrders = deliveredOrders.filter(order => {
        const orderMonth = new Date(order.deliveredAt).getMonth();
        return orderMonth === currentMonth;
      });

      setStats({
        totalDeliveries: deliveredOrders.length,
        totalEarnings,
        averageRating,
        thisMonth: thisMonthOrders.length
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <button
              onClick={() => navigate('/delivery/dashboard')}
              className="mr-4 p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">Delivery History</h1>
              <p className="text-sm text-gray-600">Your completed deliveries and earnings</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Deliveries</p>
                <p className="text-2xl font-bold text-gray-800">{stats.totalDeliveries}</p>
              </div>
              <Package className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold text-emerald-600">₹{stats.totalEarnings}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-emerald-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.averageRating.toFixed(1)}/5</p>
              </div>
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-yellow-600 text-lg">⭐</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-purple-600">{stats.thisMonth}</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-xl shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              Recent Deliveries ({orders.length})
            </h2>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                No deliveries yet
              </h3>
              <p className="text-gray-500">
                Your completed deliveries will appear here
              </p>
            </div>
          ) : (
            <div className="p-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {orders.map((order) => (
                  <DeliveredOrderCard key={order.orderId} order={order} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveredOrders;