import React, { useEffect, useState } from "react";
import img from "../../assets/logo.png";
import { updateUser, viewUser } from "../../api/Api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function UserProfile() {
  const id = localStorage.getItem("id");

  const [userData, setUserData] = useState({
    fullName: "",
    nickName: "",
    mobileNumber: "",
    email: "",
    dateOfBirth: "",
    job: "",
    address: "",
    district: "",
    state: "",
    idProof: "",
    idProofNumber: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const viewUserData = async () => {
    if (!id) return;
    try {
      const response = await viewUser(id);
      console.log("Fetched User Data:", response);
      setUserData(response.data.data);
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (id) {
      viewUserData();
    }
  }, [id]);

  const handleChange = (e) => {
    if (!isEditing) return;
    const { name, value } = e.target;
    let formattedValue = value;
    if (name === "fullName" || "nickName" || "address") {
      formattedValue = value.replace(/(^\w{1}|\s\w{1}|\.\s*\w{1}|,\s*\w{1}|-\s*\w{1})/g, match => match.toUpperCase());
    }
  
    setUserData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !userData.fullName ||
      !userData.nickName ||
      !userData.mobileNumber ||
      !userData.dateOfBirth ||
      !userData.email ||
      !userData.job ||
      !userData.address ||
      !userData.district ||
      !userData.state ||
      !userData.idProof ||
      !userData.idProofNumber
    ) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const response = await updateUser(id, userData);
      console.log("Updated Data:", response);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile!");
    }
  };

  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
    className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 pb-10"
  >
    <div className="p-5 pt-10">
      <motion.img
        className="h-14"
        src={img}
        alt="Logo"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
    </div>
    <motion.div
        className="space-y-6 mx-32 border-2 border-gray-300 bg-white p-10 shadow-lg rounded-lg my-10"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
      <div className="flex justify-center gap-36 pt-12">
        <div className="space-y-6">
          <div className="relative w-96">
            <motion.input
              type="text"
              name="fullName"
              value={userData.fullName}
              onChange={handleChange}
              disabled={!isEditing}
              className="peer w-full p-2  border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-transparent pt-5"
              placeholder="Full Name"
              whileHover={{ scale: 1.02 }}
            />
            <label className="absolute left-2 top-0 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:pb-5 peer-focus:text-xs peer-focus:text-blue-500">
              Full Name
            </label>
          </div>
          <div className="relative w-96">
            <input
              type="text"
              name="nickName"
              value={userData.nickName}
              onChange={handleChange}
              disabled={!isEditing}
              className="peer w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-transparent pt-5"
              placeholder="Nick Name"
            />
            <label className="absolute left-2 top-0 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500">
              Nick Name
            </label>
          </div>
          <div className="relative w-96">
            <input
              type="text"
              name="mobileNumber"
              value={userData.mobileNumber}
              onChange={handleChange}
              disabled={!isEditing}
              className="peer w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-transparent pt-5"
              placeholder="Mobile Number"
            />
            <label className="absolute left-2 top-0 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500">
              Mobile Number
            </label>
          </div>
          <div className="relative w-96">
            <input
              type="text"
              name="email"
              value={userData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className="peer w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-transparent pt-5"
              placeholder="Email"
            />
            <label className="absolute left-2 top-0 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500">
              Email
            </label>
          </div>
          <div className="relative w-96">
  <input
    type="date"
    name="dateOfBirth"
    value={userData.dateOfBirth || ""}
    onChange={handleChange}
    disabled={!isEditing}
    className="peer w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black pt-5"
    aria-label="Date of Birth"
  />
  <label
    className={`absolute left-2 top-0 text-gray-500 text-sm transition-all ${
      userData.dateOfBirth ? "text-xs text-gray-500" : "text-base text-black top-0"
    } peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500`}
  >
    Date Of Birth
  </label>
</div>
<div className="relative w-96">
  <select
    name="job"
    value={userData.job}
    onChange={handleChange}
    disabled={!isEditing}
    className={`w-full p-2 border border-black rounded-lg focus:ring-2 focus:text-black focus:ring-blue-500 focus:outline-none py-4 ${
      !userData.job ? "text-gray-500" : "text-black"
    }`}
  >
    <option value="">Job</option>
    <option value="Housewife">Housewife</option>
    <option value="Student">Student</option>
    <option value="Government Employee">Government Employee</option>
    <option value="Private Employee">Private Employee</option>
    <option value="Self-Employed">Self-Employed</option>
    <option value="Unemployed">Unemployed</option>
    <option value="Freelancer">Freelancer</option>
    <option value="Retired">Retired</option>
    <option value="Other">Other</option>
  </select>
</div>


        </div>
        <div className="h-auto w-px bg-black"></div>
        <div className="space-y-5">
          <div className="relative w-96">
            <textarea
              name="address"
              value={userData.address}
              onChange={handleChange}
              disabled={!isEditing}
              className="peer w-full h-32 p-4 pt-8 border  rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-transparent"
              placeholder="Address"
            ></textarea>
            <label className="absolute left-4 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-500">
              Address
            </label>
          </div>

          <div className="relative w-96">
            <select
              name="state"
              value={userData.state}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full p-2 border border-black font-normal rounded-lg focus:ring-2 focus:text-black focus:ring-blue-500 focus:outline-none py-4 
      ${!userData.state ? "text-gray-500" : "text-black"}`}
            >
              <option value="" disabled>
                State
              </option>
              {[
                "Andhra Pradesh",
                "Arunachal Pradesh",
                "Assam",
                "Bihar",
                "Chhattisgarh",
                "Goa",
                "Gujarat",
                "Haryana",
                "Himachal Pradesh",
                "Jharkhand",
                "Karnataka",
                "Kerala",
                "Madhya Pradesh",
                "Maharashtra",
                "Manipur",
                "Meghalaya",
                "Mizoram",
                "Nagaland",
                "Odisha",
                "Punjab",
                "Rajasthan",
                "Sikkim",
                "Tamil Nadu",
                "Telangana",
                "Tripura",
                "Uttar Pradesh",
                "Uttarakhand",
                "West Bengal",
                "Andaman and Nicobar Islands",
                "Chandigarh",
                "Dadra and Nagar Haveli and Daman and Diu",
                "Lakshadweep",
                "Delhi",
                "Puducherry",
                "Ladakh",
                "Jammu and Kashmir",
              ].map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div className="relative w-96">
            <select
              name="district"
              value={userData.district}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full p-2  border border-black rounded-lg focus:ring-2  focus:text-black focus:ring-blue-500 focus:outline-none py-4 ${
                !userData.district ? "text-gray-500" : "text-black"
              }`}
            >
              <option value="">District</option>
              <option value="Thiruvananthapuram">Thiruvananthapuram</option>
              <option value="Kollam">Kollam</option>
              <option value="Pathanamthitta">Pathanamthitta</option>
              <option value="Alappuzha">Alappuzha</option>
              <option value="Kottayam">Kottayam</option>
              <option value="Idukki">Idukki</option>
              <option value="Ernakulam">Ernakulam</option>
              <option value="Thrissur">Thrissur</option>
              <option value="Palakkad">Palakkad</option>
              <option value="Malappuram">Malappuram</option>
              <option value="Kozhikode">Kozhikode</option>
              <option value="Wayanad">Wayanad</option>
              <option value="Kannur">Kannur</option>
              <option value="Kasaragod">Kasaragod</option>
            </select>
          </div>

          <div className="relative w-96">
            <select
              name="idProof"
              value={userData.idProof}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full p-2 border border-black rounded-lg focus:ring-2 focus:text-black focus:ring-blue-500 focus:outline-none py-4 ${!userData.state ? "text-gray-500" : "text-black"}`}
            >
              <option value="">ID Proof</option>
              <option value="Aadhar Card">Aadhar Card</option>
              <option value="Passport">Passport</option>
              <option value="Driving License">Driving License</option>
              <option value="Voter ID">Voter ID</option>
            </select>
          </div>
          <div className="relative w-96">
            <input
              type="text"
              name="idProofNumber"
              value={userData.idProofNumber}
              onChange={handleChange}
              disabled={!isEditing}
              className="peer w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-transparent pt-5"
              placeholder="ID Proof Number"
            />
            <label className="absolute left-2 top-0 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500">
              ID Proof Number
            </label>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-6 pt-12">
          {!isEditing ? (
            <motion.button
              onClick={handleEdit}
              className="w-62 bg-blue-500 text-white text-lg font-semibold px-6 py-2 rounded-lg hover:bg-blue-600 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Edit
            </motion.button>
          ) : (
            <motion.button
              onClick={handleSubmit}
              className="w-62 bg-green-500 text-white text-lg font-semibold px-6 py-2 rounded-lg hover:bg-green-600 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Submit
            </motion.button>
          )}
        </div>
        </motion.div>
      </motion.div>
  );
}

export default UserProfile;
