import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { ToastContext } from '../context/ToastContext';
import { Star, ShoppingCart, ArrowRight } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { showToast } = useContext(ToastContext);

  const handleQuickAdd = () => {
    addToCart({
      productName: product.name,
      paperType: product.paperOptions?.[0]?.name || 'Standard Cardstock',
      size: product.sizeOptions?.[0]?.name || 'Standard Size',
      finishOptions: [product.finishOptions?.[0]?.name || 'Matte Finish'],
      quantity: 500,
      unitPrice: product.basePrice / 500,
      totalPrice: product.basePrice,
      artworkUrl: product.images[0]
    });
    showToast(`Added ${product.name} (500 units) to cart!`, 'success');
  };

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '10px', marginBottom: '16px', background: '#F8FAFC' }}>
        <img
          src={product.images?.[0] || 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=600&q=80'}
          alt={product.name}
          style={{ width: '100%', height: '220px', objectFit: 'cover', transition: 'transform 0.3s ease' }}
          onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
          onMouseOut={e => e.target.style.transform = 'scale(1.0)'}
        />
        {product.isFeatured && (
          <span style={{ position: 'absolute', top: '12px', left: '12px', background: '#FF6B00', color: '#FFF', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800 }}>
            FEATURED PRINT
          </span>
        )}
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#F59E0B', fontSize: '0.85rem', marginBottom: '6px' }}>
          <Star size={14} fill="#F59E0B" />
          <span style={{ fontWeight: 700 }}>{product.rating || 5.0}</span>
          <span style={{ color: '#94A3B8' }}>({product.reviewsCount || 12} reviews)</span>
        </div>

        <h3 style={{ fontSize: '1.15rem', marginBottom: '8px', color: '#111111' }}>
          <Link to={`/products/${product.slug || product._id}`} style={{ color: '#111111' }}>
            {product.name}
          </Link>
        </h3>

        <p style={{ color: '#64748B', fontSize: '0.85rem', marginBottom: '16px', flex: 1 }}>
          {product.shortDescription || product.description}
        </p>

        <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'block' }}>Starting From</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0057D9', fontFamily: 'Poppins' }}>
              ${product.basePrice?.toFixed(2)}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={handleQuickAdd} className="btn btn-secondary" style={{ padding: '8px 12px' }} title="Quick Cart">
              <ShoppingCart size={16} />
            </button>
            <Link to={`/products/${product.slug || product._id}`} className="btn btn-primary" style={{ padding: '8px 14px', fontSize: '0.85rem' }}>
              Options <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
