import { useState, useEffect } from 'react';
import API from '../../services/api';
import { Plus, Trash2, Edit } from 'lucide-react';

const InventoryTab = () => {
    const [products, setProducts] = useState([]);
    const [editId, setEditId] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [newProduct, setNewProduct] = useState({
        name: '', description: '', price: '', category: 'Ethnic', stock: 10
    });

    useEffect(() => { fetchProducts(); }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const fetchProducts = async () => {
        const { data } = await API.get('products/');
        setProducts(data);
    };

    const handleEdit = (p) => {
        setEditId(p.id);
        setNewProduct({
            name: p.name,
            description: p.description,
            price: p.price,
            category: p.category,
            stock: p.stock
        });
        setPreviewUrl(p.image);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', newProduct.name);
        formData.append('description', newProduct.description);
        formData.append('price', newProduct.price);
        formData.append('category', newProduct.category);
        formData.append('stock', newProduct.stock);
        if (imageFile) formData.append('image', imageFile);

        try {
            if (editId) {
                await API.patch(`products/${editId}/`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                alert('Updated!');
            } else {
                await API.post('products/', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                alert('Added!');
            }
            resetForm();
            fetchProducts();
        } catch (err) { alert('Operation failed'); }
    };

    const resetForm = () => {
        setNewProduct({ name: '', description: '', price: '', category: 'Ethnic', stock: 10 });
        setEditId(null);
        setImageFile(null);
        setPreviewUrl(null);
    };

    const handleDelete = async (id) => {
        if (confirm('Delete?')) {
            await API.delete(`products/${id}/`);
            fetchProducts();
        }
    };

    return (
        <div className="fade-in">
            <section className="admin-section glass">
                <h2>{editId ? 'Edit Product' : 'Add New Product'}</h2>
                <form onSubmit={handleSubmit} className="admin-form">
                    <div className="form-group"><label>Name</label><input type="text" required value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} /></div>
                    <div className="form-group"><label>Price</label><input type="number" required value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} /></div>
                    <div className="form-group"><label>Category</label>
                        <select value={newProduct.category} onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}>
                            <option value="Men">Men</option><option value="Women">Women</option><option value="Kids">Kids</option><option value="Ethnic">Ethnic</option><option value="Western">Western</option>
                        </select>
                    </div>
                    <div className="form-group"><label>Stock</label><input type="number" required value={newProduct.stock} onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})} /></div>
                    <div className="form-group">
                        <label>Product Image</label>
                        {previewUrl && <img src={previewUrl} alt="Preview" className="admin-preview" />}
                        <input type="file" id="prod-img" accept="image/*" onChange={handleImageChange} hidden />
                        <label htmlFor="prod-img" className="btn btn-outline" style={{ display: 'block', textAlign: 'center', padding: '10px' }}>
                            {previewUrl ? 'Change Image' : 'Upload Image'}
                        </label>
                    </div>
                    <div className="form-group" style={{ gridColumn: 'span 2' }}><label>Description</label><textarea rows="2" value={newProduct.description} onChange={(e) => setNewProduct({...newProduct, description: e.target.value})} /></div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button type="submit" className="btn btn-primary">{editId ? 'Update Product' : 'Add Product'}</button>
                        {editId && <button type="button" className="btn btn-outline" onClick={resetForm}>Cancel</button>}
                    </div>
                </form>
            </section>
            <section className="admin-section glass" style={{ marginTop: '30px' }}>
                <h2>Inventory ({products.length})</h2>
                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead><tr><th>ID</th><th>Image</th><th>Name</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead>
                        <tbody>
                            {products.map(p => (
                                <tr key={p.id}>
                                    <td>#{p.id}</td>
                                    <td>{p.image ? <img src={p.image} alt="" className="table-img" /> : 'No img'}</td>
                                    <td><strong>{p.name}</strong></td><td>₹{parseFloat(p.price).toLocaleString()}</td><td>{p.stock}</td>
                                    <td>
                                        <button className="icon-btn edit" onClick={() => handleEdit(p)}><Edit size={16} /></button>
                                        <button className="icon-btn delete" onClick={() => handleDelete(p.id)}><Trash2 size={16} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default InventoryTab;
