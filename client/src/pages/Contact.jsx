import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ToastContext } from '../context/ToastContext';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

export const Contact = () => {
  const { showToast } = useContext(ToastContext);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/api/contact', formData);
      if (res.data.success) {
        showToast(res.data.message || 'Message sent to support!', 'success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }
    } catch (err) {
      showToast('Error sending message. Try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '60px 0', background: '#FAFAFB' }}>
      <div className="container">
        <div className="section-title">
          <span>CONTACT & INQUIRIES</span>
          <h2>Get in Touch with Our Print Experts</h2>
          <p>Have questions about paper GSM, vector artwork prepress, or custom order status? We are here 24/7.</p>
        </div>

        <div className="grid-2" style={{ gap: '48px' }}>
          {/* Contact Details */}
          <div>
            <div style={{ background: '#111111', color: '#FFF', padding: '36px', borderRadius: '20px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', color: '#FFF', marginBottom: '24px' }}>Headquarters & Press Facility</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '1rem', color: '#CBD5E1' }}>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <MapPin size={24} color="#FF6B00" />
                    <div>
                      <strong style={{ color: '#FFF' }}>Facility Location:</strong><br />
                      100 Industrial Parkway, Suite 400, New York, NY 10001
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <Phone size={24} color="#0057D9" />
                    <div>
                      <strong style={{ color: '#FFF' }}>Toll-Free Phone:</strong><br />
                      +1 (800) 555-PRINT / +1 (555) 234-5678
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <Mail size={24} color="#FF6B00" />
                    <div>
                      <strong style={{ color: '#FFF' }}>Direct Support Email:</strong><br />
                      support@printcraftpro.com / quotes@printcraftpro.com
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #333', paddingTop: '20px', marginTop: '32px', fontSize: '0.85rem', color: '#94A3B8' }}>
                Operational Hours: Mon-Fri: 7:00 AM - 11:00 PM EST | Sat: 8:00 AM - 5:00 PM
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="card glass-panel">
            <h3 style={{ fontSize: '1.4rem', marginBottom: '20px' }}>Send Us an Inquiry</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="grid-2" style={{ gap: '16px' }}>
                <input
                  type="text"
                  placeholder="Your Name *"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required
                  style={{ padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                />
                <input
                  type="email"
                  placeholder="Corporate Email *"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  required
                  style={{ padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                />
              </div>

              <div className="grid-2" style={{ gap: '16px' }}>
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  style={{ padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                />
                <input
                  type="text"
                  placeholder="Subject / Topic *"
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  required
                  style={{ padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                />
              </div>

              <textarea
                placeholder="Write your message or custom requirement..."
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                required
                rows={5}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
              />

              <button type="submit" disabled={loading} className="btn btn-primary" style={{ padding: '14px' }}>
                {loading ? 'Sending...' : 'Submit Message'} <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
