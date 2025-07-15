const API_BASE_URL = 'https://api.fooddelivery.com'; // Replace with your actual API URL

export const deliveryService = {
  async getAvailableOrders() {
    try {
      // Mock API call - replace with actual API
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              orderId: 'ord567',
              restaurantName: 'Biryani House',
              restaurantAddress: 'Koramangala, Bangalore',
              restaurantLocation: { lat: 12.9350, lng: 77.6100 },
              customerAddress: 'HSR Layout, Bangalore',
              customerLocation: { lat: 12.9100, lng: 77.5850 },
              distance: '4.5 km',
              paymentStatus: 'Paid',
              estimatedTime: '25 mins',
              amount: 360
            },
            {
              orderId: 'ord568',
              restaurantName: 'Pizza Corner',
              restaurantAddress: 'Indiranagar, Bangalore',
              restaurantLocation: { lat: 12.9716, lng: 77.6412 },
              customerAddress: 'Whitefield, Bangalore',
              customerLocation: { lat: 12.9698, lng: 77.7500 },
              distance: '8.2 km',
              paymentStatus: 'COD',
              estimatedTime: '35 mins',
              amount: 450
            }
          ]);
        }, 1000);
      });
      
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch orders');
    }
  },

  async acceptOrder(partnerId, orderId) {
    try {
      // Mock API call - replace with actual API
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            message: 'Order accepted',
            status: 'ACCEPTED'
          });
        }, 500);
      });
      
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to accept order');
    }
  },

  async getOrderDetails(orderId) {
    try {
      // Mock API call - replace with actual API
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            orderId: 'ord567',
            restaurant: {
              name: 'Biryani House',
              address: 'Koramangala, Bangalore',
              location: { lat: 12.9350, lng: 77.6100 },
              phone: '+91 9876543210'
            },
            customer: {
              name: 'Balaji Narayanan',
              address: 'HSR Layout, Bangalore',
              location: { lat: 12.9100, lng: 77.5850 },
              phone: '+91 9876543211'
            },
            items: [
              { name: 'Chicken Biryani', quantity: 2, price: 280 },
              { name: 'Paneer Tikka', quantity: 1, price: 80 }
            ],
            paymentDetails: {
              method: 'UPI',
              paymentStatus: 'Success',
              amount: 360
            },
            status: 'ACCEPTED',
            estimatedTime: '25 mins',
            specialInstructions: 'Extra spicy, no onions'
          });
        }, 800);
      });
      
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch order details');
    }
  },

  async updateOrderStatus(partnerId, orderId, newStatus) {
    try {
      // Mock API call - replace with actual API
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            message: `Order status updated to ${newStatus}`
          });
        }, 500);
      });
      
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to update order status');
    }
  },

  async getDeliveredOrders(partnerId) {
    try {
      // Mock API call - replace with actual API
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              orderId: 'ord565',
              deliveredAt: '2025-01-20T18:55:00',
              restaurantName: 'Biryani House',
              customerName: 'Balaji Narayanan',
              deliveryTime: '32 mins',
              paymentMethod: 'UPI',
              amount: 360,
              customerRating: 4.5
            },
            {
              orderId: 'ord564',
              deliveredAt: '2025-01-20T16:30:00',
              restaurantName: 'Pizza Corner',
              customerName: 'Priya Sharma',
              deliveryTime: '28 mins',
              paymentMethod: 'COD',
              amount: 450,
              customerRating: 5.0
            }
          ]);
        }, 1000);
      });
      
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch order history');
    }
  },

  async updateProfile(partnerId, profileData) {
    try {
      // Mock API call - replace with actual API
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            message: 'Profile updated successfully'
          });
        }, 800);
      });
      
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to update profile');
    }
  }
};