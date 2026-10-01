import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContext } from '../context/ToastContext';
import { Printer, Mail, Phone, MapPin, Send, ShieldCheck, Truck, Award, Clock } from 'lucide-react';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const { showToast } = useContext(ToastContext);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      const res = await axios.post('/api/contact/subscribe', { email });
      showToast(res.data.message || 'Subscribed to printing newsletter!', 'success');
      setEmail('');
    } catch (err) {
      showToast('Subscription failed. Try again.', 'error');
    }
  };

  return (
    <footer style={{ background: '#111111', color: '#FFFFFF', paddingTop: '64px', paddingBottom: '32px' }}>
      {/* Guarantees Bar */}
      <div className="container" style={{ marginBottom: '48px', paddingBottom: '48px', borderBottom: '1px solid #222222' }}>
        <div className="grid-4" style={{ textAlign: 'center' }}>
          <div style={{ padding: '16px' }}>
            <Award size={32} color="#FF6B00" style={{ margin: '0 auto 12px auto' }} />
            <h4 style={{ color: '#FFF', fontSize: '1rem', marginBottom: '4px' }}>Pantone Match Guarantee</h4>
            <p style={{ color: '#94A3B8', fontSize: '0.85rem' }}>99.8% precision offset & digital color accuracy</p>
          </div>
          <div style={{ padding: '16px' }}>
            <Truck size={32} color="#0057D9" style={{ margin: '0 auto 12px auto' }} />
            <h4 style={{ color: '#FFF', fontSize: '1rem', marginBottom: '4px' }}>Nationwide Shipping</h4>
            <p style={{ color: '#94A3B8', fontSize: '0.85rem' }}>Safe padded packaging with real-time tracking</p>
          </div>
          <div style={{ padding: '16px' }}>
            <Clock size={32} color="#FF6B00" style={{ margin: '0 auto 12px auto' }} />
            <h4 style={{ color: '#FFF', fontSize: '1rem', marginBottom: '4px' }}>24h Rush Production</h4>
            <p style={{ color: '#94A3B8', fontSize: '0.85rem' }}>Next-day turnaround for critical business deadlines</p>
          </div>
          <div style={{ padding: '16px' }}>
            <ShieldCheck size={32} color="#0057D9" style={{ margin: '0 auto 12px auto' }} />
            <h4 style={{ color: '#FFF', fontSize: '1rem', marginBottom: '4px' }}>Pre-Press Digital Proofs</h4>
            <p style={{ color: '#94A3B8', fontSize: '0.85rem' }}>Free PDF inspection proof before press run</p>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="grid-4" style={{ gap: '36px', marginBottom: '48px' }}>
          {/* Col 1 */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ background: '#0057D9', width: '36px', height: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Printer size={20} color="#FFF" />
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: 'Poppins', color: '#FFF' }}>PRINTCRAFT PRO</span>
            </div>
            <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginBottom: '20px' }}>
              Premier commercial printing & packaging press serving global enterprises, luxury brands, and local businesses with state-of-the-art Heidelberg technology.
            </p>
            <div style={{ color: '#94A3B8', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '8px' }}><MapPin size={16} color="#FF6B00" /> 100 Industrial Parkway, Suite 400, NY 10001</div>
              <div style={{ display: 'flex', gap: '8px' }}><Phone size={16} color="#0057D9" /> +1 (800) 555-PRINT</div>
              <div style={{ display: 'flex', gap: '8px' }}><Mail size={16} color="#FF6B00" /> quotes@printcraftpro.com</div>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 style={{ color: '#FFF', fontSize: '1.1rem', marginBottom: '20px' }}>Printing Solutions</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: '#CBD5E1' }}>
              <li><Link to="/products" style={{ color: '#CBD5E1' }}>Business Cards & Stationery</Link></li>
              <li><Link to="/products" style={{ color: '#CBD5E1' }}>Tri-Fold & Z-Fold Brochures</Link></li>
              <li><Link to="/products" style={{ color: '#CBD5E1' }}>Large Format Vinyl Banners</Link></li>
              <li><Link to="/products" style={{ color: '#CBD5E1' }}>Custom Mailer Packaging Boxes</Link></li>
              <li><Link to="/services" style={{ color: '#CBD5E1' }}>Offset High-Volume Press</Link></li>
              <li><Link to="/services" style={{ color: '#CBD5E1' }}>Digital Express Printing</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 style={{ color: '#FFF', fontSize: '1.1rem', marginBottom: '20px' }}>Quick Navigation</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: '#CBD5E1' }}>
              <li><Link to="/custom-quote" style={{ color: '#CBD5E1' }}>Instant Custom Quote Calculator</Link></li>
              <li><Link to="/track-quote" style={{ color: '#CBD5E1' }}>Track Quotation Status</Link></li>
              <li><Link to="/portfolio" style={{ color: '#CBD5E1' }}>Client Portfolio Showcase</Link></li>
              <li><Link to="/blog" style={{ color: '#CBD5E1' }}>Artwork & Prepress Tips</Link></li>
              <li><Link to="/about" style={{ color: '#CBD5E1' }}>About Our Press Facility</Link></li>
              <li><Link to="/contact" style={{ color: '#CBD5E1' }}>Contact & Inquiry Desk</Link></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 style={{ color: '#FFF', fontSize: '1.1rem', marginBottom: '16px' }}>Newsletter & Offers</h4>
            <p style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '16px' }}>
              Subscribe to get exclusive print coupon codes, paper stock sample guides, and trade discounts.
            </p>
            <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input
                type="email"
                placeholder="Enter your corporate email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid #333', background: '#1A1A1A', color: '#FFF', fontSize: '0.9rem' }}
              />
              <button type="submit" className="btn btn-accent" style={{ padding: '10px' }}>
                <Send size={16} /> Subscribe Now
              </button>
            </form>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #222222', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: '#64748B', flexWrap: 'wrap', gap: '12px' }}>
          <div>© 2026 PrintCraft Pro Inc. All Rights Reserved. Production-ready MERN Solution.</div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Pre-Press Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
