function validateProjectPayload(payload = {}) {
  const errors = [];

  if (!payload.name || !payload.name.trim()) {
    errors.push({ path: 'name', message: 'Project name is required' });
  }

  if (!payload.organizer || !payload.organizer.trim()) {
    errors.push({ path: 'organizer', message: 'Organizer is required' });
  }

  return errors;
}

module.exports = { validateProjectPayload };
