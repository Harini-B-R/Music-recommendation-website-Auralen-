import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    // Redirect to login if not logged in
    return <Navigate to="/login" replace />;
  }
  return children;
}
