import { useState } from "react";
import { supabase } from "../lib/supabaseclient";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const signUp = async (
    email: string,
    password: string,
    metadata: {
      firstName: string;
      lastName: string;
      role: string;
      roomNumber: number;
    },
  ) => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: metadata },
    });
    setIsLoading(false);
    if (error) throw new Error(error.message);

    const checkRole = data?.user?.user_metadata?.role;

    if (checkRole === "admin") navigate("/admin/overview");
    else if (checkRole === "staff") navigate("/staff");
    else if (checkRole === "guest") navigate("/guest");
    else navigate("/register");

    return data;
  };

  const signIn = async (email: string, password: string, role: string) => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setIsLoading(false);
    if (error) {
      alert("Invalid login credentials");
      throw new Error(error.message);
    }

    const checkRole = data?.user?.user_metadata?.role;
    if (checkRole !== role) {
      alert("Incorrect role selected");
      return;
    } else if (checkRole === "admin") navigate("/admin/overview");
    else if (checkRole === "staff") navigate("/staff");
    else if (checkRole === "guest") navigate("/guest");
    else navigate("/register");

    return data;
  };

  const signOut = async () => {
    const { data, error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  return { signUp, isLoading, signIn, signOut };
};
