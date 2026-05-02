import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';
import { User, Package, MapPin, LogOut, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Profile = () => {
    const { user, logout, loading: authLoading } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await API.get('orders/');
                setOrders(data);
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        };
        if (user) fetchOrders();
    }, [user]);

    const downloadInvoice = async (orderId) => {
        try {
            const response = await API.get(`orders/${orderId}/download_invoice/`, {
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Invoice_FH_${orderId}.pdf`);
            document.body.appendChild(link);
            link.click();
        } catch (err) {
            alert('Could not download invoice.');
        }
    };

    if (authLoading) return <div className="container loader">Syncing your profile...</div>;
    if (!user) return <div className="container loader">Please login to view your profile.</div>;

    return (
        <div className="container" style={{ paddingTop: '50px', paddingBottom: '100px' }}>
            <div className="profile-grid">
                <aside className="profile-sidebar glass">
                    <div className="user-info-header">
                        <div className="avatar">{user?.username?.[0]?.toUpperCase() || 'U'}</div>
                        <h3>{user.first_name} {user.last_name}</h3>
                        <p>{user.email}</p>
                        <span className="role-badge">{user.role}</span>
                    </div>
                    <nav className="profile-nav">
                        <button className="active"><User size={18} /> Personal Info</button>
                        <button><Package size={18} /> My Orders</button>
                        <button><MapPin size={18} /> Addresses</button>
                        <hr />
                        <button className="logout-btn" onClick={logout}><LogOut size={18} /> Logout</button>
                    </nav>
                </aside>

                <main className="profile-main">
                    <section className="profile-section glass">
                        <h2>Personal Information</h2>
                        <div className="info-grid">
                        <div className="info-item">
                                <label>First Name</label>
                                <p>{user?.first_name || 'N/A'}</p>
                            </div>
                            <div className="info-item">
                                <label>Last Name</label>
                                <p>{user?.last_name || 'N/A'}</p>
                            </div>
                            <div className="info-item">
                                <label>Login ID / Username</label>
                                <p>{user?.username}</p>
                            </div>
                            <div className="info-item">
                                <label>Email Address</label>
                                <p>{user?.email}</p>
                            </div>
                            <div className="info-item">
                                <label>Member Since</label>
                                <p>{user?.date_joined ? new Date(user.date_joined).toLocaleDateString() : 'N/A'}</p>
                            </div>
                            <div className="info-item">
                                <label>Phone Number</label>
                                <p>{user?.phone_number || 'Not Provided'}</p>
                            </div>
                            <div className="info-item">
                                <label>Location</label>
                                <p>{user?.location || 'India'}</p>
                            </div>
                            <div className="info-item">
                                <label>Default Currency</label>
                                <p>INR (₹)</p>
                            </div>
                        </div>
                    </section>

                    <section className="profile-section glass" style={{ marginTop: '30px' }}>
                        <h2>Recent Orders</h2>
                        {loading ? (
                            <p>Loading orders...</p>
                        ) : orders.length > 0 ? (
                            <div className="order-history">
                                {orders.map(order => (
                                    <div key={order.id} className="order-row">
                                        <div className="order-id">
                                            <p className="label">Order ID</p>
                                            <p className="val">#{order.id}</p>
                                        </div>
                                        <div className="order-date">
                                            <p className="label">Date</p>
                                            <p className="val">{new Date(order.created_at).toLocaleDateString()}</p>
                                        </div>
                                        <div className="order-total">
                                            <p className="label">Total</p>
                                            <p className="val">₹{parseFloat(order.total_amount).toLocaleString('en-IN')}</p>
                                        </div>
                                        <div className="order-status">
                                            <span className="status-paid"><CheckCircle size={14} /> Paid</span>
                                        </div>
                                        <div className="order-action">
                                            <button className="btn-sm" onClick={() => downloadInvoice(order.id)}>Invoice</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="empty-msg">You haven't placed any orders yet.</p>
                        )}
                    </section>
                </main>
            </div>

            <style>{`
                .profile-grid { display: grid; grid-template-columns: 300px 1fr; gap: 40px; }
                .profile-sidebar { padding: 30px; border-radius: 12px; height: fit-content; text-align: center; }
                .avatar { width: 80px; height: 80px; background: var(--primary); color: white; font-size: 2rem; font-weight: 800; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; }
                .role-badge { background: var(--accent); color: white; padding: 2px 10px; border-radius: 20px; font-size: 0.7rem; text-transform: uppercase; font-weight: 700; margin-top: 5px; display: inline-block; }
                .profile-nav { margin-top: 30px; text-align: left; }
                .profile-nav button { width: 100%; display: flex; align-items: center; gap: 15px; padding: 12px 15px; background: none; font-weight: 600; color: #666; border-radius: 8px; margin-bottom: 5px; }
                .profile-nav button.active { background: #fffdf5; color: var(--primary); }
                .profile-nav button:hover { background: #f9f9f9; }
                .logout-btn { color: #dc2626 !important; }
                .profile-section { padding: 40px; border-radius: 12px; }
                .profile-section h2 { margin-bottom: 30px; font-size: 1.5rem; color: var(--primary); border-bottom: 1px solid #eee; padding-bottom: 15px; }
                .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
                .info-item label { display: block; font-size: 0.8rem; color: #999; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; margin-bottom: 5px; }
                .info-item p { font-size: 1.1rem; font-weight: 600; }
                .order-row { display: grid; grid-template-columns: 1fr 1.5fr 1fr 1fr 1fr; align-items: center; padding: 20px 0; border-bottom: 1px solid #eee; }
                .order-row:last-child { border-bottom: none; }
                .order-row .label { font-size: 0.7rem; color: #999; margin-bottom: 2px; }
                .order-row .val { font-weight: 700; font-size: 0.95rem; }
                .status-paid { color: #16a34a; font-size: 0.8rem; font-weight: 700; display: flex; align-items: center; gap: 5px; }
                .btn-sm { background: var(--white); border: 1px solid var(--primary); color: var(--primary); padding: 5px 15px; border-radius: 4px; font-size: 0.8rem; font-weight: 700; }
                .btn-sm:hover { background: var(--primary); color: white; }
                @media (max-width: 992px) {
                    .profile-grid { grid-template-columns: 1fr; }
                }
            `}</style>
        </div>
    );
};

export default Profile;
