import { LogOut } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import AdminNavbarElement from "./adminnavbarelement";
import Loader from "./Loader";

function AdminNavbar() {
  const { signOut, isLoading } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  if (isLoading) {
    return <Loader fullscreen bg="mesh" variant="orbital" text="Logging out" />;
  }

  return (
    <header className="py-4 px-4 border-b border-b-border-strong">
      <nav className="w-full flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <h1 className="bg-admin rounded-lg text-sm text-white w-fit p-1 uppercase">
            Adm
          </h1>
          <h1 className="text-text-primary text-sm uppercase font-sans font-black ">
            ResQify / ADMIN
          </h1>
        </div>
        <ul className="flex gap-8 items-center">
          <AdminNavbarElement title="Overview" path="/admin/overview" />
          <AdminNavbarElement title="staff mgmt" path="/admin/staff" />
          <AdminNavbarElement title="ai dashboard" path="/admin/dashboard" />
          <AdminNavbarElement title="floor map" path="/admin/floormap" />
        </ul>
        <div className="flex gap-2 items-center">
          <p className="bg-admin-muted text-admin border text-xs border-admin-border w-fit px-2 rounded-md py-0.5 uppercase">
            admin access
          </p>
          <p className="uppercase text-text-primary text-xs">R.Sharma</p>
          <button
            onClick={() => handleSignOut()}
            className="flex items-center gap-2 font-mono text-xs font-semibold tracking-widest uppercase text-critical border border-critical/25 rounded-xl px-6 py-2.5 hover:border-critical hover:text-white hover:bg-critical/10 hover:shadow-[0_0_16px_rgba(255,59,59,0.2)] transition-all duration-200"
          >
            <LogOut size={13} />
            Sign out
          </button>
        </div>
      </nav>
    </header>
  );
}

export default AdminNavbar;
