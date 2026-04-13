import { createContext, useContext } from "react";

const AdminContext = createContext(null);

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) {
    throw new Error("Wrap the provider around admin context provider");
  }
  return ctx;
};

const AdminContextProvider = ({ children }: { children: React.ReactNode }) => {
  return <AdminContext.Provider>{children}</AdminContext.Provider>;
};
