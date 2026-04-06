import { createBrowserRouter } from "react-router-dom";
// import HomePage from "./pages/HomePage";
import Confirmation from "./pages/Confirmation";
import AdminPage from "./pages/AdminPage";
import AdminOverviewPage from "./components/ui/adminOverviewPage";
import StaffTable from "./components/ui/stafftable";
import AIClassificationLog from "./components/ui/AIClassification";
import StaffPage from "./pages/StaffPage";

import FloorLayout from "./components/admin/FloorMap/floorlayout";
// import LoginInfo from "./components/Login/LoginInfo";
import LoginPage from "./components/Login/LoginPage";
import Register from "./components/SignIn/SignInPage";
import LandingPage from "./pages/LandingPage";
export const routes = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "reported",
    element: <Confirmation />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
    children: [
      {
        path: "overview",
        element: <AdminOverviewPage />,
      },
      {
        path: "staff",
        element: <StaffTable />,
      },
      {
        path: "dashboard",
        element: <AIClassificationLog />,
      },
      {
        path: "floormap",
        element: <FloorLayout />,
      },
    ],
  },
  {
    path: "/staff",
    element: <StaffPage />,
  },
]);
