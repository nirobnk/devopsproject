import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");
    // Redirect to login page
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center bg-teal-600 text-white px-6 py-4 shadow-md">
      <div className="text-2xl font-bold">
        <Link to="/dashboard">🏥 Medical Center Booking</Link>
      </div>
      <div className="flex items-center space-x-6">
        <Link
          to="/dashboard"
          className="hover:text-gray-200 transition-colors duration-200"
        >
          Appointments
        </Link>
        <Link
          to="/bookappointment"
          className="hover:text-gray-200 transition-colors duration-200"
        >
          Book Appointment
        </Link>
        <Link
          to="/doctors"
          className="hover:text-gray-200 transition-colors duration-200"
        >
          Doctors
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Header;
