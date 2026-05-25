const jwt = require('jsonwebtoken');
const crypto = require('crypto');

exports.generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1h'
    }
  );
};
exports.generateEmailToken = () => {
  const rawToken = crypto.randomBytes(32).toString('hex');

  const hashedToken = crypto
      .createHash('sha256')
      .update(rawToken)
      .digest('hex');

  return {rawToken, hashedToken};
};
exports.hashToken = (token) => {
  return crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
};