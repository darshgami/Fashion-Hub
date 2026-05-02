const About = () => {
    return (
        <div className="container" style={{ paddingTop: '80px', paddingBottom: '100px' }}>
            <div className="about-grid">
                <div className="about-img">
                    <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000" alt="About Fashion Hub" />
                </div>
                <div className="about-text">
                    <h1 className="section-title" style={{ textAlign: 'left' }}>The Soul of <span>Fashion Hub</span></h1>
                    <p>Founded in 2026, Fashion Hub was born out of a desire to celebrate the rich heritage of Indian textiles while embracing modern silhouettes. We believe that fashion is a form of self-expression that should be accessible, sustainable, and empowering.</p>
                    <p>Our journey started in a small workshop in Jaipur, where we worked closely with local artisans to create pieces that tell a story. Today, we bridges the gap between traditional craftsmanship and contemporary design.</p>
                    <div className="stats-grid">
                        <div className="stat-card">
                            <h3>10k+</h3>
                            <p>Happy Customers</p>
                        </div>
                        <div className="stat-card">
                            <h3>500+</h3>
                            <p>Artisans</p>
                        </div>
                        <div className="stat-card">
                            <h3>20+</h3>
                            <p>Cities Covered</p>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
                .about-img img { width: 100%; border-radius: 12px; box-shadow: var(--shadow); }
                .about-text p { margin-bottom: 20px; line-height: 1.8; color: #555; font-size: 1.1rem; }
                .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 40px; }
                .stat-card { text-align: center; padding: 20px; background: white; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
                .stat-card h3 { color: var(--primary); font-size: 2rem; margin-bottom: 5px; }
                .stat-card p { font-size: 0.9rem; margin-bottom: 0; }
                @media (max-width: 768px) {
                    .about-grid { grid-template-columns: 1fr; }
                }
            `}</style>
        </div>
    );
};

export default About;
