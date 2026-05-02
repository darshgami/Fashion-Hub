import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartPage = () => {
    const navigate = useNavigate();
    const { cart, removeFromCart, updateQuantity } = useCart();
    const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    const shipping = subtotal > 5000 ? 0 : 150;
    const total = subtotal + shipping;

    if (cart.length === 0) {
        return (
            <div className="container empty-cart">
                <ShoppingBag size={80} color="#ddd" />
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added anything to your cart yet.</p>
                <Link to="/products" className="btn btn-primary">Start Shopping</Link>
                <style>{`
                    .empty-cart { text-align: center; padding: 100px 0; display: flex; flex-direction: column; align-items: center; gap: 20px; }
                    .empty-cart h2 { font-size: 2.5rem; color: #333; }
                `}</style>
            </div>
        );
    }

    return (
        <div className="container" style={{ paddingTop: '50px', paddingBottom: '100px' }}>
            <h1 className="section-title" style={{ textAlign: 'left', marginBottom: '40px' }}>Shopping Bag</h1>
            
            <div className="cart-grid">
                <div className="cart-list">
                    {cart.map(item => (
                        <div key={item.id || item.product.id} className="cart-item">
                            <div className="item-img">
                                <img src={item.product.image || 'https://via.placeholder.com/100x130'} alt={item.product.name} />
                            </div>
                            <div className="item-details">
                                <Link to={`/products/${item.product.id}`}><h3>{item.product.name}</h3></Link>
                                <p className="item-cat">{item.product.category}</p>
                                <p className="item-price">₹{parseFloat(item.product.price).toLocaleString('en-IN')}</p>
                            </div>
                            <div className="item-qty">
                                <div className="qty-box">
                                    <button onClick={() => updateQuantity(item.id || item.product.id, Math.max(1, item.quantity - 1))}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id || item.product.id, item.quantity + 1)}>+</button>
                                </div>
                            </div>
                            <div className="item-subtotal">
                                <p>₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</p>
                            </div>
                            <button className="remove-btn" onClick={() => removeFromCart(item.id || item.product.id)}><Trash2 size={20} /></button>
                        </div>
                    ))}
                </div>

                <div className="cart-summary glass">
                    <h3>Order Summary</h3>
                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="summary-row">
                        <span>Shipping</span>
                        <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                    </div>
                    <div className="summary-row total">
                        <span>Total</span>
                        <span>₹{total.toLocaleString('en-IN')}</span>
                    </div>
                    <button className="btn btn-primary w-100" style={{ marginTop: '30px' }} onClick={() => navigate('/checkout')}>Proceed to Checkout <ArrowRight size={18} /></button>
                    <p className="summary-note">Secure payments & easy returns on all orders.</p>
                </div>
            </div>

            <style>{`
                .cart-grid { display: grid; grid-template-columns: 1fr 350px; gap: 40px; }
                .cart-list { display: flex; flex-direction: column; gap: 20px; }
                .cart-item {
                    display: grid;
                    grid-template-columns: 100px 1fr 120px 120px 50px;
                    align-items: center;
                    gap: 20px;
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                }
                .item-img img { width: 100%; border-radius: 4px; }
                .item-details h3 { font-size: 1.1rem; margin-bottom: 5px; }
                .item-cat { font-size: 0.8rem; color: var(--accent); font-weight: 600; margin-bottom: 5px; }
                .item-price { font-weight: 700; color: var(--primary); }
                .qty-box { display: flex; align-items: center; border: 1px solid #ddd; border-radius: 4px; overflow: hidden; }
                .qty-box button { padding: 5px 10px; background: #eee; }
                .qty-box span { padding: 0 10px; min-width: 30px; text-align: center; }
                .item-subtotal p { font-weight: 700; font-size: 1.1rem; }
                .remove-btn { background: none; color: #999; }
                .remove-btn:hover { color: #dc2626; }
                .cart-summary { padding: 30px; border-radius: 12px; height: fit-content; sticky: top 100px; }
                .summary-row { display: flex; justify-content: space-between; margin-bottom: 15px; font-size: 1rem; }
                .summary-row.total { border-top: 1px solid #eee; padding-top: 20px; margin-top: 10px; font-weight: 800; font-size: 1.3rem; color: var(--primary); }
                .summary-note { text-align: center; font-size: 0.8rem; color: #999; margin-top: 15px; }
                @media (max-width: 1024px) {
                    .cart-grid { grid-template-columns: 1fr; }
                    .cart-item { grid-template-columns: 80px 1fr 100px 50px; }
                    .item-subtotal { display: none; }
                }
            `}</style>
        </div>
    );
};

export default CartPage;
