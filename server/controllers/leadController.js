const Lead = require("../models/Lead");

const createLead = async (
  req,
  res
) => {
  try {
    const lead = await Lead.create(
      req.body
    );

    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getLeads = async (
  req,
  res
) => {
  try {
    const {
      search,
      status,
      leadSource,
      assignedSalesperson,
    } = req.query;

    let query = {};

    // SEARCH FILTER
    if (search) {
      query.$or = [
        {
          leadName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          companyName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // STATUS FILTER
    if (status) {
      query.status = status;
    }

    // LEAD SOURCE FILTER
    if (leadSource) {
      query.leadSource =
        leadSource;
    }

    // SALESPERSON FILTER
    if (assignedSalesperson) {
      query.assignedSalesperson =
        assignedSalesperson;
    }

    const leads = await Lead.find(
      query
    ).sort({
      createdAt: -1,
    });

    res.json(leads);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getLeadById = async (
  req,
  res
) => {
  try {
    const lead =
      await Lead.findById(
        req.params.id
      );

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    res.json(lead);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateLead = async (
  req,
  res
) => {
  try {
    const updatedLead =
      await Lead.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    if (!updatedLead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    res.json(updatedLead);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteLead = async (
  req,
  res
) => {
  try {
    const deletedLead =
      await Lead.findByIdAndDelete(
        req.params.id
      );

    if (!deletedLead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    res.json({
      message: "Lead deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
};