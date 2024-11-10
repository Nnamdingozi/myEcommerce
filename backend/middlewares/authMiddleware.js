
  
  module.exports.ensureAuthenticated = (req, res, next) => {
    console.log('Checking authentication...');
    console.log('Session data:', req.session);
    console.log('User session:', req.user);
  
    if (req.isAuthenticated()) {
      console.log('User is authenticated');
      return next();
    }
  
    console.log('User not authenticated');
    res.status(401).json({ error: 'Please log in to continue' });
  };
  