import React from 'react';
import { useParams } from 'react-router-dom';

const policyContent = {
    shipping: {
        title: "Shipping & Returns Policy",
        sections: [
            { 
                heading: "White-Glove Delivery", 
                body: "All orders are processed and shipped within 1-2 business days. We offer complimentary 'White-Glove' express shipping on all orders over $150. Standard delivery typically takes 5-7 business days, while express takes 2-3 business days."
            },
            { 
                heading: "Returns and Exchanges", 
                body: "We accept returns of unused, unopened merchandise within 30 days of purchase for a full refund. Due to the personal nature of our products, any item that has been used, sprayed, or had its seal broken cannot be returned."
            }
        ]
    },
    privacy: {
        title: "Privacy Policy",
        sections: [
            { 
                heading: "Data Collection", 
                body: "W.M. Scents collects personal information (name, address, email) strictly for order fulfillment and internal marketing purposes. We never sell or share your data with third parties. Your security is our highest priority."
            },
            { 
                heading: "Payment Security", 
                body: "All payment transactions are processed through encrypted, PCI-compliant third-party gateways. We do not store your credit card information on our servers."
            }
        ]
    },
    terms: {
        title: "Terms of Service",
        sections: [
            { 
                heading: "Acceptance of Terms", 
                body: "By accessing this website and purchasing products, you agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site."
            }
        ]
    }
};

function PolicyPage() {
    const { policyType } = useParams(); // Get the type from the URL (e.g., 'shipping')
    const currentPolicy = policyContent[policyType] || { title: "Policy Not Found", sections: [] };

    return (
        <div className="policy-page-container">
            <header className="policy-header">
                <h1>{currentPolicy.title}</h1>
            </header>

            {currentPolicy.sections.map((section, index) => (
                <section key={index} className="policy-section">
                    <h2>{section.heading}</h2>
                    <p>{section.body}</p>
                </section>
            ))}

            {currentPolicy.sections.length === 0 && (
                <p className="policy-not-found">The requested policy document could not be loaded.</p>
            )}
        </div>
    );
}

export default PolicyPage;