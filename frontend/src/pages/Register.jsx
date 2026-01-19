import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault(); 
    console.log("REGISTER BUTTON CLICKED");

    
    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }

    console.log("REGISTER CLICKED 👉", { name, email, password });

    try {
      const res = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      console.log("REGISTER RESPONSE 👉", res.data);

      alert("Registered successfully. Please login.");
      navigate("/");
    } catch (err) {
      console.error("REGISTER ERROR 👉", err.response?.data || err.message);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form
        onSubmit={handleRegister}
        className="bg-gray-900 p-6 rounded w-80"
      >
        <h2 className="text-white text-xl mb-4">Register</h2>

        <input
          className="w-full p-2 mb-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full p-2 mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-2 mb-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 hover:bg-green-700"
        >
          Register
        </button>
      </form>
    </div>
  );
}
