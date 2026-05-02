import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, User, LogOut, Menu, X, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { user, logout } = useAuth();
    const { cart } = useCart();
    const { wishlist } = useWishlist();
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <header>
            <div className="container nav-content">
                <Link to="/" className="logo">
                    <img src="/logo.png" alt="FASHION HUB" style={{ height: '40px', marginRight: '10px', verticalAlign: 'middle' }} />
                    FASHION<span>HUB</span>
                </Link>
                
                <nav className={`nav-links ${mobileOpen ? 'mobile-active' : ''}`}>
                    <Link to="/" onClick={() => setMobileOpen(false)}>Home</Link>
                    <Link to="/products" onClick={() => setMobileOpen(false)}>Shop</Link>
                    <Link to="/products?category=Ethnic" onClick={() => setMobileOpen(false)}>Ethnic</Link>
                    <Link to="/blogs" onClick={() => setMobileOpen(false)}>Blog</Link>
                    {user && user.role === 'admin' && <Link to="/admin" onClick={() => setMobileOpen(false)} style={{ color: 'var(--accent)' }}>Admin</Link>}
                    <Link to="/about" onClick={() => setMobileOpen(false)}>About</Link>
                    <Link to="/contact" onClick={() => setMobileOpen(false)}>Contact</Link>
                </nav>

                <div className="nav-icons">
                    <Search size={20} className="icon-btn" />
                    <Link to="/wishlist" className="cart-icon">
                        <Heart size={20} />
                        {wishlist.length > 0 && <span className="cart-badge">{wishlist.length}</span>}
                    </Link>
                    <Link to="/cart" className="cart-icon">
                        <ShoppingCart size={20} />
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </Link>
                    {user ? (
                        <div className="user-menu" style={{ display: 'flex', gap: '15px' }}>
                            <Link to="/profile"><User size={20} /></Link>
                            <button onClick={logout} style={{ background: 'none' }}><LogOut size={20} /></button>
                        </div>
                    ) : (
                        <Link to="/login"><User size={20} /></Link>
                    )}
                    {mobileOpen ? (
                        <X size={24} className="menu-mobile" onClick={() => setMobileOpen(false)} />
                    ) : (
                        <Menu size={24} className="menu-mobile" onClick={() => setMobileOpen(true)} />
                    )}
                </div>
            </div>
            
            <style>{`
                .cart-icon { position: relative; }
                .cart-badge {
                    position: absolute;
                    top: -10px;
                    right: -10px;
                    background: var(--primary);
                    color: white;
                    font-size: 0.7rem;
                    padding: 2px 6px;
                    border-radius: 50%;
                }
                .icon-btn { cursor: pointer; }
                .menu-mobile { display: none; cursor: pointer; color: var(--primary); }

                @media (max-width: 992px) {
                    .nav-links {
                        position: fixed;
                        top: 70px;
                        left: -100%;
                        width: 100%;
                        height: calc(100vh - 70px);
                        background: white;
                        flex-direction: column;
                        align-items: center;
                        padding: 50px 0;
                        transition: 0.4s ease-in-out;
                        z-index: 999;
                        box-shadow: 0 10px 15px rgba(0,0,0,0.05);
                    }
                    .nav-links.mobile-active {
                        left: 0;
                    }
                    .menu-mobile {
                        display: block;
                    }
                    .nav-icons {
                        gap: 15px;
                    }
                    .logo {
                        font-size: 1.4rem;
                    }
                }
            `}</style>
        </header>
    );
};

export default Navbar;
