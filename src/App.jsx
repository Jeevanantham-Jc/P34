import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DeliveryProvider, useDelivery } from './context/DeliveryContext';

// Delivery Components
import DeliveryLogin from './pages/Delivery/DeliveryLogin';
import DeliveryRegister from './pages/Delivery/DeliveryRegister';
import DeliveryDashboard from './pages/Delivery/DeliveryDashboard';
import OrderDetails from './pages/Delivery/OrderDetails';
import DeliveryProfile from './pages/Delivery/DeliveryProfile';
import DeliveredOrders from './pages/Delivery/DeliveredOrders';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useDelivery();
  
  if (!isAuthenticated) {
    return <Navigate to="/delivery/login" replace />;
  }
  
  return children;
};

// Public Route Component (redirect if already authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useDelivery();
  
  if (isAuthenticated) {
    return <Navigate to="/delivery/dashboard" replace />;
  }
  
  return children;
};

function App() {
  return (
    <DeliveryProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/delivery/login" replace />} />
            
            {/* Public Routes */}
            <Route path="/delivery/login" element={
              <PublicRoute>
                <DeliveryLogin />
              </PublicRoute>
            } />
            <Route path="/delivery/register" element={
              <PublicRoute>
                <DeliveryRegister />
              </PublicRoute>
            } />
            
            {/* Protected Routes */}
            <Route path="/delivery/dashboard" element={
              <ProtectedRoute>
                <DeliveryDashboard />
              </ProtectedRoute>
            } />
            <Route path="/delivery/order/:orderId" element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>
            } />
            <Route path="/delivery/profile" element={
              <ProtectedRoute>
                <DeliveryProfile />
              </ProtectedRoute>
            } />
            <Route path="/delivery/history" element={
              <ProtectedRoute>
                <DeliveredOrders />
              </ProtectedRoute>
            } />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/delivery/login" replace />} />
          </Routes>
        </div>
      </Router>
    </DeliveryProvider>
  );
}

export default App;