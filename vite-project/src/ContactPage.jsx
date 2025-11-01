import React, { useState } from 'react';

function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState(null); // 'submitting', 'success', 'error'

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Simple validation
        if (!formData.name || !formData.email || !formData.message) {
            setStatus('error');
            setTimeout(() => setStatus(null), 3000);
            return;
        }

        setStatus('submitting');
        
        // --- Mock Submission Logic ---
        console.log("Contact Form Submitted:", formData);
        
        setTimeout(() => {
            // Simulate successful API response
            setStatus('success');
            setFormData({ name: '', email: '', message: '' }); // Clear form
            setTimeout(() => setStatus(null), 4000);
        }, 1500);
    };

    const getStatusMessage = () => {
        if (status === 'submitting') return <p className="contact-status submitting-msg">Sending message...</p>;
        if (status === 'success') return <p className="contact-status success-msg">Thank you! Your message has been sent.</p>;
        if (status === 'error') return <p className="contact-status error-msg">Please fill out all required fields.</p>;
        return null;
    };

    return (
        <div className="contact-page-container">
            <header className="contact-header">
                <h1>Get In Touch</h1>
                <p>We are here to assist you with any questions about our scents or your order.</p>
            </header>

            <div className="contact-grid">
                
                {/* Contact Form Column */}
                <div className="contact-form-column">
                    <h2>Send Us a Message</h2>
                    <form onSubmit={handleSubmit} className="contact-form">
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Your Name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            disabled={status === 'submitting'}
                        />
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Your Email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            disabled={status === 'submitting'}
                        />
                        <textarea 
                            name="message" 
                            placeholder="Your Message..." 
                            rows="6" 
                            value={formData.message} 
                            onChange={handleChange} 
                            disabled={status === 'submitting'}
                        ></textarea>
                        
                        <button type="submit" disabled={status === 'submitting'}>
                            {status === 'submitting' ? 'Submitting...' : 'Send Message'}
                        </button>
                        
                        {getStatusMessage()}
                    </form>
                </div>
                
                {/* Info Sidebar Column */}
                <div className="contact-info-sidebar">
                    <h2>Our Details</h2>
                    <div className="info-block">
                        <h4>Office Location</h4>
                        <p>92 New Montgomery St. Ste 750</p>
                        <p>San Francisco, California 94105</p>
                    </div>
                    <div className="info-block">
                        <h4>Email & Phone</h4>
                        <p>General Inquiries: demo@example.com</p>
                        <p>Customer Support: support@example.com</p>
                        <p>Phone: +91 (123) 456-78-93</p>
                    </div>
                    <div className="info-block">
                        <h4>Hours</h4>
                        <p>Monday - Friday: 9am - 5pm PST</p>
                        <p>Saturday: 10am - 2pm PST</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactPage;