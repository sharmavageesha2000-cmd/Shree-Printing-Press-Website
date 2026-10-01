import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calculator, ArrowRight, ShieldCheck, Printer, Sparkles, CheckCircle2 } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';

export const Hero = () => {
  return (
    <section style={{
      background: 'linear-gradient(135deg, #0B132B 0%, #111111 50%, #002B66 100%)',
      color: '#FFFFFF',
      padding: '80px 0 100px 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Glow Orb */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        right: '-100px',
        width: '450px',
        height: '450px',
        background: 'radial-gradient(circle, rgba(0,87,217,0.35) 0%, rgba(0,0,0,0) 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      <div className="container">
        <div className="grid-2" style={{ alignItems: 'center', gap: '48px' }}>
          {/* Left Column Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(0, 87, 217, 0.2)',
              border: '1px solid rgba(0, 87, 217, 0.5)',
              padding: '6px 14px',
              borderRadius: '20px',
              color: '#60A5FA',
              fontSize: '0.85rem',
              fontWeight: 700,
              marginBottom: '20px'
            }}>
              <Sparkles size={16} color="#FF6B00" />
              <span>GERMAN HEIDELBERG PRINT PRESS FACILITY</span>
            </div>

            <h1 style={{ fontSize: '3.25rem', color: '#FFFFFF', fontWeight: 800, marginBottom: '20px', letterSpacing: '-0.5px' }}>
              Precision Commercial <br />
              <span style={{
                background: 'linear-gradient(90deg, #60A5FA 0%, #FF6B00 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Printing & Packaging
              </span>
            </h1>

            <p style={{ color: '#94A3B8', fontSize: '1.15rem', marginBottom: '32px', maxWidth: '560px' }}>
              From luxury soft-touch velvet business cards to heavy-duty trade show banners and custom corrugated packaging boxes—engineered with 99.8% color precision.
            </p>

            {/* Feature Bullets */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '36px', fontSize: '0.95rem', color: '#E2E8F0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={18} color="#FF6B00" /> Free PDF Pre-Press Proofing</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={18} color="#0057D9" /> Raised Spot UV & Gold Foil</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={18} color="#0057D9" /> 24-Hour Express Turnaround</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={18} color="#FF6B00" /> Real-time Quotation Desk</div>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link to="/custom-quote" className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '1rem' }}>
                <Calculator size={20} /> Calculate Custom Quote
              </Link>
              <Link to="/products" className="btn btn-secondary" style={{ padding: '14px 28px', fontSize: '1rem', background: 'rgba(255,255,255,0.1)', color: '#FFF' }}>
                View Catalog <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>

          {/* Right Column Showcase Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ position: 'relative' }}
          >
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <h3 style={{ color: '#FFF', fontSize: '1.4rem' }}>PrintCraft Live Engine</h3>
                  <span style={{ color: '#94A3B8', fontSize: '0.85rem' }}>Instant Pricing & Pre-Press Pipeline</span>
                </div>
                <div style={{ background: '#FF6B00', padding: '6px 12px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 800, color: '#FFF' }}>
                  READY TO PRINT
                </div>
              </div>

              {/* Sample Product Card in Hero */}
              <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '16px', padding: '20px', marginBottom: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <img
                    src="https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=300&q=80"
                    alt="Business Cards"
                    style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover' }}
                  />
                  <div>
                    <h4 style={{ color: '#FFF', fontSize: '1.1rem' }}>Soft-Touch Velvet Cards</h4>
                    <p style={{ color: '#60A5FA', fontSize: '0.85rem', fontWeight: 600 }}>16pt Stock • Spot UV • 1,000 Units</p>
                    <span style={{ color: '#FF6B00', fontSize: '1.2rem', fontWeight: 800, marginTop: '4px', display: 'block' }}>From $0.05 / unit</span>
                  </div>
                </div>
              </div>

              {/* Stats Counters */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
                <div>
                  <AnimatedCounter end={25000} suffix="+" />
                  <div style={{ color: '#94A3B8', fontSize: '0.75rem', marginTop: '2px' }}>Jobs Delivered</div>
                </div>
                <div>
                  <AnimatedCounter end={99} suffix=".8%" />
                  <div style={{ color: '#94A3B8', fontSize: '0.75rem', marginTop: '2px' }}>Color Precision</div>
                </div>
                <div>
                  <AnimatedCounter end={24} suffix=" Hours" />
                  <div style={{ color: '#94A3B8', fontSize: '0.75rem', marginTop: '2px' }}>Rush Turnaround</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
