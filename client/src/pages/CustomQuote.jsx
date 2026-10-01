import React from 'react';
import { QuoteCalculator } from '../components/QuoteCalculator';

export const CustomQuote = () => {
  return (
    <div style={{ padding: '60px 0', background: '#FAFAFB' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <div className="section-title">
          <span>CUSTOM PRINTING ESTIMATOR</span>
          <h2>Request a Tailored Print & Packaging Quote</h2>
          <p>Have custom specs, non-standard die-cuts, special inks, or large volume press runs? Fill out your parameters below.</p>
        </div>

        <QuoteCalculator />
      </div>
    </div>
  );
};
