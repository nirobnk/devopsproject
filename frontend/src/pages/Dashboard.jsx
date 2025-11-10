import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/employee", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        setEmployees(data); // ✅ Don't forget to set state
      } catch (error) {
        console.error("Error fetching employees", error.message);
      }
    };
    fetchEmployees();
  }, []);

  const handleDelete = async (employeeId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/employee/${employeeId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          method: "DELETE",
        }
      );
      if (response.ok) {
        setEmployees(
          (
            prevEmployees //react usually set reference of latest state to the function argument use in Set method in useState
          ) =>
            //so preEmployee point to the employees in useState
            prevEmployees.filter((emp) => emp.id != employeeId)
        ); //in filter method use callback function to get boolean value if it is true it store value in new array otherwise it exclude the value
        //callback function usually return true or false
      }
      //setEmployees(employees.filter(emp => emp.id !== employeeId)); this is direct method it not suitable for used cuz it makes some bugs sometimes
      console.log(`Employee with ID ${employeeId} deleted successfully`);
    } catch (error) {
      console.error("Error deleting employee :", error.message);
    }
  };

  const handleUpdate = (employeeId) => {
    navigate(`/employee/${employeeId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Employees</h1>

      {/* Table Header */}
      <div className="grid grid-cols-5 bg-gray-200 p-3 rounded-md font-semibold text-gray-700">
        <div>Name</div>
        <div>Email</div>
        <div>Phone</div>
        <div>Department</div>
        <div>Action</div>
      </div>

      {/* Table Body */}
      <div className="space-y-2 mt-2">
        {employees.map((employee) => (
          <div
            key={employee.id}
            className="grid grid-cols-5 bg-white shadow-md p-3 rounded-lg hover:shadow-lg transition"
          >
            <div className="font-medium text-gray-800">{employee.name}</div>
            <div className="text-gray-600">{employee.email}</div>
            <div className="text-gray-600">{employee.phone}</div>
            <div className="text-gray-600">{employee.department}</div>
            <div className="flex gap-2">
              <button
                onClick={() => handleUpdate(employee.id)}
                className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(employee.id)}
                className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
