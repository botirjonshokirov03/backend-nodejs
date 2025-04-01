const { body } = require("express-validator");

const registerValidation = [
  body("login").notEmpty().withMessage("Login is required"),
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("userRole").notEmpty().withMessage("User role is required"),
];

const loginValidation = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

const userValidations = {
  registerValidation,
  loginValidation,
};

module.exports = userValidations;
