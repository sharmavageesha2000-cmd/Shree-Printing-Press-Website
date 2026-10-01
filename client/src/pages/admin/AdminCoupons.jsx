import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AdminSidebar } from '../../components/AdminSidebar';
import { ToastContext } from '../../context/ToastContext';
import { Ticket, Plus } from 'lucide-react';

export const AdminCoupons = () => {
  const { showToast } = useContext(ToastContext);
  const [coupons, setCoupons] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState('percentage');
  const [discountValue, setDiscountValue] = useState(15);
  const [minPurchase, setMinPurchase] = useState(50);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const res = await axios.get('/api/coupons');
      if (res.data.success) setCoupons(res.data.coupons);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/coupons', { code, discountType, discountValue: Number(discountValue), minPurchase: Number(minPurchase) });
      if (res.data.success) {
        showToast(`Coupon ${code} created!`, 'success');
        setShowModal(false);
        setCode('');
        fetchCoupons();
      }
    } catch (err) {
      showToast('Coupon creation failed', 'error');
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 76px)', background: '#FAFAFB' }}>
      <AdminSidebar />

      <main style={{ flex: 1, padding: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem' }}>Promotional Coupons Engine</h1>
            <p style={{ color: '#64748B', fontSize: '0.9rem' }}>Create promotional codes for wholesale accounts and first-time orders.</p>
          </div>
          <button onClick={() => setShowModal(true)} className="btn btn-primary">
            <Plus size={18} /> Create Coupon Code
          </button>
        </div>

        <div className="grid-3" style={{ gap: '20px' }}>
          {coupons.map((cpn, idx) => (
            <div key={idx} className="card" style={{ borderLeft: '4px solid #FF6B00' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0057D9', fontFamily: 'Poppins' }}>{cpn.code}</span>
                <span className="badge badge-accepted">ACTIVE</span>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#111', fontWeight: 600 }}>
                Discount: {cpn.discountType === 'percentage' ? `${cpn.discountValue}% OFF` : `$${cpn.discountValue} OFF`}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '4px' }}>
                Min Purchase: ${cpn.minPurchase}
              </div>
            </div>
          ))}
        </div>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Create New Coupon</h3>
              <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                <input type="text" placeholder="Code (e.g. SUMMER20)" value={code} onChange={e => setCode(e.target.value)} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1', textTransform: 'uppercase' }} />
                <select value={discountType} onChange={e => setDiscountType(e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }}>
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Amount ($)</option>
                </select>
                <input type="number" placeholder="Discount Value" value={discountValue} onChange={e => setDiscountValue(e.target.value)} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }} />
                <input type="number" placeholder="Min Order Value ($)" value={minPurchase} onChange={e => setMinPurchase(e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }} />
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '12px' }}>
                  <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">Cancel</button>
                  <button type="submit" className="btn btn-primary">Create Code</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
