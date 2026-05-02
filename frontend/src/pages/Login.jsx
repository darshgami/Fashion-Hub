import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData.email, formData.password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.detail || 'Invalid credentials');
        }
    };

    return (
        <div className="auth-page container">
            <motion.div 
                className="auth-card glass"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h2>Login to <span>FASHION HUB</span></h2>
                <form onSubmit={handleSubmit}>
                    {error && <div className="error">{error}</div>}
                    <div className="form-group">
                        <label>Email Address</label>
                        <input 
                            type="email" 
                            required 
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            required 
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                    <p className="auth-footer">
                        Don't have an account? <Link to="/register">Register here</Link>
                    </p>
                </form>
            </motion.div>

            <style>{`
                .auth-page {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding-top: 80px;
                }
                .auth-card {
                    width: 100%;
                    max-width: 450px;
                    padding: 40px;
                    border-radius: 12px;
                    box-shadow: var(--shadow);
                }
                .auth-card h2 {
                    text-align: center;
                    margin-bottom: 30px;
                    color: var(--primary);
                }
                .auth-card h2 span { color: var(--accent); }
                .form-group { margin-bottom: 20px; }
                .form-group label { display: block; margin-bottom: 8px; font-weight: 500; font-size: 0.9rem; }
                .form-group input {
                    width: 100%;
                    padding: 12px;
                    border: 1px solid #eee;
                    border-radius: 4px;
                    outline: none;
                    transition: var(--transition);
                }
                .form-group input:focus { border-color: var(--accent); }
                .error { background: #fee2e2; color: #dc2626; padding: 10px; border-radius: 4px; margin-bottom: 20px; font-size: 0.85rem; text-align: center; }
                .w-100 { width: 100%; }
                .auth-footer { text-align: center; margin-top: 20px; font-size: 0.9rem; }
                .auth-footer a { color: var(--primary); font-weight: 600; }
            `}</style>
        </div>
    );
};

export default Login;
