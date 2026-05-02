import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Package, FileText, Users, Settings } from 'lucide-react';
import InventoryTab from './admin/InventoryTab';
import OrdersTab from './admin/OrdersTab';
import UsersTab from './admin/UsersTab';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('products');

    if (!user || user.role !== 'admin') {
        return <div className="container loader">Access Denied. Admins only.</div>;
    }

    return (
        <div className="container" style={{ paddingTop: '50px', paddingBottom: '100px' }}>
            <h1 className="section-title" style={{ textAlign: 'left' }}>Admin <span>Control Center</span></h1>
            
            <div className="admin-grid">
                <div className="admin-sidebar glass">
                    <nav>
                        <button className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}><Package size={18} /> Inventory</button>
                        <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}><FileText size={18} /> Orders</button>
                        <button className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}><Users size={18} /> Customers</button>
                        <button><Settings size={18} /> Settings</button>
                    </nav>
                </div>

                <div className="admin-content">
                    {activeTab === 'products' && <InventoryTab />}
                    {activeTab === 'orders' && <OrdersTab />}
                    {activeTab === 'users' && <UsersTab />}
                </div>
            </div>

            <style>{`
                .admin-grid { display: grid; grid-template-columns: 250px 1fr; gap: 40px; }
                .admin-sidebar { padding: 25px; border-radius: 12px; height: fit-content; }
                .admin-sidebar nav button { width: 100%; display: flex; align-items: center; gap: 12px; padding: 12px; background: none; font-weight: 600; color: #666; border-radius: 8px; margin-bottom: 5px; }
                .admin-sidebar nav button.active { background: var(--primary); color: white; }
                .admin-section { padding: 30px; border-radius: 12px; }
                .admin-section h2 { color: var(--primary); font-size: 1.3rem; }
                .admin-form { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
                .admin-table-container { overflow-x: auto; }
                .admin-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                .admin-table th { text-align: left; background: #f9f9f9; padding: 12px; color: #888; font-size: 0.8rem; text-transform: uppercase; }
                .admin-table td { padding: 15px 12px; border-bottom: 1px solid #eee; font-size: 0.9rem; }
                
                /* Orders Styling */
                .order-admin-card { background: #fff; border: 1px solid #eee; border-radius: 10px; padding: 20px; margin-bottom: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.02); }
                .order-header { display: flex; justify-content: space-between; border-bottom: 1px solid #f5f5f5; padding-bottom: 15px; margin-bottom: 15px; }
                .order-no { font-weight: 800; font-size: 1.1rem; color: var(--primary); display: block; }
                .order-date { font-size: 0.8rem; color: #999; }
                .order-total-price { font-size: 1.2rem; font-weight: 800; color: var(--primary); }
                .order-details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
                .details-col h4 { font-size: 0.9rem; color: #888; margin-bottom: 12px; border-bottom: 1px solid #eee; padding-bottom: 5px; }
                .details-col p { font-size: 0.9rem; margin-bottom: 8px; }
                .mini-product-list { display: flex; flex-direction: column; gap: 8px; }
                .mini-item { display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 600; background: #f9f9f9; padding: 5px 10px; border-radius: 4px; }
                .order-footer { margin-top: 20px; padding-top: 15px; border-top: 1px solid #f5f5f5; display: flex; justify-content: space-between; align-items: center; }
                .status-chip { padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; }
                .status-chip.paid { background: #e8f5e9; color: #1b5e20; }
                .btn-sm { background: var(--white); border: 1px solid var(--primary); color: var(--primary); padding: 5px 15px; border-radius: 4px; font-size: 0.8rem; font-weight: 700; }
                .btn-sm:hover { background: var(--primary); color: white; }

                .icon-btn { background: none; margin-right: 10px; cursor: pointer; }
                .edit { color: #2563eb; }
                .delete { color: #dc2626; }
                @media (max-width: 992px) {
                    .admin-grid { grid-template-columns: 1fr; }
                    .admin-form { grid-template-columns: 1fr; }
                    .order-details-grid { grid-template-columns: 1fr; }
                }
            `}</style>
        </div>
    );
};

export default AdminDashboard;
