import { useState, useEffect } from 'react';
import API from '../../services/api';

const OrdersTab = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchOrders(); }, []);

    const fetchOrders = async () => {
        try {
            const { data } = await API.get('orders/');
            setOrders(data);
        } catch (err) { console.error(err); }
        setLoading(false);
    };

    const downloadInvoice = async (orderId) => {
        const response = await API.get(`orders/${orderId}/download_invoice/`, { responseType: 'blob' });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Invoice_FH_${orderId}.pdf`);
        document.body.appendChild(link);
        link.click();
    };

    return (
        <div className="fade-in">
            <section className="admin-section glass">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <h2>Orders ({orders.length})</h2>
                    <button className="btn-sm" onClick={fetchOrders}>Refresh</button>
                </div>
                {loading ? <p>Loading...</p> : (
                    <div className="order-list">
                        {orders.map(order => (
                            <div key={order.id} className="order-admin-card">
                                <div className="order-header">
                                    <div className="order-meta"><span className="order-no">Order #{order.id}</span><span>{new Date(order.created_at).toLocaleString()}</span></div>
                                    <div className="order-total-price">₹{parseFloat(order.total_amount).toLocaleString()}</div>
                                </div>
                                <div className="order-details-grid">
                                    <div className="details-col">
                                        <h4>Customer</h4>
                                        <p><strong>{order.full_name}</strong> ({order.email})</p>
                                        <p>{order.address}, {order.city}</p>
                                    </div>
                                    <div className="details-col">
                                        <h4>Items ({order.items.length})</h4>
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="mini-item">
                                                <span>{item.product?.name}</span>
                                                <span>{item.quantity} x ₹{item.price}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="order-footer">
                                    <span className="status-chip paid">Paid</span>
                                    <button className="btn-sm" onClick={() => downloadInvoice(order.id)}>Invoice</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default OrdersTab;
