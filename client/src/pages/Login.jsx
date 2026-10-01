import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ToastContext } from '../context/ToastContext';
import { Printer, Lock, Mail, ArrowRight } from 'lucide-react';

export const Login = () => {
  const { login } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    if (res.success) {
      showToast(`Welcome back, ${res.user.name}!`, 'success');
      navigate(res.user.role === 'admin' ? '/admin' : '/customer');
    } else {
      showToast(res.message, 'error');
    }
  };

  const fillDemo = (role) => {
    if (role === 'admin') {
      setEmail('admin@printcraftpro.com');
      setPassword('admin123');
    } else {
      setEmail('customer@example.com');
      setPassword('customer123');
    }
  };

  return (
    <div style={{ padding: '80px 0', background: '#FAFAFB', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '480px' }}>
        <div className="card glass-panel" style={{ padding: '40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{ background: '#0057D9', color: '#FFF', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
              <Printer size={28} />
            </div>
            <h2 style={{ fontSize: '1.6rem' }}>Sign In to PrintCraft</h2>
            <p style={{ color: '#64748B', fontSize: '0.85rem' }}>Access order proofs, quotes & invoice center.</p>
          </div>

          {/* Quick Demo Fill Buttons */}
          <div style={{ background: '#F0F7FF', padding: '12px', borderRadius: '10px', marginBottom: '20px', fontSize: '0.8rem', border: '1px solid #BAE6FD' }}>
            <div style={{ fontWeight: 700, color: '#0369A1', marginBottom: '6px' }}>⚡ ONE-CLICK DEMO CREDENTIALS:</div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="button" onClick={() => fillDemo('customer')} className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
                Customer Account
              </button>
              <button type="button" onClick={() => fillDemo('admin')} className="btn btn-accent" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
                Admin Dashboard
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} color="#64748B" style={{ position: 'absolute', left: '12px', top: '14px' }} />
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} color="#64748B" style={{ position: 'absolute', left: '12px', top: '14px' }} />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary" style={{ padding: '14px', marginTop: '8px' }}>
              {loading ? 'Authenticating...' : 'Sign In'} <ArrowRight size={18} />
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.85rem', color: '#64748B' }}>
            Don't have a corporate print account? <Link to="/register" style={{ color: '#0057D9', fontWeight: 700 }}>Register now</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
