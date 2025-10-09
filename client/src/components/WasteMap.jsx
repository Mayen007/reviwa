import React, { useState, useEffect, useCallback } from "react";

const WasteMap = ({
  reports = [],
  onReportClick,
  height = "400px",
  center = [40.7128, -74.006],
}) => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [mapStyle, setMapStyle] = useState("street");
  const [filterStatus, setFilterStatus] = useState("all");
  const [userLocation, setUserLocation] = useState(null);

  // Mock map implementation with canvas or div-based approach
  const [viewBounds, setViewBounds] = useState({
    north: center[0] + 0.1,
    south: center[0] - 0.1,
    east: center[1] + 0.1,
    west: center[1] - 0.1,
  });

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => console.log("Geolocation error:", error),
        { enableHighAccuracy: true, timeout: 10000 }
      );
    }
  }, []);

  // Filter reports based on status
  const filteredReports = reports.filter((report) => {
    if (filterStatus === "all") return true;
    return report.status === filterStatus;
  });

  // Status color mapping
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "#f59e0b"; // amber
      case "verified":
        return "#ef4444"; // red
      case "in_progress":
        return "#3b82f6"; // blue
      case "resolved":
        return "#10b981"; // green
      default:
        return "#6b7280"; // gray
    }
  };

  // Category icon mapping
  const getCategoryIcon = (category) => {
    const icons = {
      plastic: "🏷️",
      organic: "🍎",
      electronic: "📱",
      metal: "🔩",
      glass: "🪟",
      paper: "📄",
      textile: "👕",
      hazardous: "☢️",
    };
    return icons[category] || "🗑️";
  };

  const handleReportClick = (report) => {
    setSelectedReport(report);
    onReportClick?.(report);
  };

  const formatDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance < 1
      ? `${Math.round(distance * 1000)}m`
      : `${distance.toFixed(1)}km`;
  };

  return (
    <div className="relative bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Map Controls */}
      <div className="absolute top-4 left-4 z-10 space-y-2">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-2">
          <div className="flex space-x-1">
            <button
              onClick={() => setMapStyle("street")}
              className={`px-3 py-1 text-xs rounded ${
                mapStyle === "street"
                  ? "bg-green-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Street
            </button>
            <button
              onClick={() => setMapStyle("satellite")}
              className={`px-3 py-1 text-xs rounded ${
                mapStyle === "satellite"
                  ? "bg-green-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Satellite
            </button>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs border-none bg-transparent focus:outline-none"
          >
            <option value="all">All Reports</option>
            <option value="pending">Pending</option>
            <option value="verified">Verified</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Map Legend */}
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-3 text-xs">
          <h4 className="font-semibold text-gray-900 mb-2">Status Legend</h4>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span>Pending</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>Verified</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>In Progress</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Resolved</span>
            </div>
          </div>
        </div>
      </div>

      {/* Map Canvas/Container */}
      <div
        className={`relative w-full ${
          mapStyle === "satellite" ? "bg-gray-800" : "bg-green-50"
        }`}
        style={{ height }}
      >
        {/* Background pattern based on map style */}
        <div
          className={`absolute inset-0 ${
            mapStyle === "satellite"
              ? "bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900"
              : "bg-gradient-to-br from-green-100 via-blue-50 to-emerald-100"
          }`}
        >
          {/* Grid pattern for street view */}
          {mapStyle === "street" && (
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
                {[...Array(144)].map((_, i) => (
                  <div key={i} className="border border-gray-300"></div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Location Marker */}
        {userLocation && (
          <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
            style={{
              left: "50%", // Center for demo - would calculate based on actual coordinates
              top: "40%",
            }}
          >
            <div className="relative">
              <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>
              <div className="absolute inset-0 w-4 h-4 bg-blue-500 rounded-full animate-ping opacity-30"></div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                You are here
              </div>
            </div>
          </div>
        )}

        {/* Waste Report Markers */}
        {filteredReports.map((report, index) => {
          // Calculate position (mock positioning for demo)
          const x = 20 + (index % 6) * 120;
          const y = 60 + Math.floor(index / 6) * 80;

          return (
            <div
              key={report.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
              style={{ left: `${x}px`, top: `${y}px` }}
              onClick={() => handleReportClick(report)}
            >
              {/* Marker */}
              <div className="relative">
                <div
                  className="w-8 h-8 rounded-full border-3 border-white shadow-lg flex items-center justify-center text-lg hover:scale-110 transition-transform duration-200"
                  style={{ backgroundColor: getStatusColor(report.status) }}
                >
                  {getCategoryIcon(report.category)}
                </div>

                {/* Pulse effect for urgent reports */}
                {report.severity === "high" && (
                  <div
                    className="absolute inset-0 rounded-full animate-ping opacity-50"
                    style={{ backgroundColor: getStatusColor(report.status) }}
                  ></div>
                )}

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg">
                    <div className="font-semibold">{report.title}</div>
                    <div className="text-gray-300 capitalize">
                      {report.status}
                    </div>
                    {userLocation && report.coordinates && (
                      <div className="text-gray-400">
                        {formatDistance(
                          userLocation.lat,
                          userLocation.lng,
                          report.coordinates.lat,
                          report.coordinates.lng
                        )}{" "}
                        away
                      </div>
                    )}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Report Details Panel */}
      {selectedReport && (
        <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-4 z-20">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                <span>{getCategoryIcon(selectedReport.category)}</span>
                <span>{selectedReport.title}</span>
              </h3>
              <div className="flex items-center space-x-4 mt-1">
                <span
                  className="px-2 py-1 text-xs font-medium rounded-full text-white capitalize"
                  style={{
                    backgroundColor: getStatusColor(selectedReport.status),
                  }}
                >
                  {selectedReport.status}
                </span>
                <span className="text-xs text-gray-500">
                  {selectedReport.severity} severity
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(selectedReport.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
            <button
              onClick={() => setSelectedReport(null)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-5 h-5"
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
          </div>

          <p className="text-sm text-gray-700 mb-3">
            {selectedReport.description}
          </p>

          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-500">
              📍 {selectedReport.location?.address || "Location details"}
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-green-500 text-white text-xs rounded-lg hover:bg-green-600 transition-colors">
                View Details
              </button>
              {selectedReport.status === "verified" && (
                <button className="px-3 py-1 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 transition-colors">
                  Join Cleanup
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* No reports message */}
      {filteredReports.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3"
              />
            </svg>
            <p className="text-lg font-medium">No waste reports found</p>
            <p className="text-sm">
              {filterStatus !== "all"
                ? `No ${filterStatus} reports in this area`
                : "Be the first to report waste in your area"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WasteMap;
