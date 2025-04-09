import {
  faCalendarDays,
  faCircleCheck,
  faClock,
} from "@fortawesome/free-regular-svg-icons";
import {
  faChevronLeft,
  faChevronRight,
  faFileCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { viewAllComplaints } from "../../api/Api";
import toast from "react-hot-toast";

function Overview() {
  const userName = localStorage.getItem("userName");
  const [barData, setBarData] = useState([
    { name: "Jan", value: 0 },
    { name: "Feb", value: 0 },
    { name: "Mar", value: 0 },
    { name: "Apr", value: 0 },
    { name: "May", value: 0 },
    { name: "Jun", value: 0 },
    { name: "Jul", value: 0 },
    { name: "Aug", value: 0 },
    { name: "Sep", value: 0 },
    { name: "Oct", value: 0 },
    { name: "Nov", value: 0 },
    { name: "Dec", value: 0 },
  ]);

  const [pieData, setPieData] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  // State for counts
  const [thisMonthCount, setThisMonthCount] = useState(0);
  const [totalUnderInvestigationCount, setTotalUnderInvestigationCount] =
    useState(0);
  const [totalPendingCount, setTotalPendingCount] = useState(0);
  const [totalRejectedCount, setTotalRejectedCount] = useState(0);

  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await viewAllComplaints();
        if (response?.status === 200 && response.data?.data) {
          const complaintsData = response.data.data;
          setComplaints(complaintsData);

          filterPieChartData(complaintsData, selectedMonth, selectedYear);
          aggregateMonthlyData(complaintsData);
          calculateCounts(complaintsData, selectedMonth, selectedYear);
        } else {
          toast.error("Error occurred while fetching complaints");
        }
      } catch (error) {
        console.error("Error fetching complaints:", error);
        toast.error("Failed to load complaints. Please try again later.");
      }
    };

    fetchComplaints();
  }, [selectedMonth, selectedYear]);

  const filterPieChartData = (complaints, month, year) => {
    const filteredComplaints = complaints.filter((complaint) => {
      const complaintDate = new Date(complaint.date);
      return (
        complaintDate.getMonth() === month &&
        complaintDate.getFullYear() === year
      );
    });

    const districtCounts = {};
    filteredComplaints.forEach((complaint) => {
      const district = complaint.district;
      if (district) {
        districtCounts[district] = (districtCounts[district] || 0) + 1;
      }
    });

    const colors = [
      "#4169E1",
      "#FFA500",
      "#FFB6C1",
      "#FFD700",
      "#32CD32",
      "#8A2BE2",
    ];
    const formattedData = Object.keys(districtCounts).map(
      (district, index) => ({
        name: district,
        value: districtCounts[district],
        color: colors[index % colors.length],
      })
    );

    setPieData(formattedData);
  };

  const calculateCounts = (complaints, month, year) => {
    // Get only complaints for the selected month
    const filteredComplaints = complaints.filter((complaint) => {
      const complaintDate = new Date(complaint.date);
      return (
        complaintDate.getMonth() === month &&
        complaintDate.getFullYear() === year
      );
    });

    // Set count for complaints this month
    setThisMonthCount(filteredComplaints.length);

    // Total counts for all time (not filtered by month)
    setTotalUnderInvestigationCount(
      complaints.filter((c) => c.status === "Under Investigation").length
    );
    setTotalPendingCount(
      complaints.filter((c) => c.status === "Pending").length
    );
    setTotalRejectedCount(
      complaints.filter((c) => c.status === "Rejected").length
    );
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear((prev) => prev + 1);
    } else {
      setSelectedMonth((prev) => prev + 1);
    }
  };

  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear((prev) => prev - 1);
    } else {
      setSelectedMonth((prev) => prev - 1);
    }
  };

  const aggregateMonthlyData = (complaints) => {
    const monthlyCounts = Array(12).fill(0);

    complaints.forEach((complaint) => {
      if (complaint.date) {
        const monthIndex = new Date(complaint.date).getMonth();
        monthlyCounts[monthIndex] += 1;
      }
    });

    const updatedBarData = barData.map((item, index) => ({
      ...item,
      value: monthlyCounts[index],
    }));

    setBarData(updatedBarData);
  };

  return (
    <div>
      <div className="p-10">
        <h1 className="text-xl font-bold">Welcome , {userName} </h1>
      </div>
      <div className="grid grid-cols-4 gap-5 px-10">
        <div className="bg-amber-50 rounded-2xl p-5 flex flex-col items-center w-full relative">
          <div className="flex justify-between w-full text-xl font-bold">
            <h1>
              {selectedMonth === new Date().getMonth() &&
              selectedYear === new Date().getFullYear()
                ? "This Month"
                : new Date(selectedYear, selectedMonth).toLocaleString(
                    "default",
                    {
                      month: "long",
                      year: "numeric",
                    }
                  )}
            </h1>
            <button onClick={() => setShowMonthPicker(!showMonthPicker)}>
              <FontAwesomeIcon className="text-2xl" icon={faCalendarDays} />
            </button>
          </div>
          <h1 className="text-7xl pt-5 font-extrabold">{thisMonthCount}</h1>

          {showMonthPicker && (
            <div className="absolute top-20 right-0 bg-white border p-4 rounded-xl shadow-md z-10">
              <div className="flex flex-col space-y-2">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                  className="border p-1 rounded"
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <option value={i} key={i}>
                      {new Date(0, i).toLocaleString("default", {
                        month: "long",
                      })}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  className="border p-1 rounded"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                />
                <button
                  onClick={() => setShowMonthPicker(false)}
                  className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-amber-50 rounded-2xl p-5 flex flex-col items-center w-full">
          <div className="flex justify-between w-full text-xl font-bold">
            <h1>Verified Cases</h1>
            <h1>
              <FontAwesomeIcon
                className="text-2xl text-extrabold"
                icon={faCircleCheck}
              />
            </h1>
          </div>
          <h1 className="text-7xl pt-5 font-extrabold">
            {totalUnderInvestigationCount}
          </h1>
        </div>
        <div className="bg-amber-50 rounded-2xl p-5 flex flex-col items-center w-full">
          <div className="flex justify-between w-full text-xl font-bold">
            <h1>Pending</h1>
            <h1>
              <FontAwesomeIcon className="text-2xl" icon={faClock} />
            </h1>
          </div>
          <h1 className="text-7xl pt-5 font-extrabold">{totalPendingCount}</h1>
        </div>

        <div className="bg-amber-50 rounded-2xl p-5 flex flex-col items-center w-full">
          <div className="flex justify-between w-full text-xl font-bold">
            <h1>Rejected</h1>
            <h1>
              <FontAwesomeIcon className="text-2xl" icon={faFileCircleXmark} />
            </h1>
          </div>
          <h1 className="text-7xl pt-5 font-extrabold">{totalRejectedCount}</h1>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <h3 className="text-xl font-bold text-center mb-2">Month Review</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#007bff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <div className="flex justify-between items-center mb-2">
            <button
              onClick={handlePrevMonth}
              className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            <h3 className="text-xl font-bold">
              {new Date(selectedYear, selectedMonth).toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h3>

            <button
              onClick={handleNextMonth}
              className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Overview;
