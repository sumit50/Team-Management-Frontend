import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  const linkClass =
    "block px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-100";

  const activeClass =
    "block px-4 py-2 rounded-lg bg-indigo-600 text-white";

  return (
    <aside className="w-64 bg-white shadow-lg min-h-screen p-4">
      <h2 className="text-xl font-bold text-indigo-600 mb-8">
        Team Admin
      </h2>

      <nav className="space-y-2">
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            isActive ? activeClass : linkClass
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/teams"
          className={({ isActive }) =>
            isActive ? activeClass : linkClass
          }
        >
          Teams
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            isActive ? activeClass : linkClass
          }
        >
          Users
        </NavLink>

        <NavLink
          to="/admin/settings"
          className={({ isActive }) =>
            isActive ? activeClass : linkClass
          }
        >
          Settings
        </NavLink>
      </nav>
    </aside>
  );
};
