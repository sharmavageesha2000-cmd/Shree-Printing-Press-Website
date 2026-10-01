// Security Middleware Module for MERN Production Deployment

const securityHeaders = (req, res, next) => {
  // Helmet-style HTTP Security Headers
  res.setHeader('X-DNS-Prefetch-Control', 'off');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Content-Security-Policy', "default-src 'self' 'unsafe-inline' 'unsafe-eval' https://images.unsplash.com https://fonts.googleapis.com https://fonts.gstatic.com");
  next();
};

// Rate Limiter Memory Map
const rateLimitMap = new Map();

const rateLimiter = (options = { windowMs: 15 * 60 * 1000, max: 100 }) => {
  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress || '127.0.0.1';
    const now = Date.now();
    
    if (!rateLimitMap.has(ip)) {
      rateLimitMap.set(ip, { count: 1, resetTime: now + options.windowMs });
      return next();
    }

    const record = rateLimitMap.get(ip);
    if (now > record.resetTime) {
      rateLimitMap.set(ip, { count: 1, resetTime: now + options.windowMs });
      return next();
    }

    record.count += 1;
    if (record.count > options.max) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests from this IP. Please try again after 15 minutes.'
      });
    }

    next();
  };
};

module.exports = { securityHeaders, rateLimiter };
