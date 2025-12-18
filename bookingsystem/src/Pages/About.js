import React from 'react';
import '../Styles/About.css';

const About = () => {

  return (
    <div className="about-page">
      <div className="container">
        {/* Brand Introduction */}
        <section className="brand-intro">
          <h1>About Our Service Platform</h1>
          <p className="brand-description">
            We connect you with trusted, verified professionals who deliver quality home services with reliability and care. 
            Our platform ensures every service provider is thoroughly vetted, insured, and committed to excellence.
            Experience hassle-free booking and guaranteed satisfaction for all your home service needs.
          </p>
        </section>

        {/* About Content */}
        <section className="about-content">
          <div className="about-text">
            <h2>Our Mission</h2>
            <p>
              Our booking system revolutionizes how you connect with professional service providers. 
              We've created a seamless digital platform that bridges the gap between homeowners seeking 
              quality services and skilled professionals ready to deliver exceptional work. Through our 
              user-friendly interface, customers can easily browse, compare, and book services while 
              service providers can showcase their expertise and grow their business.
            </p>
            <p>
              Built with modern technology and designed with user experience in mind, our platform 
              ensures secure transactions, reliable communication, and transparent reviews. We believe 
              in empowering both customers and service providers by creating a trustworthy marketplace 
              where quality work meets fair pricing, and every interaction is backed by our commitment 
              to excellence and customer satisfaction.
            </p>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="why-choose-us">
          <h2>Why Choose Our Platform</h2>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">✅</div>
              <h3>Verified Professionals</h3>
              <p>All service providers are background-checked and verified</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🛡️</div>
              <h3>Insured Services</h3>
              <p>Every booking is protected with comprehensive insurance</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">⭐</div>
              <h3>Quality Guarantee</h3>
              <p>100% satisfaction guarantee on all completed services</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📱</div>
              <h3>Easy Booking</h3>
              <p>Simple online booking with instant confirmation</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;