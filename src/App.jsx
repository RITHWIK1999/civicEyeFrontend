import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Toaster } from "react-hot-toast";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/userPages/HomePage";
import UserProfile from "./pages/userPages/UserProfile";
import ComplaintPage from "./pages/userPages/ComplaintPage";
import ViewUser from "./pages/adminPages/ViewUser";
import MyComplaints from "./pages/userPages/MyComplaints";
import About from "./pages/userPages/About";
import Contact from "./pages/userPages/Contact";
import UserReport from "./pages/adminPages/UserReport";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/" element={<HomePage/>} />
          <Route path="/profile" element={<UserProfile/>}/>
          <Route path="/complaint" element={<ComplaintPage/>}/>
          <Route path="/viewuser/:id" element={<ViewUser/>}/>
          <Route path="/mycomplaints" element={<MyComplaints/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/userReport/:id" element={<UserReport/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
