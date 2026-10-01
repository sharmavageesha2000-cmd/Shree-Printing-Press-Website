import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { ServiceCard } from '../components/ServiceCard';
import { QuoteCalculator } from '../components/QuoteCalculator';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Award, Zap, Star } from 'lucide-react';

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      const [prodRes, srvRes, revRes] = await Promise.all([
        axios.get('/api/products?featured=true'),
        axios.get('/api/services'),
        axios.get('/api/reviews')
      ]);
      if (prodRes.data.success) setProducts(prodRes.data.products);
      if (srvRes.data.success) setServices(srvRes.data.services);
      if (revRes.data.success) setReviews(revRes.data.reviews);
    } catch (err) {
      console.error('Home data load error', err);
    }
  };

  return (
    <div>
      <Hero />

      {/* Services Section */}
      <section style={{ padding: '80px 0', background: '#FAFAFB' }}>
        <div className="container">
          <div className="section-title">
            <span>CORE PRESS CAPABILITIES</span>
            <h2>State-of-the-Art Commercial Printing</h2>
            <p>German Heidelberg offset technology and HP Indigo liquid electrophotography press lines.</p>
          </div>

          <div className="grid-3" style={{ gap: '24px' }}>
            {services.map((service, i) => (
              <ServiceCard key={i} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section style={{ padding: '80px 0', background: '#FFFFFF' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px' }}>
            <div>
              <span style={{ color: '#FF6B00', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>MOST POPULAR PRINTS</span>
              <h2 style={{ fontSize: '2.25rem', marginTop: '4px' }}>Featured Corporate Stationery & Packaging</h2>
            </div>
            <Link to="/products" className="btn btn-outline">
              View Entire Catalog <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid-4">
            {products.map((prod, i) => (
              <ProductCard key={i} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* Instant Custom Quote Engine Section */}
      <section style={{ padding: '80px 0', background: 'linear-gradient(180deg, #F4F4F4 0%, #E2E8F0 100%)' }}>
        <div className="container">
          <div className="section-title">
            <span>REAL-TIME ESTIMATOR</span>
            <h2>Calculate Your Custom Printing Quote</h2>
            <p>Select paper GSM, dimension specs, raised spot UV or foil finishes, and upload your design artwork.</p>
          </div>

          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <QuoteCalculator />
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section style={{ padding: '80px 0', background: '#111111', color: '#FFFFFF' }}>
        <div className="container">
          <div className="section-title" style={{ color: '#FFF' }}>
            <span style={{ color: '#FF6B00' }}>CLIENT FEEDBACK</span>
            <h2 style={{ color: '#FFF' }}>Trusted by Fortune 500 & Brands Worldwide</h2>
            <p style={{ color: '#94A3B8' }}>See what corporate purchasing directors say about our print accuracy and speed.</p>
          </div>

          <div className="grid-2" style={{ gap: '24px' }}>
            {reviews.map((rev, i) => (
              <div key={i} style={{ background: '#1A1A1A', padding: '32px', borderRadius: '16px', border: '1px solid #222222' }}>
                <div style={{ display: 'flex', gap: '4px', color: '#F59E0B', marginBottom: '16px' }}>
                  {[...Array(rev.rating || 5)].map((_, r) => (
                    <Star key={r} size={18} fill="#F59E0B" />
                  ))}
                </div>
                <p style={{ color: '#E2E8F0', fontSize: '1.05rem', fontStyle: 'italic', marginBottom: '20px' }}>
                  "{rev.comment}"
                </p>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#FFF' }}>{rev.userName}</div>
                  <div style={{ color: '#FF6B00', fontSize: '0.85rem' }}>{rev.userCompany} • {rev.productName}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
