import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../Styles/MyBooking.css';

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchBookings();
  }, [navigate]);

  const fetchBookings = async () => {
    try {
      // For now, use empty array - ready for backend integration
      setBookings([]);
    } catch (error) {
      toast.error('Error fetching bookings');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#f59e0b',
      confirmed: '#10b981',
      'in-progress': '#3b82f6',
      completed: '#10b981',
      cancelled: '#ef4444'
    };
    return colors[status] || '#6b7280';
  };

  if (loading) {
    return <div className="loading-container"><div className="spinner"></div></div>;
  }

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>My Bookings</h1>
          <p>Welcome back, {user?.name}!</p>
        </div>
        
        <div className="dashboard-actions">
          <button className="btn-primary" onClick={() => navigate('/services')}>
            Browse Services
          </button>
        </div>

        <div className="dashboard-section">
          <h2>My Bookings</h2>
          {bookings.length === 0 ? (
            <div className="empty-state">
              <h3>No bookings found</h3>
              <p>Start by booking your first service</p>
              <button className="btn-primary" onClick={() => navigate('/services')}>
                Book a Service
              </button>
            </div>
          ) : (
            <div className="bookings-grid">
              {bookings.map((booking) => (
                <div key={booking._id} className="booking-card">
                  <h3>{booking.service?.title}</h3>
                  <p><strong>Provider:</strong> {booking.provider?.name}</p>
                  <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {booking.time}</p>
                  <p><strong>Amount:</strong> ${booking.totalAmount}</p>
                  <p>
                    <strong>Status:</strong> 
                    <span style={{ color: getStatusColor(booking.status), marginLeft: '0.5rem' }}>
                      {booking.status.toUpperCase()}
                    </span>
                  </p>
                  <button className="btn-outline" onClick={() => navigate(`/booking/${booking._id}`)}>
                    View Details
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBooking;