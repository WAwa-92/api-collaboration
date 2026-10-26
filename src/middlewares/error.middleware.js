function errorMiddleware(err, _req, res, _next) {
  if (err && err.message === 'Only valid PDF files are allowed') {
    return res.status(415).json({ message: err.message });
  }

  const status = err.status || 500;
  return res.status(status).json({
    message: err.message || 'Internal server error',
    errors: err.details || undefined
  });
}

module.exports = errorMiddleware;
