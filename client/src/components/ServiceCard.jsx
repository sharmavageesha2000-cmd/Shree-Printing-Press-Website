import React from 'react';
import { Link } from 'react-router-dom';
import { Printer, Zap, Box, Check, ArrowRight } from 'lucide-react';

export const ServiceCard = ({ service }) => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Zap': return <Zap size={24} color="#FF6B00" />;
      case 'Box': return <Box size={24} color="#FF6B00" />;
      default: return <Printer size={24} color="#0057D9" />;
    }
  };

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <div style={{ background: '#F0F7FF', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {getIcon(service.icon)}
        </div>
        <div>
          <h3 style={{ fontSize: '1.2rem', color: '#111111' }}>{service.title}</h3>
          <span style={{ fontSize: '0.8rem', color: '#FF6B00', fontWeight: 700 }}>Turnaround: {service.turnaround}</span>
        </div>
      </div>

      <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '20px', flex: 1 }}>
        {service.shortDesc}
      </p>

      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px', fontSize: '0.85rem', color: '#334155' }}>
        {service.features?.map((feat, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Check size={14} color="#0057D9" /> {feat}
          </li>
        ))}
      </ul>

      <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
        <div>
          <span style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'block' }}>Starts at</span>
          <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#111111' }}>${service.startingPrice?.toFixed(2)}</span>
        </div>
        <Link to={`/services/${service.slug}`} className="btn btn-outline" style={{ padding: '8px 14px', fontSize: '0.85rem' }}>
          Service Specs <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
};
