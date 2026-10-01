import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ProductCard } from '../components/ProductCard';
import { Search, Filter } from 'lucide-react';

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [category, search]);

  const fetchProducts = async () => {
    try {
      let url = '/api/products?';
      if (category) url += `category=${encodeURIComponent(category)}&`;
      if (search) url += `search=${encodeURIComponent(search)}`;
      const res = await axios.get(url);
      if (res.data.success) setProducts(res.data.products);
    } catch (err) {
      console.error('Products load error', err);
    }
  };

  return (
    <div style={{ padding: '60px 0' }}>
      <div className="container">
        <div className="section-title">
          <span>PRINTING PRODUCTS CATALOG</span>
          <h2>Corporate Stationery & Custom Packaging</h2>
          <p>Select your print specifications, paper stock, finishing options, and quantities.</p>
        </div>

        {/* Filter Bar */}
        <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0', marginBottom: '36px', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flex: 1, minWidth: '280px' }}>
            <Search size={20} color="#64748B" />
            <input
              type="text"
              placeholder="Search products (e.g. business cards, banners, mailer boxes)..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', border: 'none', fontSize: '0.95rem' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => setCategory('')} className={`btn ${category === '' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>All Items</button>
            <button onClick={() => setCategory('Business Stationery')} className={`btn ${category === 'Business Stationery' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>Stationery</button>
            <button onClick={() => setCategory('Marketing Materials')} className={`btn ${category === 'Marketing Materials' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>Marketing</button>
            <button onClick={() => setCategory('Large Format Banners')} className={`btn ${category === 'Large Format Banners' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>Banners</button>
            <button onClick={() => setCategory('Packaging & Labels')} className={`btn ${category === 'Packaging & Labels' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>Packaging</button>
          </div>
        </div>

        <div className="grid-4">
          {products.map((prod, i) => (
            <ProductCard key={i} product={prod} />
          ))}
        </div>
      </div>
    </div>
  );
};
