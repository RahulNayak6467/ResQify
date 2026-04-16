import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/ui/adminnavbar";
import { useAdmin } from "../context/adminContext";
import Loader from "../components/ui/Loader";

function AdminPage() {
  const { isloading } = useAdmin();
  if (isloading) {
    return (
      <Loader fullscreen bg="mesh" variant="orbital" text="Fetching Data" />
    );
  }
  return (
    <section>
      <AdminNavbar />
      <Outlet />
    </section>
  );
}

export default AdminPage;
