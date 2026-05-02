import { useState, useEffect } from 'react';
import API from '../../services/api';
import { User, Mail, Calendar } from 'lucide-react';

const UsersTab = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchUsers(); }, []);

    const fetchUsers = async () => {
        try {
            const { data } = await API.get('users/');
            setUsers(data);
        } catch (err) { console.error(err); }
        setLoading(false);
    };

    return (
        <div className="fade-in">
            <section className="admin-section glass">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <h2>Registered Users ({users.length})</h2>
                    <button className="btn-sm" onClick={fetchUsers}>Refresh</button>
                </div>
                {loading ? <p>Loading...</p> : (
                    <div className="admin-table-container">
                        <table className="admin-table">
                            <thead><tr><th>Username</th><th>Email</th><th>Role</th><th>Member Since</th></tr></thead>
                            <tbody>
                                {users.map(u => (
                                    <tr key={u.id}>
                                        <td><strong>{u.username}</strong></td>
                                        <td>{u.email}</td>
                                        <td><span className={`status-chip ${u.role === 'admin' ? 'paid' : ''}`}>{u.role}</span></td>
                                        <td>{new Date(u.date_joined).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </div>
    );
};

export default UsersTab;
