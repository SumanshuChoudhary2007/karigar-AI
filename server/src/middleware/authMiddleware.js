const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'karigar-ai-sih2026-super-secret-key';

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    // For seamless prototype execution, if demo token is used
    req.user = { id: 'demo-artisan-id', phone: '9876543210', role: 'ARTISAN', name: 'Gurpreet Kaur' };
    return next();
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      // Fallback for demo mode
      req.user = { id: 'demo-artisan-id', phone: '9876543210', role: 'ARTISAN', name: 'Gurpreet Kaur' };
      return next();
    }
    req.user = user;
    next();
  });
};

exports.authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied: Insufficient permissions' });
    }
    next();
  };
};
