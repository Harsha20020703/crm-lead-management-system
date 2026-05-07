const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    leadName: {
      type: String,
      required: true,
    },

    companyName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    leadSource: {
      type: String,
      required: true,
    },

    assignedSalesperson: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "New",
        "Contacted",
        "Qualified",
        "Proposal Sent",
        "Won",
        "Lost",
      ],
      default: "New",
    },

    estimatedDealValue: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Lead = mongoose.model("Lead", leadSchema);

module.exports = Lead;