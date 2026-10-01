import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Calculator, CheckCircle2, ArrowLeft } from 'lucide-react';

export const ServiceDetail = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    axios.get(`/api/services/${slug}`).then(res => {
      if (res.data.success) setService(res.data.service);
    });
  }, [slug]);

  if (!service) return <div style={{ padding: '80px', textAlign: 'center' }}>Loading Service Specs...</div>;

  return (
    <div style={{ padding: '60px 0' }}>
      <div className="container">
        <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#0057D9', marginBottom: '24px', fontWeight: 600 }}>
          <ArrowLeft size={16} /> Back to All Printing Services
        </Link>

        <div className="grid-2" style={{ gap: '48px', alignItems: 'center' }}>
          <div>
            <span style={{ color: '#FF6B00', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>SERVICE SPECIFICATIONS</span>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{service.title}</h1>
            <p style={{ color: '#64748B', fontSize: '1.1rem', marginBottom: '24px' }}>{service.fullDesc}</p>

            <div style={{ background: '#F8FAFC', padding: '24px', borderRadius: '12px', marginBottom: '32px', border: '1px solid #E2E8F0' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Technical Highlights & Features</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {service.features?.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                    <CheckCircle2 size={18} color="#0057D9" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <Link to="/custom-quote" className="btn btn-primary" style={{ padding: '14px 28px' }}>
                <Calculator size={18} /> Request Custom Service Quote
              </Link>
              <div style={{ fontSize: '0.9rem', color: '#64748B' }}>
                Turnaround: <strong style={{ color: '#FF6B00' }}>{service.turnaround}</strong>
              </div>
            </div>
          </div>

          <div>
            <img
              src={service.image || 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80'}
              alt={service.title}
              style={{ width: '100%', borderRadius: '20px', boxShadow: '0 12px 32px rgba(0,0,0,0.15)' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
