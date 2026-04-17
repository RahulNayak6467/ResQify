import { createBrowserRouter, Outlet } from "react-router-dom";
import Confirmation from "./pages/Confirmation";
import AdminPage from "./pages/AdminPage";
import AdminOverviewPage from "./components/ui/adminOverviewPage";
import StaffTable from "./components/ui/stafftable";
import AIClassificationLog from "./components/ui/AIClassification";
import StaffPage from "./pages/StaffPage";
import FloorLayout from "./components/admin/FloorMap/floorlayout";
import LoginPage from "./components/Login/LoginPage";
import Register from "./components/SignIn/SignInPage";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import ProtectedRoutesProvider from "./context/ProtectedRoutes";
import AuthProvider from "./context/AuthProvider";
import RootRedirect from "./routesredirect";
import StaffContextProvider from "./context/staffContext";
import AdminContextProvider from "./context/adminContext";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    ),
    children: [
      { path: "/", element: <RootRedirect /> },
      {
        path: "login",
        element: <LoginPage />,
      },
      { path: "register", element: <Register /> },
      {
        path: "guest",
        element: (
          <ProtectedRoutesProvider>
            <HomePage />
          </ProtectedRoutesProvider>
        ),
      },
      {
        path: "/guest/reported",
        element: (
          <ProtectedRoutesProvider>
            <Confirmation />
          </ProtectedRoutesProvider>
        ),
      },
      {
        path: "staff",
        element: (
          <ProtectedRoutesProvider>
            <StaffContextProvider>
              <StaffPage />
            </StaffContextProvider>
          </ProtectedRoutesProvider>
        ),
      },
      {
        path: "admin",
        element: (
          <ProtectedRoutesProvider>
            <AdminContextProvider>
              <AdminPage />
            </AdminContextProvider>
          </ProtectedRoutesProvider>
        ),
        children: [
          { path: "overview", element: <AdminOverviewPage /> },
          { path: "staff", element: <StaffTable /> },
          { path: "dashboard", element: <AIClassificationLog /> },
          { path: "floormap", element: <FloorLayout /> },
        ],
      },
    ],
  },
]);
