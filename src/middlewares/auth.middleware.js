const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt');
const store = require('../data/store');
const { sendSecurityError } = require('../utils/securityResponse');

function normalizeIdentity(value = '') {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[._-]+/g, ' ')
    .replace(/\s+/g, ' ');
}

function authenticate(req, res, next) {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return sendSecurityError(
      res,
      401,
      'AUTH_MISSING_OR_INVALID_HEADER',
      'Missing or invalid Authorization header'
    );
  }

  try {
    const payload = jwt.verify(token, secret);
    if (!payload || !payload.sub) {
      return sendSecurityError(res, 401, 'AUTH_INVALID_PAYLOAD', 'Invalid token payload');
    }

    req.user = payload;
    return next();
  } catch (_err) {
    return sendSecurityError(res, 401, 'AUTH_INVALID_OR_EXPIRED_TOKEN', 'Invalid or expired token');
  }
}

function authorizeOrganizer(req, res, next) {
  const projectId = Number(req.params.id);
  const project = store.projects.find((item) => item.id === projectId);

  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  const userIdentity = normalizeIdentity(req.user?.sub);
  const organizerIdentity = normalizeIdentity(project.organizer);

  if (!userIdentity || userIdentity !== organizerIdentity) {
    return sendSecurityError(
      res,
      403,
      'AUTH_INSUFFICIENT_RIGHTS',
      'Only organizer can perform this action'
    );
  }

  req.project = project;
  return next();
}

module.exports = {
  authenticate,
  authorizeOrganizer
};
