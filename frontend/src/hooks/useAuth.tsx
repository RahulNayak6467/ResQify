import { useState } from "react";
import { supabase } from "../lib/supabaseclient";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  interface profilesTableProps {
    firstName: string;
    lastName: string;
    roomNumber: number;
    role: string;
    staff_status?: string;
    team_category?: string;
  }

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
    setIsLoading(true);
    const { error } = await supabase.auth.signOut();
    setIsLoading(false);
    if (error) {
      throw new Error(error.message);
    }
    console.log("User successfully loggedout");
  };

  const insertProfilesData = async (data: profilesTableProps) => {
    const userData = {
      first_name: data.firstName,
      last_name: data.lastName,
      hotel_room_number: data.roomNumber,
      role: data.role,
      staff_status: data.staff_status ?? null,
      team_category: data.team_category ?? null,
    };
    const { error } = await supabase.from("profiles").insert(userData).single();
    if (error) {
      throw new Error(error.message);
    }
    console.log("User is registered in the profiles table");
  };

  return { signUp, isLoading, signIn, signOut, insertProfilesData };
};
