import React from 'react';
import { Printer, Download, X, CheckCircle } from 'lucide-react';

export const InvoiceModal = ({ order, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '800px', padding: '40px' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none' }}>
          <X size={24} color="#64748B" />
        </button>

        {/* Invoice Container */}
        <div id="printable-invoice">
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #0057D9', paddingBottom: '24px', marginBottom: '24px' }}>
            <div>
              <h2 style={{ fontSize: '1.75rem', color: '#0057D9', fontFamily: 'Poppins' }}>PRINTCRAFT PRO</h2>
              <div style={{ fontSize: '0.85rem', color: '#64748B' }}>100 Industrial Parkway, Suite 400</div>
              <div style={{ fontSize: '0.85rem', color: '#64748B' }}>New York, NY 10001 • Tax ID: US-981042-P</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <h3 style={{ fontSize: '1.5rem', color: '#111111' }}>OFFICIAL INVOICE</h3>
              <div style={{ fontWeight: 700, color: '#FF6B00' }}>#{order.orderId}</div>
              <div style={{ fontSize: '0.85rem', color: '#64748B' }}>Date: {new Date(order.createdAt).toLocaleDateString()}</div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="grid-2" style={{ gap: '24px', marginBottom: '32px', background: '#F8FAFC', padding: '20px', borderRadius: '12px' }}>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Billed To</div>
              <div style={{ fontWeight: 700, fontSize: '1rem', marginTop: '4px' }}>{order.user?.name || 'Valued Corporate Client'}</div>
              <div style={{ fontSize: '0.85rem', color: '#475569' }}>{order.shippingAddress?.street}</div>
              <div style={{ fontSize: '0.85rem', color: '#475569' }}>{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zipCode}</div>
            </div>

            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Payment Details</div>
              <div style={{ fontSize: '0.85rem', color: '#475569', marginTop: '4px' }}>Method: {order.paymentMethod}</div>
              <div style={{ fontSize: '0.85rem', color: '#475569' }}>Payment Status: <span className="badge badge-paid">PAID IN FULL</span></div>
              <div style={{ fontSize: '0.85rem', color: '#475569' }}>Tracking Number: {order.trackingNumber || 'Pending Dispatch'}</div>
            </div>
          </div>

          {/* Items Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '32px' }}>
            <thead>
              <tr style={{ background: '#111111', color: '#FFF', fontSize: '0.85rem', textAlign: 'left' }}>
                <th style={{ padding: '12px 16px' }}>Print Job / Product Description</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Qty</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Unit Price</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #E2E8F0', fontSize: '0.9rem' }}>
                  <td style={{ padding: '16px' }}>
                    <div style={{ fontWeight: 700 }}>{item.productName}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748B' }}>
                      {item.paperType} • {item.size} {item.finishOptions?.length > 0 && `• ${item.finishOptions.join(', ')}`}
                    </div>
                  </td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>{item.quantity}</td>
                  <td style={{ padding: '16px', textAlign: 'right' }}>${item.unitPrice?.toFixed(2)}</td>
                  <td style={{ padding: '16px', textAlign: 'right', fontWeight: 700 }}>${item.totalPrice?.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Total Breakdown */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '32px' }}>
            <div style={{ width: '280px', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Subtotal:</span><span>${order.subtotal?.toFixed(2)}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Tax (8%):</span><span>${order.taxAmount?.toFixed(2)}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Freight Shipping:</span><span>${order.shippingFee?.toFixed(2)}</span></div>
              {order.discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10B981' }}><span>Discount:</span><span>-${order.discountAmount?.toFixed(2)}</span></div>
              )}
              <div style={{ borderTop: '2px solid #111111', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 800, color: '#0057D9' }}>
                <span>Grand Total:</span><span>${order.totalAmount?.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#94A3B8', borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
            Thank you for choosing PrintCraft Pro for your commercial printing needs!
          </div>
        </div>

        {/* Printable Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
          <button onClick={handlePrint} className="btn btn-primary">
            <Printer size={18} /> Download / Print PDF Invoice
          </button>
        </div>
      </div>
    </div>
  );
};
