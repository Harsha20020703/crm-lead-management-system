const Note = require("../models/Note");

const createNote = async (req, res) => {
  try {
    const note = await Note.create({
      lead: req.params.leadId,
      content: req.body.content,
      createdBy: req.body.createdBy,
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getLeadNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      lead: req.params.leadId,
    });

    res.json(notes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createNote,
  getLeadNotes,
};