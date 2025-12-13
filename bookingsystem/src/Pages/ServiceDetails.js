import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const ServiceDetails = () => {
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

  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const categories = ['Plumbing', 'Electrical', 'Carpentry', 'Painting', 'Cleaning', 'Repair'];
  const priceRanges = [
    { label: 'Under $50', value: '0-50' },
    { label: '$50 - $100', value: '50-100' },
    { label: '$100 - $200', value: '100-200' },
    { label: 'Over $200', value: '200+' }
  ];

  useEffect(() => {
    console.log('ServiceDetails useEffect - id:', id, 'filters:', filters);
    if (id) {
      fetchService();
    } else {
      fetchServices();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, filters]);

  const fetchService = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/services/${id}`);
      setService(response.data.service);
    } catch (error) {
      // Use mock data for single service
      const mockService = {
        _id: id,
        title: 'Professional Plumbing Service',
        description: 'Expert plumbing repairs and installations for residential and commercial properties. We handle everything from leaky faucets to complete pipe replacements.',
        category: 'Plumbing',
        price: 75,
        duration: 60,
        rating: 4.8,
        reviewCount: 127,
        provider: {
          name: 'John Smith',
          _id: 'p1',
          bio: 'Licensed plumber with 15+ years of experience',
          rating: 4.8,
          location: 'Downtown Area',
          completedJobs: 250
        },
        features: [
          'Professional service',
          'Quality guarantee',
          'Insured work',
          'Clean-up included',
          'Emergency availability',
          'Licensed and bonded'
        ]
      };
      setService(mockService);
    } finally {
      setLoading(false);
    }
  };

  const fetchServices = async () => {
    console.log('fetchServices called');
    try {
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.priceRange) params.append('priceRange', filters.priceRange);
      if (filters.rating) params.append('minRating', filters.rating);
      params.append('sortBy', filters.sortBy);

      const response = await axios.get(`http://localhost:5000/api/services?${params}`);
      setServices(response.data.services || []);
    } catch (error) {
      console.log('API failed, using mock data');
      // Use mock data when API is not available
      const mockServices = [
        {
          _id: '1',
          title: 'Professional Plumbing Service',
          description: 'Expert plumbing repairs and installations',
          category: 'Plumbing',
          price: 75,
          duration: 60,
          rating: 4.8,
          provider: { name: 'John Smith', _id: 'p1' }
        },
        {
          _id: '2',
          title: 'Electrical Wiring & Repairs',
          description: 'Licensed electrical work for homes and offices',
          category: 'Electrical',
          price: 90,
          duration: 90,
          rating: 4.9,
          provider: { name: 'Mike Johnson', _id: 'p2' }
        },
        {
          _id: '3',
          title: 'Custom Carpentry Work',
          description: 'Handcrafted furniture and home improvements',
          category: 'Carpentry',
          price: 65,
          duration: 120,
          rating: 4.7,
          provider: { name: 'Sarah Wilson', _id: 'p3' }
        },
        {
          _id: '4',
          title: 'Interior & Exterior Painting',
          description: 'Professional painting services with quality materials',
          category: 'Painting',
          price: 55,
          duration: 180,
          rating: 4.6,
          provider: { name: 'David Brown', _id: 'p4' }
        },
        {
          _id: '5',
          title: 'Deep Cleaning Service',
          description: 'Thorough cleaning for homes and offices',
          category: 'Cleaning',
          price: 45,
          duration: 120,
          rating: 4.8,
          provider: { name: 'Lisa Davis', _id: 'p5' }
        },
        {
          _id: '6',
          title: 'General Home Repairs',
          description: 'Fix various household issues and maintenance',
          category: 'Repair',
          price: 60,
          duration: 90,
          rating: 4.5,
          provider: { name: 'Tom Anderson', _id: 'p6' }
        }
      ];
      
      let filteredServices = mockServices;
      
      if (filters.category) {
        filteredServices = filteredServices.filter(s => s.category === filters.category);
      }
      
      setServices(filteredServices);
      console.log('Services set:', filteredServices.length, 'services');
    } finally {
      setLoading(false);
    }
  };

  const handleBookService = () => {
    if (!isAuthenticated) {
      toast.error('Please login to book a service');
      navigate('/auth', { state: { from: { pathname: `/services/${service._id}` } } });
      return;
    }

    if (user?.role !== 'customer') {
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

          {/* Provider Info */}
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
          <p>Find the perfect service provider for your needs</p>
        </div>

        <div className="services-content">
          {/* Filters Sidebar */}
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

          {/* Services Grid */}
          <div className="services-main">
            {services.length === 0 ? (
              <div className="no-services">
                <h3>No services found</h3>
                <p>Try adjusting your filters or browse other categories</p>
                <button 
                  className="btn-primary"
                  onClick={() => navigate('/')}
                >
                  Browse All Categories
                </button>
              </div>
            ) : (
              <div className="services-grid">
                {services.map((service) => (
                  <div key={service._id} className="service-card">
                    <div className="service-image">
                      <img src="/api/placeholder/300/200" alt={service.title} />
                    </div>
                    
                    <div className="service-content">
                      <h3>{service.title}</h3>
                      <p className="service-description">{service.description}</p>
                      
                      <div className="service-meta">
                        <span className="category">{service.category}</span>
                        <span className="rating">⭐ {service.rating || 4.5}</span>
                      </div>
                      
                      <div className="service-provider">
                        <span>By {service.provider?.name}</span>
                      </div>
                      
                      <div className="service-footer">
                        <div className="price">
                          <span className="price-from">From</span>
                          <span className="price-amount">${service.price}</span>
                        </div>
                        
                        <button 
                          className="btn-primary"
                          onClick={() => navigate(`/services/${service._id}`)}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;