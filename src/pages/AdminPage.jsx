import React, { useEffect } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import SideNavbar from "../components/SideNavbar";
import UserManagement from "./adminPages/UserManagement";
import Overview from "./adminPages/Overview";
import Complaint from "./adminPages/Complaint"
import Feedback from "./adminPages/Feedback";




function AdminPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken.role !== "admin") {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex">
      <SideNavbar/>

      <div className="bg-blue-100 flex-1 m-10 rounded-3xl">
        <Routes>
          <Route path="/" element={<Overview/>} />
          <Route path="complaint" element={<Complaint/>} />
          <Route path="UserManagement" element={<UserManagement/>} />
          <Route path="review" element={<Feedback/>} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminPage;
