import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { Printer, ShoppingCart, LogOut, LayoutDashboard, Calculator } from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const cartCount = cart.reduce((acc, curr) => acc + (curr.quantity ? 1 : 0), 0);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 900,
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid #E2E8F0'
    }}>
      {/* Top Bar */}
      <div style={{ background: '#111111', color: '#FFFFFF', padding: '6px 0', fontSize: '0.8rem' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>🚀 Express 24-Hour Production Available | Free Shipping on Orders Over $150</div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>📞 +1 (800) 555-PRINT</span>
            <span>✉️ quotes@printcraftpro.com</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '76px' }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #0057D9 0%, #FF6B00 100%)',
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF'
          }}>
            <Printer size={24} />
          </div>
          <div>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'Poppins', color: '#111111' }}>PRINT</span>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'Poppins', color: '#0057D9' }}>CRAFT</span>
            <span style={{ fontSize: '0.65rem', display: 'block', fontWeight: 700, letterSpacing: '1px', color: '#FF6B00' }}>PRO SOLUTIONS</span>
          </div>
        </Link>

        {/* Links */}
        <nav style={{ display: 'flex', gap: '24px', alignItems: 'center', fontWeight: 600, fontSize: '0.95rem' }}>
          <Link to="/" style={{ color: '#111111' }}>Home</Link>
          <Link to="/about" style={{ color: '#111111' }}>About</Link>
          <Link to="/services" style={{ color: '#111111' }}>Services</Link>
          <Link to="/products" style={{ color: '#111111' }}>Products</Link>
          <Link to="/custom-quote" style={{ color: '#0057D9', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Calculator size={16} /> Instant Quote
          </Link>
          <Link to="/track-quote" style={{ color: '#111111' }}>Track Quote</Link>
          <Link to="/portfolio" style={{ color: '#111111' }}>Portfolio</Link>
          <Link to="/gallery" style={{ color: '#111111' }}>Gallery</Link>
          <Link to="/blog" style={{ color: '#111111' }}>Blog</Link>
          <Link to="/contact" style={{ color: '#111111' }}>Contact</Link>
        </nav>

        {/* User & Cart */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link to="/cart" style={{ position: 'relative', padding: '8px', color: '#111111' }}>
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '2px',
                right: '2px',
                background: '#FF6B00',
                color: '#FFF',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                fontSize: '0.7rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Link to={user.role === 'admin' ? '/admin' : '/customer'} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                <LayoutDashboard size={16} /> {user.role === 'admin' ? 'Admin Portal' : 'My Account'}
              </Link>
              <button onClick={() => { logout(); navigate('/login'); }} className="btn btn-secondary" style={{ padding: '8px 12px' }} title="Logout">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '10px' }}>
              <Link to="/login" className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>Login</Link>
              <Link to="/register" className="btn btn-accent" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>Register</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
