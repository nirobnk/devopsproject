import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);

  const [formData, setFormData] = useState({
    patientName: "",
    patientEmail: "",
    patientPhone: "",
    appointmentDateTime: "",
    reason: "",
    status: "Scheduled",
    doctorId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/doctor`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error.message);
      }
    };

    const fetchAppointment = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/appointment/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        const data = await response.json();

        // Convert ISO datetime to datetime-local format
        const dateTime = new Date(data.appointmentDateTime);
        const localDateTime = new Date(
          dateTime.getTime() - dateTime.getTimezoneOffset() * 60000,
        )
          .toISOString()
          .slice(0, 16);

        setFormData({
          patientName: data.patientName,
          patientEmail: data.patientEmail,
          patientPhone: data.patientPhone,
          appointmentDateTime: localDateTime,
          reason: data.reason || "",
          status: data.status,
          doctorId: data.doctor?.id || "",
        });
      } catch (error) {
        console.error("Error fetching appointment: ", error.message);
      }
    };

    fetchDoctors();
    fetchAppointment();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const appointmentData = {
        patientName: formData.patientName,
        patientEmail: formData.patientEmail,
        patientPhone: formData.patientPhone,
        appointmentDateTime: formData.appointmentDateTime,
        reason: formData.reason,
        status: formData.status,
        doctor: { id: parseInt(formData.doctorId) },
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/appointment/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(appointmentData),
        },
      );
      const data = await response.json();
      console.log("Appointment updated: ", data);

      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating appointment: ", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center text-teal-700">
          Update Appointment
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Patient Name</label>
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            required
            placeholder="Enter patient name"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-teal-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Patient Email</label>
          <input
            type="email"
            name="patientEmail"
            value={formData.patientEmail}
            onChange={handleChange}
            required
            placeholder="Enter patient email"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-teal-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Patient Phone</label>
          <input
            type="tel"
            name="patientPhone"
            value={formData.patientPhone}
            onChange={handleChange}
            required
            placeholder="Enter phone number"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-teal-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Select Doctor</label>
          <select
            name="doctorId"
            value={formData.doctorId}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-teal-300"
          >
            <option value="">-- Select a Doctor --</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                Dr. {doctor.name} - {doctor.specialization}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">
            Appointment Date & Time
          </label>
          <input
            type="datetime-local"
            name="appointmentDateTime"
            value={formData.appointmentDateTime}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-teal-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-teal-300"
          >
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Reason for Visit</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Describe your symptoms or reason for visit"
            rows="3"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-teal-300"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition"
        >
          Update Appointment
        </button>
      </form>
    </div>
  );
}

export default UpdateAppointment;
