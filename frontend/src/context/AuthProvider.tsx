import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseclient";
import { useNavigate } from "react-router-dom";

interface value {
  user: string | null | undefined;
  isLoading: boolean;
}

const AuthContext = createContext<value | null>(null);

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("Wrap inside auth provider");
  } else return ctx;
};

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>();
  const [role, setRole] = useState<string | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [, setAuth] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleUser = (user: string | null | undefined) => {
    setUser(user);
  };

  const handleRole = (role: string | null) => {
    setRole(role);
  };

  const handleAuth = (isAuthenticated: boolean) => {
    setAuth(isAuthenticated);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleUser(session?.user ?? null);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        handleUser(session?.user.id);
        handleAuth(true);
        handleRole(session?.user.user_metadata?.role);
        console.log(session);
        if (role === "guest") navigate("/guest");
        else if (role === "staff") navigate("/staff");
        else if (role === "admin") navigate("/admin/overview");
      } else if (event === "SIGNED_OUT") {
        handleUser(null);
        handleAuth(false);
        handleRole("guest");
      }
      setIsLoading(false);
    });

    return () => {
      data.subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    user,
    // setUser,
    // role,
    // setRole,
    // auth,
    // setAuth,
    isLoading,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
