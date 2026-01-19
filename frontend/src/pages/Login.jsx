import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
const decoded = jwtDecode(res.data.token);
      if (decoded.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-gray-900 p-6 rounded w-80">
        <h2 className="text-white text-xl mb-4">Login</h2>

        <input
          className="w-full p-2 mb-2"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-2 mb-4"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 text-white p-2"
          onClick={handleLogin}
        >
          Login
        </button>

        <p
          className="text-sm text-gray-400 mt-3 cursor-pointer"
          onClick={() => navigate("/register")}
        >
          Don’t have an account? Register
        </p>
      </div>
    </div>
  );
}
