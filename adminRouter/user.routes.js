const express = require("express");
const router = express.Router();
const userControllers = require("../adminController/user.controller");
const userValidations = require("../validations/user.validation");

router.post(
  "/register",
  userValidations.registerValidation,
  userControllers.registerUser
);

module.exports = router;
