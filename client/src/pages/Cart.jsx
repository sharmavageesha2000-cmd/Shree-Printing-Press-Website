import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { ToastContext } from '../context/ToastContext';
import { Trash2, ArrowRight, ShoppingCart, Tag, ShieldCheck } from 'lucide-react';

export const Cart = () => {
  const { cart, removeFromCart, subtotal, discount, tax, shipping, total, coupon, setCoupon } = useContext(CartContext);
  const { showToast } = useContext(ToastContext);
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState('');
  const [applyingCoupon, setApplyingCoupon] = useState(false);

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponCode) return;

    setApplyingCoupon(true);
    try {
      const res = await axios.post('/api/coupons/validate', { code: couponCode, cartTotal: subtotal });
      if (res.data.success) {
        setCoupon(res.data);
        showToast(`Coupon ${res.data.code} applied! Saved $${res.data.discountAmount}`, 'success');
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Invalid coupon code', 'error');
    } finally {
      setApplyingCoupon(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div style={{ padding: '100px 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '500px' }}>
          <ShoppingCart size={64} color="#94A3B8" style={{ margin: '0 auto 16px auto' }} />
          <h2 style={{ fontSize: '1.75rem', marginBottom: '8px' }}>Your Print Cart is Empty</h2>
          <p style={{ color: '#64748B', marginBottom: '24px' }}>Explore our catalog of stationery, brochures, banners & custom mailer packaging.</p>
          <Link to="/products" className="btn btn-primary">
            Explore Printing Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '60px 0', background: '#FAFAFB' }}>
      <div className="container">
        <h1 style={{ fontSize: '2rem', marginBottom: '32px' }}>Shopping Cart & Job Specifications</h1>

        <div className="grid-3" style={{ gap: '32px' }}>
          {/* Cart Items List (2 cols) */}
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {cart.map((item, idx) => (
                <div key={idx} className="card" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <img
                    src={item.artworkUrl || 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=300&q=80'}
                    alt={item.productName}
                    style={{ width: '90px', height: '90px', borderRadius: '10px', objectFit: 'cover' }}
                  />

                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.15rem', color: '#111' }}>{item.productName}</h3>
                    <div style={{ fontSize: '0.85rem', color: '#64748B', margin: '4px 0' }}>
                      Paper: {item.paperType} • Size: {item.size}
                    </div>
                    {item.finishOptions?.length > 0 && (
                      <div style={{ fontSize: '0.8rem', color: '#0057D9', fontWeight: 600 }}>
                        Finishes: {item.finishOptions.join(', ')}
                      </div>
                    )}
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111', marginTop: '6px' }}>
                      Quantity: {item.quantity?.toLocaleString()} units
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FF6B00', fontFamily: 'Poppins' }}>
                      ${item.totalPrice?.toFixed(2)}
                    </div>
                    <button onClick={() => removeFromCart(idx)} style={{ background: 'none', color: '#EF4444', marginTop: '8px', padding: '4px' }} title="Remove">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Sidebar (1 col) */}
          <div>
            <div className="card glass-panel">
              <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', borderBottom: '1px solid #E2E8F0', paddingBottom: '12px' }}>Order Summary</h3>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                <input
                  type="text"
                  placeholder="Coupon Code (e.g. PRINT15)"
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value)}
                  style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem', textTransform: 'uppercase' }}
                />
                <button type="submit" disabled={applyingCoupon} className="btn btn-secondary" style={{ padding: '10px 14px', fontSize: '0.85rem' }}>
                  Apply
                </button>
              </form>

              {coupon && (
                <div style={{ background: '#D1FAE5', color: '#065F46', padding: '10px', borderRadius: '8px', fontSize: '0.8rem', marginBottom: '16px', fontWeight: 600 }}>
                  Code {coupon.code} Applied! (-${coupon.discountAmount.toFixed(2)})
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Subtotal:</span><span>${subtotal.toFixed(2)}</span></div>
                {discount > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10B981' }}><span>Discount:</span><span>-${discount.toFixed(2)}</span></div>}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Estimated Tax (8%):</span><span>${tax.toFixed(2)}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Freight Shipping:</span>
                  <span>{shipping === 0 ? <strong style={{ color: '#10B981' }}>FREE</strong> : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div style={{ borderTop: '2px solid #111', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 800, color: '#0057D9' }}>
                  <span>Total Due:</span><span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button onClick={() => navigate('/checkout')} className="btn btn-accent" style={{ width: '100%', padding: '14px' }}>
                Proceed to Checkout <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
