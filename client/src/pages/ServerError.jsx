import React from 'react';
import { Link } from 'react-router-dom';
import { AlertOctagon, RefreshCw } from 'lucide-react';

export const ServerError = () => {
  return (
    <div style={{ padding: '100px 0', textAlign: 'center', background: '#FAFAFB', minHeight: '75vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '560px' }}>
        <div style={{ background: '#FEE2E2', color: '#DC2626', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
          <AlertOctagon size={40} />
        </div>
        <h1 style={{ fontSize: '4rem', color: '#111', fontFamily: 'Poppins', marginBottom: '8px' }}>500</h1>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Internal Server Exception</h2>
        <p style={{ color: '#64748B', marginBottom: '28px' }}>
          Our server encountered a temporary glitch while processing your prepress query. Our engineering team has been notified.
        </p>
        <button onClick={() => window.location.reload()} className="btn btn-primary">
          <RefreshCw size={18} /> Reload Page
        </button>
      </div>
    </div>
  );
};
