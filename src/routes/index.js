const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const classeRoutes = require("./classeRoutes");

router.get("/", (req, res) => {
  res.json({ api: "ok" });
});
authRoutes(router);
userRoutes(router);
classeRoutes(router);
module.exports = router;
