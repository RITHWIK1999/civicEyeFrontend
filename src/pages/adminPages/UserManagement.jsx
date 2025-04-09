import React, { useEffect, useRef, useState } from "react";
import { viewAllUser } from "../../api/Api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [sortOrder, setSortOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const getAllUser = async () => {
    try {
      const response = await viewAllUser();
      if (response.status === 200) {
        setUsers(response.data.data);
        setSortedUsers(response.data.data);
      } else {
        toast.error("Error occurred while fetching data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

  const handleSort = () => {
    if (sortOrder === "asc") {
      const sorted = [...sortedUsers].sort((a, b) =>
        b.fullName.localeCompare(a.fullName)
      );
      setSortedUsers(sorted);
      setSearchResults(searchQuery ? filterUsers(sorted, searchQuery) : []);
      setSortOrder("desc");
    } else {
      const sorted = [...sortedUsers].sort((a, b) =>
        a.fullName.localeCompare(b.fullName)
      );
      setSortedUsers(sorted);
      setSearchResults(searchQuery ? filterUsers(sorted, searchQuery) : []);
      setSortOrder("asc");
    }
  };

  const resetSorting = () => {
    setSortedUsers(users);
    setSortOrder(null);
    if (searchQuery) {
      setSearchResults(filterUsers(users, searchQuery));
    }
  };

  const handleView = (id) => {
    navigate(`/userReport/${id}`);
  };

  const filterUsers = (userList, query) => {
    const lowerQuery = query.toLowerCase();
    return userList.filter((user) =>
      Object.values(user).some((val) =>
        String(val).toLowerCase().includes(lowerQuery)
      )
    );
  };

  const handleSearch = () => {
    const filtered = filterUsers(sortedUsers, searchQuery);
    setSearchResults(filtered);
  };

  const [visibleColumns, setVisibleColumns] = useState({
    fullName: true,
    email: true,
    mobileNumber: true,
    address: true,
    idProof: true,
    idProofNumber: true,
    reports: true,
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

  const exportToExcel = () => {
    const exportData = (searchQuery ? searchResults : sortedUsers).map((user) => {
      const row = {};
      if (visibleColumns.fullName) row["Name"] = user.fullName;
      if (visibleColumns.email) row["Email"] = user.email;
      if (visibleColumns.mobileNumber) row["Phone"] = `'${user.mobileNumber}`;
      if (visibleColumns.address) row["Address"] = user.address;
      if (visibleColumns.idProof) row["ID Proof"] = user.idProof;
      if (visibleColumns.idProofNumber)
        row["ID Proof Number"] = user.idProofNumber;
      return row;
    });
  
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cell_address = XLSX.utils.encode_cell({ r: R, c: C });
        if (!worksheet[cell_address]) continue;
  
        if (!worksheet[cell_address].s) worksheet[cell_address].s = {};
  
        worksheet[cell_address].s.alignment = {
          horizontal: "center",
          vertical: "center",
          wrapText: true,
        };
      }
    }
  
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "UserData.xlsx", { cellStyles: true });
  };
  

  const exportToPDF = () => {
    const doc = new jsPDF();
    const title = "User Report";
    doc.setFontSize(18);
    doc.text(title, 14, 22);
  
    const headers = [];
    const visibleKeys = [];
  
    if (visibleColumns.fullName) {
      headers.push("Name");
      visibleKeys.push("fullName");
    }
    if (visibleColumns.email) {
      headers.push("Email");
      visibleKeys.push("email");
    }
    if (visibleColumns.mobileNumber) {
      headers.push("Phone Number");
      visibleKeys.push("mobileNumber");
    }
    if (visibleColumns.address) {
      headers.push("Address");
      visibleKeys.push("address");
    }
    if (visibleColumns.idProof) {
      headers.push("ID Proof");
      visibleKeys.push("idProof");
    }
    if (visibleColumns.idProofNumber) {
      headers.push("ID Proof Number");
      visibleKeys.push("idProofNumber");
    }
  
    const data = (searchQuery ? searchResults : sortedUsers).map((user) =>
      visibleKeys.map((key) =>
        user[key]
          ? key === "mobileNumber"
            ? `'${user[key]}`
            : key === "address"
            ? user[key].replace(/([.,-])/g, "$1 ").replace(/\n/g, " ")
            : user[key]
          : "NA"
      )
    );
  
    autoTable(doc, {
      head: [headers],
      body: data,
      styles: {
        fontSize: 9,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [40, 60, 100],
        textColor: 255,
        fontStyle: "bold",
      },
      startY: 30,
      margin: { top: 20, left: 10, right: 10 },
      theme: "grid",
    });
  
    doc.save("UserData.pdf");
  };
  

  return (
    <div className="p-4">
      <div className="mb-4 flex gap-2">
        <button
          onClick={handleSort}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Sort {sortOrder === "asc" ? "Z-A" : "A-Z"}
        </button>
        <button
          onClick={resetSorting}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Reset Sorting
        </button>
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            className="w-full px-4 py-2 pr-10 border border-gray-300 bg-white rounded-lg shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSearchResults([]);
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
      <div className="overflow-x-auto bg-white">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-300 text-gray-700 text-sm">
              {visibleColumns.fullName && <th className="p-3">Name</th>}
              {visibleColumns.email && <th className="p-5">Email</th>}
              {visibleColumns.mobileNumber && (
                <th className="p-5 text-center">Phone Number</th>
              )}
              {visibleColumns.address && (
                <th className="p-5 text-center">Address</th>
              )}
              {visibleColumns.idProof && (
                <th className="p-5 text-center">ID Proof</th>
              )}
              {visibleColumns.idProofNumber && (
                <th className="p-5 text-center">ID Proof Number</th>
              )}
              {visibleColumns.reports && (
                <th className="p-5 text-center">Reports</th>
              )}
            </tr>
          </thead>

          <tbody>
            {(searchQuery ? searchResults : sortedUsers).length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No searched data found.
                </td>
              </tr>
            ) : (
              (searchQuery ? searchResults : sortedUsers).map((user, index) => (
                <tr
                  key={index}
                  className="even:bg-gray-100 hover:bg-gray-200 transition duration-200"
                >
                  {visibleColumns.fullName && (
                    <td className="p-5">{user.fullName || "NA"}</td>
                  )}
                  {visibleColumns.email && (
                    <td className="p-5">{user.email || "NA"}</td>
                  )}
                  {visibleColumns.mobileNumber && (
                    <td className="p-5 text-center">
                      {user.mobileNumber || "NA"}
                    </td>
                  )}
                  {visibleColumns.address && (
                    <td className="p-5 text-center break-words whitespace-normal">
                      {user.address
                        ? user.address
                            .replace(/([.,-])/g, "$1\n")
                            .split("\n")
                            .map((part, index) => (
                              <span key={index}>
                                {part}
                                <br />
                              </span>
                            ))
                        : "NA"}
                    </td>
                  )}
                  {visibleColumns.idProof && (
                    <td className="p-5 text-center">{user.idProof || "NA"}</td>
                  )}
                  {visibleColumns.idProofNumber && (
                    <td className="p-5 text-center">
                      {user.idProofNumber || "NA"}
                    </td>
                  )}
                  {visibleColumns.reports && (
                    <td className="p-5 text-center">
                      <button
                        className="w-24 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 transform hover:scale-105"
                        onClick={() => handleView(user._id)}
                      >
                        View
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserManagement;
