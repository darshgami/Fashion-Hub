import { useState, useEffect } from 'react';
import API from '../services/api';
import { Calendar, User, Share2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data } = await API.get('blogs/');
                setBlogs(data);
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        };
        fetchBlogs();
    }, []);

    const shareOnLinkedIn = (blog) => {
        const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(blog.title)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="container" style={{ paddingTop: '60px', paddingBottom: '100px' }}>
            <div className="blog-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
                <h1 className="section-title">Fashion Journal</h1>
                <p style={{ color: '#666', maxWidth: '600px', margin: '0 auto' }}>Insights into the Indian fashion industry, trend reports, and styling tips from our experts.</p>
            </div>

            {loading ? (
                <div className="loader">Loading journal...</div>
            ) : (
                <div className="blog-grid">
                    {blogs.length > 0 ? (
                        blogs.map((blog, index) => (
                            <motion.div 
                                key={blog.id} 
                                className="blog-card"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="blog-img">
                                    <img src={blog.image || 'https://via.placeholder.com/500x300?text=Fashion+Hub+Blog'} alt={blog.title} />
                                </div>
                                <div className="blog-info">
                                    <div className="blog-meta">
                                        <span><Calendar size={14} /> {new Date(blog.created_at).toLocaleDateString()}</span>
                                        <span><User size={14} /> Admin</span>
                                    </div>
                                    <h3>{blog.title}</h3>
                                    <p>{blog.content.substring(0, 150)}...</p>
                                    <div className="blog-actions">
                                        <button className="read-more">Read Full Story <ArrowRight size={16} /></button>
                                        <button className="share-btn" onClick={() => shareOnLinkedIn(blog)}><Share2 size={18} /> Share</button>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="no-results">No blog posts available yet. Check back soon!</div>
                    )}
                </div>
            )}

            <style>{`
                .blog-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 40px; }
                .blog-card { background: white; border-radius: 12px; overflow: hidden; box-shadow: var(--shadow); transition: var(--transition); }
                .blog-card:hover { transform: translateY(-10px); }
                .blog-img { height: 220px; overflow: hidden; }
                .blog-img img { width: 100%; height: 100%; object-fit: cover; transition: var(--transition); }
                .blog-card:hover .blog-img img { transform: scale(1.05); }
                .blog-info { padding: 25px; }
                .blog-meta { display: flex; gap: 20px; font-size: 0.8rem; color: var(--accent); font-weight: 600; margin-bottom: 15px; }
                .blog-meta span { display: flex; align-items: center; gap: 5px; }
                .blog-info h3 { font-size: 1.4rem; margin-bottom: 15px; color: var(--primary); }
                .blog-info p { font-size: 0.95rem; color: #666; line-height: 1.6; margin-bottom: 20px; }
                .blog-actions { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #eee; padding-top: 20px; }
                .read-more { background: none; color: var(--primary); font-weight: 700; display: flex; align-items: center; gap: 5px; }
                .share-btn { background: #0077b5; color: white; padding: 5px 12px; border-radius: 4px; display: flex; align-items: center; gap: 5px; font-size: 0.8rem; }
                .share-btn:hover { background: #004182; }
                @media (max-width: 480px) {
                    .blog-grid { grid-template-columns: 1fr; }
                }
            `}</style>
        </div>
    );
};

export default Blogs;
