import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    return (
        <div className="container" style={{ paddingTop: '80px', paddingBottom: '100px' }}>
            <h1 className="section-title">Get in Touch</h1>
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '60px' }}>Have questions about our collection or need help with an order? We're here for you.</p>

            <div className="contact-grid">
                <div className="contact-info">
                    <div className="info-item">
                        <MapPin className="icon" />
                        <div>
                            <h3>Our Hub</h3>
                            <p>123 Fashion Street, Bandra West, Mumbai, Maharashtra 400050</p>
                        </div>
                    </div>
                    <div className="info-item">
                        <Mail className="icon" />
                        <div>
                            <h3>Email Us</h3>
                            <p>support@fashionhub.com</p>
                            <p>careers@fashionhub.com</p>
                        </div>
                    </div>
                    <div className="info-item">
                        <Phone className="icon" />
                        <div>
                            <h3>Call Us</h3>
                            <p>+91 98765 43210</p>
                            <p>Mon - Sat: 10:00 AM - 7:00 PM</p>
                        </div>
                    </div>
                </div>

                <div className="contact-form glass">
                    <form>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input type="text" placeholder="John Doe" />
                        </div>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input type="email" placeholder="john@example.com" />
                        </div>
                        <div className="form-group">
                            <label>How can we help?</label>
                            <textarea rows="5" placeholder="Write your message here..."></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Send Message <Send size={18} style={{ marginLeft: '10px' }} /></button>
                    </form>
                </div>
            </div>

            <style>{`
                .contact-grid { display: grid; grid-template-columns: 400px 1fr; gap: 60px; }
                .info-item { display: flex; gap: 20px; margin-bottom: 40px; }
                .info-item .icon { color: var(--accent); width: 30px; height: 30px; margin-top: 5px; }
                .info-item h3 { font-size: 1.2rem; margin-bottom: 5px; color: var(--primary); }
                .info-item p { color: #555; line-height: 1.5; font-size: 0.95rem; }
                .contact-form { padding: 40px; border-radius: 12px; box-shadow: var(--shadow); }
                .form-group { margin-bottom: 20px; }
                .form-group label { display: block; margin-bottom: 8px; font-weight: 500; font-size: 0.9rem; }
                .form-group input, .form-group textarea { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 4px; outline: none; }
                .form-group input:focus, .form-group textarea:focus { border-color: var(--accent); }
                .w-100 { width: 100%; border: none; }
                @media (max-width: 992px) {
                    .contact-grid { grid-template-columns: 1fr; }
                }
            `}</style>
        </div>
    );
};

export default Contact;
