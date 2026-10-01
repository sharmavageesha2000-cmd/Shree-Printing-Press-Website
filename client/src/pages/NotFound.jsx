import React from 'react';
import { Link } from 'react-router-dom';
import { Printer, Home, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
  return (
    <div style={{ padding: '100px 0', textAlign: 'center', background: '#FAFAFB', minHeight: '75vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '560px' }}>
        <div style={{ background: '#FEE2E2', color: '#EF4444', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
          <Printer size={40} />
        </div>
        <h1 style={{ fontSize: '4rem', color: '#111', fontFamily: 'Poppins', marginBottom: '8px' }}>404</h1>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Pre-Press Page Not Found</h2>
        <p style={{ color: '#64748B', marginBottom: '28px' }}>
          The printing specification page or route you are looking for has been moved, unlinked, or does not exist.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <Link to="/" className="btn btn-primary">
            <Home size={18} /> Return to Homepage
          </Link>
          <Link to="/products" className="btn btn-secondary">
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
};
