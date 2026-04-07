import { createContext, useContext } from "react";
import { useAuthContext } from "./AuthProvider";
import Loader from "../components/ui/Loader";
import { Navigate } from "react-router-dom";

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

  if (isLoading) {
    return <Loader fullscreen bg="mesh" variant="orbital" text="Loading..." />;
  }
  if (!user) {
    return <Navigate to="/register" />;
  }

  // const checkRole = user.

  return <ProtectedRoutes.Provider>{children}</ProtectedRoutes.Provider>;
}

export default ProtectedRoutesProvider;
