const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const Donation = require("../models/Donation");


router.get("/my", authMiddleware, async (req, res) => {
  const donations = await Donation.find({ user: req.user.id })
    .sort({ createdAt: -1 });

  res.json(donations);
});

const {
  createDonation,
   getMyDonations,
  markDonationSuccess,
  markDonationFailed,
} = require("../controllers/donationController");

router.post("/", authMiddleware, createDonation);
router.get("/my", authMiddleware, getMyDonations);

router.patch("/:id/success", authMiddleware, markDonationSuccess);
router.patch("/:id/failed", authMiddleware, markDonationFailed);


module.exports = router;
