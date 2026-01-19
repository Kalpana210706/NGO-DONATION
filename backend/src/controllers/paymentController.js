
const crypto = require("crypto");
const Donation = require("../models/Donation");

exports.createPayment = async (req, res) => {
  try {
    const { amount } = req.body;
    const user = req.user;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    // 1️⃣ Create donation (pending)
    const donation = await Donation.create({
      user: user._id,
      amount,
      status: "pending",
    });

    // 2️⃣ PayHere config (SANDBOX)
    const merchant_id = process.env.PAYHERE_MERCHANT_ID;
    const merchant_secret = process.env.PAYHERE_MERCHANT_SECRET;
    const currency = "LKR";
    const order_id = donation._id.toString();

    if (!merchant_id || !merchant_secret) {
      return res.status(500).json({ message: "PayHere config missing" });
    }

    // 3️⃣ Hash generation (PayHere official rule)
    const secretHash = crypto
      .createHash("md5")
      .update(merchant_secret)
      .digest("hex");

    const hash = crypto
      .createHash("md5")
      .update(
        merchant_id +
          order_id +
          amount +
          currency +
          secretHash
      )
      .digest("hex")
      .toUpperCase();

    // 4️⃣ Send response to frontend
    res.json({
      order_id,
      amount,
      currency,
      hash,
      first_name: user.name,
      email: user.email,
    });
  } catch (err) {
    console.error("PAYMENT CREATE ERROR 👉", err);
    res.status(500).json({ message: "Payment initiation failed" });
  }
};
