import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./button";
import { logout } from "../../pages/utils/auth";

const LogoutButton = ({ className = "" }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <Button
      variant="secondary"
      size="md"
      onClick={handleLogout}
      className={`flex items-center gap-2 ${className}`}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;