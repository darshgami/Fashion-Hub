import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, TrendingUp, ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO';

const Home = () => {
    return (
        <div className="home-page">
            <SEO 
                title="Home" 
                description="Welcome to Fashion Hub - Your destination for premium Indian Ethnic and Western wear. Explore our exclusive collection of Sarees, Sherwanis, and Trendy Dresses."
                keywords="Indian Fashion, Ethnic Wear, Western Wear, Saree, Sherwani, Online Shopping India"
            />
            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <motion.div 
                        className="hero-content"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="hero-title">Elegance Redefined <br /><span>Indian Soul, Global Style.</span></h1>
                        <p className="hero-subtitle">Discover the curated collection of premium Indian ethnic and western wear. Crafted with love, worn with pride.</p>
                        <div className="hero-btns" style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
                            <Link to="/products" className="btn btn-primary">Shop Collection <ArrowRight size={18} inline="true" style={{ marginBottom: '-4px', marginLeft: '5px' }} /></Link>
                            <Link to="/products?category=Ethnic" className="btn btn-outline">Explore Ethnic</Link>
                        </div>
                    </motion.div>
                </div>
                <div className="hero-overlay"></div>
            </section>

            {/* Features */}
            <section className="features container" style={{ padding: '80px 0' }}>
                <div className="features-grid">
                    <div className="feature-card">
                        <TrendingUp className="feature-icon" />
                        <h3>Latest Trends</h3>
                        <p>Curated collections updated weekly based on Indian fashion weeks.</p>
                    </div>
                    <div className="feature-card">
                        <Star className="feature-icon" />
                        <h3>Premium Quality</h3>
                        <p>Handpicked fabrics and master tailoring for every single piece.</p>
                    </div>
                    <div className="feature-card">
                        <ShieldCheck className="feature-icon" />
                        <h3>Secure Shopping</h3>
                        <p>Your data and payments are protected with industry-standard encryption.</p>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="categories container" style={{ paddingBottom: '80px' }}>
                <h2 className="section-title">Shop by Category</h2>
                <div className="cat-grid">
                    <Link to="/products?category=Women" className="cat-item women">
                        <div className="cat-overlay"><h3>Women</h3></div>
                    </Link>
                    <Link to="/products?category=Men" className="cat-item men">
                        <div className="cat-overlay"><h3>Men</h3></div>
                    </Link>
                    <Link to="/products?category=Ethnic" className="cat-item ethnic">
                        <div className="cat-overlay"><h3>Ethnic</h3></div>
                    </Link>
                    <Link to="/products?category=Western" className="cat-item western">
                        <div className="cat-overlay"><h3>Western</h3></div>
                    </Link>
                </div>
            </section>

            <style>{`
                .hero {
                    height: 85vh;
                    background: url('/banner.png') no-repeat center center/cover;
                    display: flex;
                    align-items: center;
                    position: relative;
                }
                .hero-overlay {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(to right, rgba(0,0,0,0.7), transparent);
                    z-index: 1;
                }
                .hero-content {
                    position: relative;
                    z-index: 2;
                    color: white;
                    max-width: 600px;
                }
                .hero-title {
                    font-size: clamp(2.5rem, 8vw, 4rem);
                    line-height: 1.1;
                    margin-bottom: 20px;
                }
                .hero-title span {
                    color: var(--accent);
                }
                .hero-subtitle {
                    font-size: clamp(1rem, 3vw, 1.2rem);
                    opacity: 0.9;
                }
                .section-title {
                    text-align: center;
                    font-size: 2.5rem;
                    margin-bottom: 50px;
                    color: var(--primary);
                }
                .features-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 30px;
                    text-align: center;
                }
                .feature-icon {
                    color: var(--accent);
                    width: 40px;
                    height: 40px;
                    margin-bottom: 15px;
                }
                .cat-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 20px;
                    height: 400px;
                }
                .cat-item {
                    border-radius: 8px;
                    overflow: hidden;
                    position: relative;
                    transition: var(--transition);
                }
                .cat-item:hover { transform: translateY(-5px); }
                .cat-overlay {
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    padding: 20px;
                    background: linear-gradient(transparent, rgba(0,0,0,0.8));
                    color: white;
                    text-align: center;
                }
                .women { background: url('/images/cat_women.jpg') center/cover; }
                .men { background: url('/images/cat_men.jpg') center/cover; }
                .ethnic { background: url('/images/cat_ethnic.webp') center/cover; }
                .western { background: url('/images/cat_western.jpg') center/cover; }

                /* Fix Hero Buttons */
                .hero-btns { display: flex; gap: 20px; margin-top: 35px; }
                .hero-btns .btn { padding: 15px 30px; font-size: 0.9rem; }
                .hero-btns .btn-primary { background: var(--primary); border: none; }
                .hero-btns .btn-outline { 
                    border: 1.5px solid var(--white) !important; 
                    color: var(--white) !important;
                    background: rgba(255,255,255,0.1);
                    backdrop-filter: blur(5px);
                }
                .hero-btns .btn-outline:hover {
                    background: var(--white) !important;
                    color: var(--primary) !important;
                }
                @media (max-width: 992px) {
                    .cat-grid { grid-template-columns: repeat(2, 1fr); height: auto; }
                    .cat-item { height: 250px; }
                    .hero-content { text-align: center; margin: 0 auto; }
                    .hero-btns { justify-content: center; }
                }
                @media (max-width: 576px) {
                    .cat-grid { grid-template-columns: 1fr; }
                    .hero-title { font-size: 2.2rem; }
                    .hero-btns { flex-direction: column; width: 100%; }
                    .hero-btns .btn { width: 100%; text-align: center; }
                }
            `}</style>
        </div>
    );
};

export default Home;
