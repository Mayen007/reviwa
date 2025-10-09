import React, { useState, useCallback, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ImageUpload from "./ImageUpload";

const ReportWaste = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    severity: "medium",
    location: {
      address: "",
      coordinates: null,
    },
  });

  // UI state
  const [images, setImages] = useState([]);
  const [step, setStep] = useState(1); // Multi-step form
  const [locationStatus, setLocationStatus] = useState("idle"); // idle, detecting, found, error
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Waste categories with icons and colors
  const wasteCategories = [
    {
      id: "plastic",
      name: "Plastic Waste",
      icon: "♻️",
      color: "bg-blue-500",
      desc: "Bottles, bags, containers",
    },
    {
      id: "organic",
      name: "Organic Waste",
      icon: "🍃",
      color: "bg-green-500",
      desc: "Food scraps, garden waste",
    },
    {
      id: "electronic",
      name: "E-Waste",
      icon: "📱",
      color: "bg-purple-500",
      desc: "Electronics, batteries",
    },
    {
      id: "hazardous",
      name: "Hazardous",
      icon: "⚠️",
      color: "bg-red-500",
      desc: "Chemicals, toxic materials",
    },
    {
      id: "metal",
      name: "Metal Waste",
      icon: "🔩",
      color: "bg-gray-500",
      desc: "Cans, scrap metal",
    },
    {
      id: "paper",
      name: "Paper Waste",
      icon: "📄",
      color: "bg-yellow-500",
      desc: "Documents, cardboard",
    },
    {
      id: "construction",
      name: "Construction",
      icon: "🏗️",
      color: "bg-orange-500",
      desc: "Debris, materials",
    },
    {
      id: "other",
      name: "Other",
      icon: "❓",
      color: "bg-gray-400",
      desc: "Mixed or unspecified",
    },
  ];

  // Severity levels
  const severityLevels = [
    {
      id: "low",
      name: "Low Impact",
      color: "text-green-600 bg-green-50",
      desc: "Minor cleanup needed",
    },
    {
      id: "medium",
      name: "Moderate",
      color: "text-yellow-600 bg-yellow-50",
      desc: "Visible environmental impact",
    },
    {
      id: "high",
      name: "High Priority",
      color: "text-red-600 bg-red-50",
      desc: "Urgent action required",
    },
  ];

  // Get user's location
  const detectLocation = useCallback(() => {
    setLocationStatus("detecting");

    if (!navigator.geolocation) {
      setLocationStatus("error");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((prev) => ({
          ...prev,
          location: {
            ...prev.location,
            coordinates: [position.coords.longitude, position.coords.latitude],
          },
        }));
        setLocationStatus("found");

        // Reverse geocoding (simplified - you'd use a real service)
        setFormData((prev) => ({
          ...prev,
          location: {
            ...prev.location,
            address: `Lat: ${position.coords.latitude.toFixed(
              4
            )}, Lng: ${position.coords.longitude.toFixed(4)}`,
          },
        }));
      },
      (error) => {
        console.error("Location error:", error);
        setLocationStatus("error");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual implementation
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Show success message and redirect
      alert(
        "Waste report submitted successfully! 🌱 You earned 10 green points!"
      );
      navigate("/dashboard");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit report. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-green-100 sticky top-0 z-40">
        <div className="w-full px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate("/dashboard")}
                className="p-2 hover:bg-green-50 rounded-full transition-colors"
              >
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Report Waste
                </h1>
                <p className="text-sm text-gray-600">
                  Help make your community cleaner
                </p>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="flex space-x-2">
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    step >= num ? "bg-green-500 scale-110" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div className="animate-fadeIn">
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl">🌍</span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    What did you find?
                  </h2>
                  <p className="text-gray-600">
                    Tell us about the waste you discovered
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Report Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      placeholder="e.g., Plastic bottles near riverside"
                      className="w-full px-4 py-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-lg placeholder-gray-400"
                      required
                    />
                  </div>

                  {/* Category Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-4">
                      Waste Category *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {wasteCategories.map((category) => (
                        <button
                          key={category.id}
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              category: category.id,
                            }))
                          }
                          className={`p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                            formData.category === category.id
                              ? `${category.color} border-transparent text-white shadow-lg scale-105`
                              : "bg-white/50 border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="text-2xl mb-2">{category.icon}</div>
                          <div className="text-sm font-semibold">
                            {category.name}
                          </div>
                          <div className="text-xs opacity-75 mt-1">
                            {category.desc}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Severity */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-4">
                      Impact Severity
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {severityLevels.map((level) => (
                        <button
                          key={level.id}
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              severity: level.id,
                            }))
                          }
                          className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                            formData.severity === level.id
                              ? `${level.color} border-current shadow-md`
                              : "bg-white/50 border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="font-semibold">{level.name}</div>
                          <div className="text-sm opacity-75">{level.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      placeholder="Describe the waste situation, approximate quantity, any hazards..."
                      rows={4}
                      className="w-full px-4 py-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none placeholder-gray-400"
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={!formData.title || !formData.category}
                    className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Next: Add Photos →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Photos */}
          {step === 2 && (
            <div className="animate-fadeIn">
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl">📸</span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Add Photos
                  </h2>
                  <p className="text-gray-600">
                    Visual evidence helps verify and prioritize reports
                  </p>
                </div>

                <ImageUpload
                  images={images}
                  setImages={setImages}
                  maxImages={5}
                  maxSizeMB={10}
                />

                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-3 text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Next: Location →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Location */}
          {step === 3 && (
            <div className="animate-fadeIn">
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl">📍</span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Location Details
                  </h2>
                  <p className="text-gray-600">
                    Help cleanup teams find the exact location
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Location Detection */}
                  <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          Auto-detect Location
                        </h3>
                        <p className="text-sm text-gray-600">
                          {locationStatus === "idle" &&
                            "Use GPS for precise coordinates"}
                          {locationStatus === "detecting" &&
                            "Detecting your location..."}
                          {locationStatus === "found" &&
                            "Location detected successfully!"}
                          {locationStatus === "error" &&
                            "Could not detect location. Please enter manually."}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={detectLocation}
                        disabled={locationStatus === "detecting"}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                          locationStatus === "found"
                            ? "bg-green-100 text-green-700 border border-green-200"
                            : locationStatus === "detecting"
                            ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                            : "bg-white text-blue-600 border border-blue-200 hover:bg-blue-50"
                        }`}
                      >
                        {locationStatus === "detecting" && (
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500 inline"
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
                        )}
                        {locationStatus === "found"
                          ? "✓ Located"
                          : locationStatus === "detecting"
                          ? "Detecting..."
                          : "Detect Location"}
                      </button>
                    </div>
                  </div>

                  {/* Manual Address */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Address or Landmark
                    </label>
                    <input
                      type="text"
                      value={formData.location.address}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          location: {
                            ...prev.location,
                            address: e.target.value,
                          },
                        }))
                      }
                      placeholder="e.g., Near Central Park entrance, 123 Main Street"
                      className="w-full px-4 py-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-lg placeholder-gray-400"
                    />
                  </div>

                  {/* Coordinates Display */}
                  {formData.location.coordinates && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 text-green-600 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <div>
                          <div className="font-semibold text-green-800">
                            GPS Coordinates Captured
                          </div>
                          <div className="text-sm text-green-600">
                            {formData.location.coordinates[1].toFixed(6)},{" "}
                            {formData.location.coordinates[0].toFixed(6)}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-3 text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={
                      isSubmitting ||
                      (!formData.location.address &&
                        !formData.location.coordinates)
                    }
                    className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 min-w-32"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                        Submitting...
                      </div>
                    ) : (
                      "Submit Report 🌱"
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ReportWaste;
