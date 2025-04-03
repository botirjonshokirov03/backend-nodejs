const express = require("express");
const router = express.Router();

const adminRouter = require("./adminRouter");
const webRouter = require("./webRouter");

// /api/admin
router.use("/admin", adminRouter);

// /api/web
router.use("/web", webRouter);

module.exports = router;
