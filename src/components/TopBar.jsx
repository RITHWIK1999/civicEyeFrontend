import React, { useEffect, useState } from "react";
import img from "../assets/Logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faUser } from "@fortawesome/free-regular-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function TopBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName");
  const id = localStorage.getItem("id");
  const location = useLocation();


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("id");
    localStorage.clear();
    navigate("/");
  };



  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white">
      <div>
        <img className="h-10" src={img} alt="CivicEYE Logo" />
      </div>
      <div className="flex gap-16 text-lg font-semibold">
  <Link
    className={`hover:text-blue-500 ${
      location.pathname === "/" ? "text-blue-600  font-bold" : ""
    }`}
    to="/"
  >
    Home
  </Link>
  {id && (
    <Link
      className={`hover:text-blue-500 ${
        location.pathname === "/mycomplaints" ? "text-blue-600  font-bold" : ""
      }`}
      to="/mycomplaints"
    >
      My Complaints
    </Link>
  )}
  <Link
    className={`hover:text-blue-500 ${
      location.pathname === "/about" ? "text-blue-600  font-bold" : ""
    }`}
    to="/about"
  >
    About
  </Link>
  <Link
    className={`hover:text-blue-500 ${
      location.pathname === "/contact" ? "text-blue-600 font-bold" : ""
    }`}
    to="/contact"
  >
    Contact
  </Link>
</div>

      <div className="relative">
        {token ? (
          <>
            <button
              className="flex items-center gap-4 bg-blue-500 px-5 py-2 rounded text-lg focus:outline-none text-white font-bold"
              onClick={() => setIsOpen(!isOpen)}
            >
              <FontAwesomeIcon icon={faCircleUser} size="lg" />
              {userName}
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg">
                <ul className="flex flex-col">
                  <li>
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-blue-500 rounded hover:text-white hover:font-semibold"
                      onClick={() => setIsOpen(false)}
                    >
                      <FontAwesomeIcon icon={faUser} />
                      <span>Profile</span>
                    </Link>
                  </li>
                  <li>
                    <button
                      className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-blue-500 rounded hover:text-white hover:font-semibold"
                      onClick={handleLogout}
                    >
                      <FontAwesomeIcon icon={faRightFromBracket} />
                      <span>Logout</span>
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </>
        ) : (
          <div className="flex gap-4">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded font-semibold hover:bg-gray-600"
              onClick={() => navigate("/login")}
            >
              Log In
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded font-semibold hover:bg-blue-600"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TopBar;
