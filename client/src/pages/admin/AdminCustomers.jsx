import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AdminSidebar } from '../../components/AdminSidebar';
import { Users, Mail, Phone, Building } from 'lucide-react';

export const AdminCustomers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/admin/users').then(res => {
      if (res.data.success) setUsers(res.data.users);
    });
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 76px)', background: '#FAFAFB' }}>
      <AdminSidebar />

      <main style={{ flex: 1, padding: '32px' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Customer & Corporate Database</h1>
        <p style={{ color: '#64748B', marginBottom: '28px' }}>View active customer accounts, companies, contact phone numbers, and addresses.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {users.map((u, idx) => (
            <div key={idx} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <strong style={{ fontSize: '1.1rem', color: '#111' }}>{u.name}</strong>
                  <span className={`badge ${u.role === 'admin' ? 'badge-accepted' : 'badge-quoted'}`}>{u.role.toUpperCase()}</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '4px' }}>
                  Email: {u.email} • Phone: {u.phone || 'N/A'} • Company: {u.company || 'Individual'}
                </div>
              </div>

              <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
                Joined: {new Date(u.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
