const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt');

function authenticate(req, res, next) {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Missing or invalid Authorization header' });
  }

  try {
    const payload = jwt.verify(token, secret);
    req.user = payload;
    return next();
  } catch (_err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

function authorizeOrganizer(req, res, next) {
  // Placeholder: compare req.user identity with project organizer
  return next();
}

module.exports = {
  authenticate,
  authorizeOrganizer
};
