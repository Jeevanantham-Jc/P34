const API_BASE_URL = 'https://api.fooddelivery.com'; // Replace with your actual API URL

export const authService = {
  async login(email, password) {
    try {
      // Mock API call - replace with actual API
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          if (email === 'partner@gmail.com' && password === 'securepass') {
            resolve({
              token: 'mock_jwt_token_123',
              partner: {
                id: 'dp123',
                name: 'Ravi Kumar',
                email: 'partner@gmail.com',
                phone: '9876543210',
                vehicleType: 'Bike',
                profilePic: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'
              }
            });
          } else {
            throw new Error('Invalid credentials');
          }
        }, 1000);
      });
      
      return response;
    } catch (error) {
      throw new Error(error.message || 'Login failed');
    }
  },

  async register(userData) {
    try {
      // Mock API call - replace with actual API
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            message: 'Registration successful'
          });
        }, 1000);
      });
      
      return response;
    } catch (error) {
      throw new Error(error.message || 'Registration failed');
    }
  }
};