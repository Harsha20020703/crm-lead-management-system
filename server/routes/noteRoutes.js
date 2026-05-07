const express = require("express");

const router = express.Router();

const {
  createNote,
  getLeadNotes,
} = require("../controllers/noteController");

router.post("/:leadId", createNote);

router.get("/:leadId", getLeadNotes);

module.exports = router;