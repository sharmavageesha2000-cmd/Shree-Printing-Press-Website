import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AdminSidebar } from '../../components/AdminSidebar';
import { ToastContext } from '../../context/ToastContext';
import { Edit2, ShieldCheck, Truck, Save, Check } from 'lucide-react';

export const AdminOrders = () => {
  const { showToast } = useContext(ToastContext);
  const [orders, setOrders] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [proofUrl, setProofUrl] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('/api/orders');
      if (res.data.success) setOrders(res.data.orders);
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (ord) => {
    setEditingId(ord._id);
    setStatus(ord.orderStatus);
    setTrackingNumber(ord.trackingNumber || '');
    setProofUrl(ord.artworkProofUrl || '');
  };

  const saveOrder = async (id) => {
    setSaving(true);
    try {
      const res = await axios.put(`/api/orders/${id}/status`, {
        orderStatus: status,
        trackingNumber,
        artworkProofUrl: proofUrl
      });
      if (res.data.success) {
        showToast(`Order ${res.data.order.orderId} updated!`, 'success');
        setEditingId(null);
        fetchOrders();
      }
    } catch (err) {
      showToast('Update failed', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 76px)', background: '#FAFAFB' }}>
      <AdminSidebar />

      <main style={{ flex: 1, padding: '32px' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Orders & Pre-Press Proof Management</h1>
        <p style={{ color: '#64748B', marginBottom: '28px' }}>Update production status stages, upload prepress digital proof images, and assign carrier tracking numbers.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {orders.map((ord, idx) => (
            <div key={idx} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: '12px', marginBottom: '16px' }}>
                <div>
                  <span style={{ fontWeight: 800, color: '#0057D9', fontSize: '1.1rem' }}>{ord.orderId}</span>
                  <div style={{ fontSize: '0.85rem', color: '#64748B' }}>
                    Customer: <strong>{ord.user?.name || 'Customer'}</strong> ({ord.user?.email})
                  </div>
                </div>

                <div>
                  <span className={`badge badge-${ord.orderStatus}`}>{ord.orderStatus.toUpperCase()}</span>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', marginTop: '4px', textAlign: 'right' }}>
                    ${ord.totalAmount?.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Items */}
              <div style={{ marginBottom: '16px', fontSize: '0.9rem' }}>
                <strong>Product:</strong> {ord.items[0]?.productName} | <strong>Quantity:</strong> {ord.items[0]?.quantity} units
                <div style={{ fontSize: '0.8rem', color: '#64748B' }}>Specs: {ord.items[0]?.paperType} • {ord.items[0]?.size}</div>
              </div>

              {/* Edit Controls */}
              {editingId === ord._id ? (
                <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '8px', border: '1px solid #CBD5E1' }}>
                  <div className="grid-3" style={{ gap: '12px', marginBottom: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700 }}>Production Status</label>
                      <select value={status} onChange={e => setStatus(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #CBD5E1' }}>
                        <option value="placed">placed</option>
                        <option value="artwork_pending">artwork_pending</option>
                        <option value="artwork_approved">artwork_approved</option>
                        <option value="in_production">in_production</option>
                        <option value="shipped">shipped</option>
                        <option value="delivered">delivered</option>
                        <option value="cancelled">cancelled</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700 }}>Tracking Number</label>
                      <input
                        type="text"
                        value={trackingNumber}
                        onChange={e => setTrackingNumber(e.target.value)}
                        style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #CBD5E1' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700 }}>Prepress Proof Image URL</label>
                      <input
                        type="text"
                        value={proofUrl}
                        onChange={e => setProofUrl(e.target.value)}
                        style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #CBD5E1' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                    <button onClick={() => setEditingId(null)} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>Cancel</button>
                    <button onClick={() => saveOrder(ord._id)} disabled={saving} className="btn btn-primary" style={{ padding: '6px 16px', fontSize: '0.8rem' }}>
                      <Save size={14} /> Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.85rem', color: '#64748B' }}>
                    Tracking: <strong>{ord.trackingNumber || 'Not assigned'}</strong> • Proof URL: {ord.artworkProofUrl ? 'Attached' : 'Pending Upload'}
                  </div>
                  <button onClick={() => startEdit(ord)} className="btn btn-outline" style={{ padding: '6px 14px', fontSize: '0.85rem' }}>
                    <Edit2 size={14} /> Update Order Stage & Proof
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
