import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/ui/adminnavbar";

import ChartLayout from "../components/charts/chartlayout";

function AdminPage() {
  return (
    <section>
      <AdminNavbar />
      <Outlet />
    </section>
  );
}

export default AdminPage;
