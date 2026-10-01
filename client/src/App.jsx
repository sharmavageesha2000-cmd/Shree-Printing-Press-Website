import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Breadcrumbs } from './components/Breadcrumbs';
import { WhatsAppButton } from './components/WhatsAppButton';

// Public Pages
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { ServiceDetail } from './pages/ServiceDetail';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { CustomQuote } from './pages/CustomQuote';
import { TrackQuote } from './pages/TrackQuote';
import { Portfolio } from './pages/Portfolio';
import { Gallery } from './pages/Gallery';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Blog } from './pages/Blog';
import { BlogDetail } from './pages/BlogDetail';
import { Compare } from './pages/Compare';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { NotFound } from './pages/NotFound';
import { ServerError } from './pages/ServerError';

// Customer Portal Pages
import { CustomerDashboard } from './pages/customer/CustomerDashboard';
import { CustomerOrders } from './pages/customer/CustomerOrders';

// Admin Portal Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminOrders } from './pages/admin/AdminOrders';
import { AdminQuotes } from './pages/admin/AdminQuotes';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminCoupons } from './pages/admin/AdminCoupons';
import { AdminCustomers } from './pages/admin/AdminCustomers';

export const App = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Breadcrumbs />

      <div style={{ flex: 1 }}>
        <Routes>
          {/* Public Visitor Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/custom-quote" element={<CustomQuote />} />
          <Route path="/track-quote" element={<TrackQuote />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />

          {/* Customer Portal */}
          <Route path="/customer" element={<CustomerDashboard />} />
          <Route path="/customer/orders" element={<CustomerOrders />} />

          {/* Admin Portal */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/quotes" element={<AdminQuotes />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/coupons" element={<AdminCoupons />} />
          <Route path="/admin/customers" element={<AdminCustomers />} />

          {/* Fallback Error Pages */}
          <Route path="/500" element={<ServerError />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <WhatsAppButton />
      <Footer />
    </div>
  );
};

export default App;
