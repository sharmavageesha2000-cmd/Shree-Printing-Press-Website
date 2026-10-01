import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { ToastContext } from '../context/ToastContext';
import { ShieldCheck, CreditCard, Lock, CheckCircle2 } from 'lucide-react';

export const Checkout = () => {
  const { cart, subtotal, discount, tax, shipping, total, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    street: user?.addresses?.[0]?.street || '742 Corporate Way',
    city: user?.addresses?.[0]?.city || 'Boston',
    state: user?.addresses?.[0]?.state || 'MA',
    zipCode: user?.addresses?.[0]?.zipCode || '02108',
    country: 'USA'
  });

  const [paymentMethod, setPaymentMethod] = useState('Credit Card (Visa/Mastercard)');
  const [submitting, setSubmitting] = useState(false);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!user) {
      showToast('Please log in or register to complete your order.', 'error');
      navigate('/login');
      return;
    }

    setSubmitting(true);
    try {
      const orderPayload = {
        items: cart,
        shippingAddress: address,
        billingAddress: address,
        paymentMethod,
        subtotal,
        taxAmount: tax,
        shippingFee: shipping,
        discountAmount: discount,
        totalAmount: total
      };

      const res = await axios.post('/api/orders', orderPayload);
      if (res.data.success) {
        showToast(`Order #${res.data.order.orderId} placed successfully!`, 'success');
        clearCart();
        navigate('/customer/orders');
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Checkout failed. Try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ padding: '60px 0', background: '#FAFAFB' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '32px' }}>Checkout & Payment Authorization</h1>

        <form onSubmit={handlePlaceOrder} className="grid-3" style={{ gap: '32px' }}>
          {/* Shipping Details & Payment Form (2 cols) */}
          <div style={{ gridColumn: 'span 2' }}>
            <div className="card" style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>1. Shipping & Production Address</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input
                  type="text"
                  placeholder="Street Address *"
                  value={address.street}
                  onChange={e => setAddress({ ...address, street: e.target.value })}
                  required
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                />
                <div className="grid-3" style={{ gap: '12px' }}>
                  <input
                    type="text"
                    placeholder="City *"
                    value={address.city}
                    onChange={e => setAddress({ ...address, city: e.target.value })}
                    required
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                  />
                  <input
                    type="text"
                    placeholder="State *"
                    value={address.state}
                    onChange={e => setAddress({ ...address, state: e.target.value })}
                    required
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                  />
                  <input
                    type="text"
                    placeholder="Zip Code *"
                    value={address.zipCode}
                    onChange={e => setAddress({ ...address, zipCode: e.target.value })}
                    required
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                  />
                </div>
              </div>
            </div>

            <div className="card">
              <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>2. Payment Authorization</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px', borderRadius: '8px', border: '2px solid #0057D9', background: '#F0F7FF', cursor: 'pointer' }}>
                  <input type="radio" checked={true} readOnly />
                  <CreditCard size={20} color="#0057D9" />
                  <span style={{ fontWeight: 600 }}>Credit Card / Instant Corporate Payment</span>
                </label>
              </div>

              <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '0.85rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Lock size={18} color="#10B981" /> 256-Bit SSL Encrypted & PCI-DSS Compliant Gateway
              </div>
            </div>
          </div>

          {/* Right Summary */}
          <div>
            <div className="card glass-panel" style={{ border: '2px solid #FF6B00' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Order Breakdown</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Items ({cart.length}):</span><span>${subtotal.toFixed(2)}</span></div>
                {discount > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10B981' }}><span>Discount:</span><span>-${discount.toFixed(2)}</span></div>}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Tax (8%):</span><span>${tax.toFixed(2)}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Freight:</span><span>${shipping.toFixed(2)}</span></div>
                <div style={{ borderTop: '2px solid #111', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', fontWeight: 800, color: '#0057D9' }}>
                  <span>Total Due:</span><span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button type="submit" disabled={submitting} className="btn btn-accent" style={{ width: '100%', padding: '14px' }}>
                {submitting ? 'Processing...' : 'Authorize & Submit Order'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
