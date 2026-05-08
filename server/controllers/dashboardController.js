const Lead = require("../models/Lead");

const getDashboardStats = async (
  req,
  res
) => {
  try {
    const totalLeads =
      await Lead.countDocuments();

    const newLeads =
      await Lead.countDocuments({
        status: "New",
      });

    const contactedLeads =
      await Lead.countDocuments({
        status: "Contacted",
      });

    const qualifiedLeads =
      await Lead.countDocuments({
        status: "Qualified",
      });

    const wonLeads =
      await Lead.countDocuments({
        status: "Won",
      });

    const lostLeads =
      await Lead.countDocuments({
        status: "Lost",
      });

    const allLeads =
      await Lead.find();

    const totalDealValue =
      allLeads.reduce(
        (total, lead) =>
          total +
          lead.estimatedDealValue,
        0
      );

    const wonDeals =
      await Lead.find({
        status: "Won",
      });

    const totalWonDealValue =
      wonDeals.reduce(
        (total, lead) =>
          total +
          lead.estimatedDealValue,
        0
      );

    res.json({
      totalLeads,
      newLeads,
      contactedLeads,
      qualifiedLeads,
      wonLeads,
      lostLeads,
      totalDealValue,
      totalWonDealValue,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};