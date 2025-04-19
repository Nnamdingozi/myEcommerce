// const loginSchema = require('../validation/loginSchema');
// const registrationSchema = require('../validation/registrationSchema');

// const validate = (schema) => {
//   return async (req, res, next) => {
//     try {
//       // Validate the body data against the schema
//       await schema.validate(req.body, { abortEarly: false }); // abortEarly: false allows for multiple validation errors to be caught
//       next(); // If valid, proceed to the next middleware or route handler
//     } catch (err) {
//       // If validation fails, send a detailed error message
//       res.status(400).json({
//         message: 'Validation failed',
//         errors: err.inner.map((e) => ({
//           field: e.path,
//           message: e.message,
//         })),
//       });
//     }
//   };
// };

// module.exports = {
//   validateLogin: validate(loginSchema),
//   validateRegistration: validate(registrationSchema),
// };




import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'yup';
import {loginSchema} from '../validation/loginSchema';
import {registrationSchema} from '../validation/registrationSchema';

const validate = (schema: ObjectSchema<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate the body data against the schema
      await schema.validate(req.body, { abortEarly: false }); // abortEarly: false allows for multiple validation errors to be caught
      next(); // If valid, proceed to the next middleware or route handler
    } catch (err: any) {
      // If validation fails, send a detailed error message
      res.status(400).json({
        message: 'Validation failed',
        errors: err.inner.map((e: { path: string; message: string }) => ({
          field: e.path,
          message: e.message,
        })),
      });
    }
  };
};

export const validateLogin = validate(loginSchema);
export const validateRegistration = validate(registrationSchema);
