import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { ToastContext } from '../../context/ToastContext';
import { ShoppingBag, FileSpreadsheet, MapPin, ShieldCheck, Heart, FileText, Star, LifeBuoy, Settings, Plus, Printer, Trash2 } from 'lucide-react';
import { ArtworkProofModal } from '../../components/ArtworkProofModal';
import { InvoiceModal } from '../../components/InvoiceModal';

export const CustomerDashboard = () => {
  const { user, updateProfile } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);

  const [activeTab, setActiveTab] = useState('overview');
  const [orders, setOrders] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [selectedProofOrder, setSelectedProofOrder] = useState(null);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState(null);

  // Address form
  const [addresses, setAddresses] = useState(user?.addresses || []);
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newZip, setNewZip] = useState('');

  // Support ticket form
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [tickets, setTickets] = useState(user?.tickets || [
    { id: 'TCK-4091', subject: 'Vector artwork color profile question', status: 'open', date: '2026-08-05', priority: 'High' }
  ]);

  // Review form
  const [reviewProduct, setReviewProduct] = useState('Premium Velvet Business Cards');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  useEffect(() => {
    fetchCustomerData();
  }, []);

  const fetchCustomerData = async () => {
    try {
      const [ordRes, qtRes] = await Promise.all([
        axios.get('/api/orders'),
        axios.get('/api/quotes')
      ]);
      if (ordRes.data.success) setOrders(ordRes.data.orders);
      if (qtRes.data.success) setQuotes(qtRes.data.quotes);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    if (!newStreet || !newCity || !newState || !newZip) return;
    const updated = [...addresses, { title: 'Office Shipping', street: newStreet, city: newCity, state: newState, zipCode: newZip, country: 'USA' }];
    setAddresses(updated);
    await updateProfile({ addresses: updated });
    showToast('Address added to address book!', 'success');
    setNewStreet(''); setNewCity(''); setNewState(''); setNewZip('');
  };

  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!ticketSubject) return;
    const newTck = { id: `TCK-${Math.floor(1000 + Math.random() * 9000)}`, subject: ticketSubject, status: 'open', date: new Date().toLocaleDateString(), priority: 'Normal' };
    setTickets([newTck, ...tickets]);
    showToast('Support ticket logged with prepress team!', 'success');
    setTicketSubject(''); setTicketMessage('');
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/reviews', {
        userName: user?.name,
        userCompany: user?.company,
        productName: reviewProduct,
        rating: reviewRating,
        comment: reviewComment
      });
      if (res.data.success) {
        showToast('Thank you! Review submitted.', 'success');
        setReviewComment('');
      }
    } catch (err) {
      showToast('Review failed.', 'error');
    }
  };

  return (
    <div style={{ padding: '40px 0', background: '#FAFAFB', minHeight: '85vh' }}>
      <div className="container">
        {/* Banner */}
        <div style={{ background: 'linear-gradient(135deg, #0057D9 0%, #111111 100%)', color: '#FFF', padding: '32px', borderRadius: '20px', marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <span style={{ color: '#FF6B00', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.8rem' }}>CUSTOMER DASHBOARD</span>
            <h1 style={{ fontSize: '2rem', color: '#FFF', marginTop: '4px' }}>Welcome back, {user?.name}!</h1>
            <p style={{ color: '#94A3B8', fontSize: '0.95rem' }}>{user?.company || 'Corporate Account'} • {user?.email}</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Link to="/custom-quote" className="btn btn-accent">+ Request Quote</Link>
            <Link to="/products" className="btn btn-secondary" style={{ background: 'rgba(255,255,255,0.15)', color: '#FFF' }}>Browse Products</Link>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '28px', borderBottom: '1px solid #E2E8F0', paddingBottom: '12px' }}>
          <button onClick={() => setActiveTab('overview')} className={`btn ${activeTab === 'overview' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
            <ShoppingBag size={16} /> Overview & Proofs
          </button>
          <button onClick={() => setActiveTab('addresses')} className={`btn ${activeTab === 'addresses' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
            <MapPin size={16} /> Saved Addresses ({addresses.length})
          </button>
          <button onClick={() => setActiveTab('wishlist')} className={`btn ${activeTab === 'wishlist' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
            <Heart size={16} /> Wishlist ({user?.wishlist?.length || 0})
          </button>
          <button onClick={() => setActiveTab('tickets')} className={`btn ${activeTab === 'tickets' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
            <LifeBuoy size={16} /> Support Tickets ({tickets.length})
          </button>
          <button onClick={() => setActiveTab('reviews')} className={`btn ${activeTab === 'reviews' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
            <Star size={16} /> Product Reviews
          </button>
        </div>

        {/* Tab 1: Overview & Orders */}
        {activeTab === 'overview' && (
          <div>
            <div className="grid-3" style={{ gap: '20px', marginBottom: '32px' }}>
              <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <ShoppingBag size={28} color="#0057D9" />
                <div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>{orders.length}</div>
                  <div style={{ color: '#64748B', fontSize: '0.85rem' }}>Print Orders</div>
                </div>
              </div>

              <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <FileSpreadsheet size={28} color="#FF6B00" />
                <div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>{quotes.length}</div>
                  <div style={{ color: '#64748B', fontSize: '0.85rem' }}>Quotations</div>
                </div>
              </div>

              <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <ShieldCheck size={28} color="#065F46" />
                <div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#065F46' }}>Proofing Active</div>
                  <div style={{ color: '#64748B', fontSize: '0.85rem' }}>Inspection Ready</div>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 style={{ fontSize: '1.25rem', marginBottom: '20px' }}>Active Orders & Pre-Press Proof Inspections</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {orders.map((ord, idx) => (
                  <div key={idx} style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <span style={{ fontWeight: 800, color: '#0057D9' }}>{ord.orderId}</span>
                      <span className={`badge badge-${ord.orderStatus}`} style={{ marginLeft: '10px' }}>{ord.orderStatus}</span>
                      <div style={{ fontSize: '0.9rem', marginTop: '4px' }}>{ord.items[0]?.productName} ({ord.items[0]?.quantity} units)</div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button onClick={() => setSelectedProofOrder(ord)} className="btn btn-primary" style={{ padding: '8px 14px', fontSize: '0.85rem' }}>
                        <ShieldCheck size={16} /> Digital Proof
                      </button>
                      <button onClick={() => setSelectedInvoiceOrder(ord)} className="btn btn-secondary" style={{ padding: '8px 14px', fontSize: '0.85rem' }}>
                        <Printer size={16} /> Invoice
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Saved Addresses */}
        {activeTab === 'addresses' && (
          <div className="grid-2" style={{ gap: '32px' }}>
            <div className="card">
              <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Saved Delivery & Shipping Addresses</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {addresses.map((addr, idx) => (
                  <div key={idx} style={{ padding: '16px', borderRadius: '8px', border: '1px solid #CBD5E1', background: '#F8FAFC' }}>
                    <div style={{ fontWeight: 700, color: '#0057D9' }}>{addr.title}</div>
                    <div style={{ fontSize: '0.9rem', color: '#111' }}>{addr.street}</div>
                    <div style={{ fontSize: '0.85rem', color: '#64748B' }}>{addr.city}, {addr.state} {addr.zipCode}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card glass-panel">
              <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Add New Address</h3>
              <form onSubmit={handleAddAddress} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input type="text" placeholder="Street Address *" value={newStreet} onChange={e => setNewStreet(e.target.value)} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }} />
                <div className="grid-3" style={{ gap: '8px' }}>
                  <input type="text" placeholder="City *" value={newCity} onChange={e => setNewCity(e.target.value)} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }} />
                  <input type="text" placeholder="State *" value={newState} onChange={e => setNewState(e.target.value)} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }} />
                  <input type="text" placeholder="Zip Code *" value={newZip} onChange={e => setNewZip(e.target.value)} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }} />
                </div>
                <button type="submit" className="btn btn-primary" style={{ padding: '10px' }}>Save Address</button>
              </form>
            </div>
          </div>
        )}

        {/* Tab 3: Wishlist */}
        {activeTab === 'wishlist' && (
          <div className="card">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>My Saved Print Wishlist</h3>
            <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '20px' }}>Saved items for quick re-ordering.</p>
            <div style={{ background: '#F8FAFC', padding: '20px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>Premium Soft-Touch Velvet Business Cards</strong>
                <div style={{ fontSize: '0.8rem', color: '#64748B' }}>16pt Soft-Touch • Raised Spot UV</div>
              </div>
              <Link to="/products/premium-velvet-business-cards" className="btn btn-primary" style={{ padding: '6px 14px', fontSize: '0.85rem' }}>
                Configure & Reorder
              </Link>
            </div>
          </div>
        )}

        {/* Tab 4: Support Tickets */}
        {activeTab === 'tickets' && (
          <div className="grid-2" style={{ gap: '32px' }}>
            <div className="card">
              <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Support & Prepress Inquiry Tickets</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {tickets.map((tck, idx) => (
                  <div key={idx} style={{ padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0', background: '#F8FAFC' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <strong style={{ color: '#0057D9' }}>{tck.id}</strong>
                      <span className="badge badge-pending">{tck.status}</span>
                    </div>
                    <div style={{ fontWeight: 600, marginTop: '4px' }}>{tck.subject}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '2px' }}>Date: {tck.date}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card glass-panel">
              <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Open New Ticket</h3>
              <form onSubmit={handleCreateTicket} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input type="text" placeholder="Subject / Technical Topic *" value={ticketSubject} onChange={e => setTicketSubject(e.target.value)} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }} />
                <textarea placeholder="Describe your question or artwork issue..." value={ticketMessage} onChange={e => setTicketMessage(e.target.value)} rows={4} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }} />
                <button type="submit" className="btn btn-accent" style={{ padding: '10px' }}>Log Support Ticket</button>
              </form>
            </div>
          </div>
        )}

        {/* Tab 5: Reviews */}
        {activeTab === 'reviews' && (
          <div className="card glass-panel" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Leave a Product Review</h3>
            <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <select value={reviewProduct} onChange={e => setReviewProduct(e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }}>
                <option value="Premium Velvet Business Cards">Premium Velvet Business Cards</option>
                <option value="Tri-Fold Corporate Marketing Brochures">Tri-Fold Marketing Brochures</option>
                <option value="Heavy-Duty Retractable Pull-Up Banner">Heavy-Duty Retractable Banner</option>
              </select>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>Rating Star (1 to 5)</label>
                <select value={reviewRating} onChange={e => setReviewRating(Number(e.target.value))} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1', width: '100%' }}>
                  <option value={5}>5 Stars - Outstanding Quality</option>
                  <option value={4}>4 Stars - Very Good</option>
                  <option value={3}>3 Stars - Average</option>
                </select>
              </div>

              <textarea placeholder="Write your experience with our print quality, colors & speed..." value={reviewComment} onChange={e => setReviewComment(e.target.value)} required rows={4} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }} />
              <button type="submit" className="btn btn-primary" style={{ padding: '10px' }}>Submit Review</button>
            </form>
          </div>
        )}
      </div>

      {selectedProofOrder && (
        <ArtworkProofModal order={selectedProofOrder} onClose={() => setSelectedProofOrder(null)} onRefresh={fetchCustomerData} />
      )}
      {selectedInvoiceOrder && (
        <InvoiceModal order={selectedInvoiceOrder} onClose={() => setSelectedInvoiceOrder(null)} />
      )}
    </div>
  );
};
