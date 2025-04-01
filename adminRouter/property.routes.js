const express = require("express");
const router = express.Router();
const propertyControllers = require("../adminController/property.controller");
const authenticateJWT = require("../middleware/authentication");

router.use(authenticateJWT);

router.post("/", propertyControllers.createProperty);
router.get("/", propertyControllers.getAllProperties);
router.get("/:id", propertyControllers.getPropertyById);
router.put("/:id", propertyControllers.updateProperty);
router.delete("/:id", propertyControllers.deleteProperty);

module.exports = router;
