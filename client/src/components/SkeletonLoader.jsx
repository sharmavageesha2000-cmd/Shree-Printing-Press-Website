import React from 'react';

export const SkeletonLoader = ({ count = 3, height = '200px' }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${count}, 1fr)`, gap: '20px' }}>
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          style={{
            height,
            background: 'linear-gradient(90deg, #E2E8F0 25%, #F1F5F9 50%, #E2E8F0 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
            borderRadius: '12px'
          }}
        />
      ))}
    </div>
  );
};
