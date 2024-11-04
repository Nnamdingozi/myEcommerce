// middlewares/auth.js
module.exports.ensureAuthenticated = (req, res, next) => {
   console.log('checking authentication....')
  console.log('user session:', req.user)
    if (req.isAuthenticated()) {
      console.log('user is  authenticated')
      return next();
    }
    res.status(401).json({ error: 'Please log in to continue' });
  };
  