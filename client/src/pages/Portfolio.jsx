import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Portfolio = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [category, setCategory] = useState('All');

  useEffect(() => {
    axios.get('/api/portfolio').then(res => {
      if (res.data.success) setPortfolios(res.data.portfolios);
    });
  }, []);

  const filtered = category === 'All' ? portfolios : portfolios.filter(p => p.category === category);

  return (
    <div style={{ padding: '60px 0' }}>
      <div className="container">
        <div className="section-title">
          <span>PORTFOLIO & CASE STUDIES</span>
          <h2>Craftsmanship In Every Impression</h2>
          <p>Explore luxury brand packaging, corporate annual hardcover books, and large format installations.</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '40px' }}>
          {['All', 'Packaging', 'Book Printing', 'Stationery'].map((cat, i) => (
            <button
              key={i}
              onClick={() => setCategory(cat)}
              className={`btn ${category === cat ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '8px 20px', fontSize: '0.85rem' }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid-2" style={{ gap: '32px' }}>
          {filtered.map((item, i) => (
            <div key={i} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <img
                src={item.image}
                alt={item.title}
                style={{ width: '100%', height: '320px', objectFit: 'cover' }}
              />
              <div style={{ padding: '24px' }}>
                <span style={{ color: '#FF6B00', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>{item.category} • Client: {item.client}</span>
                <h3 style={{ fontSize: '1.4rem', marginTop: '6px', marginBottom: '12px' }}>{item.title}</h3>
                <p style={{ color: '#64748B', fontSize: '0.95rem', marginBottom: '16px' }}>{item.description}</p>
                {item.specs && (
                  <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: '8px', fontSize: '0.8rem', color: '#0057D9', fontWeight: 600 }}>
                    Specs: {item.specs}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
