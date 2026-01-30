import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/appointment`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments", error.message);
      }
    };
    fetchAppointments();
  }, []);

  const handleDelete = async (appointmentId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/appointment/${appointmentId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          method: "DELETE",
        },
      );
      if (response.ok) {
        setAppointments((prevAppointments) =>
          prevAppointments.filter((apt) => apt.id != appointmentId),
        );
      }
      console.log(`Appointment with ID ${appointmentId} deleted successfully`);
    } catch (error) {
      console.error("Error deleting appointment:", error.message);
    }
  };

  const handleUpdate = (appointmentId) => {
    navigate(`/appointment/${appointmentId}`);
  };

  const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-teal-700 mb-6">My Appointments</h1>

      <div className="grid grid-cols-6 bg-teal-100 p-3 rounded-md font-semibold text-gray-700">
        <div>Patient Name</div>
        <div>Doctor</div>
        <div>Date & Time</div>
        <div>Status</div>
        <div>Reason</div>
        <div>Action</div>
      </div>

      <div className="space-y-2 mt-2">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="grid grid-cols-6 bg-white shadow-md p-3 rounded-lg hover:shadow-lg transition"
          >
            <div className="font-medium text-gray-800">
              {appointment.patientName}
            </div>
            <div className="text-gray-600">
              {appointment.doctor?.name || "N/A"}
            </div>
            <div className="text-gray-600">
              {formatDateTime(appointment.appointmentDateTime)}
            </div>
            <div>
              <span
                className={`px-2 py-1 rounded text-xs ${
                  appointment.status === "Scheduled"
                    ? "bg-blue-100 text-blue-800"
                    : appointment.status === "Completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                }`}
              >
                {appointment.status}
              </span>
            </div>
            <div className="text-gray-600">{appointment.reason || "-"}</div>
            <div className="flex gap-2">
              <button
                onClick={() => handleUpdate(appointment.id)}
                className="px-3 py-1 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(appointment.id)}
                className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
