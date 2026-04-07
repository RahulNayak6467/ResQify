import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseclient";

interface value {
  user: any;
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
  const [user, setUser] = useState<string | undefined | null>(null);
  const [role, setRole] = useState<string | undefined | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [auth, setAuth] = useState<boolean>(false);

  const handleUser = (user: any) => {
    setUser(user);
  };

  const handleRole = (role: any) => {
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
