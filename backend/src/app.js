
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

connectDB();

const app = express();


app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json()); 


const authMiddleware = require("./middleware/authMiddleware");

const authRoutes = require("./routes/authRoutes");
const donationRoutes = require("./routes/donationRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/admin", adminRoutes);


app.get("/", (req, res) => {
  res.send("SERVER IS ALIVE");
});

app.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You have access",
    user: req.user,
  });
});


app.listen(5000, () => {
  console.log("Server running on port 5000");
});
