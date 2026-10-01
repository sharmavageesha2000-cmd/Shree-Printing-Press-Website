import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Clock, User, ArrowRight } from 'lucide-react';

export const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get('/api/blogs').then(res => {
      if (res.data.success) setBlogs(res.data.blogs);
    });
  }, []);

  return (
    <div style={{ padding: '60px 0' }}>
      <div className="container">
        <div className="section-title">
          <span>PRE-PRESS & DESIGN KNOWLEDGE</span>
          <h2>Printing Press Articles & Technical Guides</h2>
          <p>Learn color theory, bleed setup, paper GSM selection, and packaging design best practices.</p>
        </div>

        <div className="grid-2" style={{ gap: '32px' }}>
          {blogs.map((b, i) => (
            <div key={i} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <img src={b.image} alt={b.title} style={{ width: '100%', height: '260px', objectFit: 'cover' }} />
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', gap: '16px', color: '#64748B', fontSize: '0.8rem', marginBottom: '12px' }}>
                  <span><User size={14} color="#0057D9" inline /> {b.author}</span>
                  <span><Clock size={14} color="#FF6B00" inline /> {b.readTime}</span>
                </div>
                <h3 style={{ fontSize: '1.35rem', marginBottom: '10px' }}>
                  <Link to={`/blog/${b.slug}`} style={{ color: '#111' }}>{b.title}</Link>
                </h3>
                <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '20px' }}>{b.excerpt}</p>
                <Link to={`/blog/${b.slug}`} className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                  Read Article <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
