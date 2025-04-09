import React, { useEffect, useState } from "react";
import { updateReviewStatus, viewAllReview } from "../../api/Api";

const Feedback = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await viewAllReview();
      console.log(response);
      
      if (response.status === 200) {
        setReviews(response.data.data);
      } else {
        setError("Failed to fetch reviews");
      }
    } catch (err) {
      setError("Error fetching reviews");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      const response = await updateReviewStatus(id, status);
      if (response.status === 200) {
        fetchReviews();
      } else {
        alert("Failed to update status");
      }
    } catch (err) {
      alert("Error updating status");
    }
  };

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>{error}</p>;

  const getStatusColor = (status) => {
    switch (status) {
      case "Accepted":
        return "text-green-500 ";
      case "Rejected":
        return "text-red-500";
      case "Pending":
        return "text-yellow-500";
      default:
        return "text-gray-300";
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Feedback</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-300 text-gray-700">
              <th className="p-3 text-center">User</th>
              <th className="p-3 text-center">Feedback</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <tr key={review._id} className="even:bg-gray-100 hover:bg-gray-200 transition duration-200">
                  <td className="p-3 text-center">{review.createdBy}</td>
                  <td className="p-3 text-center">{review.review}</td>
                  <td  className={`p-3 text-center  ${getStatusColor(review.status )}`}>{review.status}</td>
                  <td className="p-3 text-center">
                    {review.status === "Pending" && (
                      <div className="flex  justify-center space-x-2">
                        <button
                          className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300 transform hover:scale-105"
                          onClick={() =>
                            handleUpdateStatus(review._id, "Accepted")
                          }
                        >
                          Accept
                        </button>
                        <button
                          className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300 transform hover:scale-105"
                          onClick={() =>
                            handleUpdateStatus(review._id, "Rejected")
                          }
                        >
                          Reject
                        </button>
                      </div>
                    )}

                    {review.status === "Accepted" && (
                      <button
                        className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300 transform hover:scale-105"
                        onClick={() =>
                          handleUpdateStatus(review._id, "Rejected")
                        }
                      >
                        Reject
                      </button>
                    )}

                    {review.status === "Rejected" && (
                      <button
                        className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300 transform hover:scale-105"
                        onClick={() =>
                          handleUpdateStatus(review._id, "Accepted")
                        }
                      >
                        Accept
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-3 text-center text-gray-500">
                  No feedback available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Feedback;
