function sendSecurityError(res, status, code, message) {
  return res.status(status).json({
    error: {
      category: 'security',
      code,
      message
    }
  });
}

module.exports = {
  sendSecurityError
};
