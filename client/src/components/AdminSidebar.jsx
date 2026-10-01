import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, FileSpreadsheet, Package, Printer, Image, FileText, Star, Ticket, Users, Mail, Settings } from 'lucide-react';

export const AdminSidebar = () => {
  const links = [
    { to: '/admin', label: 'Executive Summary', icon: <LayoutDashboard size={18} />, end: true },
    { to: '/admin/orders', label: 'Orders & Prepress Proofs', icon: <ShoppingBag size={18} /> },
    { to: '/admin/quotes', label: 'Quotation Pricing Desk', icon: <FileSpreadsheet size={18} /> },
    { to: '/admin/products', label: 'Print Products Catalog', icon: <Package size={18} /> },
    { to: '/admin/services', label: 'Printing Press Services', icon: <Printer size={18} /> },
    { to: '/admin/portfolio', label: 'Portfolio & Case Studies', icon: <Image size={18} /> },
    { to: '/admin/blogs', label: 'Blog & Prepress CMS', icon: <FileText size={18} /> },
    { to: '/admin/reviews', label: 'Customer Reviews', icon: <Star size={18} /> },
    { to: '/admin/coupons', label: 'Discount Coupons', icon: <Ticket size={18} /> },
    { to: '/admin/customers', label: 'Customer Database', icon: <Users size={18} /> }
  ];

  return (
    <aside style={{
      width: '260px',
      background: '#111111',
      color: '#FFFFFF',
      minHeight: 'calc(100vh - 76px)',
      padding: '24px 16px',
      borderRight: '1px solid #222222'
    }}>
      <div style={{ padding: '0 12px 16px 12px', borderBottom: '1px solid #222222', marginBottom: '20px' }}>
        <h4 style={{ color: '#FF6B00', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>ADMINISTRATION SUITE</h4>
        <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1.1rem' }}>PrintCraft Command</div>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {links.map((link, idx) => (
          <NavLink
            key={idx}
            to={link.to}
            end={link.end}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 14px',
              borderRadius: '8px',
              color: isActive ? '#FFFFFF' : '#94A3B8',
              background: isActive ? '#0057D9' : 'transparent',
              fontWeight: isActive ? 700 : 500,
              fontSize: '0.9rem',
              transition: 'all 0.2s ease'
            })}
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
