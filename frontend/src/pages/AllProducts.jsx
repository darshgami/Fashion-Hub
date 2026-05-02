import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import API from '../services/api';
import ProductCard from '../components/ProductCard';
import { Filter, Search as SearchIcon, SortDesc } from 'lucide-react';
import SEO from '../components/SEO';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    
    const category = searchParams.get('category') || '';
    const search = searchParams.get('search') || '';
    const sort = searchParams.get('sort') || 'latest';

    useEffect(() => {
        fetchProducts();
    }, [category, search, sort]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const { data } = await API.get(`products/?category=${category}&search=${search}&sort=${sort}`);
            setProducts(data);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    const handleSortChange = (val) => {
        setSearchParams(prev => {
            prev.set('sort', val);
            return prev;
        });
    };

    const handleCategoryChange = (val) => {
        setSearchParams(prev => {
            if (val === '') prev.delete('category');
            else prev.set('category', val);
            return prev;
        });
    };

    return (
        <div className="container" style={{ paddingTop: '50px' }}>
            <SEO 
                title={category ? `Shop ${category}` : 'Shop All Collections'} 
                description={`Browse our premium ${category || ''} Indian fashion collection. Quality ethnic and western wear for every occasion.`}
                keywords={`Indian Fashion, ${category}, Online Boutique, Ethnic Wear`}
            />
            <div className="shop-header">
                <h2>Our <span>Collection</span></h2>
                <div className="filters-bar">
                    <div className="search-box">
                        <SearchIcon size={18} />
                        <input 
                            type="text" 
                            placeholder="Search fashion..." 
                            value={search}
                            onChange={(e) => setSearchParams(prev => {
                                if (e.target.value === '') prev.delete('search');
                                else prev.set('search', e.target.value);
                                return prev;
                            })}
                        />
                    </div>
                </div>
            </div>

            <div className="shop-main">
                <aside className="shop-sidebar glass">
                    <div className="sidebar-section">
                        <h3>Categories</h3>
                        <div className="category-list">
                            {['', 'Men', 'Women', 'Kids', 'Ethnic', 'Western'].map(cat => (
                                <button 
                                    key={cat} 
                                    className={category === cat ? 'active' : ''}
                                    onClick={() => handleCategoryChange(cat)}
                                >
                                    {cat || 'All Collection'}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="sidebar-section" style={{ marginTop: '30px' }}>
                        <h3>Sort By</h3>
                        <div className="sort-options">
                            <select value={sort} onChange={(e) => handleSortChange(e.target.value)}>
                                <option value="latest">Latest Arrivals</option>
                                <option value="price_low">Price: Low to High</option>
                                <option value="price_high">Price: High to Low</option>
                            </select>
                        </div>
                    </div>
                </aside>

                <main className="shop-content">
                    {loading ? (
                        <div className="loader">Refreshing collection...</div>
                    ) : (
                        <div className="products-grid">
                            {products.length > 0 ? (
                                products.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))
                            ) : (
                                <div className="no-results">Nothing found in this category.</div>
                            )}
                        </div>
                    )}
                </main>
            </div>

            <style>{`
                .shop-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
                .shop-header h2 span { color: var(--accent); }
                .search-box { display: flex; align-items: center; padding: 10px 20px; border: 1px solid #eee; border-radius: 30px; background: white; width: 300px; }
                .search-box input { border: none; outline: none; margin-left: 10px; width: 100%; font-size: 0.9rem; }
                
                .shop-main { display: grid; grid-template-columns: 250px 1fr; gap: 40px; }
                .shop-sidebar { padding: 30px; border-radius: 12px; height: fit-content; position: sticky; top: 100px; }
                .sidebar-section h3 { font-size: 1.1rem; margin-bottom: 20px; color: var(--primary); border-left: 3px solid var(--accent); padding-left: 10px; }
                
                .category-list { display: flex; flex-direction: column; gap: 8px; }
                .category-list button { text-align: left; background: none; padding: 10px 15px; border-radius: 6px; font-weight: 500; font-size: 0.95rem; color: #666; transition: var(--transition); }
                .category-list button:hover { background: #f5f5f5; color: var(--primary); }
                .category-list button.active { background: var(--primary); color: white; box-shadow: 0 4px 10px rgba(128, 0, 0, 0.2); }
                
                .sort-options select { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 6px; outline: none; appearance: none; background: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E') no-repeat right 10px center; background-size: 15px; }

                .products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 25px; padding-bottom: 100px; }
                .loader, .no-results { text-align: center; padding: 100px 0; font-size: 1.1rem; color: #999; }

                @media (max-width: 900px) {
                    .shop-main { grid-template-columns: 1fr; }
                    .shop-sidebar { position: relative; top: 0; margin-bottom: 30px; }
                    .category-list { flex-direction: row; flex-wrap: wrap; }
                }
            `}</style>
        </div>
    );
};

export default AllProducts;
