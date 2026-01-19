import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex flex-col items-center justify-center text-white px-6">
      
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
        NGO Donation System
      </h1>

      <p className="text-gray-300 max-w-xl text-center mb-8">
        A transparent platform to manage NGO donations, users, and impact.
        Donate securely and help us make a difference.
      </p>

      <div className="flex gap-4">
        <Link
          to="/login"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded"
        >
          Register
        </Link>
      </div>

      <p className="text-sm text-gray-500 mt-8">
        © 2026 NGO Donation System
      </p>
    </div>
  );
}

