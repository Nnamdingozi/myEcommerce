"use strict";
// const yup = require('yup');
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrationSchema = void 0;
// const registrationSchema = yup.object({
//   id: yup
//     .number()
//     .integer()
//     .positive()
//     .notRequired(), // Auto-incremented; not required for validation during creation
//   username: yup
//     .string()
//     .required('Username is required')
//     .min(3, 'Username must be at least 3 characters')
//     .max(10, 'Username must not exceed 10 characters'), // Adjusted max length to 10
//   email: yup
//     .string()
//     .email('Invalid email format')
//     .required('Email is required'),
//   phone: yup
//     .string()
//     .required('Phone number is required')
//     .matches(/^[0-9]{10,15}$/, 'Phone number must be between 10 and 15 digits')
//     .min(10, 'Phone number must be at least 10 digits')
//     .max(15, 'Phone number must not exceed 15 digits'),
//   password: yup
//     .string()
//     .required('Password is required')
//     .min(8, 'Password must be at least 8 characters')
//     .max(20, 'Password must not exceed 20 characters')
//     .matches(
//       /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
//       'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
//     ),
//   githubId: yup
//     .string()
//     .nullable(), // Optional field for GitHub ID
//   country_code: yup
//     .string()
//     .required('Country code is required'), // Country code is selected from a dropdown, so it's just required
//   createdAt: yup
//     .date()
//     .default(() => new Date())
//     .notRequired(), // Defaults to current time; not required during creation
//   updatedAt: yup
//     .date()
//     .default(() => new Date())
//     .notRequired() // Defaults to current time; not required during creation
// });
// module.exports = registrationSchema;
const yup = __importStar(require("yup"));
exports.registrationSchema = yup.object({
    id: yup
        .number()
        .integer()
        .positive()
        .notRequired(), // Auto-incremented; not required for validation during creation
    username: yup
        .string()
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters')
        .max(10, 'Username must not exceed 10 characters'), // Adjusted max length to 10
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
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    githubId: yup.string().nullable(), // Optional field for GitHub ID
    country_code: yup.string().required('Country code is required'),
    createdAt: yup.date().default(() => new Date()).notRequired(), // Defaults to current time
    updatedAt: yup.date().default(() => new Date()).notRequired(), // Defaults to current time
});
