import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/MyBooking.css';

const ProviderDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user) {
      navigate('/auth');
      return;
    }
    
    if (user.role !== 'provider') {
      navigate('/');
      return;
    }
    
    fetchProviderBookings();
  }, [navigate]);

  const fetchProviderBookings = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || 'null');
      if (user && user.id) {
        console.log('Fetching provider bookings for user:', user.id);
        const result = await fetch(`${process.env.REACT_APP_API_BASE_URL}/bookings/provider/${user.id}`);
        const data = await result.json();
        
        console.log('Provider bookings fetch result:', data);
        
        if (data.status === 'success') {
          setBookings(data.bookings || []);
        } else {
          setBookings([]);
        }
      } else {
        setBookings([]);
      }
    } catch (error) {
      console.log('Provider bookings API error:', error);
      setBookings([]);
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
          <h1>Provider Dashboard</h1>
          <p>Welcome back, {user?.name}!</p>
        </div>
        
        <div className="dashboard-actions">
          <button className="btn-primary" onClick={() => navigate('/add-service')} style={{marginRight: '1rem'}}>
            Add New Service
          </button>
          <button className="btn-outline" onClick={() => navigate('/services')}>
            View All Services
          </button>
        </div>

        <div className="dashboard-section">
          <h2>Service Bookings</h2>
          {loading ? (
            <div className="empty-state">
              <h3>Loading bookings...</h3>
              <p>Please wait while we fetch your bookings</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="empty-state">
              <h3>No bookings found</h3>
              <p>Customers haven't booked your services yet</p>
              <button className="btn-primary" onClick={() => navigate('/services')}>
                View Services
              </button>
            </div>
          ) : (
            <div className="bookings-grid">
              {bookings.map((booking) => (
                <div key={booking._id} className="booking-card">
                  <h3>{booking.service?.title}</h3>
                  <p><strong>Customer:</strong> {booking.customer?.name}</p>
                  <p><strong>Phone:</strong> {booking.customer?.phone}</p>
                  <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {booking.time}</p>
                  <p><strong>Address:</strong> {booking.address}</p>
                  <p><strong>Amount:</strong> ${booking.totalAmount}</p>
                  {booking.notes && <p><strong>Notes:</strong> {booking.notes}</p>}
                  <p>
                    <strong>Status:</strong> 
                    <span style={{ color: getStatusColor(booking.status), marginLeft: '0.5rem' }}>
                      {booking.status.toUpperCase()}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;