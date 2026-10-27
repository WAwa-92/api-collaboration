const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt');
const store = require('../data/store');

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
    return res.status(401).json({ message: 'Missing or invalid Authorization header' });
  }

  try {
    const payload = jwt.verify(token, secret);
    if (!payload || !payload.sub) {
      return res.status(401).json({ message: 'Invalid token payload' });
    }

    req.user = payload;
    return next();
  } catch (_err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
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
    return res.status(403).json({ message: 'Only organizer can perform this action' });
  }

  req.project = project;
  return next();
}

module.exports = {
  authenticate,
  authorizeOrganizer
};
