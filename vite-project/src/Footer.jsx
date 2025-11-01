import React, { useState } from 'react';

function Footer() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(null); // 'submitting', 'success', 'error'

    const handleSubscribe = (e) => {
        e.preventDefault();
        
        if (!email || !email.includes('@')) {
            setStatus('error');
            setTimeout(() => setStatus(null), 4000);
            return;
        }

        setStatus('submitting');

        // Simulate API call delay
        setTimeout(() => {
            if (Math.random() < 0.8) {
                setStatus('success');
                setEmail(''); 
            } else {
                setStatus('error');
            }
            setTimeout(() => setStatus(null), 4000);
        }, 1500);
    };

    const getStatusMessage = () => {
        if (status === 'submitting') return <div className="status-message submitting-msg">Subscribing...</div>;
        if (status === 'success') return <div className="status-message success-msg">Thank you for subscribing!</div>;
        if (status === 'error') return <div className="status-message error-msg">Subscription failed. Please try again.</div>;
        return null;
    };

    return (
        <footer>
            <div className="site-footer">
                <div className="footer-column">
                    <h4>Latest News</h4>
                    <div className="news-item">
                        <div className="news-meta">Massa Leo Ad Gravida</div>
                        <p>Nam liber tempor soluta nobis eleifend...</p>
                    </div>
                    {/* Updated Link */}
                    <a href="/blog" className="view-all">View All Blogs</a>
                </div>

                <div className="footer-column contact-info">
                    <h4>Contact Information</h4>
                    <p>92 New Montgomery St. Ste 750 San Francisco, California 94105</p>
                    <p>+91 (123) 456-78-93</p>
                    <p>demo@example.com</p>
                </div>

                <div className="footer-column subscribe-form-container">
                    <h4>Subscribe Us</h4>
                    <p>Contrary to popular belief of lorem ipsum Latin situm dolar amet.</p>
                    <form onSubmit={handleSubscribe} className="subscribe-form">
                        <input
                            type="email"
                            placeholder="Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit" disabled={status === 'submitting'}>
                            SUBSCRIBE
                        </button>
                    </form>
                    {getStatusMessage()}
                </div>
            </div>
            
            <div className="copyright">
                <p>© 2025 O.M. Luxury Scents. All rights reserved.</p>
                <div className="social-links">
                    {/* Updated Social Links in Footer */}
                    <a href="https://facebook.com/wm-scents" target="_blank" rel="noopener noreferrer">F</a> | 
                    <a href="https://twitter.com/wm-scents" target="_blank" rel="noopener noreferrer">T</a> | 
                    <a href="https://instagram.com/wm-scents" target="_blank" rel="noopener noreferrer">I</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;