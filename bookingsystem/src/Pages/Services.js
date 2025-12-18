import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../Styles/Services.css';

const Services = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  
  const [services, setServices] = useState([]);
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: category || '',
    priceRange: '',
    rating: '',
    sortBy: 'rating'
  });

  const navigate = useNavigate();

  const categories = ['Plumbing', 'Electrical', 'Carpentry', 'Painting', 'Cleaning', 'Repair'];
  const priceRanges = [
    { label: 'Under $50', value: '0-50' },
    { label: '$50 - $100', value: '50-100' },
    { label: '$100 - $200', value: '100-200' },
    { label: 'Over $200', value: '200+' }
  ];

  useEffect(() => {
    if (id) {
      fetchService();
    } else {
      fetchServices();
    }
  }, [id, filters]);

  const fetchService = async () => {
    const allServices = JSON.parse(localStorage.getItem('services') || '[]');
    const foundService = allServices.find(s => s.id === id);
    
    if (foundService) {
      // Format service for display
      const formattedService = {
        ...foundService,
        _id: foundService.id,
        provider: {
          name: foundService.providerName,
          _id: foundService.providerId,
          phone: foundService.providerPhone,
          bio: `Professional service provider in ${foundService.serviceArea}`,
          location: foundService.serviceArea,
          rating: 4.8,
          completedJobs: Math.floor(Math.random() * 100) + 50
        },
        features: [
          'Professional service',
          'Quality guarantee', 
          'Insured work',
          'Clean-up included',
          'Licensed professional',
          'Customer satisfaction guaranteed'
        ]
      };
      setService(formattedService);
    } else {
      setService(null);
    }
    setLoading(false);
  };

  const fetchServices = async () => {
    const allServices = JSON.parse(localStorage.getItem('services') || '[]');
    let filteredServices = allServices;
    
    if (filters.category) {
      filteredServices = filteredServices.filter(s => s.category === filters.category);
    }
    
    setServices(filteredServices);
    setLoading(false);
  };

  const handleBookService = () => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    
    if (!user) {
      toast.error('Please login to book a service');
      navigate('/auth');
      return;
    }

    if (user.role !== 'customer') {
      toast.error('Only customers can book services');
      return;
    }

    navigate(`/booking/${service._id}`);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // Single Service View
  if (id && service) {
    return (
      <div className="service-detail">
        <div className="container">
          <div className="service-detail-content">
            <div className="service-images">
              <img src="/api/placeholder/600/400" alt={service.title} />
            </div>
            
            <div className="service-info">
              <div className="service-header">
                <h1>{service.title}</h1>
                <div className="service-rating">
                  <span className="stars">⭐ {service.rating || 4.5}</span>
                  <span className="reviews">({service.reviewCount || 0} reviews)</span>
                </div>
              </div>

              <div className="service-meta">
                <div className="meta-item">
                  <strong>Category:</strong> {service.category}
                </div>
                <div className="meta-item">
                  <strong>Duration:</strong> {service.duration} minutes
                </div>
                <div className="meta-item">
                  <strong>Provider:</strong> {service.provider?.name}
                </div>
              </div>

              <div className="service-description">
                <h3>Description</h3>
                <p>{service.description}</p>
              </div>

              <div className="service-features">
                <h3>What's Included</h3>
                <ul>
                  {service.features?.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  )) || [
                    'Professional service',
                    'Quality guarantee',
                    'Insured work',
                    'Clean-up included'
                  ]}
                </ul>
              </div>

              <div className="service-pricing">
                <div className="price">
                  <span className="price-label">Starting at</span>
                  <span className="price-amount">${service.price}</span>
                </div>
                
                <button 
                  className="btn-primary btn-large"
                  onClick={handleBookService}
                >
                  Book This Service
                </button>
              </div>
            </div>
          </div>

          <div className="provider-section">
            <h3>About the Provider</h3>
            <div className="provider-card">
              <div className="provider-info">
                <h4>{service.provider?.name}</h4>
                <p>{service.provider?.bio || 'Experienced professional service provider'}</p>
                <div className="provider-stats">
                  <span>⭐ {service.provider?.rating || 4.8} rating</span>
                  <span>📍 {service.provider?.location || 'Local area'}</span>
                  <span>✅ {service.provider?.completedJobs || 150}+ jobs completed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Services List View
  return (
    <div className="services-list">
      <div className="container">
        <div className="services-header">
          <h1>{category ? `${category} Services` : 'All Services'}</h1>
          <p>Connect with backend to view available services</p>
        </div>

        <div className="services-content">
          <div className="filters-sidebar">
            <h3>Filters</h3>
            
            <div className="filter-group">
              <label>Category</label>
              <select 
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Price Range</label>
              <select 
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              >
                <option value="">Any Price</option>
                {priceRanges.map(range => (
                  <option key={range.value} value={range.value}>{range.label}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Minimum Rating</label>
              <select 
                value={filters.rating}
                onChange={(e) => handleFilterChange('rating', e.target.value)}
              >
                <option value="">Any Rating</option>
                <option value="4">4+ Stars</option>
                <option value="4.5">4.5+ Stars</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Sort By</label>
              <select 
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              >
                <option value="rating">Highest Rated</option>
                <option value="price">Lowest Price</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          <div className="services-main">
            <div className="no-services">
              <h3>No services available</h3>
              <p>Connect to backend API to load services</p>
              <button 
                className="btn-primary"
                onClick={() => navigate('/')}
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;