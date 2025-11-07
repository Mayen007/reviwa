import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { MapPinIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { useLoading } from "../context/LoadingContext";

const CreateReport = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    wasteType: "mixed",
    severity: "medium",
    location: {
      coordinates: [0, 0],
      address: "",
    },
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { loading, showLoading, hideLoading, updateProgress, updateMessage } =
    useLoading();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
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
        setError("");
      },
      (error) => {
        setError("Failed to get location. Please try again.");
        console.error(error);
      }
    );
  };

  // Compress image before upload
  const compressImage = async (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          // Resize if too large (max 1920px)
          const maxSize = 1920;
          if (width > maxSize || height > maxSize) {
            if (width > height) {
              height = (height / width) * maxSize;
              width = maxSize;
            } else {
              width = (width / height) * maxSize;
              height = maxSize;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          // Compress to JPEG with 0.7 quality
          canvas.toBlob(
            (blob) => {
              const compressedFile = new File([blob], file.name, {
                type: "image/jpeg",
                lastModified: Date.now(),
              });
              console.log(
                `Compressed ${file.name}: ${(file.size / 1024 / 1024).toFixed(
                  2
                )}MB → ${(compressedFile.size / 1024 / 1024).toFixed(2)}MB`
              );
              resolve(compressedFile);
            },
            "image/jpeg",
            0.7
          );
        };
      };
    });
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);

    if (files.length + images.length > 5) {
      setError("Maximum 5 images allowed");
      return;
    }

    // Check for duplicate file names
    const existingFileNames = images.map((img) => img.name);
    const duplicates = files.filter((file) =>
      existingFileNames.includes(file.name)
    );

    if (duplicates.length > 0) {
      setError(
        `Duplicate image(s) detected: ${duplicates
          .map((f) => f.name)
          .join(", ")}. Please select different images.`
      );
      return;
    }

    // Filter out duplicate files in current selection
    const uniqueFiles = files.filter(
      (file, index, self) =>
        index === self.findIndex((f) => f.name === file.name)
    );

    if (uniqueFiles.length !== files.length) {
      setError(
        `Removed ${
          files.length - uniqueFiles.length
        } duplicate image(s) from selection.`
      );
      // Continue with unique files only
    }

    showLoading(
      `Compressing ${uniqueFiles.length} image${
        uniqueFiles.length > 1 ? "s" : ""
      }...`,
      "upload",
      0
    );
    const compressedFiles = [];
    const newPreviews = [];

    try {
      for (let i = 0; i < uniqueFiles.length; i++) {
        const file = uniqueFiles[i];

        // Update progress
        const progress = ((i + 1) / uniqueFiles.length) * 100;
        updateProgress(progress);
        updateMessage(`Compressing image ${i + 1} of ${uniqueFiles.length}...`);

        // Check file size
        const fileSizeMB = file.size / (1024 * 1024);

        // Compress if larger than 2MB
        if (fileSizeMB > 2) {
          const compressed = await compressImage(file);
          compressedFiles.push(compressed);
        } else {
          compressedFiles.push(file);
        }

        // Create preview
        newPreviews.push(
          URL.createObjectURL(compressedFiles[compressedFiles.length - 1])
        );
      }

      setImagePreviews((prev) => [...prev, ...newPreviews]);
      setImages((prev) => [...prev, ...compressedFiles]);

      // Clear error only if no duplicates were found
      if (uniqueFiles.length === files.length) {
        setError("");
      }
    } catch (error) {
      console.error("Image compression error:", error);
      setError("Failed to process images. Please try again.");
    } finally {
      hideLoading();
    }
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    showLoading("Validating report...", "submit");

    try {
      // Validate location
      if (
        formData.location.coordinates[0] === 0 &&
        formData.location.coordinates[1] === 0
      ) {
        setError("Please get your current location first");
        hideLoading();
        return;
      }

      console.log("Current location state:", formData.location);

      updateMessage("Preparing data...");

      // Create FormData for multipart/form-data
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("description", formData.description);
      submitData.append("wasteType", formData.wasteType);
      submitData.append("severity", formData.severity);

      // Append location as nested fields
      submitData.append("location[type]", "Point");
      submitData.append(
        "location[coordinates][0]",
        formData.location.coordinates[0]
      );
      submitData.append(
        "location[coordinates][1]",
        formData.location.coordinates[1]
      );
      if (formData.location.address) {
        submitData.append("location[address]", formData.location.address);
      }

      // Append images
      images.forEach((image) => {
        submitData.append("images", image);
      });

      // Debug: Log FormData contents
      console.log("FormData contents:");
      for (let pair of submitData.entries()) {
        console.log(pair[0], ":", pair[1]);
      }

      updateMessage(
        `Uploading report${
          images.length > 0
            ? ` with ${images.length} image${images.length > 1 ? "s" : ""}`
            : ""
        }...`
      );

      // Don't set Content-Type manually - let axios set it with proper boundary
      const response = await axios.post("/api/reports", submitData);

      updateMessage("Report created successfully!");

      // Brief success message before navigation
      setTimeout(() => {
        hideLoading();
        navigate(`/reports/${response.data.data.report._id}`);
      }, 500);
    } catch (error) {
      hideLoading();
      console.error("Error creating report:", error.response?.data);
      const errorMessage =
        error.response?.data?.message || "Failed to create report";
      const debugInfo = error.response?.data?.debug;

      if (debugInfo) {
        console.log("Debug info from server:", debugInfo);
        setError(`${errorMessage} (Check console for details)`);
      } else {
        setError(errorMessage);
      }
    }
  };

  return (
    <>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
            Report Waste Site
          </h1>
          <p className="text-gray-600 mt-2">
            Help keep our community clean by reporting illegal waste dumping
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg"
              >
                {error}
              </motion.div>
            )}

            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="input"
                placeholder="e.g., Illegal dump near Main Street"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows="4"
                value={formData.description}
                onChange={handleChange}
                className="input"
                placeholder="Provide details about the waste site..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="wasteType"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Waste Type *
                </label>
                <select
                  id="wasteType"
                  name="wasteType"
                  value={formData.wasteType}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="plastic">Plastic</option>
                  <option value="organic">Organic</option>
                  <option value="metal">Metal</option>
                  <option value="glass">Glass</option>
                  <option value="electronic">Electronic</option>
                  <option value="mixed">Mixed</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="severity"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Severity *
                </label>
                <select
                  id="severity"
                  name="severity"
                  value={formData.severity}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photos <span className="text-gray-500">(Max 5)</span>
              </label>
              <div className="space-y-4">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={images.length >= 5}
                  id="image-upload"
                  ref={(input) => (window.imageInput = input)}
                />
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("image-upload").click()
                  }
                  disabled={images.length >= 5}
                  className="btn btn-outline w-full inline-flex items-center justify-center gap-2"
                >
                  <PhotoIcon className="w-5 h-5 inline mr-1" />
                  Choose Images
                  {images.length > 0 && (
                    <span className="ml-2 text-sm text-gray-500">
                      ({images.length}/5)
                    </span>
                  )}
                </button>

                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <button
                type="button"
                onClick={handleGetLocation}
                className="btn btn-outline w-full flex items-center justify-center gap-2"
              >
                <MapPinIcon className="w-5 h-5 inline mr-1" />
                Get Current Location
              </button>
              {formData.location.coordinates[0] !== 0 ||
              formData.location.coordinates[1] !== 0 ? (
                <p className="text-sm text-green-600 mt-2">
                  ✓ Location captured: Lat{" "}
                  {formData.location.coordinates[1].toFixed(6)}, Lon{" "}
                  {formData.location.coordinates[0].toFixed(6)}
                </p>
              ) : (
                <p className="text-sm text-gray-500 mt-2">
                  Click the button above to capture your current location
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Address (Optional)
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.location.address}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    location: { ...prev.location, address: e.target.value },
                  }))
                }
                className="input"
                placeholder="Nearest landmark or street address"
              />
            </div>

            <div className="flex justify-between gap-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn btn-secondary flex"
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading.isLoading}
                className="btn btn-primary"
              >
                {loading.isLoading ? "Submitting..." : "Submit Report"}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default CreateReport;
