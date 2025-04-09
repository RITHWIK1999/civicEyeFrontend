import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../assets/Logo.png";
import InputBar from "../components/InputBar";
import Button from "../components/Button";
import toast from "react-hot-toast";
import { registration } from "../api/Api";

function RegisterPage() {
  const [data, setData] = useState({
    fullName: "",
    mobileNumber: "",
    dateOfBirth: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "fullName") {
      formattedValue = value.replace(
        /(^\w{1}|\s\w{1}|\.\s*\w{1}|,\s*\w{1}|-\s*\w{1})/g,
        (match) => match.toUpperCase()
      );
    }

    setData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(data.email)) {
      toast.error("Please enter a valid email!");
      return;
    }
    if (data.password.length < 8) {
      toast.error("Password must be at least 8 characters!");
      return;
    }

    try {
      const response = await registration(data);
      console.log(response.status);

      if (response.status === 409) {
        toast.error("The Email Already Exist");
        return;
      }

      if (response.status === 201) {
        navigate("/");
        toast.success("Registration successful!");
        setData({
          fullName: "",
          mobileNumber: "",
          dateOfBirth: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        return;
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="border-2 border-gray-300 bg-white flex items-center justify-center p-10 shadow-lg rounded-lg mt-24 mx-48">
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
      <div className="h-96 w-px bg-black"></div>

      {/* Right Side */}
      <div className="w-1/2 flex flex-col items-center ms-10 px-10 pt-3">
        <h2 className="text-xl font-bold mb-4">
          SIGN <span className="text-blue-500">UP</span>
        </h2>
        <form className="w-full flex flex-col items-center gap-4">
          <InputBar
            placeholder="Full Name"
            type="text"
            name="fullName"
            value={data.fullName}
            onChange={handleChange}
            className="w-96 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <InputBar
            placeholder="Mobile Number"
            type="text"
            name="mobileNumber"
            value={data.mobileNumber}
            onChange={handleChange}
            className="w-96 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <InputBar
            placeholder="Date of Birth"
            type="date"
            name="dateOfBirth"
            value={data.dateOfBirth}
            onChange={handleChange}
            className={`w-96 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
              data.dateOfBirth ? "text-black" : "text-gray-500"
            }`}
          />

          <InputBar
            placeholder="Email"
            type="text"
            name="email"
            value={data.email}
            onChange={handleChange}
            className="w-96 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <InputBar
            placeholder="Password"
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            className="w-96 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <InputBar
            placeholder="Confirm Password"
            type="password"
            name="confirmPassword"
            value={data.confirmPassword}
            onChange={handleChange}
            className="w-96 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <Button
            type="button"
            onClick={handleSubmit}
            name="SIGN UP"
            className=" w-96 p-2 ms-6  bg-blue-500 
        text-white font-semibold rounded-lg 
        shadow-md hover:bg-blue-600 
        focus:outline-none focus:ring-2 
        focus:ring-blue-400 focus:ring-opacity-75 
        transition duration-300 transform hover:scale-105"
          />
        </form>
        <p className="text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link to="/login" className="text-blue-500 font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
