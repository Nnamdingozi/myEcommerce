
import * as yup from 'yup';

export const registrationSchema = yup.object({
  id: yup
    .number()
    .integer()
    .positive()
    .notRequired(), 

  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(10, 'Username must not exceed 10 characters'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),

  phone: yup
    .string()
    .required('Phone number is required')
    .matches(/^[0-9]{10,15}$/, 'Phone number must be between 10 and 15 digits')
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must not exceed 15 digits'),

  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password must not exceed 20 characters')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),

  githubId: yup.string().nullable(),

  country_code: yup.string().required('Country code is required'),

  createdAt: yup.date().default(() => new Date()).notRequired(), 
  updatedAt: yup.date().default(() => new Date()).notRequired(), 
});

// Infer TypeScript type from the schema
export type RegistrationSchemaType = yup.InferType<typeof registrationSchema>;
