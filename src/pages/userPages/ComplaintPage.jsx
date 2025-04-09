import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { complaintRegister } from "../../api/Api";
import { motion } from "framer-motion";

function ComplaintPage() {
  const location = useLocation();
  const { category } = useParams();
  const queryParams = new URLSearchParams(location.search);
  const complaintType = queryParams.get("complaintName") || "";
  const id = localStorage.getItem("id");
  const navigate = useNavigate();

  const [data, setData] = useState({
    complaintName: "",
    type: "",
    description: "",
    district: "",
    location: "",
    landmark: "",
    date: "",
    time: "",
    period: "",
    createdBy: id,
  });
  const [proof, setProof] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  
  useEffect(() => {
    if (complaintType) {
      setData((prevData) => ({
        ...prevData,
        complaintName: complaintType,
        type: "",
      }));
    }
  }, [complaintType]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      setProof(file);
      setFileUrl(URL.createObjectURL(file)); // Preview file
    } else {
      setData({
        ...data,
        [name]: value,
      });
    }
  };
  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setProof(file);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();

      formData.append("complaintName", data.complaintName);
      formData.append("type", data.type);
      formData.append("description", data.description);
      formData.append("district", data.district);
      formData.append("location", data.location);
      formData.append("landmark", data.landmark);
      formData.append("date", data.date);
      formData.append("time", data.time);
      formData.append("period", data.period);
      formData.append("createdBy", data.createdBy);

      if (proof) {
        formData.append("proof", proof);
      }

      const response = await complaintRegister(formData);
      console.log(response);

      if (response.status === 201) {
        toast.success("Complaint submitted successfully!");
        navigate("/");
      } else {
        toast.error("Failed to submit complaint. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while submitting the complaint.");
      console.error(error);
    }
};


  const typeOptions = {
    "Waste Dumping": [
      "Household Waste",
      "Industrial Waste",
      "Medical Waste",
      "Plastic Waste",
      "E-Waste",
      "Hazardous Waste",
      "Agricultural Waste",
      "Construction and Demolition Waste",
      "Radioactive Waste",
      "Mining Waste",
      "Sewage and Sludge Waste",
      "Oil and Chemical Waste",
      "Textile Waste",
      "Food Waste",
      "Marine Waste",
      "Airborne Waste",
    ],

    "Public Nuisance": [
      "Noise Pollution",
      "Vandalism",
      "Encroachment",
      "Illegal Construction",
      "Littering",
      "Air Pollution",
      "Water Pollution",
      "Traffic Congestion",
      "Unauthorized Street Vendors",
      "Open Defecation",
      "Illegal Dumping",
      "Smoking in Public Places",
      "Obstruction of Public Pathways",
      "Light Pollution",
      "Uncontrolled Pet Waste",
      "Public Drunkenness",
      "Graffiti",
      "Unauthorized Protests or Gatherings",
    ],

    "Traffic Violation": [
      "Signal Jumping",
      "Over Speeding",
      "Wrong Parking",
      "Rash Driving",
      "Driving Without a License",
      "Drunk Driving",
      "Using Mobile While Driving",
      "Not Wearing a Seatbelt",
      "Not Wearing a Helmet",
      "Driving Without Insurance",
      "Violating Lane Discipline",
      "Overloading Vehicles",
      "Driving on the Wrong Side",
      "Blocking Emergency Vehicles",
      "Hit and Run",
      "Tailgating",
      "Ignoring Pedestrian Crossings",
      "Driving Without Headlights at Night",
      "Illegal U-Turns",
      "Failure to Yield Right of Way",
    ],
  };

  return (
    <motion.div 
    className="flex flex-col items-center justify-center bg-gray-100 p-5 min-h-screen"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  > 
             <motion.div className="text-center" initial={{ y: -50 }} animate={{ y: 0 }} transition={{ duration: 0.8 }}>

        <h1 className="text-6xl font-bold py-10 font-[Poppins]">
          Report Issues Seamlessly
        </h1>
        <h5 className="text-3xl font-extralight italic font-[Poppins]">
          Our platform empowers users to submit complaints with ease, offering
          tools to upload multimedia for <br />
          comprehensive issue reporting.
        </h5>
        </motion.div>

        <motion.div className="mt-10 w-full max-w-2xl" initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 border-2 border-gray-300 bg-white p-10 shadow-lg rounded-lg"
        >
           <motion.h2 className="text-4xl font-extrabold text-center pb-6 text-gray-800 tracking-wide font-[Poppins]" 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            Complaint Form
          </motion.h2>

          <motion.div whileHover={{ scale: 1.05 }}>
            <label className="block text-gray-700 font-semibold pb-2 text-xl">
              Complaint Name:
            </label>
            <input
              type="text"
              name="complaintName"
              value={data.complaintName}
              onChange={handleChange}
              className="block w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-400"
              placeholder="Enter your Complaint Name"
              readOnly={!!complaintType}
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }}>
            <label className="block text-gray-700 font-semibold pb-2 text-xl">
              Type:
            </label>
            {typeOptions[data.complaintName] ? (
              <select
                name="type"
                value={data.type}
                onChange={handleChange}
                className="block w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Select Type</option>
                {typeOptions[data.complaintName].map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                name="type"
                value={data.type}
                onChange={handleChange}
                className="block w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter Type"
              />
            )}
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }}>
            <label className="block text-gray-700 font-semibold pb-2 text-xl">
              Description:
            </label>
            <input
              type="text"
              name="description"
              value={data.description}
              onChange={handleChange}
              className="block w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-400"
              placeholder="Enter the Details"
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }}>
            <label className="block text-gray-700 font-semibold pb-2 text-xl">
              District:
            </label>
            <select
              name="district"
              value={data.district}
              onChange={handleChange}
              className={`block w-full p-2 border rounded-lg focus:ring-2 focus:text-black focus:ring-blue-500 focus:outline-none ${
                !data.district ? "text-gray-500" : "text-black"
              }`}
            >
              <option value="">Select your district</option>
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
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }}>
            <label className="block text-gray-700 font-semibold pb-2 text-xl">
              Location:
            </label>
            <input
              type="text"
              name="location"
              value={data.location}
              onChange={handleChange}
              className="block w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-400"
              placeholder="Enter your location"
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }}>
            <label className="block text-gray-700 font-semibold pb-2 text-xl">
              Landmark:
            </label>
            <input
              type="text"
              name="landmark"
              value={data.landmark}
              onChange={handleChange}
              className="block w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-400"
              placeholder="Enter the Landmark"
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }}>
            <label className="block text-gray-700 font-semibold pb-2 text-xl">
              Date:
            </label>
            <input
              type="date"
              name="date"
              value={data.date}
              onChange={handleChange}
              className={`block w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                !data.date ? "text-gray-500" : "text-black"
              }`}
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }}>
            <label className="block text-gray-700 font-semibold pb-2 text-xl">
              Time:
            </label>
            <div className="flex space-x-2">
              <input
                type="time"
                name="time"
                value={data.time}
                onChange={handleChange}
                className={`block w-3/4 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  !data.time ? "text-gray-500" : "text-black"
                }`}
              />
              <select
                name="period"
                value={data.period || ""}
                onChange={handleChange}
                className={`block w-1/4 p-2 border rounded-lg focus:text-black focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  !data.period ? "text-gray-500" : "text-black"
                }`}
              >
                <option value="" disabled hidden>
                  AM/PM
                </option>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }}>
            <label className="block text-gray-700 font-semibold pb-2 text-xl">
              Proof:
            </label>
            <input
              type="file"
              name="proof"
              accept="image/*, video/*"
              onChange={handleChange}
              className="block w-full p-2 border rounded-lg"
            />
            {fileUrl && (
               <motion.div className="mt-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {proof?.type.startsWith("image") ? (
                  <img
                    src={fileUrl}
                    alt="Uploaded"
                    className="w-full max-h-64 object-contain rounded-lg"
                  />
                ) : (
                  <video controls className="w-full max-h-64 rounded-lg">
                    <source src={fileUrl} type={proof?.type} />
                    Your browser does not support the video tag.
                  </video>
                )}
              </motion.div>
            )}
          </motion.div>

          <motion.div className="flex justify-between" whileHover={{ scale: 1.05 }}>            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md w-1/2 mr-2"
            >
              Submit
            </button>
            <button
              type="button"
              className="bg-gray-300 px-4 py-2 rounded-md w-1/2"
            >
              Cancel
            </button>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default ComplaintPage;
