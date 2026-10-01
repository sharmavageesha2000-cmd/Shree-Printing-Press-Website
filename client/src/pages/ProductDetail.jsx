import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { ToastContext } from '../context/ToastContext';
import { ShoppingCart, Calculator, Check, ArrowLeft, Star, Clock, ShieldCheck, Upload } from 'lucide-react';

export const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { showToast } = useContext(ToastContext);

  const [product, setProduct] = useState(null);
  const [paper, setPaper] = useState('');
  const [size, setSize] = useState('');
  const [finish, setFinish] = useState('');
  const [quantity, setQuantity] = useState(500);
  const [artworkFile, setArtworkFile] = useState(null);

  useEffect(() => {
    axios.get(`/api/products/${slug}`).then(res => {
      if (res.data.success) {
        const prod = res.data.product;
        setProduct(prod);
        if (prod.paperOptions?.[0]) setPaper(prod.paperOptions[0].name);
        if (prod.sizeOptions?.[0]) setSize(prod.sizeOptions[0].name);
        if (prod.finishOptions?.[0]) setFinish(prod.finishOptions[0].name);
        if (prod.quantityTiers?.[0]) setQuantity(prod.quantityTiers[0].quantity);
      }
    });
  }, [slug]);

  if (!product) return <div style={{ padding: '80px', textAlign: 'center' }}>Loading Product Options...</div>;

  // Price calculations
  const paperExtra = product.paperOptions?.find(p => p.name === paper)?.extraCost || 0;
  const finishExtra = product.finishOptions?.find(f => f.name === finish)?.extraCost || 0;
  const sizeMult = product.sizeOptions?.find(s => s.name === size)?.multiplier || 1.0;
  const tier = product.quantityTiers?.find(q => q.quantity === Number(quantity));
  const pricePerUnit = tier ? tier.pricePerUnit : product.basePrice / quantity;
  const totalItemPrice = Math.round((quantity * pricePerUnit * sizeMult + paperExtra + finishExtra) * 100) / 100;

  const handleAddToCart = () => {
    addToCart({
      productName: product.name,
      paperType: paper,
      size: size,
      finishOptions: [finish],
      quantity: Number(quantity),
      unitPrice: totalItemPrice / quantity,
      totalPrice: totalItemPrice,
      artworkUrl: product.images[0]
    });
    showToast(`Added ${product.name} to cart!`, 'success');
    navigate('/cart');
  };

  return (
    <div style={{ padding: '60px 0' }}>
      <div className="container">
        <Link to="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#0057D9', marginBottom: '24px', fontWeight: 600 }}>
          <ArrowLeft size={16} /> Back to Catalog
        </Link>

        <div className="grid-2" style={{ gap: '48px' }}>
          {/* Images Gallery */}
          <div>
            <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #E2E8F0', marginBottom: '16px' }}>
              <img
                src={product.images?.[0] || 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80'}
                alt={product.name}
                style={{ width: '100%', height: '420px', objectFit: 'cover' }}
              />
            </div>
            <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px', display: 'flex', gap: '16px', fontSize: '0.85rem', color: '#64748B' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={16} color="#FF6B00" /> Turnaround: {product.turnaroundTime}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><ShieldCheck size={16} color="#0057D9" /> Free Pre-Press Proof</div>
            </div>
          </div>

          {/* Configurator Form */}
          <div>
            <span style={{ color: '#FF6B00', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.8rem' }}>{product.category}</span>
            <h1 style={{ fontSize: '2rem', marginTop: '4px', marginBottom: '12px' }}>{product.name}</h1>
            <p style={{ color: '#64748B', marginBottom: '24px' }}>{product.description}</p>

            {/* Paper Selection */}
            {product.paperOptions?.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '8px' }}>1. Select Paper Stock & Weight</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {product.paperOptions.map((p, i) => (
                    <label key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: paper === p.name ? '2px solid #0057D9' : '1px solid #CBD5E1',
                      background: paper === p.name ? '#F0F7FF' : '#FFF',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input type="radio" name="paper" checked={paper === p.name} onChange={() => setPaper(p.name)} />
                        <span>{p.name}</span>
                      </div>
                      {p.extraCost > 0 && <span style={{ color: '#0057D9', fontWeight: 600 }}>+${p.extraCost}</span>}
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Size Options */}
            {product.sizeOptions?.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '8px' }}>2. Dimensions & Trim Size</label>
                <select value={size} onChange={e => setSize(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}>
                  {product.sizeOptions.map((s, i) => (
                    <option key={i} value={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Finish Options */}
            {product.finishOptions?.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '8px' }}>3. Protective Finish & Lamination</label>
                <select value={finish} onChange={e => setFinish(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}>
                  {product.finishOptions.map((f, i) => (
                    <option key={i} value={f.name}>{f.name} {f.extraCost > 0 ? `(+${f.extraCost})` : ''}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Quantity Selector */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '8px' }}>4. Print Quantity (Volume Discounts)</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                {(product.quantityTiers?.length > 0 ? product.quantityTiers : [{ quantity: 250 }, { quantity: 500 }, { quantity: 1000 }, { quantity: 2500 }]).map((qt, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setQuantity(qt.quantity)}
                    style={{
                      padding: '12px',
                      borderRadius: '8px',
                      border: quantity === qt.quantity ? '2px solid #FF6B00' : '1px solid #CBD5E1',
                      background: quantity === qt.quantity ? '#FFF5EC' : '#FFF',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      color: quantity === qt.quantity ? '#FF6B00' : '#111'
                    }}
                  >
                    {qt.quantity} units
                  </button>
                ))}
              </div>
            </div>

            {/* Price Footer */}
            <div style={{ background: '#111111', color: '#FFF', padding: '24px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>CALCULATED JOB TOTAL</span>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FF6B00', fontFamily: 'Poppins' }}>
                  ${totalItemPrice.toFixed(2)}
                  <span style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: 400, marginLeft: '6px' }}>
                    (${(totalItemPrice / quantity).toFixed(3)}/unit)
                  </span>
                </div>
              </div>

              <button onClick={handleAddToCart} className="btn btn-primary" style={{ padding: '14px 28px' }}>
                <ShoppingCart size={18} /> Configure & Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
