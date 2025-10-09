import React, { useRef, useState, useCallback } from "react";

const ImageUpload = ({ images, setImages, maxImages = 5, maxSizeMB = 10 }) => {
  const fileInputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  // Handle file drag and drop
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragOut = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const validateFile = (file) => {
    // Check file type
    if (!file.type.startsWith("image/")) {
      return "Only image files are allowed";
    }

    // Check file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      return `File size must be less than ${maxSizeMB}MB`;
    }

    return null;
  };

  const compressImage = (file, quality = 0.8) => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions (max width/height: 1920px)
        const maxDimension = 1920;
        let { width, height } = img;

        if (width > height && width > maxDimension) {
          height = (height * maxDimension) / width;
          width = maxDimension;
        } else if (height > maxDimension) {
          width = (width * maxDimension) / height;
          height = maxDimension;
        }

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(resolve, file.type, quality);
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const handleFiles = async (files) => {
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (images.length + imageFiles.length > maxImages) {
      alert(`Maximum ${maxImages} images allowed`);
      return;
    }

    for (const file of imageFiles) {
      const validation = validateFile(file);
      if (validation) {
        alert(`${file.name}: ${validation}`);
        continue;
      }

      const imageId = Date.now() + Math.random();

      // Start upload progress
      setUploadProgress((prev) => ({ ...prev, [imageId]: 0 }));

      try {
        // Compress image if it's larger than 2MB
        const finalFile =
          file.size > 2 * 1024 * 1024 ? await compressImage(file) : file;

        // Simulate compression progress
        for (let i = 0; i <= 100; i += 20) {
          setTimeout(() => {
            setUploadProgress((prev) => ({ ...prev, [imageId]: i }));
          }, i * 10);
        }

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
          const newImage = {
            id: imageId,
            file: finalFile,
            originalFile: file,
            preview: e.target.result,
            name: file.name,
            size: finalFile.size,
            originalSize: file.size,
            type: file.type,
            lastModified: file.lastModified,
          };

          setImages((prev) => [...prev, newImage]);

          // Remove progress after completion
          setTimeout(() => {
            setUploadProgress((prev) => {
              const newProgress = { ...prev };
              delete newProgress[imageId];
              return newProgress;
            });
          }, 1000);
        };
        reader.readAsDataURL(finalFile);
      } catch (error) {
        console.error("Error processing image:", error);
        alert(`Failed to process ${file.name}`);
        setUploadProgress((prev) => {
          const newProgress = { ...prev };
          delete newProgress[imageId];
          return newProgress;
        });
      }
    }
  };

  const removeImage = (imageId) => {
    setImages((prev) => prev.filter((img) => img.id !== imageId));
    // Clean up progress if exists
    setUploadProgress((prev) => {
      const newProgress = { ...prev };
      delete newProgress[imageId];
      return newProgress;
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Drag and Drop Area */}
      <div
        className={`relative border-3 border-dashed rounded-2xl p-8 transition-all duration-300 ${
          isDragOver
            ? "border-green-400 bg-green-50 scale-105 shadow-lg"
            : "border-gray-300 bg-white/30 hover:border-gray-400"
        }`}
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="text-center">
          <div
            className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-all duration-300 ${
              isDragOver ? "bg-green-100 scale-110" : "bg-gray-100"
            }`}
          >
            {isDragOver ? (
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                />
              </svg>
            ) : (
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            )}
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {isDragOver ? "Drop your photos here!" : "Add waste site photos"}
          </h3>

          <p className="text-gray-500 mb-4">
            Drag & drop images or click to browse • Max {maxImages} images • Up
            to {maxSizeMB}MB each
          </p>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-semibold shadow-sm"
          >
            <svg
              className="w-5 h-5 inline mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6a2 2 0 01-2 2H10a2 2 0 01-2-2V5z"
              />
            </svg>
            Choose Files
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleFiles(Array.from(e.target.files))}
          className="hidden"
        />
      </div>

      {/* Image Previews */}
      {images.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Uploaded Photos ({images.length}/{maxImages})
            </h3>
            <div className="text-sm text-gray-500">
              Total:{" "}
              {formatFileSize(images.reduce((sum, img) => sum + img.size, 0))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <div key={image.id} className="relative group">
                {/* Upload Progress */}
                {uploadProgress[image.id] !== undefined && (
                  <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center z-10">
                    <div className="text-center text-white">
                      <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                      <div className="text-sm">{uploadProgress[image.id]}%</div>
                    </div>
                  </div>
                )}

                {/* Image Container */}
                <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-sm group-hover:shadow-lg transition-all duration-300">
                  <img
                    src={image.preview}
                    alt={image.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => removeImage(image.id)}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100 flex items-center justify-center shadow-lg"
                  title="Remove image"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* Image Info */}
                <div className="mt-2 space-y-1">
                  <div className="text-xs text-gray-600 truncate font-medium">
                    {image.name}
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{formatFileSize(image.size)}</span>
                    {image.originalSize !== image.size && (
                      <span className="text-green-600">
                        ↓{" "}
                        {Math.round(
                          (1 - image.size / image.originalSize) * 100
                        )}
                        %
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Tips */}
      {images.length === 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start">
            <svg
              className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h4 className="text-sm font-semibold text-blue-900 mb-1">
                Photo Tips for Better Reports
              </h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Take clear, well-lit photos from multiple angles</li>
                <li>• Include context showing the surrounding area</li>
                <li>• Capture any warning signs or hazard indicators</li>
                <li>• Avoid including people's faces for privacy</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
