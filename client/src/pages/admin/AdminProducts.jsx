import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AdminSidebar } from '../../components/AdminSidebar';
import { ToastContext } from '../../context/ToastContext';
import { Plus, Trash2, Edit } from 'lucide-react';

export const AdminProducts = () => {
  const { showToast } = useContext(ToastContext);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Business Stationery',
    description: '',
    basePrice: 49.99,
    images: ['https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=600&q=80']
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/api/products');
      if (res.data.success) setProducts(res.data.products);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/products', formData);
      if (res.data.success) {
        showToast(`Product ${res.data.product.name} created!`, 'success');
        setShowModal(false);
        fetchProducts();
      }
    } catch (err) {
      showToast('Product creation failed', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await axios.delete(`/api/products/${id}`);
      showToast('Product deleted!', 'success');
      fetchProducts();
    } catch (err) {
      showToast('Delete failed', 'error');
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 76px)', background: '#FAFAFB' }}>
      <AdminSidebar />

      <main style={{ flex: 1, padding: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem' }}>Print Products Catalog</h1>
            <p style={{ color: '#64748B', fontSize: '0.9rem' }}>Manage products, paper stocks, finish parameters, and tier pricing matrix.</p>
          </div>
          <button onClick={() => setShowModal(true)} className="btn btn-primary">
            <Plus size={18} /> Add New Print Product
          </button>
        </div>

        <div className="grid-3" style={{ gap: '20px' }}>
          {products.map((prod, idx) => (
            <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <img src={prod.images?.[0]} alt={prod.name} style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '8px', marginBottom: '12px' }} />
              <div style={{ flex: 1 }}>
                <span style={{ color: '#FF6B00', fontWeight: 700, fontSize: '0.75rem' }}>{prod.category}</span>
                <h3 style={{ fontSize: '1.1rem', margin: '4px 0' }}>{prod.name}</h3>
                <p style={{ color: '#64748B', fontSize: '0.85rem', marginBottom: '12px' }}>{prod.shortDescription || prod.description}</p>
                <div style={{ fontWeight: 800, color: '#0057D9', fontSize: '1.2rem' }}>From ${prod.basePrice?.toFixed(2)}</div>
              </div>
              <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '12px', marginTop: '12px', display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={() => handleDelete(prod._id)} style={{ color: '#EF4444', background: 'none' }}>
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Create New Print Product</h3>
              <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                <input type="text" placeholder="Product Name *" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }} />
                <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }}>
                  <option value="Business Stationery">Business Stationery</option>
                  <option value="Marketing Materials">Marketing Materials</option>
                  <option value="Large Format Banners">Large Format Banners</option>
                  <option value="Packaging & Labels">Packaging & Labels</option>
                </select>
                <textarea placeholder="Product Description *" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }} />
                <input type="number" placeholder="Base Price ($)" value={formData.basePrice} onChange={e => setFormData({ ...formData, basePrice: Number(e.target.value) })} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }} />
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '12px' }}>
                  <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">Cancel</button>
                  <button type="submit" className="btn btn-primary">Save Product</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
