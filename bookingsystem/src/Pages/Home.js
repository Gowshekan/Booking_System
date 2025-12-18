import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/Home.css';

const Home = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const categories = [
    { name: 'Plumbing', icon: '🔧', description: 'Professional plumbing services' },
    { name: 'Electrical', icon: '⚡', description: 'Licensed electrical work' },
    { name: 'Carpentry', icon: '🔨', description: 'Custom carpentry solutions' },
    { name: 'Painting', icon: '🎨', description: 'Interior and exterior painting' },
    { name: 'Cleaning', icon: '🧹', description: 'Professional cleaning services' },
    { name: 'Repair', icon: '🔧', description: 'General repair services' }
  ];

  useEffect(() => {
    fetchFeaturedServices();
  }, []);

  const fetchFeaturedServices = async () => {
    setServices([]);
    setLoading(false);
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Professional Home Services at Your Doorstep</h1>
          <p>Connect with verified professionals for reliable, high-quality home services. Your satisfaction is our guarantee.</p>
          <button 
            className="btn-primary btn-large btn-hero"
            onClick={() => navigate('/services')}
          >
            Book a Service Now
          </button>
        </div>
        <div className="hero-image">
          <img src="onlinebooking.jpg" alt="Home Services" />
        </div>
      </section>

      <section className="categories-section">
        <div className="container">
          <h2>Our Service Categories</h2>
          <p>Choose from our wide range of professional home services</p>
          
          <div className="categories-grid">
            {categories.map((category, index) => (
              <div 
                key={index} 
                className="category-card"
                onClick={() => navigate(`/services?category=${category.name}`)}
              >
                <div className="category-icon">{category.icon}</div>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                <button className="btn-outline">View Services</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="featured-services">
        <div className="container">
          <h2>Featured Services</h2>
          <p>Popular services from our trusted professionals</p>
          
          {loading ? (
            <div className="loading">Loading services...</div>
          ) : (
            <div className="services-grid">
              {services.map((service) => (
                <div key={service._id} className="service-card">
                  <img src="/api/placeholder/300/200" alt={service.title} />
                  <div className="service-info">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <div className="service-meta">
                      <span className="price">${service.price}</span>
                      <span className="rating">⭐ {service.rating || 4.5}</span>
                      <span className="duration">{service.duration} min</span>
                    </div>
                    <button 
                      className="btn-primary"
                      onClick={() => navigate(`/services/${service._id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action for Providers */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Are You a Service Professional?</h2>
            <p>Join our platform and start earning by offering your services to customers in your area</p>
            <button 
              className="btn-secondary btn-large"
              onClick={() => navigate('/provider-registration')}
            >
              Become a Service Provider
            </button>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <h3>10,000+</h3>
              <p>Happy Customers</p>
            </div>
            <div className="stat-item">
              <h3>500+</h3>
              <p>Service Providers</p>
            </div>
            <div className="stat-item">
              <h3>50,000+</h3>
              <p>Services Completed</p>
            </div>
            <div className="stat-item">
              <h3>4.8/5</h3>
              <p>Average Rating</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;