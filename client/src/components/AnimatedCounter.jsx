import React, { useState, useEffect } from 'react';

export const AnimatedCounter = ({ end, prefix = '', suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return (
    <span style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'Poppins', color: '#FFFFFF' }}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};
