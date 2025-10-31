import React, { useState } from 'react';

// Reusable FAQ Item component: Manages its own open/close state
function FaqItem({ question, children }) {
  // State: 'isOpen' tracks whether this specific item is open
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="faq-item">
      {/* Button click toggles the state */}
      <button className="faq-question" onClick={toggleOpen} aria-expanded={isOpen}>
        <span>{question}</span>
        {/* Icon changes based on state */}
        <span className="faq-icon">{isOpen ? '−' : '+'}</span>
      </button>
      {/* Conditional Class: 'open' class triggers CSS height animation */}
      <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
        {children}
      </div>
    </div>
  );
}


function FaqPage() {
  return (
    <main>
      {/* 1. Page Header (Standardized look) */}
      <section className="page-header">
        <h1>Frequently Asked Questions</h1>
        <p>Your questions, answered. Find information on authenticity, shipping, and more.</p>
      </section>

      {/* 2. FAQ Accordion Container (Uses container styling from index.css) */}
      <section className="faq-container">
        
        <FaqItem question="What is your 100% authenticity guarantee?">
          <p>This is our most important promise. We <strong>unequivocally guarantee that every product we sell is 100% authentic</strong>, genuine, and sourced directly from the brand or their authorized distributors. We stand behind every bottle and would never risk our reputation on anything less.</p>
        </FaqItem>

        <FaqItem question="Are you an authorized reseller for these brands?">
          <p>As expert curators, we source our products from a global network of trusted suppliers and authorized distributors. While we are not a direct, single-brand "authorized dealer" in all cases, we are a trusted, independent reseller. Our expertise lies in curation and verification, which allows us to offer a wider collection than a typical retailer.</p>
        </FaqItem>

        <FaqItem question="What is your shipping policy?">
          <p>We offer standard and express shipping options. All orders are typically processed within 1-2 business days. You will receive a tracking number as soon as your order ships. For more details, please visit our (future) "Shipping & Returns" policy page.</p>
        </FaqItem>

        <FaqItem question="What is your return policy?">
           <p>Due to the nature of fragrance, we can only accept returns on items that are **unopened, unused, and still in their original, sealed packaging** within 14 days of delivery. If a product arrives damaged, please contact us immediately at [service@omperfumery.com] with a photo of the damage.</p>
        </FaqItem>
        
        {/* You can add more FaqItems here */}
        
      </section>
    </main>
  );
}

export default FaqPage;