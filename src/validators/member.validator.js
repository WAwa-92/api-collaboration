function validateMemberPayload(payload = {}) {
  const errors = [];

  if (!payload.name || !payload.name.trim()) {
    errors.push({ path: 'name', message: 'Member name is required' });
  }

  if (!payload.role || !payload.role.trim()) {
    errors.push({ path: 'role', message: 'Member role is required' });
  }

  return errors;
}

module.exports = { validateMemberPayload };
