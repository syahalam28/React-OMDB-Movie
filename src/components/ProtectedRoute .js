import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  let location = useLocation();

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" state={{ from: location }}></Navigate>;
  }

  return children;
}
