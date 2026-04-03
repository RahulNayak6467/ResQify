import AdminNavbarElement from "./adminnavbarelement";

function AdminNavbar() {
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
        </ul>
        <div className="flex gap-2 items-center">
          <p className="bg-admin-muted text-admin border text-xs border-admin-border w-fit px-2 rounded-md py-0.5 uppercase">
            admin access
          </p>
          <p className="uppercase text-text-primary text-xs">R.Sharma</p>
        </div>
      </nav>
    </header>
  );
}

export default AdminNavbar;
