const bcrypt = require('bcryptjs');

const initialSeed = async () => {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('customer123', 10);

  const users = [
    {
      _id: 'usr_admin_01',
      name: 'Executive Admin',
      email: 'admin@printcraftpro.com',
      password: hashedPassword,
      role: 'admin',
      phone: '+1 (800) 555-PRINT',
      company: 'PrintCraft Pro HQ',
      addresses: [{
        title: 'Headquarters',
        street: '100 Industrial Parkway, Suite 400',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA',
        isDefault: true
      }]
    },
    {
      _id: 'usr_customer_01',
      name: 'Sarah Jenkins',
      email: 'customer@example.com',
      password: userPassword,
      role: 'customer',
      phone: '+1 (555) 234-5678',
      company: 'Apex Marketing Group',
      addresses: [{
        title: 'Main Office Shipping',
        street: '742 Corporate Way, Floor 5',
        city: 'Boston',
        state: 'MA',
        zipCode: '02108',
        country: 'USA',
        isDefault: true
      }, {
        title: 'Warehouse Depot',
        street: '88 Logistics Blvd, Dock 4',
        city: 'Cambridge',
        state: 'MA',
        zipCode: '02138',
        country: 'USA',
        isDefault: false
      }],
      wishlist: ['prod_01', 'prod_03', 'prod_05'],
      notifications: [
        { id: 'notif_1', title: 'Pre-Press Proof Ready', message: 'Digital proof for Order #ORD-88192 is ready for approval.', date: '2026-08-05' },
        { id: 'notif_2', title: 'Special Discount', message: 'Use code PRINT15 for 15% off your next catalog order.', date: '2026-08-04' }
      ],
      tickets: [
        { id: 'TCK-4091', subject: 'Vector artwork color profile question', status: 'open', date: '2026-08-05', priority: 'High' }
      ]
    }
  ];

  const categories = [
    { name: 'Business Cards', slug: 'business-cards', description: 'Velvet, Matte, Gloss, Raised Spot UV & Foil Stamping', image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=600&q=80' },
    { name: 'Wedding Cards', slug: 'wedding-cards', description: 'Luxury Acrylic, Deckle Edge Cotton, Gold Foil & Envelope Seals', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80' },
    { name: 'Brochures', slug: 'brochures', description: 'Tri-Fold, Z-Fold, Half-Fold & Gate-Fold Marketing Literature', image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&q=80' },
    { name: 'Flyers', slug: 'flyers', description: 'Full Color Promotional Handouts & Club Pamphlets', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80' },
    { name: 'Packaging Boxes', slug: 'packaging-boxes', description: 'Custom Corrugated E-Commerce Mailers & Product Display Boxes', image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80' },
    { name: 'Labels & Stickers', slug: 'labels-stickers', description: 'Roll Labels, Die-Cut Vinyl Stickers, Waterproof Product Decals', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80' },
    { name: 'Books & Magazines', slug: 'books-magazines', description: 'Smyth Sewn Hardcover, Perfect Bound Softcover, Spiral Notebooks', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80' },
    { name: 'Calendars', slug: 'calendars', description: 'Desk Tent Calendars, Wall Wire-O Bound Corporate Calendars', image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=600&q=80' },
    { name: 'Corporate Kits', slug: 'corporate-kits', description: 'Branded Folders, Letterheads, Envelopes, Pens & Lanyards', image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=600&q=80' }
  ];

  const products = [
    {
      _id: 'prod_01',
      name: 'Premium Velvet Soft-Touch Business Cards',
      slug: 'premium-velvet-business-cards',
      category: 'Business Cards',
      description: 'Ultra-thick 16pt cardstock with soft-touch velvet lamination. Option for Raised Spot UV & Metallic Foil accents.',
      shortDescription: '16pt Soft-Touch Velvet with Raised Spot UV & Foil accents',
      basePrice: 29.99,
      images: [
        'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80'
      ],
      paperOptions: [
        { name: '16pt Heavyweight Soft-Touch Velvet', extraCost: 0 },
        { name: '18pt Ultra Thick Silk Matte', extraCost: 8 },
        { name: '32pt Tri-Layer Premium Colored Core', extraCost: 24 }
      ],
      sizeOptions: [
        { name: 'Standard US (3.5" x 2.0")', multiplier: 1.0 },
        { name: 'Euro Square (2.5" x 2.5")', multiplier: 1.15 },
        { name: 'Slim / Mini (3.5" x 1.5")', multiplier: 0.95 }
      ],
      finishOptions: [
        { name: 'Matte Lamination', extraCost: 0 },
        { name: 'Raised Spot UV (Front & Back)', extraCost: 15 },
        { name: 'Gold Metallic Foil Stamping', extraCost: 25 }
      ],
      quantityTiers: [
        { quantity: 250, pricePerUnit: 0.12 },
        { quantity: 500, pricePerUnit: 0.08 },
        { quantity: 1000, pricePerUnit: 0.05 },
        { quantity: 2500, pricePerUnit: 0.035 }
      ],
      isFeatured: true,
      inStock: true,
      turnaroundTime: '2-3 Business Days'
    },
    {
      _id: 'prod_02',
      name: 'Tri-Fold Corporate Marketing Brochures',
      slug: 'tri-fold-corporate-marketing-brochures',
      category: 'Brochures',
      description: 'High-gloss 100lb text stock folded to perfection. Full color double-sided printing with precision scoring.',
      shortDescription: 'Full Color 100lb Gloss Text with Precision Folding',
      basePrice: 79.99,
      images: [
        'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80'
      ],
      paperOptions: [
        { name: '100lb Gloss Book / Text', extraCost: 0 },
        { name: '100lb Dull / Matte Cover', extraCost: 12 },
        { name: '70lb Uncoated Linen Stock', extraCost: 18 }
      ],
      sizeOptions: [
        { name: '8.5" x 11" Standard Tri-Fold', multiplier: 1.0 },
        { name: '8.5" x 14" Legal Z-Fold', multiplier: 1.25 },
        { name: '11" x 17" Half-Fold Tabloid', multiplier: 1.6 }
      ],
      finishOptions: [
        { name: 'High-Gloss Aqueous Coating', extraCost: 0 },
        { name: 'Matte Satin Coating', extraCost: 10 }
      ],
      quantityTiers: [
        { quantity: 500, pricePerUnit: 0.28 },
        { quantity: 1000, pricePerUnit: 0.18 },
        { quantity: 2500, pricePerUnit: 0.12 }
      ],
      isFeatured: true,
      inStock: true,
      turnaroundTime: '3-4 Business Days'
    },
    {
      _id: 'prod_03',
      name: 'Heavy-Duty Retractable Pull-Up Banner',
      slug: 'heavy-duty-retractable-pull-up-banner',
      category: 'Flyers',
      description: '13oz anti-curl blockout vinyl in an aluminum anodized retractable stand with padded carrying briefcase included.',
      shortDescription: '33" x 81" Anti-curl Vinyl with Deluxe Carrying Case',
      basePrice: 119.00,
      images: [
        'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80'
      ],
      paperOptions: [
        { name: '13oz Premium Anti-Curl Matte Film', extraCost: 0 },
        { name: '18oz Heavy Duty UV Weather-Proof Vinyl', extraCost: 20 }
      ],
      sizeOptions: [
        { name: '33" x 81" Standard Deluxe Stand', multiplier: 1.0 },
        { name: '48" x 81" Wide Trade Show Banner', multiplier: 1.45 }
      ],
      finishOptions: [
        { name: 'Satin Anti-Glare Finish', extraCost: 0 }
      ],
      quantityTiers: [
        { quantity: 1, pricePerUnit: 119.00 },
        { quantity: 3, pricePerUnit: 105.00 },
        { quantity: 5, pricePerUnit: 95.00 }
      ],
      isFeatured: true,
      inStock: true,
      turnaroundTime: '24-48 Hours'
    },
    {
      _id: 'prod_04',
      name: 'Custom Printed Corrugated E-Commerce Mailer Boxes',
      slug: 'custom-printed-corrugated-mailer-boxes',
      category: 'Packaging Boxes',
      description: 'E-flute corrugated cardboard boxes printed inside and out with eco-friendly inks. Perfect for subscription boxes.',
      shortDescription: 'Full Color Exterior & Interior Eco Mailer Boxes',
      basePrice: 149.00,
      images: [
        'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80'
      ],
      paperOptions: [
        { name: 'Kraft Eco Natural Corrugated Board', extraCost: 0 },
        { name: 'White Gloss Laminated Cardboard', extraCost: 15 }
      ],
      sizeOptions: [
        { name: 'Medium (9" x 6" x 3")', multiplier: 1.0 },
        { name: 'Large (12" x 9" x 4")', multiplier: 1.35 }
      ],
      finishOptions: [
        { name: 'Matte Finish Protection', extraCost: 0 },
        { name: 'Gloss Varnish Coating', extraCost: 10 }
      ],
      quantityTiers: [
        { quantity: 50, pricePerUnit: 2.98 },
        { quantity: 100, pricePerUnit: 2.20 },
        { quantity: 250, pricePerUnit: 1.75 }
      ],
      isFeatured: true,
      inStock: true,
      turnaroundTime: '5-7 Business Days'
    },
    {
      _id: 'prod_05',
      name: 'Luxury Acrylic Gold Foil Wedding Invitation Suite',
      slug: 'luxury-acrylic-gold-foil-wedding-invitations',
      category: 'Wedding Cards',
      description: '3mm thick crystal clear acrylic invitation cards laser etched and foil stamped with metallic gold, velvet lined envelopes.',
      shortDescription: '3mm Crystal Acrylic with Metallic Foil & Wax Seals',
      basePrice: 199.00,
      images: [
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'
      ],
      paperOptions: [
        { name: '3mm Clear Polished Acrylic Sheet', extraCost: 0 },
        { name: '300 GSM Deckle Edge Handmade Cotton Paper', extraCost: -20 }
      ],
      sizeOptions: [
        { name: '5" x 7" Classic Royal Size', multiplier: 1.0 }
      ],
      finishOptions: [
        { name: 'Real Hot Gold Foil Stamping', extraCost: 0 },
        { name: 'Rose Gold Foil Accent', extraCost: 10 }
      ],
      quantityTiers: [
        { quantity: 50, pricePerUnit: 3.98 },
        { quantity: 100, pricePerUnit: 2.95 },
        { quantity: 200, pricePerUnit: 2.30 }
      ],
      isFeatured: false,
      inStock: true,
      turnaroundTime: '4-6 Business Days'
    }
  ];

  const services = [
    {
      _id: 'srv_01',
      title: 'High-Precision Offset Printing',
      slug: 'offset-printing',
      icon: 'Printer',
      shortDesc: 'State-of-the-art Heidelberg 6-color presses engineered for high-volume corporate runs with unmatched Pantone color accuracy.',
      fullDesc: 'When image fidelity and bulk cost-efficiency are crucial, our German-engineered Heidelberg offset press line delivers flawless consistency across thousands of impressions.',
      features: ['Heidelberg 6-Color Technology', 'Exact Spot Pantone Color Match', 'Cost Efficient Bulk Scaling', 'Coated & Specialty Substrates'],
      image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80',
      startingPrice: 199.00,
      turnaround: '2-4 Days'
    },
    {
      _id: 'srv_02',
      title: 'Digital Express Short-Run',
      slug: 'digital-printing',
      icon: 'Zap',
      shortDesc: 'Same-day and next-day turnaround for urgent corporate presentations, menus, pitch decks, and event literature.',
      fullDesc: 'Need prints in a hurry? Our HP Indigo liquid electrophotography printers match offset quality with zero plate setup time, offering instant turnarounds.',
      features: ['Same-Day Express Production', 'Variable Data Personalization', 'Zero Minimum Quantity Requirements', 'Vibrant Synthetic Media Support'],
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
      startingPrice: 39.99,
      turnaround: '24 Hours'
    },
    {
      _id: 'srv_03',
      title: 'Custom Packaging & Die-Cutting',
      slug: 'packaging-printing',
      icon: 'Box',
      shortDesc: 'Custom structural CAD packaging design, foil embossing, spot UV, window patching, and automated die-cutting.',
      fullDesc: 'Transform product unboxing experiences with custom engineered boxes, foil finishes, embossing, and automated folding-gluing lines.',
      features: ['3D Structural Prototyping', 'Custom Steel Rule Die Cutting', 'Hot Foil & Embossing', 'Eco-Friendly FSC Certified Board'],
      image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
      startingPrice: 299.00,
      turnaround: '5-7 Days'
    },
    {
      _id: 'srv_04',
      title: 'Large Format Flex & Banner Printing',
      slug: 'flex-banner-printing',
      icon: 'Image',
      shortDesc: 'UV weather-proof vinyl banners, billboards, trade show pull-up stands, and mesh outdoor building wraps.',
      fullDesc: 'Command attention with ultra-wide 126-inch eco-solvent and UV flatbed printing machines capable of rendering vibrant outdoor signage.',
      features: ['126" Wide Direct Flatbed Inkjet', 'Heavy Duty 18oz Blockout Vinyl', 'Welded Hemming & Brass Grommets', 'Fade Resistant 5-Year Outdoor Ink'],
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
      startingPrice: 89.00,
      turnaround: '24-48 Hours'
    }
  ];

  const quotes = [
    {
      _id: 'qt_1001',
      quoteId: 'QT-94812',
      guestInfo: {
        name: 'David Vance',
        email: 'dvance@vancetech.io',
        phone: '+1 (555) 902-3311',
        company: 'Vance Technologies'
      },
      jobTitle: 'Custom Hardcover Product Catalog (200 Pages)',
      quantity: 1500,
      paperType: '100lb Gloss Text Interior / 120lb Cover',
      size: '8.5" x 11" Oversized',
      finishOptions: ['Matte Soft Touch Cover', 'Gold Foil Embossed Logo', 'Smyth Sewn Binding'],
      artworkFile: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      notes: 'Please include freight shipping estimate to Chicago warehouse.',
      status: 'quoted',
      quotedPrice: 3450.00,
      adminNotes: 'Price includes freight shipping with liftgate delivery.',
      validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    }
  ];

  const orders = [
    {
      _id: 'ord_1001',
      orderId: 'ORD-88192',
      user: 'usr_customer_01',
      items: [
        {
          productName: 'Premium Velvet Business Cards',
          paperType: '16pt Heavyweight Soft-Touch Velvet',
          size: 'Standard US (3.5" x 2.0")',
          finishOptions: ['Raised Spot UV (Front & Back)'],
          quantity: 1000,
          unitPrice: 0.08,
          totalPrice: 80.00,
          artworkUrl: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80'
        }
      ],
      shippingAddress: {
        street: '742 Corporate Way',
        city: 'Boston',
        state: 'MA',
        zipCode: '02108',
        country: 'USA'
      },
      billingAddress: {
        street: '742 Corporate Way',
        city: 'Boston',
        state: 'MA',
        zipCode: '02108',
        country: 'USA'
      },
      paymentMethod: 'Credit Card (Visa ending in 4242)',
      paymentStatus: 'paid',
      orderStatus: 'artwork_pending',
      artworkProofUrl: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80',
      artworkApprovalStatus: 'pending',
      artworkFeedback: '',
      subtotal: 80.00,
      taxAmount: 6.40,
      shippingFee: 12.00,
      discountAmount: 0,
      totalAmount: 98.40,
      trackingNumber: 'TRK-992014812US',
      estimatedDelivery: 'August 12, 2026',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    }
  ];

  const portfolios = [
    {
      _id: 'port_01',
      title: 'Luxury Watch Rigid Magnetic Box & Foil Stamping',
      client: 'Chronos Geneve',
      category: 'Packaging',
      description: 'Custom rigid magnetic closure gift box with rose gold foil stamping, high-density velvet foam inserts.',
      image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
      specs: '1200gsm Chipboard, Rose Gold Foil, Custom Die Cut Foam',
      featured: true
    },
    {
      _id: 'port_02',
      title: 'Architectural Monograph Hardcover Layflat Book',
      client: 'Foster & Partners NYC',
      category: 'Corporate',
      description: 'Oversized 11x14 inch Smyth-sewn hardcover book with layflat binding and spot UV architectural grid patterns.',
      image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80',
      specs: '150 GSM Silk Text, 240 Pages, Cloth Hardcover Spine',
      featured: true
    },
    {
      _id: 'port_03',
      title: 'Royal Regal Gold Foil Laser Acrylic Wedding Suite',
      client: 'Kensington Estate Wedding',
      category: 'Wedding',
      description: '3mm frosted laser-etched acrylic wedding invitation set with wax seals and custom envelopes.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      specs: '3mm Frosted Acrylic, 24k Gold Metallic Foil, Custom Envelope Seals',
      featured: true
    }
  ];

  const blogs = [
    {
      _id: 'blog_01',
      title: 'RGB vs CMYK: How to Prepare Artwork Files for Perfect Print Color',
      slug: 'rgb-vs-cmyk-prepare-artwork-for-print',
      author: 'Master Printer Marcus Vance',
      category: 'Printing Tips',
      excerpt: 'Avoid muddy colors and dark prints by mastering color space conversion, embedded ICC profiles, and rich black builds before submitting artwork.',
      content: 'When designing graphics on digital monitors, screens operate using the RGB (Red, Green, Blue) light model. However, commercial printing presses rely strictly on CMYK (Cyan, Magenta, Yellow, Key Black) ink pigments. Converting your artwork to CMYK early in your design process ensures accurate color reproduction and prevents unwanted color shifts.',
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
      tags: ['CMYK', 'Prepress', 'Graphic Design', 'Color Matching'],
      readTime: '6 min read'
    },
    {
      _id: 'blog_02',
      title: 'Paper Weight Guide: GSM vs Pt vs Bond Explained Simply',
      slug: 'paper-weight-guide-gsm-pt-bond-explained',
      author: 'Elena Rostova',
      category: 'Paper Guide',
      excerpt: 'Confused by 300 GSM, 16pt, and 80lb text? Learn how paper weight measurements work and select the ideal cardstock for your next project.',
      content: 'Choosing the right paper weight directly influences tactile impression, durability, and postage rates. Here is a clear reference guide comparing GSM (Grams per Square Meter), points (pt), and pounds (lb).',
      image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80',
      tags: ['Paper Stock', 'GSM', 'Print Materials', 'Business Cards'],
      readTime: '4 min read'
    }
  ];

  const reviews = [
    {
      _id: 'rev_01',
      userName: 'Jonathan Pierce',
      userCompany: 'Nexus Financial Group',
      productName: 'Premium Velvet Business Cards',
      rating: 5,
      comment: 'The soft-touch velvet feel with gold foil accents exceeded our corporate expectations. Delivery was 2 days ahead of schedule!',
      isApproved: true
    },
    {
      _id: 'rev_02',
      userName: 'Elena Rostova',
      userCompany: 'Studio Artiste',
      productName: 'Heavy-Duty Retractable Pull-Up Banner',
      rating: 5,
      comment: 'Vibrant colors, zero glare, and sturdy stand mechanism. Stole the spotlight at our trade show exhibit in Las Vegas.',
      isApproved: true
    }
  ];

  const coupons = [
    {
      _id: 'cpn_01',
      code: 'PRINT15',
      discountType: 'percentage',
      discountValue: 15,
      minPurchase: 50,
      isActive: true,
      expiryDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
    },
    {
      _id: 'cpn_02',
      code: 'WELCOME50',
      discountType: 'fixed',
      discountValue: 50,
      minPurchase: 200,
      isActive: true,
      expiryDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
    }
  ];

  return { users, categories, products, services, quotes, orders, portfolios, blogs, reviews, coupons };
};

module.exports = { initialSeed };
