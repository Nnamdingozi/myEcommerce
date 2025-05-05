"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegistration = exports.validateLogin = void 0;
const loginSchema_1 = require("../validation/loginSchema");
const registrationSchema_1 = require("../validation/registrationSchema");
const validate = (schema) => {
    return async (req, res, next) => {
        try {
            // Validate the body data against the schema
            await schema.validate(req.body, { abortEarly: false });
            next();
        }
        catch (err) {
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
exports.validateLogin = validate(loginSchema_1.loginSchema);
exports.validateRegistration = validate(registrationSchema_1.registrationSchema);
