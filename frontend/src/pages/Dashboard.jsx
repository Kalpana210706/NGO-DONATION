
import { useEffect, useState } from "react";
import api from "../services/api";
import { logout } from "../utils/auth";

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState("");
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    api.get("/auth/me").then((res) => setUser(res.data));
    api.get("/donations/my").then((res) => setDonations(res.data));
  }, []);

  
  

const handleDonate = async () => {
  try {
    if (!amount) return alert("Enter amount");

    const donationAmount = Number(amount);

   
    const res = await api.post("/payment/create", {
      amount: donationAmount,
    });

    const payment = {
      sandbox: true,
      merchant_id: process.env.REACT_APP_PAYHERE_MERCHANT_ID,

      return_url: "http://localhost:3000/dashboard",
      cancel_url: "http://localhost:3000/dashboard",
      notify_url: "http://localhost:5000/api/payment/notify",

      order_id: res.data.order_id,
      items: "NGO Donation",
      amount: res.data.amount,
      currency: res.data.currency,
      hash: res.data.hash,

      first_name: res.data.first_name,
      email: res.data.email,
      country: "Sri Lanka",
    };


    window.payhere.onCompleted = function (orderId) {
      alert("Payment Successful!");
      api.get("/donations/my").then((r) => setDonations(r.data));
    };

    window.payhere.onDismissed = function () {
      alert("Payment Cancelled");
    };

    window.payhere.onError = function (error) {
      console.log(error);
      alert("Payment Error");
    };


    window.payhere.startPayment(payment);
    setAmount("");
  } catch (err) {
    console.error(err);
    alert("Payment initiation failed");
  }
};

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">User Dashboard</h1>
        <button onClick={logout} className="bg-red-600 px-4 py-2 rounded">
          Logout
        </button>
      </div>

   
      <div className="bg-gray-900 p-4 rounded mb-6">
        <h2 className="text-lg mb-2">My Profile</h2>
        {user && (
          <>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </>
        )}
      </div>

    
      <div className="bg-gray-900 p-4 rounded mb-6">
        <h2 className="text-lg mb-2">Make a Donation</h2>
        <input
          type="number"
          className="w-full p-2 mb-2 text-black"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          onClick={handleDonate}
          className="w-full bg-green-600 p-2 rounded"
        >
          Donate
        </button>
      </div>

    
      <div className="bg-gray-900 p-4 rounded">
        <h2 className="text-lg mb-2">Donation History</h2>

        {donations.length === 0 && <p>No donations yet</p>}

        {donations.map((d) => (
          <div
            key={d._id}
            className="flex justify-between border-b border-gray-700 py-2"
          >
            <span>₹{d.amount}</span>
            <span className="capitalize">{d.status}</span>
            <span>{new Date(d.createdAt).toLocaleDateString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
