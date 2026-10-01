import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ServiceCard } from '../components/ServiceCard';

export const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get('/api/services').then(res => {
      if (res.data.success) setServices(res.data.services);
    });
  }, []);

  return (
    <div style={{ padding: '60px 0' }}>
      <div className="container">
        <div className="section-title">
          <span>COMMERCIAL PRESS CAPABILITIES</span>
          <h2>Our Printing Press Services</h2>
          <p>Explore our high-precision Heidelberg offset, digital express, short run, and packaging die-cutting services.</p>
        </div>

        <div className="grid-3">
          {services.map((srv, i) => (
            <ServiceCard key={i} service={srv} />
          ))}
        </div>
      </div>
    </div>
  );
};
