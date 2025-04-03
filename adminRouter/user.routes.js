const express = require("express");
const router = express.Router();
const userControllers = require("../adminController/user.controller");
const authenticateJWT = require("../middleware/authentication");

router.use(authenticateJWT);

router.get("/", userControllers.getAllUsers);
router.get("/:id", userControllers.getUserById);
router.put("/:id", userControllers.updateUser);
router.delete("/:id", userControllers.deleteUser);

module.exports = router;
