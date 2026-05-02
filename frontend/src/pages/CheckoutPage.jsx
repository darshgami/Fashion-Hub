import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';
import { CreditCard, Truck, CheckCircle, Download } from 'lucide-react';
import { motion } from 'framer-motion';

const CheckoutPage = () => {
    const { cart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    
    const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
    const [formData, setFormData] = useState({
        full_name: '',
        email: user?.email || '',
        address: '',
        city: '',
        zip_code: '',
        payment_method: 'Credit Card'
    });
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(false);

    const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    const shipping = subtotal > 5000 ? 0 : 150;
    const total = subtotal + shipping;

    const handleNext = () => setStep(step + 1);
    
    const handlePlaceOrder = async () => {
        setLoading(true);
        try {
            const { data } = await API.post('orders/', formData);
            setOrderData(data);
            setStep(3);
        } catch (err) {
            alert('Failed to place order. Please try again.');
        }
        setLoading(false);
    };

    const downloadInvoice = async () => {
        try {
            const response = await API.get(`orders/${orderData.id}/download_invoice/`, {
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Invoice_FH_${orderData.id}.pdf`);
            document.body.appendChild(link);
            link.click();
        } catch (err) {
            alert('Could not download invoice.');
        }
    };

    if (step === 3) {
        return (
            <div className="container success-container">
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                    <CheckCircle size={100} color="#16a34a" />
                    <h1>Order Placed Successfully!</h1>
                    <p>Thank you for shopping with FASHION HUB. Your order #{orderData?.id} is confirmed.</p>
                    <div className="success-btns">
                        <button className="btn btn-primary" onClick={downloadInvoice}><Download size={18} /> Download Invoice (PDF)</button>
                        <button className="btn btn-outline" onClick={() => navigate('/')}>Continue Shopping</button>
                    </div>
                </motion.div>
                <style>{`
                    .success-container { text-align: center; padding: 100px 0; }
                    .success-btns { display: flex; gap: 20px; justify-content: center; margin-top: 40px; }
                `}</style>
            </div>
        );
    }

    return (
        <div className="container" style={{ paddingTop: '50px', paddingBottom: '100px' }}>
            <div className="checkout-grid">
                <div className="checkout-main glass">
                    <div className="checkout-steps">
                        <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Shipping</div>
                        <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Payment</div>
                    </div>

                    {step === 1 ? (
                        <div className="shipping-form fade-in">
                            <h2 style={{ marginBottom: '30px' }}>Shipping Details</h2>
                            <div className="form-group">
                                <label>Full Name</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. Darsh Patel"
                                    required 
                                    value={formData.full_name}
                                    onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input 
                                    type="email" 
                                    placeholder="name@example.com"
                                    required 
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label>Detailed Address</label>
                                <textarea 
                                    placeholder="Street, Apartment, landmark"
                                    rows="3"
                                    required 
                                    value={formData.address}
                                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group" style={{ flex: 1 }}>
                                    <label>City</label>
                                    <input 
                                        type="text" 
                                        placeholder="City Name"
                                        required 
                                        value={formData.city}
                                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                                    />
                                </div>
                                <div className="form-group" style={{ flex: 1 }}>
                                    <label>ZIP Code</label>
                                    <input 
                                        type="text" 
                                        placeholder="6 Digits"
                                        required 
                                        value={formData.zip_code}
                                        onChange={(e) => setFormData({...formData, zip_code: e.target.value})}
                                    />
                                </div>
                            </div>
                            <button className="btn btn-primary w-100" style={{ padding: '18px', fontSize: '1rem' }} onClick={handleNext}>Continue to Payment</button>
                        </div>
                    ) : (
                        <div className="payment-form">
                            <h2>Payment Method</h2>
                            <div className="payment-options">
                                <div className={`pay-opt ${formData.payment_method === 'Credit Card' ? 'selected' : ''}`} onClick={() => setFormData({...formData, payment_method: 'Credit Card'})}>
                                    <CreditCard size={24} />
                                    <span>Credit / Debit Card</span>
                                </div>
                                <div className={`pay-opt ${formData.payment_method === 'UPI' ? 'selected' : ''}`} onClick={() => setFormData({...formData, payment_method: 'UPI'})}>
                                    <Truck size={24} />
                                    <span>UPI / Net Banking</span>
                                </div>
                                <div className={`pay-opt ${formData.payment_method === 'COD' ? 'selected' : ''}`} onClick={() => setFormData({...formData, payment_method: 'COD'})}>
                                    <Truck size={24} />
                                    <span>Cash on Delivery</span>
                                </div>
                            </div>
                            
                            {formData.payment_method === 'Credit Card' && (
                                <motion.div className="card-details" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                                    <div className="form-group" style={{ marginBottom: '15px' }}>
                                        <label>Card Number</label>
                                        <input type="text" placeholder="0000 0000 0000 0000" />
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                                            <label>Expiry Date</label>
                                            <input type="text" placeholder="MM / YY" />
                                        </div>
                                        <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                                            <label>CVV Code</label>
                                            <input type="password" placeholder="***" />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <div className="payment-summary">
                                <p>You will be charged: <strong>₹{total.toLocaleString('en-IN')}</strong></p>
                            </div>

                            <div className="form-row" style={{ display: 'flex', gap: '15px' }}>
                                <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setStep(1)}>Back</button>
                                <button className="btn btn-primary" style={{ flex: 1 }} onClick={handlePlaceOrder} disabled={loading}>
                                    {loading ? 'Processing...' : 'Place Order'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="order-sidebar glass">
                    <h3>Order Summary</h3>
                    <div className="order-items">
                        {cart.map(item => (
                            <div key={item.id || item.product.id} className="summary-item">
                                <img src={item.product.image || 'https://via.placeholder.com/50x50'} alt="" />
                                <div>
                                    <p className="item-name">{item.product.name}</p>
                                    <p className="item-qty-price">{item.quantity} x ₹{item.product.price.toLocaleString('en-IN')}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="total-box">
                        <div className="row"><span>Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
                        <div className="row"><span>Shipping</span><span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span></div>
                        <div className="row grand-total"><span>Total</span><span>₹{total.toLocaleString('en-IN')}</span></div>
                    </div>
                </div>
            </div>

            <style>{`
                .checkout-grid { display: grid; grid-template-columns: 1fr 380px; gap: 40px; }
                .checkout-main { padding: 40px; border-radius: 12px; }
                .checkout-steps { display: flex; gap: 30px; margin-bottom: 40px; border-bottom: 1px solid #eee; padding-bottom: 20px; }
                .step { font-weight: 700; color: #999; }
                .step.active { color: var(--primary); }
                .payment-options { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin: 30px 0; }
                .pay-opt { border: 1px solid #ddd; padding: 20px; border-radius: 8px; text-align: center; cursor: pointer; transition: 0.3s; }
                .pay-opt.selected { border-color: var(--accent); background: #fffdf5; color: var(--primary); }
                .pay-opt span { display: block; font-size: 0.8rem; margin-top: 10px; font-weight: 600; }
                .order-sidebar { padding: 30px; border-radius: 12px; height: fit-content; }
                .summary-item { display: flex; gap: 15px; margin-bottom: 15px; align-items: center; }
                .summary-item img { width: 45px; height: 45px; object-fit: cover; border-radius: 4px; }
                .item-name { font-size: 0.9rem; font-weight: 600; margin-bottom: 2px; }
                .item-qty-price { font-size: 0.8rem; color: #666; }
                .total-box { border-top: 1px solid #eee; margin-top: 20px; padding-top: 20px; }
                .total-box .row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 0.9rem; }
                .grand-total { font-size: 1.3rem !important; font-weight: 800; color: var(--primary); margin-top: 10px; }
                .card-details { margin-bottom: 25px; background: #f9f9f9; padding: 20px; border-radius: 8px; }
                .payment-summary { margin: 20px 0; font-size: 1rem; color: #555; }
            `}</style>
        </div>
    );
};

export default CheckoutPage;
