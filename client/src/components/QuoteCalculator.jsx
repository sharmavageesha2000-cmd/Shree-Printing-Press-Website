import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { ToastContext } from '../context/ToastContext';
import { Calculator, Upload, Check, FileText, Send, Sparkles, AlertCircle, Clock } from 'lucide-react';

export const QuoteCalculator = ({ compact = false }) => {
  const { user } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);

  const [printType, setPrintType] = useState('Offset Printing');
  const [jobTitle, setJobTitle] = useState('Premium Business Cards');
  const [paperSize, setPaperSize] = useState('Standard US (3.5" x 2.0")');
  const [paperQuality, setPaperQuality] = useState('300 GSM Heavyweight Soft-Touch Velvet');
  const [colorOption, setColorOption] = useState('Full Color CMYK (4/4)');
  const [sidesOption, setSidesOption] = useState('Double Sided');
  const [bindingOption, setBindingOption] = useState('None');
  const [quantity, setQuantity] = useState(1000);
  const [deliverySpeed, setDeliverySpeed] = useState('Standard 3-5 Business Days');
  const [finishes, setFinishes] = useState(['Raised Spot UV']);
  const [notes, setNotes] = useState('');
  const [artworkFile, setArtworkFile] = useState(null);

  // Guest Contact
  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [phone, setPhone] = useState(user ? user.phone || '' : '');
  const [company, setCompany] = useState(user ? user.company || '' : '');

  const [submitting, setSubmitting] = useState(false);
  const [submittedQuote, setSubmittedQuote] = useState(null);

  const availableFinishes = [
    'Matte Soft-Touch Lamination',
    'Raised Spot UV',
    'Gold Metallic Foil',
    'Silver Foil Accent',
    'Embossed Logo',
    'Rounded Die-Cut Corners'
  ];

  const handleFinishToggle = (f) => {
    if (finishes.includes(f)) {
      setFinishes(finishes.filter(item => item !== f));
    } else {
      setFinishes([...finishes, f]);
    }
  };

  // Pricing Engine Formula
  const basePricePerUnit = quantity >= 5000 ? 0.03 : quantity >= 2500 ? 0.04 : quantity >= 1000 ? 0.06 : quantity >= 500 ? 0.09 : 0.15;
  const sideMult = sidesOption === 'Double Sided' ? 1.3 : 1.0;
  const colorMult = colorOption.includes('Pantone') ? 1.4 : colorOption.includes('Full Color') ? 1.2 : 1.0;
  const speedExtra = deliverySpeed.includes('24h') ? 45 : deliverySpeed.includes('Express') ? 25 : 0;
  const finishExtra = finishes.length * 15;
  const bindingExtra = bindingOption === 'Hardcover' ? 85 : bindingOption === 'Perfect Bound' ? 45 : bindingOption === 'Saddle Stitch' ? 25 : 0;

  const estimatedPrice = Math.round((quantity * basePricePerUnit * sideMult * colorMult + finishExtra + bindingExtra + speedExtra) * 100) / 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      showToast('Please provide your name, email, and phone number.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('jobTitle', `${printType} - ${jobTitle}`);
      formData.append('quantity', quantity);
      formData.append('paperType', `${paperQuality} (${colorOption}, ${sidesOption})`);
      formData.append('size', paperSize);
      formData.append('finishOptions', [...finishes, `Binding: ${bindingOption}`, `Delivery: ${deliverySpeed}`].join(', '));
      formData.append('notes', notes);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('company', company);
      if (artworkFile) {
        formData.append('artworkFile', artworkFile);
      }

      const res = await axios.post('/api/quotes', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data.success) {
        setSubmittedQuote(res.data.quote);
        showToast(`Quotation #${res.data.quote.quoteId} submitted!`, 'success');
      }
    } catch (err) {
      showToast('Quotation submission failed.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (submittedQuote) {
    return (
      <div className="card glass-panel" style={{ textAlign: 'center', padding: '48px 32px' }}>
        <div style={{ background: '#D1FAE5', color: '#065F46', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
          <Check size={36} />
        </div>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '12px' }}>Quotation Submitted Successfully!</h2>
        <p style={{ color: '#64748B', marginBottom: '24px' }}>
          Your parameters have been logged in our prepress desk database.
        </p>
        <div style={{ background: '#F8FAFC', borderRadius: '12px', padding: '20px', display: 'inline-block', textAlign: 'left', marginBottom: '24px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '0.9rem', marginBottom: '6px' }}><strong>Quote ID:</strong> <span style={{ color: '#0057D9', fontWeight: 800 }}>{submittedQuote.quoteId}</span></div>
          <div style={{ fontSize: '0.9rem', marginBottom: '6px' }}><strong>Estimated Total:</strong> <span style={{ color: '#FF6B00', fontWeight: 800 }}>${estimatedPrice.toFixed(2)}</span></div>
          <div style={{ fontSize: '0.9rem' }}><strong>Status:</strong> <span className="badge badge-pending">Pending Review</span></div>
        </div>
        <div>
          <button onClick={() => setSubmittedQuote(null)} className="btn btn-outline">
            Request Another Quote
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card glass-panel" style={{ border: '2px solid #0057D9' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', borderBottom: '1px solid #E2E8F0', paddingBottom: '16px' }}>
        <div style={{ background: '#0057D9', color: '#FFF', padding: '10px', borderRadius: '10px' }}>
          <Calculator size={24} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.35rem', color: '#111' }}>Full Dynamic Print & Spec Pricing Calculator</h3>
          <span style={{ color: '#64748B', fontSize: '0.85rem' }}>Select press type, paper GSM, color profiles, binding & delivery speed.</span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Row 1: Printing Type & Job Title */}
        <div className="grid-2" style={{ gap: '16px', marginBottom: '16px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>1. Printing Type</label>
            <select value={printType} onChange={e => setPrintType(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}>
              <option value="Offset Printing">Offset Printing (High Volume Press)</option>
              <option value="Digital Printing">Digital Printing (Short Run & Express)</option>
              <option value="Flex & Banner Printing">Flex & Large Format Banner Printing</option>
              <option value="Packaging & Box Printing">Custom Packaging & Box Printing</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>2. Product Category</label>
            <select value={jobTitle} onChange={e => setJobTitle(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}>
              <option value="Premium Business Cards">Business Cards / Visiting Cards</option>
              <option value="Tri-Fold Corporate Brochures">Brochures & Catalogs</option>
              <option value="Flyers & Pamphlets">Flyers & Pamphlets</option>
              <option value="Retractable Pull-Up Banner">Banners & Flex Signage</option>
              <option value="Custom Mailer Packaging Boxes">Packaging Boxes & Labels</option>
              <option value="Luxury Wedding Invitation Suite">Wedding Invitation Suite</option>
              <option value="Hardcover Book / Monograph">Books & Magazines</option>
            </select>
          </div>
        </div>

        {/* Row 2: Paper Size & GSM */}
        <div className="grid-2" style={{ gap: '16px', marginBottom: '16px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>3. Paper Dimensions & Size</label>
            <select value={paperSize} onChange={e => setPaperSize(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}>
              <option value='Standard US (3.5" x 2.0")'>Standard Business Card (3.5" x 2.0")</option>
              <option value='A4 Standard (8.27" x 11.69")'>A4 Standard (8.27" x 11.69")</option>
              <option value='A5 Half Size (5.83" x 8.27")'>A5 Half Size (5.83" x 8.27")</option>
              <option value='8.5" x 11" US Letter'>8.5" x 11" US Letter</option>
              <option value='11" x 17" Tabloid'>11" x 17" Tabloid Oversized</option>
              <option value='33" x 81" Banner Stand'>33" x 81" Banner Stand Size</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>4. Paper Stock & Quality (GSM)</label>
            <select value={paperQuality} onChange={e => setPaperQuality(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}>
              <option value="300 GSM Heavyweight Soft-Touch Velvet">300 GSM Velvet Soft-Touch</option>
              <option value="350 GSM Premium Silk Matte">350 GSM Premium Silk Matte</option>
              <option value="100lb Gloss Book Text">100lb Gloss Book Text</option>
              <option value="32pt Tri-Layer Core Stock">32pt Tri-Layer Colored Core</option>
              <option value="13oz Weatherproof Vinyl">13oz Outdoor Weatherproof Vinyl</option>
            </select>
          </div>
        </div>

        {/* Row 3: Color, Sides, Binding, Delivery Speed */}
        <div className="grid-4" style={{ gap: '12px', marginBottom: '16px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8rem', marginBottom: '6px' }}>5. Color Profile</label>
            <select value={colorOption} onChange={e => setColorOption(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}>
              <option value="Full Color CMYK (4/4)">Full Color CMYK (4/4)</option>
              <option value="Single Color Black (1/1)">Single Color Black (1/1)</option>
              <option value="Spot Pantone Match (5/5)">Spot Pantone Match</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8rem', marginBottom: '6px' }}>6. Sides</label>
            <select value={sidesOption} onChange={e => setSidesOption(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}>
              <option value="Double Sided">Double Sided (Front & Back)</option>
              <option value="Single Sided">Single Sided</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8rem', marginBottom: '6px' }}>7. Binding</label>
            <select value={bindingOption} onChange={e => setBindingOption(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}>
              <option value="None">None / Loose Sheets</option>
              <option value="Saddle Stitch">Saddle Stitch Staples</option>
              <option value="Perfect Bound">Perfect Bound Softcover</option>
              <option value="Hardcover">Smyth Sewn Hardcover</option>
              <option value="Spiral Wire-O">Spiral Wire-O</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8rem', marginBottom: '6px' }}>8. Delivery Speed</label>
            <select value={deliverySpeed} onChange={e => setDeliverySpeed(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}>
              <option value="Standard 3-5 Business Days">Standard (3-5 Days)</option>
              <option value="Express 48h">Express (48 Hours)</option>
              <option value="Rush 24h Production">Rush 24-Hour Production</option>
            </select>
          </div>
        </div>

        {/* Quantity Tiers */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>9. Select Print Quantity</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
            {[250, 500, 1000, 2500, 5000].map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setQuantity(q)}
                style={{
                  padding: '10px',
                  borderRadius: '8px',
                  border: quantity === q ? '2px solid #FF6B00' : '1px solid #CBD5E1',
                  background: quantity === q ? '#FFF5EC' : '#FFF',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  color: quantity === q ? '#FF6B00' : '#111'
                }}
              >
                {q.toLocaleString()} units
              </button>
            ))}
          </div>
        </div>

        {/* Finishes Checkboxes */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '8px' }}>10. Premium Finishes & Foil Accents</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px' }}>
            {availableFinishes.map((f, i) => (
              <label key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                borderRadius: '8px',
                border: finishes.includes(f) ? '2px solid #0057D9' : '1px solid #CBD5E1',
                background: finishes.includes(f) ? '#F0F7FF' : '#FFF',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: finishes.includes(f) ? 600 : 400
              }}>
                <input type="checkbox" checked={finishes.includes(f)} onChange={() => handleFinishToggle(f)} />
                {f}
              </label>
            ))}
          </div>
        </div>

        {/* File Upload & Special Instructions */}
        <div className="grid-2" style={{ gap: '16px', marginBottom: '20px' }}>
          <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '8px', border: '1px dashed #CBD5E1' }}>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8rem', marginBottom: '4px' }}>Upload Vector Artwork / Design (.pdf, .ai, .psd, .png)</label>
            <input type="file" onChange={e => setArtworkFile(e.target.files[0])} style={{ fontSize: '0.8rem' }} />
          </div>

          <div>
            <input
              type="text"
              placeholder="Special Instructions / Deadlines..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
            />
          </div>
        </div>

        {/* Contact Info (if guest) */}
        <div className="grid-2" style={{ gap: '12px', marginBottom: '20px' }}>
          <input type="text" placeholder="Full Name *" value={name} onChange={e => setName(e.target.value)} required style={{ padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }} />
          <input type="email" placeholder="Corporate Email *" value={email} onChange={e => setEmail(e.target.value)} required style={{ padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }} />
          <input type="text" placeholder="Phone Number *" value={phone} onChange={e => setPhone(e.target.value)} required style={{ padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }} />
          <input type="text" placeholder="Company Name" value={company} onChange={e => setCompany(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }} />
        </div>

        {/* Total Cost Bar */}
        <div style={{
          background: '#111111',
          color: '#FFFFFF',
          borderRadius: '12px',
          padding: '18px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>INSTANT ESTIMATED JOB COST</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#FF6B00', fontFamily: 'Poppins' }}>
              ${estimatedPrice.toFixed(2)}
              <span style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: 400, marginLeft: '6px' }}>
                (${(estimatedPrice / quantity).toFixed(3)} / unit)
              </span>
            </div>
          </div>

          <button type="submit" disabled={submitting} className="btn btn-primary" style={{ padding: '14px 28px' }}>
            {submitting ? 'Submitting...' : 'Submit Quotation Request'} <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};
