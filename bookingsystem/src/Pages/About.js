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

        {/* Contact Us */}
        <section className="contact-us">
          <h2>Contact Us</h2>
          <div className="contact-details">
            <div className="contact-item">
              <div className="contact-icon">👤</div>
              <h3>Name</h3>
              <p>RVGR</p>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📱</div>
              <h3>Mobile Number</h3>
              <p>9363702220</p>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <h3>Address</h3>
              <p>Line Medu Police Quatres<br />Salem City<br />Salem - 636006</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;