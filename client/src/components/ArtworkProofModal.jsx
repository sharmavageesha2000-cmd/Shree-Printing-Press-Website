import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ToastContext } from '../context/ToastContext';
import { ShieldCheck, AlertTriangle, CheckCircle, MessageSquare, X, Eye } from 'lucide-react';

export const ArtworkProofModal = ({ order, onClose, onRefresh }) => {
  const { showToast } = useContext(ToastContext);
  const [feedback, setFeedback] = useState('');
  const [showRevisionForm, setShowRevisionForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleAction = async (action) => {
    if (action === 'revision_requested' && !feedback) {
      showToast('Please enter revision comments so our prepress designer can adjust your file.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const res = await axios.put(`/api/orders/${order._id}/artwork-approval`, {
        action,
        feedback: action === 'revision_requested' ? feedback : ''
      });
      if (res.data.success) {
        showToast(`Artwork successfully ${action === 'approved' ? 'approved for production!' : 'sent back for prepress revision.'}`, 'success');
        onRefresh();
        onClose();
      }
    } catch (err) {
      showToast('Action failed. Try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '850px' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none' }}>
          <X size={24} color="#64748B" />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <ShieldCheck size={28} color="#0057D9" />
          <div>
            <h3 style={{ fontSize: '1.4rem' }}>Pre-Press Digital Artwork Proof Inspection</h3>
            <span style={{ fontSize: '0.85rem', color: '#64748B' }}>Order ID: {order.orderId} • {order.items[0]?.productName}</span>
          </div>
        </div>

        {/* Digital Proof Viewer */}
        <div style={{
          background: '#0B132B',
          borderRadius: '16px',
          padding: '24px',
          textAlign: 'center',
          marginBottom: '24px',
          border: '2px solid #0057D9',
          position: 'relative'
        }}>
          <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'rgba(255,107,0,0.9)', color: '#FFF', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
            BLEED & TRIM LINE PREVIEW
          </div>
          <img
            src={order.artworkProofUrl || 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1000&q=80'}
            alt="Prepress Proof"
            style={{ maxWidth: '100%', maxHeight: '420px', borderRadius: '8px', objectFit: 'contain', border: '2px dashed #FF6B00' }}
          />
          <div style={{ color: '#94A3B8', fontSize: '0.8rem', marginTop: '12px' }}>
            🔴 Red Line: Bleed Boundary (0.125") | 🟢 Green Line: Safety Margin | 🔵 Blue Line: Final Trim Size
          </div>
        </div>

        {/* Approval Status Banner */}
        {order.artworkApprovalStatus === 'approved' ? (
          <div style={{ background: '#D1FAE5', color: '#065F46', padding: '16px', borderRadius: '12px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <CheckCircle size={24} />
            <div>
              <strong>Artwork Approved for Production</strong>
              <div style={{ fontSize: '0.85rem' }}>This job is locked and currently queued on our Heidelberg press line.</div>
            </div>
          </div>
        ) : (
          <div>
            {!showRevisionForm ? (
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setShowRevisionForm(true)}
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                >
                  <MessageSquare size={18} /> Request Revisions / Fixes
                </button>
                <button
                  onClick={() => handleAction('approved')}
                  disabled={submitting}
                  className="btn btn-accent"
                  style={{ flex: 1 }}
                >
                  <CheckCircle size={18} /> Approve Artwork & Print Now
                </button>
              </div>
            ) : (
              <div style={{ background: '#F8FAFC', padding: '20px', borderRadius: '12px', border: '1px solid #CBD5E1' }}>
                <h4 style={{ fontSize: '1rem', marginBottom: '8px' }}>Prepress Revision Feedback</h4>
                <textarea
                  placeholder="Specify exact changes needed (e.g. adjust text margins, change background color, fix typo)..."
                  value={feedback}
                  onChange={e => setFeedback(e.target.value)}
                  rows={3}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', marginBottom: '16px', fontSize: '0.9rem' }}
                />
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={() => setShowRevisionForm(false)} className="btn btn-secondary">
                    Cancel
                  </button>
                  <button onClick={() => handleAction('revision_requested')} disabled={submitting} className="btn btn-primary">
                    Submit Revision Request
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
