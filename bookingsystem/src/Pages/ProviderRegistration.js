import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import '../Styles/ProviderRegistration.css';

const ProviderRegistration = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    businessName: '',
    businessDescription: '',
    serviceCategories: [],
    experience: '',
    certifications: '',
    workingHours: '',
    serviceArea: '',
    priceRange: ''
  });

  const navigate = useNavigate();

  const serviceCategories = [
    'Plumbing', 'Electrical', 'Carpentry', 'Painting', 
    'Cleaning', 'Repair', 'HVAC', 'Landscaping', 
    'Appliance Repair', 'Home Security'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        serviceCategories: checked 
          ? [...prev.serviceCategories, value]
          : prev.serviceCategories.filter(cat => cat !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.serviceCategories.length === 0) {
      toast.error('Please select at least one service category');
      return;
    }

    setLoading(true);

    try {
      // Register provider via API
      const signupResult = await fetch('http://localhost:5000/api/v1/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: 'provider',
          phone: formData.phone,
          address: formData.address
        })
      });
      
      const signupData = await signupResult.json();
      
      if (signupData.status !== 'success') {
        toast.error(signupData.message || 'Registration failed');
        setLoading(false);
        return;
      }
      
      // Save user data
      localStorage.setItem('user', JSON.stringify(signupData.user));
      localStorage.setItem('token', signupData.token);
      
      // Create services for each category
      const basePrice = formData.priceRange.includes('500-1000') ? 750 : 
                       formData.priceRange.includes('1000-1500') ? 1250 :
                       formData.priceRange.includes('1500-2000') ? 1750 :
                       formData.priceRange.includes('2000-3000') ? 2500 : 1000;
      
      for (const category of formData.serviceCategories) {
        const serviceData = {
          title: `Professional ${category} Service`,
          description: formData.businessDescription || `Expert ${category.toLowerCase()} services by ${formData.name}`,
          category: category,
          price: basePrice,
          duration: 90,
          provider: signupData.user.id,
          serviceArea: formData.serviceArea
        };
        
        await fetch('http://localhost:5000/api/v1/services', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(serviceData)
        });
      }
      
      toast.success('Registration successful! You are now a verified provider and your services are live!');
      navigate('/services');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please ensure backend is running and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="provider-registration">
      <div className="page-hero">
        <div className="container">
          <h1>Become a Service Provider</h1>
          <p>Join our platform and start offering your professional services to customers</p>
        </div>
      </div>
      
      <div className="page-content">
        <div className="container">
          <div className="registration-form">
            <h2>Service Provider Registration</h2>
            
            <form onSubmit={handleSubmit}>
              {/* Personal Information */}
              <div className="form-section">
                <h3>Personal Information</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Password *</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="Create a strong password"
                      minLength="6"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Confirm Password *</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      placeholder="Confirm your password"
                      minLength="6"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Address *</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    rows="3"
                    placeholder="Enter your complete address"
                  />
                </div>
              </div>

              {/* Business Information */}
              <div className="form-section">
                <h3>Business Information</h3>
                
                <div className="form-group">
                  <label>Business Name</label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="Enter your business name (optional)"
                  />
                </div>

                <div className="form-group">
                  <label>Business Description *</label>
                  <textarea
                    name="businessDescription"
                    value={formData.businessDescription}
                    onChange={handleChange}
                    required
                    rows="4"
                    placeholder="Describe your services and expertise"
                  />
                </div>

                <div className="form-group">
                  <label>Service Categories * (Select all that apply)</label>
                  <div className="checkbox-grid">
                    {serviceCategories.map(category => (
                      <div key={category} className="checkbox-item">
                        <input
                          type="checkbox"
                          id={category}
                          value={category}
                          checked={formData.serviceCategories.includes(category)}
                          onChange={handleChange}
                        />
                        <label htmlFor={category}>{category}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Years of Experience *</label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select experience level</option>
                      <option value="0-1">0-1 years</option>
                      <option value="2-5">2-5 years</option>
                      <option value="6-10">6-10 years</option>
                      <option value="11-15">11-15 years</option>
                      <option value="15+">15+ years</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Price Range *</label>
                    <select
                      name="priceRange"
                      value={formData.priceRange}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select typical price range</option>
                      <option value="₹500-1000">₹500-1000 per hour</option>
                      <option value="₹1000-1500">₹1000-1500 per hour</option>
                      <option value="₹1500-2000">₹1500-2000 per hour</option>
                      <option value="₹2000-3000">₹2000-3000 per hour</option>
                      <option value="₹3000+">₹3000+ per hour</option>
                      <option value="project-based">Project-based pricing</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Certifications & Licenses</label>
                  <textarea
                    name="certifications"
                    value={formData.certifications}
                    onChange={handleChange}
                    rows="3"
                    placeholder="List any relevant certifications, licenses, or qualifications"
                  />
                </div>
              </div>

              {/* Service Details */}
              <div className="form-section">
                <h3>Service Details</h3>
                
                <div className="form-group">
                  <label>Working Hours *</label>
                  <input
                    type="text"
                    name="workingHours"
                    value={formData.workingHours}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Monday-Friday 9AM-6PM, Saturday 10AM-4PM"
                  />
                </div>

                <div className="form-group">
                  <label>Service Area *</label>
                  <input
                    type="text"
                    name="serviceArea"
                    value={formData.serviceArea}
                    onChange={handleChange}
                    required
                    placeholder="Areas you provide services (e.g., Downtown, North Side, 10 mile radius)"
                  />
                </div>
              </div>

              <div className="registration-note">
                <p>
                  <strong>Note:</strong> After registration, you will immediately become a verified provider 
                  and your services will be live on our platform for customers to book!
                </p>
              </div>

              <button 
                type="submit" 
                className="btn-primary btn-full btn-large"
                disabled={loading || formData.serviceCategories.length === 0}
              >
                {loading ? 'Registering...' : 'Register as Service Provider'}
              </button>

              <div className="auth-footer">
                <p>
                  Already have an account? 
                  <button 
                    type="button" 
                    className="link-button"
                    onClick={() => navigate('/auth')}
                  >
                    Login here
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderRegistration;