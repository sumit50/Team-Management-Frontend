import React, {memo, useCallback} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LogoutButton from "../common/logoutButton";

const linkBase = "block px-4 py-2 rounded-md transition-colors";
const activeLink = "bg-indigo-600 text-white";
const inactiveLink = "text-gray-300 hover:bg-gray-800 hover:text-white";

// Sidebar links config (single source of truth)
const NAV_LINKS = [
  {to: "/member/team", label: "Dashboard", end: true},
  {to: "/member/profile", label: "Profile"},
  {to: "/member/team", label: "Tasks"},
];

const MemberSidebar = () => {
  // memoized class resolver (not recreated every render)
  const navClass = useCallback(
    ({isActive}) => `${linkBase} ${isActive ? activeLink : inactiveLink}`,
    []
  );

  return (
    <aside className="w-64 min-h-screen bg-black p-4 flex flex-col">
      {/* Logo */}
      <h1 className="text-xl font-bold text-white mb-8">Member Panel</h1>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 flex-1">
        {NAV_LINKS.map(({to, label, end}) => (
          <NavLink key={to} to={to} end={end} className={navClass}>
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="mt-auto">
        <LogoutButton />
      </div>
    </aside>
  );
};

export default memo(MemberSidebar);
