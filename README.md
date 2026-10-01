# PrintCraft Pro - Shree Printing Press Business Web Application

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/sharmavageesha2000-cmd/Shree-Printing-Press-Website)

A full-stack, scalable, responsive, SEO-friendly **Commercial Printing Press Web Application** built with modern HTML5, Tailwind CSS, JavaScript, React + Vite, and Node.js.

Designed for high-end corporate printing press facilities, commercial paper houses, custom packaging manufacturers, and digital quick-print centers.

---

## 🚀 Key Modules & System Architecture

```
                                +---------------------------+
                                |  PrintCraft Pro Frontend  |
                                |   (React 18 + Vite SPA)   |
                                +-------------+-------------+
                                              |
                                     REST APIs / JWT
                                              |
                                +-------------v-------------+
                                |   Node.js + Express API   |
                                | (Rate Limiter & Security) |
                                +-------------+-------------+
                                              |
                               +--------------v--------------+
                               |  MongoDB / Mongoose Models  |
                               | (Hybrid Memory Fallback)   |
                               +-----------------------------+
```

### 1. Visitor Interface
- **Modern Hero Section**: Animated hero banner, live counters (25,000+ Jobs Delivered, 99.8% Pantone Accuracy, 24h Rush Turnaround), and dual CTA.
- **Dynamic Spec & Price Calculator**: Multi-parameter real-time price estimator allowing visitors to select:
  - *Printing Type* (Offset, Digital, Flex, Packaging)
  - *Paper Dimensions & Size* (Business Card 3.5"x2", A4, A5, 8.5"x11", 11"x17", Banner 33"x81")
  - *Paper Quality & GSM* (300 GSM Velvet Soft-Touch, 350 GSM Silk Matte, 100lb Gloss, 32pt Tri-Layer)
  - *Color Profile* (Full Color CMYK 4/4, Single Color Black, Spot Pantone)
  - *Sides* (Single / Double Sided)
  - *Binding* (Saddle Stitch, Perfect Bound, Hardcover, Spiral Wire-O, None)
  - *Finishing & Accents* (Matte Soft-Touch, Raised Spot UV, Gold Metallic Foil, Silver Foil, Embossing, Die-Cut)
  - *Quantity & Delivery Speed* (Standard 3-5 Days, Express 48h, Rush 24h)
  - *Artwork Upload*: Multi-format file attachment (.pdf, .ai, .psd, .png).
- **Public Quotation Tracking (`/track-quote`)**: Visitors can track their requested quotation status using a 7-character Quote ID (e.g. `QT-94812`).
- **Products & Printing Services Catalog**: Full grid display with filtering, paper specification selector, tier pricing, and instant add-to-cart.
- **Facility & Lightbox Gallery (`/gallery`)**: Lightbox photo gallery filterable by Factory, Office, Machines, Products, Events, Team, and Delivered Customer Work.
- **Company Story & Manufacturing Journey (`/about`)**: Detailed story, mission, vision, values, interactive 1998-2026 timeline, 6-step manufacturing process, Heidelberg & HP Indigo machinery showcase, ISO/FSC certificates, and leadership team grid.
- **SEO Blog & Pre-Press Guides (`/blog`)**: Articles on RGB vs CMYK color conversion, paper weight GSM, and packaging design.
- **Contact & Inquiry Desk (`/contact`)**: Google Maps embed, phone, email, WhatsApp link, operational hours, and contact form.
- **Product Comparison (`/compare`)**: Side-by-side technical specification matrix.

### 2. Customer Portal (`/customer`)
- **Order Management & Timeline Stepper (`/customer/orders`)**: Visual step indicator showing live job progression:
  `Order Placed -> Artwork Pending -> Proof Approved -> In Production -> Dispatched -> Delivered`.
- **Pre-Press Digital Proof Sign-Off Tool**: Zoomable prepress proof viewer with bleed lines, trim margins, electronic sign-off (*"Approve Artwork & Print Now"*), and *"Request Revisions"* feedback modal.
- **Formatted Printable Invoice Modal**: Tax ID, itemized specs breakdown, 8% tax calculation, freight fee, discount codes, and print/download button.
- **Saved Address Book, Wishlist, Support Tickets & Product Reviews**.

### 3. Complete Admin Dashboard Suite (`/admin`)
- **Executive Analytics Overview**: Live metrics for Gross Revenue ($), Active Orders, Pending Quotations, Customer Counts, and Monthly Revenue Charts.
- **Order Management Desk (`/admin/orders`)**: Change production stages, upload pre-press digital proof URLs, and assign carrier tracking numbers.
- **Quotation Pricing Desk (`/admin/quotes`)**: Review incoming user custom quote requests, calculate per-unit ink/paper costs, and set formal pricing estimates.
- **Products Catalog Manager (`/admin/products`)**: CRUD interface for print products, paper options, and price tiers.
- **Promotional Coupons Engine (`/admin/coupons`)**: Create discount codes (% off or fixed dollar amount) with minimum purchase rules.
- **Customer Database (`/admin/customers`)**: Manage corporate customer accounts, company details, and phone numbers.

---

## 📁 Repository Directory Structure

```
printing-press-website/
├── client/                     # React + Vite Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/         # Navbar, Footer, Hero, QuoteCalculator, ArtworkProofModal, InvoiceModal, Breadcrumbs, WhatsAppButton, SkeletonLoader
│   │   ├── context/            # AuthContext, CartContext, ToastContext
│   │   ├── pages/              # Home, About, Services, Products, CustomQuote, TrackQuote, Gallery, Portfolio, Blog, Compare, Contact, Login, Register, Cart, Checkout, NotFound, ServerError
│   │   ├── pages/customer/     # CustomerDashboard, CustomerOrders
│   │   ├── pages/admin/        # AdminDashboard, AdminOrders, AdminQuotes, AdminProducts, AdminCoupons, AdminCustomers
│   │   ├── styles/             # Global CSS Design Tokens & Layout rules
│   │   ├── App.jsx             # React Router DOM v6 Routes
│   │   └── main.jsx            # Entry point
│   ├── package.json
│   └── vite.config.js
├── server/                     # Node.js + Express Backend
│   ├── config/                 # Database Connection & Fallback Store
│   ├── controllers/            # Auth, Product, Service, Quote, Order, Portfolio, Blog, Review, Coupon, Contact, Admin Controllers
│   ├── middleware/             # Auth JWT, Upload Multer, Error Handler, Security Headers & Rate Limiter
│   ├── models/                 # Mongoose Models (User, Product, Service, Quote, Order, Portfolio, Blog, Review, Coupon, Contact, Setting, GalleryItem)
│   ├── routes/                 # Express API Router Modules
│   ├── utils/                  # Seed dataset & Email/Invoice Utilities
│   ├── package.json
│   └── server.js
└── README.md
```

---

## 🛠️ Environment Setup & Quickstart

### Prerequisites
- Node.js (v18+)
- npm (v9+)
- MongoDB (Optional: The backend has an automatic hybrid memory database fallback if a local/remote MongoDB instance is not connected).

### Step 1: Install Backend & Start Server
```bash
cd server
npm install
node server.js
```
> Express Server will start on `http://localhost:5000`

### Step 2: Install Frontend & Start Vite Server
```bash
cd ../client
npm install
npm run dev
```
> Vite Development Server will start on `http://localhost:3000`

---

## 🔑 Demo Access Credentials

| Role | Email | Password | Access Rights |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@printcraftpro.com` | `admin123` | Full Executive Admin Dashboard Suite (`/admin`) |
| **Customer** | `customer@example.com` | `customer123` | Customer Portal, Pre-Press Proofs, Orders & Invoices (`/customer`) |

---

## 🌐 Production Deployment Guide

### Deploying Frontend to Vercel / Netlify
1. Set Build Command: `npm run build` inside `client/`.
2. Set Output Directory: `dist`.
3. Add Environment Variable: `VITE_API_URL=https://your-backend-api.com`.

### Deploying Backend to Render / AWS / Heroku
1. Add environment variables:
   - `PORT=5000`
   - `MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/printcraft`
   - `JWT_SECRET=your_super_secret_jwt_key_2026`
2. Start Command: `node server.js`.
