import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ShoppingBag, ChevronLeft, Star, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await API.get(`products/${id}/`);
                setProduct(data);
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        };
        fetchProduct();
    }, [id]);

    if (loading) return <div className="container loader">Loading...</div>;
    if (!product) return <div className="container loader">Product not found.</div>;

    return (
        <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
            <SEO 
                title={product.name} 
                description={product.description.substring(0, 160)} 
                keywords={`${product.name}, ${product.category}, Indian Fashion, Buy Online`}
                image={product.image}
            />
            <Link to="/products" className="back-link"><ChevronLeft size={18} /> Back to Shop</Link>
            
            <div className="detail-grid">
                <motion.div 
                    className="detail-img"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <img src={product.image || 'https://via.placeholder.com/600x800'} alt={product.name} />
                </motion.div>

                <motion.div 
                    className="detail-content"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <span className="cat-tag">{product.category}</span>
                    <h1>{product.name}</h1>
                    <div className="rating">
                        {[1,2,3,4,5].map(i => <Star key={i} size={16} fill={i <= 4 ? "#D4AF37" : "none"} color="#D4AF37" />)}
                        <span>(48 Reviews)</span>
                    </div>
                    <p className="detail-price">₹{parseFloat(product.price).toLocaleString('en-IN')}</p>
                    <p className="detail-desc">{product.description}</p>
                    
                    <div className="stock-info">
                        Status: <span className={product.stock > 0 ? "in-stock" : "out-stock"}>
                            {product.stock > 0 ? `In Stock (${product.stock} units)` : "Out of Stock"}
                        </span>
                    </div>

                    {product.stock > 0 && (
                        <div className="purchase-controls">
                            <div className="qty-selector">
                                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                                <span>{quantity}</span>
                                <button onClick={() => setQuantity(q => q + 1)}>+</button>
                            </div>
                            <button className="btn btn-primary" onClick={() => addToCart(product, quantity)}>
                                <ShoppingBag size={18} style={{ marginRight: '10px' }} /> Add to Cart
                            </button>
                            <button 
                                className="btn-wishlist" 
                                onClick={() => toggleWishlist(product)}
                                style={{ color: isInWishlist(product.id) ? '#f43f5e' : '#666', borderColor: isInWishlist(product.id) ? '#f43f5e' : '#ddd' }}
                            >
                                <Heart size={20} fill={isInWishlist(product.id) ? "#f43f5e" : "none"} />
                            </button>
                        </div>
                    )}

                    <div className="product-meta">
                        <p><strong>SKU:</strong> FH-PROD-{product.id}</p>
                        <p><strong>Category:</strong> {product.category}, Fashion, Indian Wear</p>
                    </div>
                </motion.div>
            </div>

            <style>{`
                .back-link { display: flex; align-items: center; gap: 5px; color: var(--text-light); margin-bottom: 30px; font-weight: 500; }
                .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; }
                .detail-img { border-radius: 12px; overflow: hidden; background: #fff; }
                .detail-img img { width: 100%; display: block; border-radius: 12px; }
                .cat-tag { color: var(--accent); font-weight: 700; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 1px; }
                .detail-content h1 { font-size: 3rem; margin: 10px 0; }
                .rating { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; color: #999; font-size: 0.9rem; }
                .detail-price { font-size: 2rem; color: var(--primary); font-weight: 800; margin-bottom: 25px; }
                .detail-desc { line-height: 1.8; color: var(--text-light); margin-bottom: 30px; font-size: 1.05rem; }
                .stock-info { margin-bottom: 30px; font-weight: 500; }
                .in-stock { color: #16a34a; }
                .out-stock { color: #dc2626; }
                .purchase-controls { display: flex; gap: 20px; align-items: center; margin-bottom: 40px; }
                .qty-selector { display: flex; align-items: center; border: 1px solid #ddd; border-radius: 4px; overflow: hidden; }
                .qty-selector button { padding: 10px 15px; background: #eee; }
                .qty-selector span { padding: 0 20px; min-width: 50px; text-align: center; font-weight: 600; }
                .btn-wishlist { width: 45px; height: 45px; border: 1px solid #ddd; border-radius: 4px; display: flex; align-items: center; justify-content: center; background: white; color: #666; }
                .product-meta { border-top: 1px solid #eee; padding-top: 20px; font-size: 0.9rem; color: #777; }
                .product-meta p { margin-bottom: 5px; }
                @media (max-width: 768px) {
                    .detail-grid { grid-template-columns: 1fr; gap: 30px; }
                    .detail-content h1 { font-size: 2.2rem; }
                }
            `}</style>
        </div>
    );
};

export default ProductDetail;
