import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const GuestRoute = ({ children }) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default GuestRoute;
