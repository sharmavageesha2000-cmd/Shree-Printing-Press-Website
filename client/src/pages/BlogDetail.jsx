import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Clock, User, Tag } from 'lucide-react';

export const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`/api/blogs/${slug}`).then(res => {
      if (res.data.success) setBlog(res.data.blog);
    });
  }, [slug]);

  if (!blog) return <div style={{ padding: '80px', textAlign: 'center' }}>Loading Article...</div>;

  return (
    <div style={{ padding: '60px 0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#0057D9', marginBottom: '24px', fontWeight: 600 }}>
          <ArrowLeft size={16} /> Back to Articles
        </Link>

        <span style={{ color: '#FF6B00', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase' }}>{blog.category}</span>
        <h1 style={{ fontSize: '2.5rem', marginTop: '6px', marginBottom: '16px' }}>{blog.title}</h1>

        <div style={{ display: 'flex', gap: '20px', color: '#64748B', fontSize: '0.9rem', marginBottom: '24px', borderBottom: '1px solid #E2E8F0', paddingBottom: '16px' }}>
          <span>Author: <strong>{blog.author}</strong></span>
          <span>Read Time: <strong>{blog.readTime}</strong></span>
          <span>Published: <strong>{new Date(blog.createdAt).toLocaleDateString()}</strong></span>
        </div>

        <img src={blog.image} alt={blog.title} style={{ width: '100%', borderRadius: '16px', marginBottom: '32px' }} />

        <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#334155', marginBottom: '32px' }}>
          <p style={{ marginBottom: '20px' }}>{blog.excerpt}</p>
          <p>{blog.content}</p>
        </div>

        {blog.tags?.length > 0 && (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Tag size={16} color="#0057D9" />
            {blog.tags.map((t, i) => (
              <span key={i} style={{ background: '#F0F7FF', color: '#0057D9', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>
                #{t}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
