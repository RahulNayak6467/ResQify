import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Confirmation from "./pages/Confirmation";
import AdminPage from "./pages/AdminPage";
import AdminOverviewPage from "./components/ui/adminOverviewPage";
import StaffTable from "./components/ui/stafftable";
import AIClassificationLog from "./components/ui/AIClassification";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
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
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
