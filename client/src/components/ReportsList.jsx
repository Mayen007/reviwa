import React, { useState } from "react";

const ReportsList = ({ reports = [], onStatusChange, onViewDetails }) => {
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  // Filter and sort reports
  const filteredReports = reports
    .filter((report) => filter === "all" || report.status === filter)
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.created_at) - new Date(a.created_at);
        case "severity":
          const severityOrder = { high: 3, medium: 2, low: 1 };
          return severityOrder[b.severity] - severityOrder[a.severity];
        case "status":
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "verified":
        return "bg-red-100 text-red-800 border-red-200";
      case "in_progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl">
      {/* Header with filters */}
      <div className="px-6 py-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-medium text-gray-900 mb-4 sm:mb-0">
            Recent Reports ({filteredReports.length})
          </h3>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            {/* Status Filter */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-md border-gray-300 text-sm focus:border-green-500 focus:ring-green-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="verified">Verified</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>

            {/* Sort Options */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-md border-gray-300 text-sm focus:border-green-500 focus:ring-green-500"
            >
              <option value="date">Sort by Date</option>
              <option value="severity">Sort by Severity</option>
              <option value="status">Sort by Status</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="divide-y divide-gray-200">
        {filteredReports.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <svg
              className="w-12 h-12 mx-auto text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-gray-500 text-lg font-medium">
              No reports found
            </p>
            <p className="text-gray-400 text-sm mt-1">
              {filter === "all"
                ? "No reports submitted yet"
                : `No ${filter} reports found`}
            </p>
          </div>
        ) : (
          filteredReports.map((report) => (
            <div
              key={report.id}
              className="px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <span
                      className="text-2xl"
                      role="img"
                      aria-label={report.category}
                    >
                      {getCategoryIcon(report.category)}
                    </span>
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-gray-900 truncate">
                        {report.title}
                      </h4>
                      <div className="flex items-center space-x-4 mt-1">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                            report.status
                          )}`}
                        >
                          {report.status.replace("_", " ")}
                        </span>
                        <span
                          className={`text-sm font-medium ${getSeverityColor(
                            report.severity
                          )}`}
                        >
                          {report.severity} severity
                        </span>
                        <span className="text-sm text-gray-500">
                          📍 {report.location?.city || "Location unknown"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {report.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>🕒 {formatDate(report.created_at)}</span>
                      {report.images && report.images.length > 0 && (
                        <span>
                          📷 {report.images.length} photo
                          {report.images.length !== 1 ? "s" : ""}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onViewDetails?.(report)}
                        className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        View Details
                      </button>

                      {report.status === "pending" && (
                        <button
                          onClick={() =>
                            onStatusChange?.(report.id, "verified")
                          }
                          className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md btn-premium btn-primary"
                        >
                          Verify
                        </button>
                      )}

                      {report.status === "verified" && (
                        <button
                          onClick={() =>
                            onStatusChange?.(report.id, "in_progress")
                          }
                          className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md btn-premium btn-secondary"
                        >
                          Start Cleanup
                        </button>
                      )}

                      {report.status === "in_progress" && (
                        <button
                          onClick={() =>
                            onStatusChange?.(report.id, "resolved")
                          }
                          className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md btn-premium btn-primary"
                        >
                          Mark Resolved
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary Footer */}
      {filteredReports.length > 0 && (
        <div className="px-6 py-6 bg-accent-sand border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-6">
              <span>
                📊 {reports.filter((r) => r.status === "resolved").length}{" "}
                resolved
              </span>
              <span>
                ⏳ {reports.filter((r) => r.status === "pending").length}{" "}
                pending
              </span>
              <span>
                🔄 {reports.filter((r) => r.status === "in_progress").length} in
                progress
              </span>
            </div>
            <div>
              🎯{" "}
              {Math.round(
                (reports.filter((r) => r.status === "resolved").length /
                  reports.length) *
                  100
              )}
              % completion rate
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsList;
