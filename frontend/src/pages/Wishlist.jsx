import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';
import { Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Wishlist = () => {
    const { wishlist } = useWishlist();

    return (
        <div className="container" style={{ paddingTop: '50px', paddingBottom: '100px' }}>
            <SEO title="My Wishlist" description="View your favorite items in your wishlist." />
            
            <div className="wishlist-header" style={{ textAlign: 'center', marginBottom: '50px' }}>
                <Heart size={40} color="var(--primary)" style={{ marginBottom: '15px' }} />
                <h1 className="section-title">My <span>Wishlist</span></h1>
                <p style={{ color: '#666' }}>You have {wishlist.length} items in your wishlist</p>
            </div>

            {wishlist.length > 0 ? (
                <div className="products-grid">
                    {wishlist.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="empty-wishlist" style={{ textAlign: 'center', padding: '80px 20px' }}>
                    <ShoppingBag size={60} color="#ddd" style={{ marginBottom: '20px' }} />
                    <h2>Your wishlist is empty!</h2>
                    <p style={{ margin: '15px 0 30px', color: '#888' }}>Find something you love and save it here.</p>
                    <Link to="/products" className="btn btn-primary">Start Shopping</Link>
                </div>
            )}

            <style>{`
                .products-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 30px;
                }
            `}</style>
        </div>
    );
};

export default Wishlist;
