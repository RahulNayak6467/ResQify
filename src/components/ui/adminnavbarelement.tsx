import { NavLink } from "react-router-dom";

function AdminNavbarElement({ title, path }: { title: string; path: string }) {
  const active = "text-admin uppercase  hover:text-admin transition-all";
  const nonActive =
    "text-text-secondary uppercase hover:text-admin  transition-all";
  return (
    <li className="text-xs">
      <NavLink
        className={({ isActive }) => (isActive ? active : nonActive)}
        to={path}
      >
        {title}
      </NavLink>
    </li>
  );
}

export default AdminNavbarElement;
