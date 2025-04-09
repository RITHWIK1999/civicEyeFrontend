import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { viewComplaintsByUser } from "../../api/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faClock, faTimesCircle, faCheckCircle, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

function UserReport() {
    const { id } = useParams();
    const navigate = useNavigate();
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
                
                if (!response || !response.data || !response.data.data) {
                    setLoading(false);
                    return;
                }

                const userComplaints = response.data.data;

                const categorizedComplaints = {
                    pending: userComplaints.filter((c) => c.status.toLowerCase() === "pending"),
                    underinvestigation: userComplaints.filter((c) => c.status.toLowerCase() === "under investigation"),
                    rejected: userComplaints.filter((c) => c.status.toLowerCase() === "rejected"),
                    solved: userComplaints.filter((c) => c.status.toLowerCase() === "complaint solved"),
                };

                setComplaints(categorizedComplaints);
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

    const allCategoriesEmpty = Object.values(complaints).every(arr => arr.length === 0);

    if (allCategoriesEmpty) {
        return (
            <div className="p-6 bg-gradient-to-b from-gray-100 to-gray-300 min-h-screen flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">No complaints have been registered by the user.</h2>
                <button
                    onClick={() => navigate(-1)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                >
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
                </button>
            </div>
        );
    }

    const statusStyles = {
        pending: { color: "text-yellow-600", bg: "bg-yellow-100", icon: faClock },
        underinvestigation: { color: "text-blue-600", bg: "bg-blue-100", icon: faExclamationTriangle },
        rejected: { color: "text-red-600", bg: "bg-red-100", icon: faTimesCircle },
        solved: { color: "text-green-600", bg: "bg-green-100", icon: faCheckCircle },
    };

    return (
        <div className="p-6 min-h-screen bg-gradient-to-b from-gray-100 to-gray-300">
            <button
                onClick={() => navigate(-1)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition flex items-center"
            >
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
            </button>

            <h2 className="text-4xl font-extrabold text-center my-12 text-gray-900 tracking-wide">Complaints</h2>
            
            <div className="md:grid-cols-2 gap-6">
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
export default UserReport;
