const express = require("express");

const router = express.Router();

const homeController = router.get("/", (_req, res) => {
  res.json({ msg: "azure-node-windows-yarn-berry" });
});

module.exports = homeController;
