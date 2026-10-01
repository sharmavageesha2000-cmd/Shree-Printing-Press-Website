import React, { useState } from 'react';
import { Eye, X } from 'lucide-react';

export const Gallery = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryItems = [
    { title: 'Heidelberg Speedmaster XL 106 Press', category: 'Machines', image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80' },
    { title: 'HP Indigo 12000 Digital Press Line', category: 'Machines', image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80' },
    { title: '50,000 Sq. Ft. Main Factory Floor', category: 'Factory', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80' },
    { title: 'Corporate Pre-Press Engineering Desk', category: 'Office', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80' },
    { title: 'Velvet Soft-Touch Business Cards', category: 'Products', image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80' },
    { title: 'Custom Corrugated Packaging Mailers', category: 'Products', image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80' },
    { title: 'Annual Print Expo & Industry Event', category: 'Events', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80' },
    { title: 'Master Pre-Press Technicians', category: 'Team', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80' },
    { title: 'Luxury Gold Foil Packaging Delivered', category: 'Customer Work', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80' }
  ];

  const categories = ['All', 'Factory', 'Office', 'Machines', 'Products', 'Events', 'Team', 'Customer Work'];

  const filtered = activeTab === 'All' ? galleryItems : galleryItems.filter(item => item.category === activeTab);

  return (
    <div style={{ padding: '60px 0', background: '#FAFAFB' }}>
      <div className="container">
        <div className="section-title">
          <span>FACILITY & PRODUCT GALLERY</span>
          <h2>Inside Our Heidelberg Press Facility</h2>
          <p>Explore our heavy printing machinery, automated CAD die-cutters, factory floor, team, and delivered customer work.</p>
        </div>

        {/* Tab Filters */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(cat)}
              className={`btn ${activeTab === cat ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '8px 18px', fontSize: '0.85rem' }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid-3" style={{ gap: '24px' }}>
          {filtered.map((item, i) => (
            <div
              key={i}
              className="card"
              style={{ padding: 0, overflow: 'hidden', cursor: 'pointer', position: 'relative' }}
              onClick={() => setSelectedImage(item)}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{ width: '100%', height: '260px', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
                onMouseOut={e => e.target.style.transform = 'scale(1.0)'}
              />
              <div style={{ padding: '16px', background: '#FFF' }}>
                <span style={{ color: '#FF6B00', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase' }}>{item.category}</span>
                <h4 style={{ fontSize: '1rem', marginTop: '4px', color: '#111' }}>{item.title}</h4>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
            <div className="modal-content" style={{ maxWidth: '850px', background: '#0B132B', color: '#FFF', textAlign: 'center', padding: '24px' }} onClick={e => e.stopPropagation()}>
              <button onClick={() => setSelectedImage(null)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none' }}>
                <X size={24} color="#FFF" />
              </button>
              <img src={selectedImage.image} alt={selectedImage.title} style={{ maxWidth: '100%', maxHeight: '550px', borderRadius: '12px', objectFit: 'contain', marginBottom: '16px' }} />
              <h3 style={{ fontSize: '1.4rem', color: '#FFF' }}>{selectedImage.title}</h3>
              <span style={{ color: '#FF6B00', fontWeight: 700 }}>Category: {selectedImage.category}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
