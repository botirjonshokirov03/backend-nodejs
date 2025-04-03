const express = require("express");
const router = express.Router();
const propertyControllers = require("../webController/property.controller");
const authenticateJWT = require("../middleware/authentication");

router.use(authenticateJWT);

router.get("/", propertyControllers.getAllProperties);
router.get("/:id", propertyControllers.getPropertyById);

module.exports = router;
