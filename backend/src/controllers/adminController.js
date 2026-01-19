const User = require("../models/User");
const Donation = require("../models/Donation");


const getAdminSummary = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalDonations = await Donation.countDocuments();

    const donationStats = await Donation.aggregate([
      { $match: { status: "success" } },
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
    ]);

    const totalAmount = donationStats[0]?.totalAmount || 0;

    res.json({
      totalUsers,
      totalDonations,
      totalAmount,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET ALL USERS (ADMIN)
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

/**
 * GET ALL DONATIONS (ADMIN)
 */
const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch donations" });
  }
};

/**
 * GET DASHBOARD STATS (ADMIN)
 * Used for cards: users, donations, amount, pending
 */
const getDonationStats = async (req, res) => {
  try {
    const usersCount = await User.countDocuments();
    const donationsCount = await Donation.countDocuments();

    const totalAmountAgg = await Donation.aggregate([
      { $match: { status: "success" } },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    const pendingCount = await Donation.countDocuments({
      status: "pending",
    });

    res.json({
      usersCount,
      donationsCount,
      totalAmount: totalAmountAgg[0]?.totalAmount || 0,
      pendingCount,
    });
  } catch (error) {
    console.error("ADMIN STATS ERROR 👉", error);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};

module.exports = {
  getAllUsers,
  getAllDonations,
  getDonationStats,
  getAdminSummary
};
