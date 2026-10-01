import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AdminSidebar } from '../../components/AdminSidebar';
import { ToastContext } from '../../context/ToastContext';
import { DollarSign, Send, Check } from 'lucide-react';

export const AdminQuotes = () => {
  const { showToast } = useContext(ToastContext);
  const [quotes, setQuotes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [quotedPrice, setQuotedPrice] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [status, setStatus] = useState('quoted');

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const res = await axios.get('/api/quotes');
      if (res.data.success) setQuotes(res.data.quotes);
    } catch (err) {
      console.error(err);
    }
  };

  const startQuoteEdit = (q) => {
    setEditingId(q._id);
    setQuotedPrice(q.quotedPrice || '');
    setAdminNotes(q.adminNotes || '');
    setStatus(q.status || 'quoted');
  };

  const saveQuotePrice = async (id) => {
    try {
      const res = await axios.put(`/api/quotes/${id}`, {
        quotedPrice: Number(quotedPrice),
        adminNotes,
        status
      });
      if (res.data.success) {
        showToast('Quotation price updated!', 'success');
        setEditingId(null);
        fetchQuotes();
      }
    } catch (err) {
      showToast('Quote update failed', 'error');
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 76px)', background: '#FAFAFB' }}>
      <AdminSidebar />

      <main style={{ flex: 1, padding: '32px' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Quotation Pricing Desk</h1>
        <p style={{ color: '#64748B', marginBottom: '28px' }}>Review custom customer quote requests, calculate per-unit ink and paper costs, and return formal pricing estimates.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {quotes.map((q, idx) => (
            <div key={idx} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: '12px', marginBottom: '16px' }}>
                <div>
                  <span style={{ fontWeight: 800, color: '#0057D9', fontSize: '1.1rem' }}>{q.quoteId}</span>
                  <div style={{ fontSize: '0.85rem', color: '#64748B' }}>
                    Client: <strong>{q.guestInfo?.name}</strong> ({q.guestInfo?.company || 'Individual'}) • Phone: {q.guestInfo?.phone}
                  </div>
                </div>

                <span className={`badge badge-${q.status}`}>{q.status.toUpperCase()}</span>
              </div>

              <div className="grid-2" style={{ gap: '16px', fontSize: '0.9rem', marginBottom: '16px' }}>
                <div><strong>Job Title:</strong> {q.jobTitle}</div>
                <div><strong>Quantity:</strong> {q.quantity?.toLocaleString()} units</div>
                <div><strong>Paper Type:</strong> {q.paperType}</div>
                <div><strong>Size:</strong> {q.size}</div>
                <div><strong>Finishes:</strong> {q.finishOptions?.join(', ')}</div>
                <div><strong>Client Notes:</strong> {q.notes || 'None'}</div>
              </div>

              {editingId === q._id ? (
                <div style={{ background: '#F0F7FF', padding: '16px', borderRadius: '10px', border: '1px solid #BAE6FD' }}>
                  <div className="grid-3" style={{ gap: '12px', marginBottom: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700 }}>Calculate Total Price ($)</label>
                      <input
                        type="number"
                        value={quotedPrice}
                        onChange={e => setQuotedPrice(e.target.value)}
                        style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #CBD5E1' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700 }}>Quote Status</label>
                      <select value={status} onChange={e => setStatus(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #CBD5E1' }}>
                        <option value="pending">pending</option>
                        <option value="quoted">quoted</option>
                        <option value="accepted">accepted</option>
                        <option value="rejected">rejected</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700 }}>Prepress Engineering Notes</label>
                      <input
                        type="text"
                        value={adminNotes}
                        onChange={e => setAdminNotes(e.target.value)}
                        style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #CBD5E1' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                    <button onClick={() => setEditingId(null)} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>Cancel</button>
                    <button onClick={() => saveQuotePrice(q._id)} className="btn btn-accent" style={{ padding: '6px 16px', fontSize: '0.8rem' }}>
                      Send Quote Pricing to Client
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F8FAFC', padding: '12px', borderRadius: '8px' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Current Calculated Price:</span>
                    <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FF6B00', marginLeft: '8px' }}>
                      {q.quotedPrice > 0 ? `$${q.quotedPrice.toFixed(2)}` : 'Not Price Estimated Yet'}
                    </span>
                  </div>
                  <button onClick={() => startQuoteEdit(q)} className="btn btn-primary" style={{ padding: '6px 14px', fontSize: '0.85rem' }}>
                    <DollarSign size={14} /> Calculate & Set Price
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
