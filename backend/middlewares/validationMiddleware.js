const loginSchema = require('../validation/loginSchema');
const registrationSchema = require('../validation/registrationSchema');

const validate = (schema) => {
  return async (req, res, next) => {
    try {
      // Validate the body data against the schema
      await schema.validate(req.body, { abortEarly: false }); // abortEarly: false allows for multiple validation errors to be caught
      next(); // If valid, proceed to the next middleware or route handler
    } catch (err) {
      // If validation fails, send a detailed error message
      res.status(400).json({
        message: 'Validation failed',
        errors: err.inner.map((e) => ({
          field: e.path,
          message: e.message,
        })),
      });
    }
  };
};

module.exports = {
  validateLogin: validate(loginSchema),
  validateRegistration: validate(registrationSchema),
};
