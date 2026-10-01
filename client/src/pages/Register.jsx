import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ToastContext } from '../context/ToastContext';
import { Printer, Lock, Mail, User, Phone, Building, ArrowRight } from 'lucide-react';

export const Register = () => {
  const { register } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '', company: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await register(formData);
    setLoading(false);
    if (res.success) {
      showToast(`Account created successfully! Welcome, ${res.user.name}`, 'success');
      navigate('/customer');
    } else {
      showToast(res.message, 'error');
    }
  };

  return (
    <div style={{ padding: '60px 0', background: '#FAFAFB', minHeight: '85vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '540px' }}>
        <div className="card glass-panel" style={{ padding: '40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{ background: '#FF6B00', color: '#FFF', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
              <Printer size={28} />
            </div>
            <h2 style={{ fontSize: '1.6rem' }}>Create Account</h2>
            <p style={{ color: '#64748B', fontSize: '0.85rem' }}>Join thousands of business customers enjoying wholesale pricing.</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>Full Name *</label>
              <input
                type="text"
                placeholder="Sarah Jenkins"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                required
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>Corporate Email *</label>
              <input
                type="email"
                placeholder="s.jenkins@company.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                required
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
              />
            </div>

            <div className="grid-2" style={{ gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>Phone Number</label>
                <input
                  type="text"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>Company Name</label>
                <input
                  type="text"
                  placeholder="Apex Marketing"
                  value={formData.company}
                  onChange={e => setFormData({ ...formData, company: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>Password *</label>
              <input
                type="password"
                placeholder="At least 6 characters"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                required
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
              />
            </div>

            <button type="submit" disabled={loading} className="btn btn-accent" style={{ padding: '14px', marginTop: '8px' }}>
              {loading ? 'Creating Account...' : 'Register & Start Order'} <ArrowRight size={18} />
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.85rem', color: '#64748B' }}>
            Already registered? <Link to="/login" style={{ color: '#0057D9', fontWeight: 700 }}>Log in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
