import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs = ({ customCrumbs = [] }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  if (pathnames.length === 0) return null;

  return (
    <div style={{ background: '#F1F5F9', borderBottom: '1px solid #E2E8F0', padding: '10px 0', fontSize: '0.85rem' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <Link to="/" style={{ color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Home size={14} /> Home
        </Link>

        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const formattedName = name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

          return (
            <React.Fragment key={index}>
              <ChevronRight size={14} color="#94A3B8" />
              {isLast ? (
                <span style={{ color: '#0057D9', fontWeight: 700 }}>{formattedName}</span>
              ) : (
                <Link to={routeTo} style={{ color: '#64748B' }}>{formattedName}</Link>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
