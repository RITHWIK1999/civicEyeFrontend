import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../assets/Logo.png";
import InputBar from "../components/InputBar";
import Button from "../components/Button";
import { loginUser } from "../api/Api";
import toast from "react-hot-toast";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      console.log(response.status);

      if (response.status === 400) {
        toast.error("Some Feilds Are Required");
      }
      if (response.status === 404) {
        toast.error("You Are Not Registered");

        return;
      }
      if (response.status === 401) {
        toast.error("Password Doesnot Match");
      }

      if (response.status === 200) {
        toast.success("SuccessFully Logged In");

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userRole", response.data.role);
        localStorage.setItem("userName", response.data.name);
        localStorage.setItem("id",response.data.id)
        

        console.log(response.data);
        
        if (response?.data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }

      setFormData({ email: "", password: "" });
      // navigate("/admin");
      return;
    } catch (error) {}
    console.log("Login Submitted", formData);
  };

  return (
    <div className="border-2 border-gray-300 bg-white flex items-center justify-center p-10 shadow-lg rounded-lg mt-48 mx-48">
      {/* Left Side */}
      <div className="w-1/2 flex flex-col items-center text-center pe-24">
        <div className="h-16 w-60">
          <img src={img} alt="CivicEYE Logo" />
        </div>
        <div className="mt-6 ps-8">
          <h2 className="text-lg font-semibold">Welcome to CivicEYE !</h2>
          <p className="text-gray-600 mt-2">
            Your platform to report,
            <br /> track, and resolve public
            <br /> issues with ease.
          </p>
        </div>
      </div>

      {/* Vertical Divider */}
      <div className="h-60 w-px bg-black"></div>

      {/* Right Side */}
      <div className="w-1/2 flex flex-col items-center px-10 pt-3">
        <h2 className="text-xl font-bold mb-4">
          SIGN <span className="text-blue-500">UP</span>
        </h2>
        <form className="w-full flex flex-col items-center gap-4">
          <InputBar
            placeholder="Email"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mb-4 w-96 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <InputBar
            placeholder="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-96 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <div className="ps-68 text-sm">
            <h5 className="text-blue-500 hover:underline font-medium">
              Forgot password?
            </h5>
          </div>
          <Button
            type="button"
            onClick={handleSubmit}
            name="SIGN IN"
            className=" w-96 p-2 ms-9  bg-blue-500 
          text-white font-semibold rounded-lg 
          shadow-md hover:bg-blue-600 
          focus:outline-none focus:ring-2 
          focus:ring-blue-400 focus:ring-opacity-75 
          transition duration-300 transform hover:scale-105"
          />
        </form>
        <p className="text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-500 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
