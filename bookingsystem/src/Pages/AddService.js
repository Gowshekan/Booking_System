import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../Styles/ProviderRegistration.css';

const AddService = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    duration: '',
    serviceArea: ''
  });

  const navigate = useNavigate();

  const categories = [
    'Plumbing', 'Electrical', 'Carpentry', 'Painting', 
    'Cleaning', 'Repair', 'HVAC', 'Landscaping', 
    'Appliance Repair', 'Home Security'
  ];

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem('user') || 'null');
      
      if (!user || user.role !== 'provider') {
        toast.error('Only providers can add services');
        navigate('/auth');
        return;
      }

      const serviceData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        price: parseFloat(formData.price),
        duration: parseInt(formData.duration),
        provider: user.id,
        serviceArea: formData.serviceArea
      };

      const result = await fetch(`${process.env.REACT_APP_API_BASE_URL}/services`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceData)
      });

      const data = await result.json();

      if (data.status === 'success') {
        toast.success('Service added successfully!');
        navigate('/services');
      } else {
        toast.error(data.message || 'Failed to add service');
      }
    } catch (error) {
      console.error('Add service error:', error);
      toast.error('Failed to add service. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="provider-registration">
      <div className="page-hero">
        <div className="container">
          <h1>Add New Service</h1>
          <p>Create a new service offering for your customers</p>
        </div>
      </div>
      
      <div className="page-content">
        <div className="container">
          <div className="registration-form">
            <h2>Service Details</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="form-section">
                <div className="form-group">
                  <label>Service Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Professional Plumbing Service"
                  />
                </div>

                <div className="form-group">
                  <label>Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="4"
                    placeholder="Describe your service in detail"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Price (₹) *</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      min="1"
                      step="0.01"
                      placeholder="500.00"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Duration (minutes) *</label>
                    <input
                      type="number"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      required
                      min="15"
                      step="15"
                      placeholder="90"
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
                      placeholder="e.g., Downtown, North Side, 10 mile radius"
                    />
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                className="btn-primary btn-full btn-large"
                disabled={loading}
              >
                {loading ? 'Adding Service...' : 'Add Service'}
              </button>

              <div className="auth-footer">
                <p>
                  <button 
                    type="button" 
                    className="link-button"
                    onClick={() => navigate('/provider-dashboard')}
                  >
                    Back to Dashboard
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

export default AddService;