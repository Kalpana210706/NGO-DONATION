import { Navigate } from "react-router-dom";
import { getUserRole, isLoggedIn } from "../utils/auth";

export default function AdminRoute({ children }) {
  if (!isLoggedIn()) {
    alert("Please login first");
    return <Navigate to="/login" />;
  }

  if (getUserRole() !== "admin") {
    alert("Access denied");
    return <Navigate to="/dashboard" />;
  }

  return children;
}
