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
import About from './Pages/About';
import Services from './Pages/Services';
import Booking from './Pages/Booking';
import MyBooking from './Pages/MyBooking';
import ProviderRegistration from './Pages/ProviderRegistration';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/service-details" element={<Services />} />
              <Route path="/services/:id" element={<Services />} />
              <Route path="/booking/:id" element={<Booking />} />
              <Route path="/customer-dashboard" element={<MyBooking />} />
              <Route path="/provider-registration" element={<ProviderRegistration />} />
              <Route path="*" element={<div><h1>404 - Page Not Found</h1></div>} />
            </Routes>
          </main>
          <ToastContainer 
            position="top-center" 
            autoClose={2000} 
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover={false}
            theme="light"
          />
        </div>
    </Router>
  );
}

export default App;