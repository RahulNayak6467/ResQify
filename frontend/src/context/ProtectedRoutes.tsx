import { createContext, useContext } from "react";
import { useAuthContext } from "./AuthProvider";
import Loader from "../components/ui/Loader";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoutes = createContext(null);

export const useProtected = () => {
  const ctx = useContext(ProtectedRoutes);
  if (!ctx) {
    throw new Error("wrap inside ProtectedRoutesProvider");
  } else {
    return ctx;
  }
};

function ProtectedRoutesProvider({ children }: { children: React.ReactNode }) {
  const { isLoading, user, role } = useAuthContext();
  //   const navigate = useNavigate();
  const location = useLocation();

  if (isLoading) {
    return <Loader fullscreen bg="mesh" variant="orbital" text="Loading..." />;
  }
  if (!user) {
    return <Navigate to="/login" />;
  }

  console.log("USER", user);

  //   const checkRole = user?.user_metadata?.role;
  //   console.log(checkRole);
  //   console.log("ROLE", role);

  console.log(location.pathname);
  if (role === "guest") {
    if (!location.pathname.includes("/guest")) {
      return <Navigate to="/guest" />;
    }
  } else if (role === "staff") {
    if (!location.pathname.includes("/staff")) {
      return <Navigate to="/staff" />;
    }
  } else if (role === "admin") {
    if (!location.pathname.includes("/admin")) {
      return <Navigate to="/admin/overview" />;
    }
  }
  //     navigate("/staff");
  //   }

  return (
    <ProtectedRoutes.Provider value={null}>{children}</ProtectedRoutes.Provider>
  );
}

export default ProtectedRoutesProvider;
