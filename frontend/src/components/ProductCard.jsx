import { Link } from 'react-router-dom';
import { ShoppingCart, Eye, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const fav = isInWishlist(product.id);

    return (
        <div className="product-card">
            <div className="product-img">
                <img src={product.image || 'https://via.placeholder.com/300x400?text=Fashion+Hub'} alt={product.name} />
                <div className="product-actions">
                    <button onClick={() => addToCart(product)} title="Add to Cart"><ShoppingCart size={18} /></button>
                    <button onClick={() => toggleWishlist(product)} title="Add to Wishlist" style={{ color: fav ? '#f43f5e' : 'white', background: fav ? 'white' : 'var(--primary)' }}>
                        <Heart size={18} fill={fav ? "#f43f5e" : "none"} />
                    </button>
                    <Link to={`/products/${product.id}`} title="View Details"><Eye size={18} /></Link>
                </div>
                {product.stock <= 0 && <span className="badge-oos">Out of Stock</span>}
            </div>
            <div className="product-info">
                <span className="category">{product.category}</span>
                <Link to={`/products/${product.id}`}><h3>{product.name}</h3></Link>
                <p className="price">₹{parseFloat(product.price).toLocaleString('en-IN')}</p>
            </div>

            <style>{`
                .product-card {
                    background: white;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
                    transition: var(--transition);
                }
                .product-card:hover { transform: translateY(-5px); box-shadow: 0 5px 20px rgba(0,0,0,0.1); }
                .product-img { position: relative; height: 320px; overflow: hidden; }
                .product-img img { width: 100%; height: 100%; object-fit: cover; transition: var(--transition); }
                .product-card:hover .product-img img { transform: scale(1.05); }
                .product-actions {
                    position: absolute;
                    bottom: -50px;
                    left: 0;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    gap: 15px;
                    padding: 15px;
                    background: rgba(255,255,255,0.9);
                    transition: var(--transition);
                }
                .product-card:hover .product-actions { bottom: 0; }
                .product-actions button, .product-actions a {
                    background: var(--primary);
                    color: white;
                    width: 35px;
                    height: 35px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                }
                .product-actions button:hover, .product-actions a:hover { background: var(--accent); }
                .badge-oos {
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    background: #666;
                    color: white;
                    padding: 4px 10px;
                    font-size: 0.7rem;
                    border-radius: 4px;
                }
                .product-info { padding: 20px; }
                .category { font-size: 0.75rem; color: var(--accent); font-weight: 600; text-transform: uppercase; }
                .product-info h3 { margin: 5px 0; font-size: 1.1rem; }
                .price { color: var(--primary); font-weight: 700; font-size: 1.2rem; }
            `}</style>
        </div>
    );
};

export default ProductCard;
