const express = require("express");

const router = express.Router();

const {
  createLead,
  getLeads,
} = require("../controllers/leadController");

const protect = require("../middleware/authMiddleware");

router.post("/", protect, createLead);

router.get("/", protect, getLeads);

module.exports = router;