import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AdminSidebar } from '../../components/AdminSidebar';
import { DollarSign, ShoppingBag, FileSpreadsheet, Users, TrendingUp, Printer } from 'lucide-react';

export const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get('/api/admin/analytics');
      if (res.data.success) setAnalytics(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!analytics) return <div style={{ padding: '80px', textAlign: 'center' }}>Loading Admin Analytics...</div>;

  const { stats, revenueByMonth, recentOrders } = analytics;

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 76px)', background: '#FAFAFB' }}>
      <AdminSidebar />

      <main style={{ flex: 1, padding: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', color: '#111' }}>Executive Print Facility Summary</h1>
            <p style={{ color: '#64748B', fontSize: '0.9rem' }}>Real-time overview of revenue, prepress queues, quotes, and order fulfillment.</p>
          </div>
          <div style={{ background: '#D1FAE5', color: '#065F46', padding: '8px 16px', borderRadius: '20px', fontWeight: 700, fontSize: '0.85rem' }}>
            🟢 SYSTEM ONLINE & PRINT PRESS QUEUE ACTIVE
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid-4" style={{ gap: '20px', marginBottom: '32px' }}>
          <div className="card" style={{ borderLeft: '4px solid #0057D9' }}>
            <div style={{ color: '#64748B', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Gross Revenue</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0057D9', fontFamily: 'Poppins', margin: '4px 0' }}>
              ${stats.totalRevenue?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div style={{ color: '#10B981', fontSize: '0.75rem', fontWeight: 700 }}>+18.4% vs last month</div>
          </div>

          <div className="card" style={{ borderLeft: '4px solid #FF6B00' }}>
            <div style={{ color: '#64748B', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Active Orders</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FF6B00', fontFamily: 'Poppins', margin: '4px 0' }}>
              {stats.activeOrders}
            </div>
            <div style={{ color: '#64748B', fontSize: '0.75rem' }}>In pre-press & production</div>
          </div>

          <div className="card" style={{ borderLeft: '4px solid #F59E0B' }}>
            <div style={{ color: '#64748B', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Pending Quotations</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#F59E0B', fontFamily: 'Poppins', margin: '4px 0' }}>
              {stats.pendingQuotes}
            </div>
            <div style={{ color: '#64748B', fontSize: '0.75rem' }}>Requires price calculation</div>
          </div>

          <div className="card" style={{ borderLeft: '4px solid #10B981' }}>
            <div style={{ color: '#64748B', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Total Customers</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10B981', fontFamily: 'Poppins', margin: '4px 0' }}>
              {stats.totalCustomers}
            </div>
            <div style={{ color: '#64748B', fontSize: '0.75rem' }}>Active corporate accounts</div>
          </div>
        </div>

        {/* Revenue Distribution */}
        <div className="grid-2" style={{ gap: '24px', marginBottom: '32px' }}>
          <div className="card">
            <h3 style={{ fontSize: '1.15rem', marginBottom: '16px' }}>Monthly Gross Revenue Breakdown ($)</h3>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '180px', paddingTop: '20px' }}>
              {revenueByMonth?.map((m, idx) => (
                <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                  <div
                    style={{
                      width: '100%',
                      background: idx === revenueByMonth.length - 1 ? '#FF6B00' : '#0057D9',
                      borderRadius: '6px 6px 0 0',
                      height: `${(m.revenue / 45000) * 100}%`,
                      transition: 'height 0.5s ease'
                    }}
                    title={`$${m.revenue.toLocaleString()}`}
                  />
                  <span style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '6px', fontWeight: 600 }}>{m.month}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '1.15rem', marginBottom: '16px' }}>Recent Order Submissions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recentOrders?.map((ord, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: '#F8FAFC', borderRadius: '8px', fontSize: '0.85rem' }}>
                  <div>
                    <strong style={{ color: '#0057D9' }}>{ord.orderId}</strong>
                    <div style={{ color: '#64748B' }}>{ord.items?.[0]?.productName}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className={`badge badge-${ord.orderStatus}`}>{ord.orderStatus}</span>
                    <div style={{ fontWeight: 700, marginTop: '2px' }}>${ord.totalAmount?.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
