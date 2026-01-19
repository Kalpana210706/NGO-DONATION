
import { jwtDecode } from "jwt-decode";

export const getToken = () => {
  return localStorage.getItem("token");
};

export const isLoggedIn = () => {
  return !!getToken();
};

export const getUserRole = () => {
  try {
    const token = getToken();
    if (!token) return null;
    const decoded = jwtDecode(token);
    return decoded.role;
  } catch {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";

};
