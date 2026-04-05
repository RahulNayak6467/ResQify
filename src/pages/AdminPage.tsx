import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/ui/adminnavbar";

function AdminPage() {
  return (
    <section>
      <AdminNavbar />
      <Outlet />
    </section>
  );
}

export default AdminPage;
