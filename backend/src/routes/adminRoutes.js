const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  getAdminSummary,
  getAllUsers,
  getAllDonations,
  getDonationStats,
} = require("../controllers/adminController");

// ADMIN DASHBOARD ROUTES
router.get("/summary", authMiddleware, adminMiddleware, getAdminSummary);
router.get("/users", authMiddleware, adminMiddleware, getAllUsers);
router.get("/donations", authMiddleware, adminMiddleware, getAllDonations);
router.get("/stats", authMiddleware, adminMiddleware, getDonationStats);

module.exports = router;
