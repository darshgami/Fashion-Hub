import { Link } from 'react-router-dom';
import { Globe, Mail, Phone, Info } from 'lucide-react';

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-col">
                        <Link to="/" className="logo" style={{ color: 'white' }}>FASHION<span>HUB</span></Link>
                        <p style={{ marginTop: '20px' }}>Experience the elegance of Indian fashion. From ethnic wear to western trends, we bring you the best of India.</p>
                        <div className="social-links" style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                            <Globe size={18} />
                            <Mail size={18} />
                            <Phone size={18} />
                            <Info size={18} />
                        </div>
                    </div>
                    
                    <div className="footer-col">
                        <h4>Shop Now</h4>
                        <ul>
                            <li><Link to="/products?category=Women">Women's Wear</Link></li>
                            <li><Link to="/products?category=Men">Men's Wear</Link></li>
                            <li><Link to="/products?category=Kids">Kids' Collection</Link></li>
                            <li><Link to="/products?category=Ethnic">Ethnic Wear</Link></li>
                            <li><Link to="/products?category=Western">Western Style</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><Link to="/about">Our Story</Link></li>
                            <li><Link to="/blogs">Fashion Blog</Link></li>
                            <li><Link to="/contact">Contact Us</Link></li>
                            <li><Link to="/faq">FAQs</Link></li>
                            <li><Link to="/shipping">Shipping Policy</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Industry Links</h4>
                        <ul>
                            <li><a href="https://www.fashiondesigncouncilofindia.com/" target="_blank" rel="noreferrer">FDCI India</a></li>
                            <li><a href="https://www.vogue.in/fashion" target="_blank" rel="noreferrer">Vogue India</a></li>
                            <li><a href="https://www.lakmefashionweek.co.in/" target="_blank" rel="noreferrer">Lakme Fashion Week</a></li>
                        </ul>
                    </div>
                </div>
                
                <div className="footer-bottom">
                    <p>&copy; 2026 FASHION HUB. Designed for Excellence. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
