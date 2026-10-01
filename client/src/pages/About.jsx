import React from 'react';
import { Award, ShieldCheck, Printer, Users, CheckCircle2, Clock, Zap, Box } from 'lucide-react';

export const About = () => {
  const timeline = [
    { year: '1998', title: 'Press Foundation', desc: 'Established as a local letterpress & offset print shop in New York.' },
    { year: '2008', title: 'Heidelberg 6-Color Acquisition', desc: 'Upgraded to German Heidelberg Speedmaster presses for commercial catalog printing.' },
    { year: '2016', title: 'Digital Express Facility', desc: 'Integrated HP Indigo digital liquid electrophotography for same-day production.' },
    { year: '2022', title: 'Automated CAD Packaging', desc: 'Added Bobst high-speed die-cutters for custom corrugated packaging boxes.' },
    { year: '2026', title: 'Full MERN Cloud Integration', desc: 'Launched real-time pre-press proofing portal & automated quotation desk.' }
  ];

  const processSteps = [
    { step: '01', title: 'Pre-Press Vector Audit', desc: 'Bleed line verification, CMYK color space check, and digital proofing.' },
    { step: '02', title: 'CJP Plate Imaging', desc: 'High-resolution thermal laser imaging onto aluminum offset plates.' },
    { step: '03', title: 'Heidelberg Press Run', desc: '99.8% Pantone spectro-photometer color matched ink application.' },
    { step: '04', title: 'Surface Finishing', desc: 'Soft-touch velvet lamination, raised spot UV, and 24k foil stamping.' },
    { step: '05', title: 'CAD Die-Cut & Bindery', desc: 'Precision steel-rule die cutting, folding, and Smyth-sewn book binding.' },
    { step: '06', title: 'Fulfillment & Dispatch', desc: 'Quality inspection, shrink wrapping, and tracked carrier dispatch.' }
  ];

  const machines = [
    { name: 'Heidelberg Speedmaster XL 106', spec: '6-Color Offset • 18,000 Sheets/Hour', image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=600&q=80' },
    { name: 'HP Indigo 12000 Digital Press', spec: '7-Color ElectroInk • Zero Setup Time', image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&q=80' },
    { name: 'Bobst SP 104-E Autoplaten Die-Cutter', spec: 'High-Speed Packaging Box Die Cutting', image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80' },
    { name: 'Polar N 137 AT High-Speed Cutter', spec: 'OptiKnife Precision Micro-Cutters', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80' }
  ];

  const team = [
    { name: 'Marcus Vance', role: 'Chief Master Printer', exp: '25+ Years Experience', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' },
    { name: 'Elena Rostova', role: 'Head of Pre-Press Engineering', exp: '18 Years Experience', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80' },
    { name: 'David Sterling', role: 'Packaging Structural Designer', exp: '14 Years Experience', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' }
  ];

  return (
    <div style={{ padding: '60px 0', background: '#FAFAFB' }}>
      <div className="container">
        {/* Intro */}
        <div className="section-title">
          <span>ABOUT PRINTCRAFT PRO PRESS</span>
          <h2>Heavy Press Engineering & Uncompromising Quality</h2>
          <p>Founded on a passion for ink, paper physics, and flawless corporate branding.</p>
        </div>

        {/* Story Grid */}
        <div className="grid-2" style={{ gap: '48px', alignItems: 'center', marginBottom: '80px' }}>
          <div>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '16px', color: '#111' }}>25+ Years of Printing Press Leadership</h3>
            <p style={{ color: '#64748B', fontSize: '1.05rem', marginBottom: '20px', lineHeight: '1.7' }}>
              PrintCraft Pro operates a state-of-the-art 50,000 sq. ft. commercial press facility in New York, equipped with German Heidelberg offset lines, HP Indigo liquid electrophotography digital presses, automated CAD die-cutters, and soft-touch lamination units.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 600 }}><CheckCircle2 size={20} color="#0057D9" /> ISO 9001:2015 Quality Management Certified</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 600 }}><CheckCircle2 size={20} color="#FF6B00" /> Forest Stewardship Council (FSC) Eco-Friendly Paper</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 600 }}><CheckCircle2 size={20} color="#0057D9" /> In-House Master Pre-Press Engineering Team</div>
            </div>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
              alt="Press Facility"
              style={{ width: '100%', borderRadius: '20px', boxShadow: '0 16px 40px rgba(0,0,0,0.15)' }}
            />
          </div>
        </div>

        {/* Timeline */}
        <div style={{ marginBottom: '80px' }}>
          <div className="section-title">
            <span>OUR JOURNEY</span>
            <h2>Press Facility Timeline</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {timeline.map((item, idx) => (
              <div key={idx} className="card" style={{ borderTop: '4px solid #0057D9' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FF6B00', fontFamily: 'Poppins' }}>{item.year}</span>
                <h4 style={{ fontSize: '1.1rem', margin: '6px 0' }}>{item.title}</h4>
                <p style={{ color: '#64748B', fontSize: '0.85rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Manufacturing Process */}
        <div style={{ marginBottom: '80px' }}>
          <div className="section-title">
            <span>WORKFLOW</span>
            <h2>Manufacturing & Printing Process</h2>
          </div>

          <div className="grid-3" style={{ gap: '20px' }}>
            {processSteps.map((step, idx) => (
              <div key={idx} className="card" style={{ background: '#FFF' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0057D9', fontFamily: 'Poppins', marginBottom: '8px' }}>{step.step}</div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>{step.title}</h4>
                <p style={{ color: '#64748B', fontSize: '0.85rem' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Machinery Showcase */}
        <div style={{ marginBottom: '80px' }}>
          <div className="section-title">
            <span>HEAVY PRESS LINE</span>
            <h2>Our Printing Machinery</h2>
          </div>

          <div className="grid-4" style={{ gap: '20px' }}>
            {machines.map((mac, idx) => (
              <div key={idx} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <img src={mac.image} alt={mac.name} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
                <div style={{ padding: '16px' }}>
                  <h4 style={{ fontSize: '1rem', color: '#111' }}>{mac.name}</h4>
                  <span style={{ fontSize: '0.8rem', color: '#FF6B00', fontWeight: 700, marginTop: '4px', display: 'block' }}>{mac.spec}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Grid */}
        <div>
          <div className="section-title">
            <span>EXPERTISE</span>
            <h2>Meet Our Leadership & Pre-Press Engineers</h2>
          </div>

          <div className="grid-3" style={{ gap: '24px' }}>
            {team.map((mem, idx) => (
              <div key={idx} className="card" style={{ textAlign: 'center' }}>
                <img src={mem.image} alt={mem.name} style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 16px auto', border: '3px solid #0057D9' }} />
                <h4 style={{ fontSize: '1.2rem', color: '#111' }}>{mem.name}</h4>
                <div style={{ color: '#FF6B00', fontWeight: 700, fontSize: '0.85rem' }}>{mem.role}</div>
                <div style={{ color: '#64748B', fontSize: '0.8rem', marginTop: '4px' }}>{mem.exp}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
