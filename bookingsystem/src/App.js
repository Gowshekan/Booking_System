import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import './Styles/pages.css';

// Import Components
import Header from './components/Header';

// Import Pages
import Home from './Pages/Home';
import Auth from './Pages/Auth';
import ServiceDetails from './Pages/ServiceDetails';
import Booking from './Pages/Booking';
import CustomerDashboard from './Pages/CustomerDashboard';
import ProviderRegistration from './Pages/ProviderRegistration';

// Import Context
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/services" element={<ServiceDetails />} />
              <Route path="/service-details" element={<ServiceDetails />} />
              <Route path="/services/:id" element={<ServiceDetails />} />
              <Route path="/booking/:id" element={<Booking />} />
              <Route path="/customer-dashboard" element={<CustomerDashboard />} />
              <Route path="/provider-registration" element={<ProviderRegistration />} />
              <Route path="*" element={<div><h1>404 - Page Not Found</h1></div>} />
            </Routes>
          </main>
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;