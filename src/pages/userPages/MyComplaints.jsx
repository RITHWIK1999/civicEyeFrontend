import { useEffect, useState } from "react";
import { viewComplaintsByUser } from "../../api/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faTimesCircle, faCheckCircle, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

function MyComplaints() {
  const id = localStorage.getItem("id");
  const [complaints, setComplaints] = useState({
    pending: [],
    underinvestigation: [],
    rejected: [],
    solved: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      if (!id) return;

      try {
        const response = await viewComplaintsByUser(id);
        console.log(response.data.data);

        if (response) {
          const userComplaints = response.data.data;
          const categorizedComplaints = {
            pending: userComplaints.filter((c) => c.status.toLowerCase() === "pending"),
            underinvestigation: userComplaints.filter((c) => c.status.toLowerCase() === "under investigation"),
            rejected: userComplaints.filter((c) => c.status.toLowerCase() === "rejected"),
            solved: userComplaints.filter((c) => c.status.toLowerCase() === "complaint solved"),
          };
          setComplaints(categorizedComplaints);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load complaints");
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-32 text-blue-500 text-lg font-semibold">
        Loading complaints...
      </div>
    );

  if (error) return <p className="text-red-500 text-center font-semibold">{error}</p>;

  const statusStyles = {
    pending: { color: "text-yellow-600", bg: "bg-yellow-100", icon: faClock },
    underinvestigation: { color: "text-blue-600", bg: "bg-blue-100", icon: faExclamationTriangle },
    rejected: { color: "text-red-600", bg: "bg-red-100", icon: faTimesCircle },
    solved: { color: "text-green-600", bg: "bg-green-100", icon: faCheckCircle },
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-gray-100 to-gray-300">
      <h2 className="text-3xl font-bold text-center my-14 text-gray-800">My Complaints</h2>
      <div className=" md:grid-cols-2 gap-6 ">
        {["Pending", "Under Investigation", "Rejected", "Solved"].map((status) => {
          const key = status.toLowerCase().replace(" ", "");
          const { color, bg, icon } = statusStyles[key] || {};
          return (
            <div key={status} className={`p-5 mb-20 rounded-lg shadow-lg ${bg}`}>
              <div className="flex items-center gap-2 mb-3">
                <FontAwesomeIcon icon={icon} className={`${color} text-lg`} />
                <h3 className={`text-xl font-semibold ${color}`}>{status}</h3>
              </div>
              {complaints[key]?.length > 0 ? (
                <ul className="space-y-3">
                  {complaints[key].map((c) => (
                    <li key={c._id} className="p-4 bg-white shadow rounded-lg">
                      <h4 className="text-lg font-semibold text-gray-800">{c.complaintName}</h4>
                      <p className="text-gray-600 text-sm mt-1">{c.description}</p>
                      <div className="mt-2 text-gray-500 text-xs flex flex-wrap gap-2">
                        <span className="bg-gray-200 px-2 py-1 rounded">📅 {new Date(c.date).toLocaleDateString()}</span>
                        <span className="bg-gray-200 px-2 py-1 rounded">⏰ {c.time}</span>
                        <span className="bg-gray-200 px-2 py-1 rounded">📌 {c.type}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-center">No {status.toLowerCase()} complaints</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyComplaints;
