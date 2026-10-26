const jwt = require('jsonwebtoken');
const { secret, expiresIn } = require('../config/jwt');

function login(req, res) {
  const { username } = req.body || {};

  if (!username) {
    return res.status(400).json({ message: 'username is required' });
  }

  const token = jwt.sign({ sub: username }, secret, { expiresIn });
  return res.status(200).json({ token });
}

module.exports = { login };
