import React from 'react';
import { Link } from 'react-router-dom';

function ContactPage() {

  // Placeholder function for form submission
  const handleFormSubmit = (event) => {
    event.preventDefault();
    alert("Form submitted! (Replace this with actual submission logic)");
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log("Form Data:", data);
  };

  return (
    <main>
      {/* 1. Page Header (Standardized look) - Removed for a cleaner match to the image's top */}
      <section className="page-header" style={{ borderBottom: 'none', padding: '2rem 5%' }}>
        <h1 style={{ textAlign: 'left', marginBottom: '0.2rem' }}>Get In Touch</h1>
        <p style={{ textAlign: 'left', maxWidth: 'none', opacity: 0.9 }}>
          Don't be shy. Give us a call or drop us a line. Let's make some magic together.
        </p>
      </section>

      {/* 2. Contact Layout (Two-Toned Structure) */}
      <section className="contact-layout-new">
        
        {/* Left Column: Send a Message (White Background) */}
        <div className="contact-form-container form-block-light">
          <h2>Send a Message</h2>
          
          <form onSubmit={handleFormSubmit} className="contact-form-grid">
            {/* First Name / Last Name Row */}
            <div className="form-group form-group-half">
              <label htmlFor="first_name">First Name</label>
              <input type="text" id="first_name" name="first_name" required />
            </div>
            <div className="form-group form-group-half">
              <label htmlFor="last_name">Last Name</label>
              <input type="text" id="last_name" name="last_name" required />
            </div>

            {/* Phone / Email Row */}
            <div className="form-group form-group-half">
              <label htmlFor="phone">Phone</label>
              <input type="tel" id="phone" name="phone" />
            </div>
            <div className="form-group form-group-half">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            
            {/* Group/Company Row */}
            <div className="form-group form-group-full">
              <label htmlFor="company">Group or Company</label>
              <input type="text" id="company" name="company" />
            </div>

            {/* Message/Help Row */}
            <div className="form-group form-group-full">
              <label htmlFor="message">How can we help?</label>
              <textarea id="message" name="message" rows="4" required></textarea>
            </div>

            <button type="submit" className="btn btn-primary btn-full-width btn-submit-icon">
              SUBMIT <span style={{ marginLeft: '10px' }}>&#10148;</span> {/* Arrow icon */}
            </button>
          </form>
        </div>

        {/* Right Column: Contact Info (Dark Background) */}
        <div className="contact-info-block info-block-dark">
          <h2>Contact Info</h2>
          
          <div className="info-detail-block">
            {/* Phone */}
            <a href="tel:+15859028531" className="info-link">
              +1 (585) 902-8531
            </a>
            {/* Email */}
            <a href="mailto:info@thevocalcompany.com" className="info-link">
              info@thevocalcompany.com
            </a>
          </div>

          <div className="info-social-links">
            {/* Placeholder Social Links */}
            <a href="#" className="social-icon-link">f</a>
            <a href="#" className="social-icon-link">t</a>
            <a href="#" className="social-icon-link">in</a>
            <a href="#" className="social-icon-link">y</a>
            <a href="#" className="social-icon-link">c</a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ContactPage;