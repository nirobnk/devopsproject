import { useState } from "react";

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) {
        const errorData = await response.text();
        alert("Signup failed: " + errorData);
        return;
      }

      alert("Signup successful! Please log in.");
      window.location.href = "/"; // or use navigate("/login") if you're using react-router
    } catch (err) {
      console.error("Signup error:", err);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-blue-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border-t-4 border-teal-600">
        <div className="text-center mb-6">
          <div className="text-5xl mb-2">🏥</div>
          <h2 className="text-3xl font-bold text-teal-700">
            Join Medical Center
          </h2>
          <p className="text-gray-600 mt-2">
            Create your account to get started
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-400 focus:outline-none"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-400 focus:outline-none"
              placeholder="example@email.com"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-400 focus:outline-none"
              placeholder="••••••••"
            />
          </div>
          <div className="mt-2">
            <label className="text-sm text-gray-600 flex items-center gap-2">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              Show Password
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2.5 rounded-md hover:bg-teal-700 transition font-semibold shadow-md"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/" className="text-teal-600 hover:underline font-semibold">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
