import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TopBar from "../../components/TopBar";
import img1 from "../../assets/topimg.png";
import img2 from "../../assets/contactimg.jpg";
import img3 from "../../assets/phone.jpg";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDumpster,
  faEnvelopeOpenText,
  faFileSignature,
  faMagnifyingGlass,
  faPhoneVolume,
  faTrafficLight,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCircleCheck,
  faCircleLeft,
  faCircleRight,
  faFileLines,
  faRegistered,
} from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  reviewSubmission,
  viewAllComplaints,
  viewAllReview,
} from "../../api/Api";

function HomePage() {
  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  const [complaints, setComplaints] = useState([]);
  const [totalComplaints, setTotalComplaints] = useState(0);
  const [totalUnderInvestigationCount, setTotalUnderInvestigationCount] =
    useState(0);
  const [totalSolvedCount, setTotalSolvedCount] = useState(0);

  const [review, setReview] = useState({
    review: "",
    createdBy: id,
  });
  const [reviewData, setReviewData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleReviews = 2;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id) {
      toast.error("Please log in to submit a review.");
      navigate("/login");
      return;
    }
    try {
      const response = await reviewSubmission(review);
      if (response.status === 200) {
        toast.success("Review submitted successfully!");
        setReview({ review: "", createdBy: id });
      } else {
        toast.error("Failed to submit review.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("An error occurred. Please try again.");
    }
  };
  const handleComplaintNavigation = (path) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to register a complaint.");
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  useEffect(() => {
    const complaintCount = async () => {
      try {
        const response = await viewAllComplaints();
        if (response?.status === 200 && response.data?.data) {
          const complaintsData = response.data.data;
          setComplaints(complaintsData);

          setTotalComplaints(complaintsData.length);
          setTotalUnderInvestigationCount(
            complaintsData.filter((c) => c.status === "Under Investigation")
              .length
          );
          setTotalSolvedCount(
            complaintsData.filter((c) => c.status === "Complaint Solved").length
          );
        } else {
          toast.error("Error occurred while fetching complaints");
        }
      } catch (error) {
        console.error("Error fetching complaints:", error);
        toast.error("Failed to load complaints. Please try again later.");
      }
    };

    complaintCount();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await viewAllReview();
        let reviews = response.data?.data;

        if (Array.isArray(reviews)) {
          const acceptedReviews = reviews.filter(
            (review) => review.status === "Accepted"
          );
          setReviewData(acceptedReviews);
        } else {
          console.error("Unexpected data format:", reviews);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  const nextReview = () => {
    if (currentIndex + visibleReviews < reviewData.length) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevReview = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
    "bg-orange-500",
    "bg-gray-500",
    "bg-lime-500",
    "bg-emerald-500",
    "bg-cyan-500",
    "bg-rose-500",
    "bg-sky-500",
    "bg-fuchsia-500",
    "bg-violet-500",
    "bg-amber-500",
    "bg-red-400",
    "bg-blue-400",
    "bg-green-400",
    "bg-yellow-400",
    "bg-purple-400",
    "bg-pink-400",
    "bg-indigo-400",
    "bg-teal-400",
  ];

  return (
    <div>
      <TopBar />
      <div>
        <img className="h-80 w-full" src={img1} alt="Top-Image" />
        <h1 className="bg-black text-white text-center text-7xl font-extrabold tracking-wide leading-tight font-[Poppins] italic">
          Make Your Voice Heard!
          <br />
          Report Problems, Help Your City,
          <br />
          and Earn Rewards!
        </h1>
      </div>
      <div>
      <motion.div 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
      >
        <h1 className="text-center text-5xl font-bold font-[Poppins] pt-20">
          Register Complaints
        </h1>
        </motion.div>
        <div className="flex justify-around gap-4 p-4 py-20">
          <button 
            className="flex flex-col items-center justify-center w-60 h-60 bg-white shadow-2xl rounded-2xl p-4 transition-transform transform hover:scale-105"
            onClick={() =>
              handleComplaintNavigation(
                `/complaint?complaintName=Waste Dumping`
              )
            }
          >
            <FontAwesomeIcon
              className="text-6xl text-black"
              icon={faDumpster}
            />
            <h1 className="text-xl font-bold mt-2 text-center">
              Waste Dumping
            </h1>
          </button>
          <button
            className="flex flex-col items-center justify-center w-60 h-60 bg-white shadow-2xl rounded-2xl p-4 transition-transform transform hover:scale-105"
            onClick={() =>
              handleComplaintNavigation(
                `/complaint?complaintName=Public Nuisance`
              )
            }
          >
            <FontAwesomeIcon
              className="text-6xl text-black"
              icon={faDumpster}
            />
            <h1 className="text-xl font-bold mt-2 text-center">
              Public Nuisance
            </h1>
          </button>

          <button
            className="flex flex-col items-center justify-center w-60 h-60 bg-white shadow-2xl rounded-2xl p-4 transition-transform transform hover:scale-105"
            onClick={() =>
              handleComplaintNavigation(
                `/complaint?complaintName=Traffic Violation`
              )
            }
          >
            <FontAwesomeIcon
              className="text-6xl text-black"
              icon={faTrafficLight}
            />
            <h1 className="text-xl font-bold mt-2 text-center">
              Traffic Violation
            </h1>
          </button>
          <button
            className="flex flex-col items-center justify-center w-60 h-60 bg-white shadow-2xl rounded-2xl p-4 transition-transform transform hover:scale-105"
            onClick={() =>
              handleComplaintNavigation(`/complaint?complaintName=`)
            }
          >
            <FontAwesomeIcon
              className="text-6xl text-black"
              icon={faFileLines}
            />
            <h1 className="text-xl font-bold mt-2 text-center">Others</h1>
          </button>
        </div>
      </div>

      <div>
        <h1 className="text-center text-5xl font-bold font-[Poppins] pt-20">
          Complaint Reports
        </h1>
        <div className="flex justify-around py-20">
          <div className="flex flex-col items-center justify-center w-70 h-80  border-2 bg-white shadow-xl rounded-2xl p-4">
            <FontAwesomeIcon
              className="text-4xl text-black py-2"
              icon={faRegistered}
            />
            <h1 className="text-center text-3xl font-bold">
              Complaints <br /> Registered
            </h1>
            <h1 className="text-8xl font-extrabold">{totalComplaints}</h1>
          </div>
          <div className="flex flex-col items-center justify-center w-70 h-80  border-2 bg-white shadow-xl rounded-2xl p-4">
            <FontAwesomeIcon
              className="text-4xl text-black py-2"
              icon={faFileSignature}
            />
            <h1 className="text-center text-3xl font-bold">
              Reports <br /> Filed
            </h1>
            <h1 className="text-8xl font-extrabold">{totalSolvedCount}</h1>
          </div>
          <div className="flex flex-col items-center justify-center w-70 h-80  border-2 bg-white shadow-xl rounded-2xl p-4">
            <FontAwesomeIcon
              className="text-4xl text-black py-2"
              icon={faCircleCheck}
            />
            <h1 className="text-center text-3xl font-bold">
              Solved
              <br />
              Complaints
            </h1>
            <h1 className="text-8xl font-extrabold">{totalSolvedCount}</h1>
          </div>
          <div className="flex flex-col items-center justify-center w-70 h-80  border-2 bg-white shadow-xl rounded-2xl p-4">
            <FontAwesomeIcon
              className="text-4xl text-black py-2"
              icon={faMagnifyingGlass}
            />

            <h1 className="text-center text-3xl font-bold">
              Under
              <br />
              Investigation
            </h1>
            <h1 className="text-8xl font-extrabold">
              {totalUnderInvestigationCount}
            </h1>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-center text-5xl font-bold font-[Poppins] pt-10">
          What We Do ?
        </h1>
        <div className="flex justify-around py-20 items-center">
          <div className="text-center h-40 w-64 border-2 font-semibold rounded-xl border-blue-500 p-6 flex items-center justify-center">
            <span>You Register the Complaint</span>
          </div>
          <div className="text-center h-40 w-64 border-2 font-semibold rounded-xl border-blue-500 p-6 flex items-center justify-center">
            <span>
              Our Team Verifies the <br />
              Complaint and shares it
              <br /> to the responsible
              <br /> authorities
            </span>
          </div>
          <div className="text-center h-40 w-64 border-2 font-semibold rounded-xl border-blue-500 p-6 flex items-center justify-center">
            <span>
              The responsible authorities
              <br />
              processes the complaint.
            </span>
          </div>
          <div className="text-center h-40 w-64 border-2 font-semibold rounded-xl border-blue-500 p-6 flex items-center justify-center">
            <span>
              Your Incentive is <br />
              provided once the
              <br /> complaint is processed
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center p-6 space-y-6">
        <h1 className="text-center text-5xl font-bold font-[Poppins] pb-5">
          What Our Users Have To Say
        </h1>
        <div className="relative flex items-center w-full max-w-3xl ">
          <button className="absolute left-0 pe-10 " onClick={prevReview}>
            <FontAwesomeIcon className="text-4xl" icon={faCircleLeft} />
          </button>

          <div className="flex space-x-6 overflow-hidden w-full justify-center py-5">
            {reviewData
              .slice(currentIndex, currentIndex + visibleReviews)
              .map((review, index) => {
                const colorIndex =
                  (review.createdBy.charCodeAt(0) + review.createdBy.length) %
                  colors.length;
                return (
                  <div
                    key={index}
                    className="border p-4 rounded-lg shadow-lg w-80"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-12 h-12 ${colors[colorIndex]} rounded-full flex items-center justify-center font-bold text-white text-lg`}
                      >
                        {review.createdBy[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold">{review.createdBy}</p>
                        <p>{review.review}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <button className="absolute right-0 ps-10 " onClick={nextReview}>
            <FontAwesomeIcon className="text-4xl" icon={faCircleRight} />
          </button>
        </div>
        <div className="w-full max-w-lg">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center space-y-4"
          >
            <textarea
              className="w-full border p-4 rounded-lg shadow-md"
              placeholder="Write your feedback"
              rows="4"
              name="review"
              value={review.review}
              onChange={handleChange}
            ></textarea>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600">
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="flex justify-around py-20">
        <div className="flex shadow-2xl">
          <div>
            <img className="h-72" src={img2} alt="support email" />
          </div>
          <div className="p-5 text-center">
            <FontAwesomeIcon className="text-5xl" icon={faEnvelopeOpenText} />
            <h1 className="text-3xl font-bold py-5">Support Mail</h1>
            <span className="text-gray-600">
              For any assistance or inquiries about <br /> reporting issues or
              using Civic Eye,
              <br /> feel free to reach out to us.
            </span>
            <h1 className="text-blue-500 font-bold text-xl pt-3">
              support@civiceye.com
            </h1>
          </div>
        </div>
        <div className="flex shadow-2xl">
          <div>
            <img className="h-72" src={img3} alt="support email" />
          </div>
          <div className="p-5 text-center">
            <FontAwesomeIcon className="text-5xl" icon={faPhoneVolume} />
            <h1 className="text-3xl font-bold py-5">Make A Call</h1>
            <span className="text-gray-600">
              For any assistance or inquiries about <br /> reporting issues or
              using Civic Eye,
              <br /> feel free to reach out to us.
            </span>
            <h1 className="text-blue-500 font-bold text-xl pt-3">
              (+91) 987-654-3215
            </h1>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default HomePage;
