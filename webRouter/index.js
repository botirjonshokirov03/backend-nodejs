const express = require("express");
const router = express.Router();

const userRoutes = require("./user.routes");
const propertyRoutes = require("./property.routes");
const authRouter = require("./auth.routes");

router.use("/user", userRoutes);
router.use("/property", propertyRoutes);
router.use("/auth", authRouter);

module.exports = router;
