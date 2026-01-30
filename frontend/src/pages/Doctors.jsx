import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

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
        console.error("Error fetching doctors", error.message);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-teal-700 mb-6">Our Doctors</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition"
          >
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {doctor.name.charAt(0)}
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-bold text-gray-800">
                  Dr. {doctor.name}
                </h2>
                <p className="text-teal-600 font-semibold">
                  {doctor.specialization}
                </p>
              </div>
            </div>

            <div className="space-y-2 text-gray-700">
              <div className="flex items-center">
                <span className="font-semibold mr-2">📧 Email:</span>
                <span>{doctor.email}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">📞 Phone:</span>
                <span>{doctor.phone}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">🎓 Experience:</span>
                <span>{doctor.experience}</span>
              </div>
              {doctor.availability && (
                <div className="flex items-start">
                  <span className="font-semibold mr-2">🕒 Availability:</span>
                  <span>{doctor.availability}</span>
                </div>
              )}
            </div>

            <button
              onClick={() => navigate("/bookappointment")}
              className="mt-4 w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition"
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Doctors;
