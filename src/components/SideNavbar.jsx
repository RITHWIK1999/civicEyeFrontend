import React, { useState, useEffect } from "react";
import img from "../assets/Logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faEye,
  faGear,
  faTriangleExclamation,
  faUserSecret,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

function SideNavbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get current URL path
  const userName = localStorage.getItem("userName");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div className="h-screen bg-white text-black font-bold flex flex-col justify-between sticky top-0 overflow-y-auto">
      <div className="pt-16 ps-2 pe-0">
        <img className="h-12" src={img} alt="CivicEYE Logo" />
      </div>

      <nav className="flex flex-col gap-4 ps-10">
        {[
          { path: "/admin", icon: faEye, label: "Overview" },
          { path: "/admin/complaint", icon: faTriangleExclamation, label: "Complaints" },
          { path: "/admin/userManagement", icon: faUserSecret, label: "User Management" },
          { path: "/admin/review", icon: faCommentDots, label: "Feedback" },
        ].map(({ path, icon, label }) => (
          <Link
            key={path}
            to={path}
            className={`text-xl font-bold py-2 px-4 rounded-lg transition ${
              location.pathname === path ? "bg-blue-600 text-white" : "hover:bg-blue-500 hover:text-white"
            }`}
          >
            <FontAwesomeIcon icon={icon} /> {label}
          </Link>
        ))}
      </nav>

      <div className="relative ms-10 mb-4 dropdown-container">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setDropdownOpen(!dropdownOpen);
          }}
          className="bg-blue-500 text-white w-full rounded-lg text-center p-4 text-lg font-bold flex items-center justify-center gap-2"
        >
          <FontAwesomeIcon icon={faGear} /> {userName}
        </button>
        {dropdownOpen && (
          <div className="absolute bottom-full left-0 w-full bg-white shadow-lg rounded-2xl text-black mb-1 z-10">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-blue-500 rounded-2xl flex justify-center hover:text-white text-black items-center gap-2"
            >
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SideNavbar;
