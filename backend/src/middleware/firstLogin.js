const { authenticate } = require('./auth');

// Middleware to check if it's user's first login
const checkFirstLogin = (req, res, next) => {
  // Skip first login check for admin users
  if (req.user.role === 'admin') {
    return next();
  }

  // For other users, check if it's their first login
  if (req.user.isFirstLogin) {
    return res.status(302).json({
      success: false,
      message: 'Password reset required',
      requiresPasswordChange: true,
      redirectUrl: `/reset-password`
    });
  }

  next();
};

module.exports = {
  checkFirstLogin
};
