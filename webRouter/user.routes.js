const express = require("express");
const router = express.Router();
const clientControllers = require("../webController/user.controller");
const userValidations = require("../validations/user.validation");
const authenticateJWT = require("../middleware/authentication");

router.post(
  "/register",
  userValidations.registerValidation,
  clientControllers.registerUser
);

router.use(authenticateJWT);

router.get("/:id", clientControllers.getMyProfile);
router.put("/:id", clientControllers.updateMyProfile);
router.delete("/:id", clientControllers.deleteMyProfile);

module.exports = router;
