import { createContext, useContext, useLayoutEffect } from "react";
import { useAuthContext } from "./AuthProvider";
import Loader from "../components/ui/Loader";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

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
  const { isLoading, user } = useAuthContext();
  //   const navigate = useNavigate();
  const location = useLocation();

  if (isLoading) {
    return <Loader fullscreen bg="mesh" variant="orbital" text="Loading..." />;
  }
  if (!user) {
    return <Navigate to="/login" />;
  }

  const checkRole = user?.user_metadata?.role;
  //   if (checkRole === "guest") {
  //       if (location.pathname === "/guest") {
  //     } else {
  //       return <Navigate to="/guest" />;
  //     }
  //   } else if (checkRole === "staff") {
  //     if (location.pathname === "/staff") {
  //       console.log("path");
  //     } else {
  //       return <Navigate to="/staff" />;
  //     }
  //   } else if (checkRole === "admin") {
  //     if (location.pathname.includes("/admin")) {
  //       console.log("path");
  //     } else {
  //       return <Navigate to="/admin/overview" />;
  //     }
  console.log(location.pathname);
  if (checkRole === "guest") {
    if (!location.pathname.includes("/guest")) {
      return <Navigate to="/guest" />;
    }
  } else if (checkRole === "staff") {
    if (!location.pathname.includes("/staff")) {
      return <Navigate to="/staff" />;
    }
  } else if (checkRole === "admin") {
    if (!location.pathname.includes("/admin")) {
      return <Navigate to="/admin/overview" />;
    }
  }
  //     navigate("/staff");
  //   }

  return <ProtectedRoutes.Provider>{children}</ProtectedRoutes.Provider>;
}

export default ProtectedRoutesProvider;
