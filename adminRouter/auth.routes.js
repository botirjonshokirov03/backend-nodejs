const express = require("express");
const router = express.Router();
const authController = require("../adminController/auth.controller");
const userValidation = require("../validations/user.validation");

router.post("/login", userValidation.loginValidation, authController.loginUser);

module.exports = router;
