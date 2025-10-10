import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
    city: "",
    state: "",
    sustainability_interests: [],
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const sustainabilityOptions = [
    "Waste Management",
    "Recycling",
    "Clean Energy",
    "Urban Gardening",
    "Water Conservation",
    "Air Quality",
    "Climate Action",
    "Sustainable Transport",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        sustainability_interests: checked
          ? [...prev.sustainability_interests, value]
          : prev.sustainability_interests.filter(
              (interest) => interest !== value
            ),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    // Prepare data for submission
    const submitData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      location: {
        city: formData.city,
        state: formData.state,
      },
      sustainability_interests: formData.sustainability_interests,
    };

    const result = await register(submitData);

    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-accent-sand to-gray-50 py-12 px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8">
        {/* Logo and Header */}
        <div className="text-center">
          <div className="mx-auto h-20 w-20 flex items-center justify-center rounded-xl bg-gradient-to-r from-primary to-emerald-600 shadow-lg mb-6">
            <span className="text-2xl text-white font-inter font-bold">R</span>
          </div>
          <h1 className="text-3xl font-inter font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
            Join the Environmental Movement
          </h1>
          <p className="text-charcoal/70 font-body">
            Create your account and start building sustainable cities
          </p>
        </div>

        {/* Registration Form Card */}
        <div className="card-glass">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-body">
                {error}
              </div>
            )}

            <div className="space-y-6">
              {/* Name Field with Floating Label */}
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="peer block w-full px-4 py-3 border border-gray-300 rounded-xl bg-white/50 backdrop-blur-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="Full Name"
                />
                <label
                  htmlFor="name"
                  className="absolute left-4 -top-2.5 px-2 bg-white text-sm font-medium text-charcoal/70 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-charcoal/50 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary"
                >
                  Full Name
                </label>
              </div>

              {/* Email Field with Floating Label */}
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="peer block w-full px-4 py-3 border border-gray-300 rounded-xl bg-white/50 backdrop-blur-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="Email address"
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 -top-2.5 px-2 bg-white text-sm font-medium text-charcoal/70 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-charcoal/50 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary"
                >
                  Email address
                </label>
              </div>

              {/* Location Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    id="city"
                    name="city"
                    type="text"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="peer block w-full px-4 py-3 border border-gray-300 rounded-xl bg-white/50 backdrop-blur-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="City"
                  />
                  <label
                    htmlFor="city"
                    className="absolute left-4 -top-2.5 px-2 bg-white text-sm font-medium text-charcoal/70 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-charcoal/50 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary"
                  >
                    City
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="state"
                    name="state"
                    type="text"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    className="peer block w-full px-4 py-3 border border-gray-300 rounded-xl bg-white/50 backdrop-blur-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="State"
                  />
                  <label
                    htmlFor="state"
                    className="absolute left-4 -top-2.5 px-2 bg-white text-sm font-medium text-charcoal/70 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-charcoal/50 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary"
                  >
                    State
                  </label>
                </div>
              </div>

              {/* Role Selection */}
              <div className="relative">
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors appearance-none"
                >
                  <option value="user">🌱 Citizen</option>
                  <option value="environmental_org">
                    🏢 Environmental Organization
                  </option>
                </select>
                <label
                  htmlFor="role"
                  className="absolute left-4 -top-2.5 px-2 bg-white text-sm font-medium text-primary"
                >
                  I am a...
                </label>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-charcoal/50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {/* Password Fields */}
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="peer block w-full px-4 py-3 border border-gray-300 rounded-xl bg-white/50 backdrop-blur-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="Password"
                />
                <label
                  htmlFor="password"
                  className="absolute left-4 -top-2.5 px-2 bg-white text-sm font-medium text-charcoal/70 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-charcoal/50 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary"
                >
                  Password
                </label>
              </div>

              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="peer block w-full px-4 py-3 border border-gray-300 rounded-xl bg-white/50 backdrop-blur-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="Confirm Password"
                />
                <label
                  htmlFor="confirmPassword"
                  className="absolute left-4 -top-2.5 px-2 bg-white text-sm font-medium text-charcoal/70 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-charcoal/50 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary"
                >
                  Confirm Password
                </label>
              </div>

              {/* Sustainability Interests */}
              <div className="bg-emerald-50/50 backdrop-blur-sm rounded-xl p-4 border border-emerald-200">
                <label className="block text-sm font-medium text-charcoal mb-4">
                  🌱 Sustainability Interests (Optional)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {sustainabilityOptions.map((interest) => (
                    <label
                      key={interest}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        value={interest}
                        checked={formData.sustainability_interests.includes(
                          interest
                        )}
                        onChange={handleChange}
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary focus:ring-2"
                      />
                      <span className="text-sm text-charcoal font-body">
                        {interest}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Create Account Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-reviwa w-full disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating account...
                </div>
              ) : (
                "🌱 Join the Environmental Movement"
              )}
            </button>
          </form>
        </div>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-charcoal/70 font-body">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary hover:text-secondary transition-colors"
            >
              Sign in to your dashboard
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
