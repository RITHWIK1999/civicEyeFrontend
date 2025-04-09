import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { viewAllComplaints } from "../../api/Api";
import * as XLSX from "xlsx";
import { useRef } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Complaint() {
  const [complaintsData, setComplaintsData] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [filterType, setFilterType] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();

  const fetchUserComplaints = async () => {
    try {
      const response = await viewAllComplaints();
      if (response.status === 200) {
        const data = response.data.data || [];
        setComplaintsData(data);
        setSearchResults(data);
      } else {
        alert("Error occurred while fetching data");
      }
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  useEffect(() => {
    fetchUserComplaints();
  }, []);

  const handleView = (id) => {
    navigate(`/viewuser/${id}`);
  };

  const sortByDate = (order) => {
    setSearchResults((prevData) =>
      [...prevData].sort((a, b) =>
        order === "asc"
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date)
      )
    );
    setSortOrder(order);
  };

  const filterByType = (type) => {
    setFilterType(type);
  };

  const filterByStatus = (status) => {
    setStatusFilter(status);
  };

  const handleSearch = () => {
    const lowerQuery = searchQuery.toLowerCase();
    const filtered = complaintsData.filter((complaint) =>
      Object.values(complaint).some((val) =>
        String(val).toLowerCase().includes(lowerQuery)
      )
    );
    setSearchResults(filtered);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Under Investigation":
        return "text-green-500";
      case "Rejected":
        return "text-red-500";
      case "Pending":
        return "text-yellow-500";
      case "Complaint Solved":
        return "text-blue-500";
      default:
        return "text-gray-300";
    }
  };

  const filteredComplaints = searchResults.filter((complaint) => {
    return (
      (filterType === "all" || complaint.complaintName === filterType) &&
      (statusFilter === "all" || complaint.status === statusFilter)
    );
  });

  const exportToExcel = () => {
    const exportData = filteredComplaints.map((complaint) => {
      const row = {};
      if (visibleColumns.date)
        row["Date"] = new Date(complaint.date).toLocaleDateString();
      if (visibleColumns.complaintName)
        row["Complaint Name"] = complaint.complaintName;
      if (visibleColumns.district) row["District"] = complaint.district;
      if (visibleColumns.location) row["Location"] = complaint.location;
      if (visibleColumns.createdBy) row["Uploader"] = complaint.createdBy;
      if (visibleColumns.type) row["Type"] = complaint.type;
      if (visibleColumns.status) row["Status"] = complaint.status;
      return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Complaints");
    XLSX.writeFile(workbook, "ComplaintsData.xlsx");
  };

  const [visibleColumns, setVisibleColumns] = useState({
    date: true,
    complaintName: true,
    district: true,
    location: true,
    createdBy: true,
    type: true,
    status: true,
    actions: true,
  });

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  const exportToPDF = () => {
    const doc = new jsPDF("landscape");
  
    const tableColumn = [];
    const tableRows = [];
  
    if (visibleColumns.date) tableColumn.push("Date");
    if (visibleColumns.complaintName) tableColumn.push("Complaint Name");
    if (visibleColumns.district) tableColumn.push("District");
    if (visibleColumns.location) tableColumn.push("Location");
    if (visibleColumns.createdBy) tableColumn.push("Uploader");
    if (visibleColumns.type) tableColumn.push("Type");
    if (visibleColumns.status) tableColumn.push("Status");
  
    filteredComplaints.forEach((complaint) => {
      const rowData = [];
      if (visibleColumns.date)
        rowData.push(new Date(complaint.date).toLocaleDateString());
      if (visibleColumns.complaintName) rowData.push(complaint.complaintName);
      if (visibleColumns.district) rowData.push(complaint.district);
      if (visibleColumns.location) rowData.push(complaint.location);
      if (visibleColumns.createdBy) rowData.push(complaint.createdBy);
      if (visibleColumns.type) rowData.push(complaint.type);
      if (visibleColumns.status) rowData.push(complaint.status);
  
      tableRows.push(rowData);
    });
  
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      styles: {
        fontSize: 9,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [40, 60, 100],
        textColor: 255,
        fontStyle: "bold",
      },
      startY: 20,
      margin: { top: 20, left: 10, right: 10 },
      theme: "grid",
    });
  
    doc.save("ComplaintsData.pdf");
  };
  
  
  return (
    <div className="p-6">
      <div className="flex items-center mb-4 space-x-4">
        <select
          className="px-4 py-2 bg-white text-gray-900 font-semibold rounded-lg shadow-md border border-gray-300"
          onChange={(e) => sortByDate(e.target.value)}
          value={sortOrder}
        >
          <option value="desc">Sort by Date (Newest)</option>
          <option value="asc">Sort by Date (Oldest)</option>
        </select>

        <select
          className="px-4 py-2 bg-white text-gray-900 font-semibold rounded-lg shadow-md border border-gray-300"
          onChange={(e) => filterByType(e.target.value)}
          value={filterType}
        >
          <option value="all">Sort By Types</option>
          <option value="Waste Dumping">Waste Dumping</option>
          <option value="Public Nuisance">Public Nuisance</option>
          <option value="Traffic Violation">Traffic Violation</option>
          <option value="Other">Other</option>
        </select>

        <select
          className="px-4 py-2 bg-white text-gray-900 font-semibold rounded-lg shadow-md border border-gray-300"
          onChange={(e) => filterByStatus(e.target.value)}
          value={statusFilter}
        >
          <option value="all">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Under Investigation">Under Investigation</option>
          <option value="Complaint Solved">Complaint Solved</option>
          <option value="Rejected">Rejected</option>
        </select>
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pr-10 border border-gray-300 bg-white rounded-lg shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSearchResults(complaintsData);
              }}
              className="absolute right-2 top-2 text-gray-500 hover:text-red-600 font-bold"
            >
              ✕
            </button>
          )}
        </div>
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
        >
          Search
        </button>
      </div>
      <div className="flex justify-end gap-4 mb-4">
        <button
          onClick={exportToPDF}
          className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700"
        >
          Export to PDF
        </button>
        <button
          onClick={exportToExcel}
          className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700"
        >
          Export to Excel
        </button>
        <div className="relative inline-block w-48 text-left" ref={dropdownRef}>
          <div>
            <button
              type="button"
              onClick={() => setShowDropdown((prev) => !prev)}
              className="px-4 py-2 w-full bg-white rounded-lg shadow text-center hover:bg-gray-300 font-medium"
            >
              Select Columns ⬇️
            </button>
          </div>

          {showDropdown && (
            <div className="absolute z-10 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1 max-h-60 overflow-y-auto">
                <label className="flex items-center px-4 py-2 text-sm font-semibold text-gray-900 border-b border-gray-200">
                  <input
                    type="checkbox"
                    checked={Object.values(visibleColumns).every(Boolean)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      const newVisibility = {};
                      for (const key in visibleColumns) {
                        newVisibility[key] = checked;
                      }
                      setVisibleColumns(newVisibility);
                    }}
                    className="mr-2"
                  />
                  All Contents
                </label>

                {Object.keys(visibleColumns).map((col) => (
                  <label
                    key={col}
                    className="flex items-center px-4 py-2 text-sm text-gray-700"
                  >
                    <input
                      type="checkbox"
                      checked={visibleColumns[col]}
                      onChange={() =>
                        setVisibleColumns((prev) => ({
                          ...prev,
                          [col]: !prev[col],
                        }))
                      }
                      className="mr-2"
                    />
                    {col.charAt(0).toUpperCase() + col.slice(1)}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-300 text-gray-700">
              {visibleColumns.date && <th className="p-3 text-center">Date</th>}
              {visibleColumns.complaintName && (
                <th className="p-3 text-center">Complaint Name</th>
              )}
              {visibleColumns.district && (
                <th className="p-3 text-center">District</th>
              )}
              {visibleColumns.location && (
                <th className="p-3 text-center">Location</th>
              )}
              {visibleColumns.createdBy && (
                <th className="p-3 text-center">Uploader</th>
              )}
              {visibleColumns.type && <th className="p-3 text-center">Type</th>}
              {visibleColumns.status && (
                <th className="p-3 text-center">Status</th>
              )}
              {visibleColumns.actions && (
                <th className="p-3 text-center">Actions</th>
              )}
            </tr>
          </thead>

          <tbody>
            {filteredComplaints.length > 0 ? (
              filteredComplaints.map((complaint) => (
                <tr
                  key={complaint._id}
                  className="even:bg-gray-100 hover:bg-gray-200 transition duration-200"
                >
                  {visibleColumns.date && (
                    <td className="p-3 text-center">
                      {new Date(complaint.date).toLocaleDateString()}
                    </td>
                  )}
                  {visibleColumns.complaintName && (
                    <td className="p-3 text-center">
                      {complaint.complaintName}
                    </td>
                  )}
                  {visibleColumns.district && (
                    <td className="p-3 text-center">{complaint.district}</td>
                  )}
                  {visibleColumns.location && (
                    <td className="p-3 text-center">{complaint.location}</td>
                  )}
                  {visibleColumns.createdBy && (
                    <td className="p-3 text-center">{complaint.createdBy}</td>
                  )}
                  {visibleColumns.type && (
                    <td className="p-3 text-center">{complaint.type}</td>
                  )}
                  {visibleColumns.status && (
                    <td className="p-3 text-center">
                      <span
                        className={`p-3 text-center flex justify-center font-semibold ${getStatusColor(
                          complaint.status
                        )}`}
                      >
                        {complaint.status}
                      </span>
                    </td>
                  )}
                  {visibleColumns.actions && (
                    <td className="p-3 text-center">
                      <button
                        className="w-24 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 transform hover:scale-105"
                        onClick={() => handleView(complaint._id)}
                      >
                        View
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="p-3 text-center text-gray-500">
                  {searchQuery
                    ? "No searched data is available"
                    : "No complaints found."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Complaint;
