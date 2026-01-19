const Donation = require("../models/Donation");

// CREATE DONATION (PENDING)
const createDonation = async (req, res) => {
  console.log("PAYMENT CREATE HIT", req.body, req.user);

  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const donation = await Donation.create({
      user: req.user.id,
      amount,
      status: "pending",
    });

    res.status(201).json({
      message: "Donation created",
      donation,
    });
  } catch (error) {
    console.error("DONATION CREATE ERROR 👉", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET USER DONATIONS
const getMyDonations = async (req, res) => {
  try {
    const donations = await Donation.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(donations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// MARK DONATION AS SUCCESS
const markDonationSuccess = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    donation.status = "success";
    donation.paymentId = "PAYMENT_SUCCESS_" + Date.now();

    await donation.save();

    res.json({
      message: "Donation marked as success",
      donation,
    });
  } catch (error) {
    console.error("DONATION SUCCESS ERROR 👉", error);
    res.status(500).json({ message: "Server error" });
  }
};

// MARK DONATION AS FAILED
const markDonationFailed = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    donation.status = "failed";

    await donation.save();

    res.json({
      message: "Donation marked as failed",
      donation,
    });
  } catch (error) {
    console.error("DONATION FAILED ERROR 👉", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createDonation,
  getMyDonations,
  markDonationSuccess,
  markDonationFailed,
};
