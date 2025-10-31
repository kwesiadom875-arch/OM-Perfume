import React from 'react';

function DiscoveryPage() {
    return (
        <div className="discovery-page-container">
            <header className="discovery-header">
                <h1>Find Your Perfect Scent Profile</h1>
                <p>Use our exclusive tools to uncover the fragrance that truly defines you.</p>
            </header>

            <section className="tool-block">
                <h2>The Notes Navigator</h2>
                <p>Explore the raw ingredients of our collection. Click on a note to see which perfumes contain it.</p>
                <div className="notes-list-placeholder">
                    {/* Placeholder for interactive notes like 'Sandalwood', 'Bergamot', 'Jasmine' */}
                    <span className="note-pill">Oud</span>
                    <span className="note-pill">Tobacco</span>
                    <span className="note-pill">Vanilla</span>
                    <span className="note-pill">Rose</span>
                    <span className="note-pill">Citrus</span>
                </div>
            </section>

            <section className="tool-block quiz-section">
                <h2>The Signature Quiz</h2>
                <p>Answer five simple questions about your lifestyle and preferences, and we will reveal your O.M. match.</p>
                <button className="start-quiz-button">Start the Quiz →</button>
            </section>
        </div>
    );
}

export default DiscoveryPage;