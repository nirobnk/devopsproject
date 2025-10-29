import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="flex justify-between items-center bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="text-2xl font-bold"><Link to="/">Employee Management System</Link></div>
      <div className="flex space-x-6">
        <Link
          to="/"
          className="hover:text-gray-200 transition-colors duration-200"
        >
          Employees
        </Link>
        <Link
          to="/postemployee"
          className="hover:text-gray-200 transition-colors duration-200"
        >
          Post Employee
        </Link>
      </div>
    </div>
  );
}

export default Header;