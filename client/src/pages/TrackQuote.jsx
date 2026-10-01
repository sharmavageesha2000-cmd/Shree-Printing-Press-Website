import React, { useState } from 'react';
import axios from 'axios';
import { Search, FileSpreadsheet, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export const TrackQuote = () => {
  const [quoteId, setQuoteId] = useState('');
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!quoteId) return;

    setLoading(true);
    setError('');
    setQuote(null);
    try {
      const res = await axios.get(`/api/quotes/track/${quoteId.trim()}`);
      if (res.data.success) {
        setQuote(res.data.quote);
      }
    } catch (err) {
      setError(err.response?.data?.message || `No active quotation found for ID: ${quoteId}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '60px 0', background: '#FAFAFB', minHeight: '70vh' }}>
      <div className="container" style={{ maxWidth: '700px' }}>
        <div className="section-title">
          <span>PUBLIC QUOTATION DESK</span>
          <h2>Track Your Quotation Status</h2>
          <p>Enter your 7-character Quote ID (e.g. QT-94812) to inspect pricing and pre-press status.</p>
        </div>

        <div className="card glass-panel" style={{ marginBottom: '32px' }}>
          <form onSubmit={handleTrack} style={{ display: 'flex', gap: '12px' }}>
            <input
              type="text"
              placeholder="Enter Quote ID (e.g. QT-94812)"
              value={quoteId}
              onChange={e => setQuoteId(e.target.value)}
              required
              style={{ flex: 1, padding: '14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '1rem', fontWeight: 600, textTransform: 'uppercase' }}
            />
            <button type="submit" disabled={loading} className="btn btn-primary" style={{ padding: '14px 24px' }}>
              {loading ? 'Searching...' : 'Track Quote'} <Search size={18} />
            </button>
          </form>
        </div>

        {error && (
          <div style={{ background: '#FEE2E2', color: '#991B1B', padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {quote && (
          <div className="card" style={{ border: '2px solid #0057D9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '16px', marginBottom: '20px' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: '#64748B' }}>QUOTATION RECORD</span>
                <h3 style={{ fontSize: '1.4rem', color: '#0057D9', fontFamily: 'Poppins' }}>{quote.quoteId}</h3>
              </div>
              <span className={`badge badge-${quote.status}`}>
                {quote.status.toUpperCase()}
              </span>
            </div>

            <div className="grid-2" style={{ gap: '16px', fontSize: '0.9rem', marginBottom: '24px' }}>
              <div><strong>Job Title:</strong> {quote.jobTitle}</div>
              <div><strong>Quantity:</strong> {quote.quantity?.toLocaleString()} units</div>
              <div><strong>Paper Stock:</strong> {quote.paperType}</div>
              <div><strong>Dimension:</strong> {quote.size}</div>
              <div><strong>Finishes:</strong> {quote.finishOptions?.join(', ') || 'Standard Matte'}</div>
              <div><strong>Requested By:</strong> {quote.guestInfo?.name} ({quote.guestInfo?.company || 'Individual'})</div>
            </div>

            <div style={{ background: '#111111', color: '#FFF', padding: '20px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>OFFICIAL PRICING ESTIMATE</span>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#FF6B00', fontFamily: 'Poppins' }}>
                  {quote.quotedPrice > 0 ? `$${quote.quotedPrice.toFixed(2)}` : 'Under Prepress Desk Calculation'}
                </div>
              </div>
              {quote.quotedPrice > 0 && (
                <a href={`mailto:quotes@printcraftpro.com?subject=Accepting Quote ${quote.quoteId}`} className="btn btn-accent">
                  Accept & Order
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
