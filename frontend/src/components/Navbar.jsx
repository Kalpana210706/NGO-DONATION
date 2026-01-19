import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="w-full bg-gray-900 px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-white font-bold text-lg">
        NGO System
      </Link>

      <div className="flex gap-4">
        {!token && (
          <>
            <Link to="/login" className="text-gray-300 hover:text-white">
              Login
            </Link>
            <Link to="/register" className="text-gray-300 hover:text-white">
              Register
            </Link>
          </>
        )}

        {token && (
          <button
            onClick={logout}
            className="text-red-400 hover:text-red-500"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
