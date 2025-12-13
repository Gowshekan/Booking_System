import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    try {
      const response = await axios.get('http://localhost:5000/api/services?limit=6');
      setServices(response.data.services || []);
    } catch (error) {
      // Use mock data for home page
      const mockServices = [
        {
          _id: '1',
          title: 'Professional Plumbing',
          description: 'Expert plumbing repairs and installations',
          price: 75,
          duration: 60,
          rating: 4.8
        },
        {
          _id: '2',
          title: 'Electrical Services',
          description: 'Licensed electrical work for homes',
          price: 90,
          duration: 90,
          rating: 4.9
        },
        {
          _id: '3',
          title: 'Custom Carpentry',
          description: 'Handcrafted furniture and improvements',
          price: 65,
          duration: 120,
          rating: 4.7
        }
      ];
      setServices(mockServices);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Professional Home Services at Your Doorstep</h1>
          <p>Connect with verified professionals for reliable, high-quality home services. Your satisfaction is our guarantee.</p>
          <button 
            className="btn-primary btn-large"
            onClick={() => navigate('/services')}
          >
            Book a Service Now
          </button>
        </div>
        <div className="hero-image">
          <img src="/api/placeholder/600/400" alt="Home Services" />
        </div>
      </section>

      {/* Service Categories */}
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