import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Check, X, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Compare = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products').then(res => {
      if (res.data.success) setProducts(res.data.products.slice(0, 3));
    });
  }, []);

  return (
    <div style={{ padding: '60px 0', background: '#FAFAFB' }}>
      <div className="container">
        <Link to="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#0057D9', marginBottom: '24px', fontWeight: 600 }}>
          <ArrowLeft size={16} /> Back to Catalog
        </Link>

        <div className="section-title">
          <span>PRODUCT COMPARISON</span>
          <h2>Compare Print Specs & Finishing Options</h2>
          <p>Side-by-side technical evaluation of cardstocks, finishes, turnaround times, and pricing matrices.</p>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#FFF', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <thead>
              <tr style={{ background: '#111111', color: '#FFF' }}>
                <th style={{ padding: '16px', textAlign: 'left', width: '200px' }}>Specification</th>
                {products.map((p, i) => (
                  <th key={i} style={{ padding: '16px', textAlign: 'center' }}>
                    <img src={p.images?.[0]} alt={p.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px' }} />
                    <div style={{ fontSize: '1rem', color: '#FFF' }}>{p.name}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '16px', fontWeight: 700, background: '#F8FAFC' }}>Starting Base Price</td>
                {products.map((p, i) => (
                  <td key={i} style={{ padding: '16px', textAlign: 'center', fontWeight: 800, color: '#FF6B00', fontSize: '1.1rem' }}>
                    ${p.basePrice?.toFixed(2)}
                  </td>
                ))}
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '16px', fontWeight: 700, background: '#F8FAFC' }}>Paper Stock Options</td>
                {products.map((p, i) => (
                  <td key={i} style={{ padding: '16px', textAlign: 'center', fontSize: '0.85rem' }}>
                    {p.paperOptions?.map(po => po.name).join(', ') || 'Standard Cardstock'}
                  </td>
                ))}
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '16px', fontWeight: 700, background: '#F8FAFC' }}>Available Finishes</td>
                {products.map((p, i) => (
                  <td key={i} style={{ padding: '16px', textAlign: 'center', fontSize: '0.85rem' }}>
                    {p.finishOptions?.map(fo => fo.name).join(', ') || 'Matte Satin'}
                  </td>
                ))}
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '16px', fontWeight: 700, background: '#F8FAFC' }}>Turnaround Time</td>
                {products.map((p, i) => (
                  <td key={i} style={{ padding: '16px', textAlign: 'center', color: '#0057D9', fontWeight: 700 }}>
                    {p.turnaroundTime}
                  </td>
                ))}
              </tr>
              <tr>
                <td style={{ padding: '16px', fontWeight: 700, background: '#F8FAFC' }}>Free Pre-Press Proof</td>
                {products.map((_, i) => (
                  <td key={i} style={{ padding: '16px', textAlign: 'center', color: '#10B981' }}>
                    <Check size={20} style={{ margin: '0 auto' }} />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
