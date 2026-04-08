import { Navigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthProvider";
import LandingPage from "./pages/LandingPage";

// add this in your routes.tsx or ProtectedRoutes file
const RootRedirect = () => {
  const { user, isLoading } = useAuthContext();

  if (isLoading) return null;

  if (user) {
    const role = user?.user_metadata?.role;
    if (role === "guest") return <Navigate to="/guest" replace />;
    if (role === "staff") return <Navigate to="/staff" replace />;
    if (role === "admin") return <Navigate to="/admin/overview" replace />;
  }

  return <LandingPage />; // not logged in → show landing page
};

export default RootRedirect;
