import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    api.get("/admin/stats").then((res) => setStats(res.data));
    api.get("/admin/users").then((res) => setUsers(res.data));
    api.get("/admin/donations").then((res) => setDonations(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <StatCard title="Users" value={stats.usersCount} />
        <StatCard title="Donations" value={stats.donationsCount} />
        <StatCard title="Total Amount" value={`₹${stats.totalAmount}`} />
        <StatCard title="Pending" value={stats.pendingCount} />
      </div>

      {/* USERS */}
      <Section title="Users">
        {users.map((u) => (
          <Row
            key={u._id}
            left={`${u.name} (${u.email})`}
            right={u.role}
          />
        ))}
      </Section>

      {/* DONATIONS */}
      <Section title="Donations">
        {donations.map((d) => (
          <Row
            key={d._id}
            left={`${d.user?.name} - ₹${d.amount}`}
            right={d.status}
          />
        ))}
      </Section>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg text-center">
      <p className="text-gray-400">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      <div className="bg-gray-800 rounded-lg p-4 space-y-2">
        {children}
      </div>
    </div>
  );
}

function Row({ left, right }) {
  return (
    <div className="flex justify-between border-b border-gray-700 pb-2">
      <span>{left}</span>
      <span className="text-gray-400">{right}</span>
    </div>
  );
}
