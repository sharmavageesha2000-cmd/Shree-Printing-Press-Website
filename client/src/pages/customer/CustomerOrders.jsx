import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShieldCheck, Printer, CheckCircle, Clock, Truck, PackageCheck } from 'lucide-react';
import { ArtworkProofModal } from '../../components/ArtworkProofModal';
import { InvoiceModal } from '../../components/InvoiceModal';

export const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedProofOrder, setSelectedProofOrder] = useState(null);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState(null);

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

  const stages = ['placed', 'artwork_pending', 'artwork_approved', 'in_production', 'shipped', 'delivered'];

  const getStageIndex = (status) => stages.indexOf(status) !== -1 ? stages.indexOf(status) : 0;

  return (
    <div style={{ padding: '40px 0', background: '#FAFAFB', minHeight: '80vh' }}>
      <div className="container">
        <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>My Print Orders & Production Pipeline</h1>
        <p style={{ color: '#64748B', marginBottom: '32px' }}>Inspect live prepress status, approve digital proofs, and download tax invoices.</p>

        {orders.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '48px' }}>
            <h3>No print orders found.</h3>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {orders.map((ord, i) => {
              const currentStepIndex = getStageIndex(ord.orderStatus);
              return (
                <div key={i} className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '16px', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <span style={{ fontSize: '0.8rem', color: '#64748B' }}>ORDER ID</span>
                      <h3 style={{ fontSize: '1.3rem', color: '#0057D9', fontFamily: 'Poppins' }}>{ord.orderId}</h3>
                      <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Placed: {new Date(ord.createdAt).toLocaleDateString()}</span>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <span className={`badge badge-${ord.orderStatus}`}>
                        STATUS: {ord.orderStatus.replace('_', ' ').toUpperCase()}
                      </span>
                      <button onClick={() => setSelectedProofOrder(ord)} className="btn btn-primary" style={{ padding: '8px 14px', fontSize: '0.85rem' }}>
                        <ShieldCheck size={16} /> Pre-Press Proof
                      </button>
                      <button onClick={() => setSelectedInvoiceOrder(ord)} className="btn btn-secondary" style={{ padding: '8px 14px', fontSize: '0.85rem' }}>
                        <Printer size={16} /> Invoice
                      </button>
                    </div>
                  </div>

                  {/* Production Timeline Stepper */}
                  <div style={{ background: '#F8FAFC', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111', marginBottom: '16px' }}>REAL-TIME PRESS PRODUCTION TIMELINE</div>
                    <div className="stepper-container" style={{ margin: '16px 0' }}>
                      {stages.map((stg, idx) => {
                        const isDone = idx <= currentStepIndex;
                        return (
                          <div key={idx} className={`stepper-step ${isDone ? 'completed' : ''}`} title={stg}>
                            {idx + 1}
                          </div>
                        );
                      })}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>
                      <span>Order Placed</span>
                      <span>Artwork Prep</span>
                      <span>Proof Approved</span>
                      <span>Press Production</span>
                      <span>Dispatched</span>
                      <span>Delivered</span>
                    </div>
                  </div>

                  {/* Order Items Summary */}
                  <div>
                    {ord.items.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '16px', alignItems: 'center', fontSize: '0.9rem' }}>
                        <img
                          src={item.artworkUrl || 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=200&q=80'}
                          alt={item.productName}
                          style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }}
                        />
                        <div>
                          <strong style={{ fontSize: '1rem', color: '#111' }}>{item.productName}</strong>
                          <div style={{ color: '#64748B', fontSize: '0.8rem' }}>{item.paperType} • {item.size} • Qty: {item.quantity} units</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {selectedProofOrder && (
        <ArtworkProofModal
          order={selectedProofOrder}
          onClose={() => setSelectedProofOrder(null)}
          onRefresh={fetchOrders}
        />
      )}
      {selectedInvoiceOrder && (
        <InvoiceModal
          order={selectedInvoiceOrder}
          onClose={() => setSelectedInvoiceOrder(null)}
        />
      )}
    </div>
  );
};
