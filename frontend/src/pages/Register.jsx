import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import { motion } from 'framer-motion';

const Register = () => {
    const [formData, setFormData] = useState({ 
        username: '', 
        email: '', 
        password: '', 
        first_name: '', 
        last_name: '' 
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('register/', formData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data ? JSON.stringify(err.response.data) : 'Registration failed');
        }
    };

    return (
        <div className="auth-page container">
            <motion.div 
                className="auth-card glass"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <h2>Join <span>FASHION HUB</span></h2>
                <form onSubmit={handleSubmit}>
                    {error && <div className="error">{error}</div>}
                    <div className="form-row" style={{ display: 'flex', gap: '15px' }}>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>First Name</label>
                            <input 
                                type="text" required 
                                value={formData.first_name}
                                onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                            />
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Last Name</label>
                            <input 
                                type="text" required 
                                value={formData.last_name}
                                onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <input 
                            type="text" required 
                            value={formData.username}
                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input 
                            type="email" required 
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" required 
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Register</button>
                    <p className="auth-footer">
                        Already have an account? <Link to="/login">Login here</Link>
                    </p>
                </form>
            </motion.div>
            
            <style>{`
                .auth-page { display: flex; justify-content: center; align-items: center; padding-top: 50px; padding-bottom: 50px; }
                .auth-card { width: 100%; max-width: 500px; padding: 40px; border-radius: 12px; box-shadow: var(--shadow); }
                .auth-card h2 { text-align: center; margin-bottom: 30px; color: var(--primary); }
                .auth-card h2 span { color: var(--accent); }
                .form-group { margin-bottom: 15px; }
                .form-group label { display: block; margin-bottom: 8px; font-weight: 500; font-size: 0.85rem; }
                .form-group input { width: 100%; padding: 10px; border: 1px solid #eee; border-radius: 4px; outline: none; transition: var(--transition); }
                .form-group input:focus { border-color: var(--accent); }
                .error { background: #fee2e2; color: #dc2626; padding: 10px; border-radius: 4px; margin-bottom: 20px; font-size: 0.8rem; }
                .w-100 { width: 100%; }
                .auth-footer { text-align: center; margin-top: 20px; font-size: 0.9rem; }
                .auth-footer a { color: var(--primary); font-weight: 600; }
            `}</style>
        </div>
    );
};

export default Register;
