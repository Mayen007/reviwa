import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useLoading } from "../context/LoadingContext";
import ConfirmDialog from "../components/ConfirmDialog";
import {
  MapPinIcon,
  CalendarIcon,
  UserIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const ReportDetail = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { loading: loadingState, showLoading, hideLoading } = useLoading();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    fetchReport();
  }, [id]);

  const fetchReport = async () => {
    try {
      const response = await axios.get(`/api/reports/${id}`);
      setReport(response.data.data.report);
    } catch (error) {
      console.error("Failed to fetch report:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    if (!isAuthenticated) return;

    showLoading(`Updating status to ${newStatus}...`, "submit");
    setError("");

    try {
      const response = await axios.patch(`/api/reports/${id}/status`, {
        status: newStatus,
      });
      setReport(response.data.data.report);

      // Brief success delay
      setTimeout(() => {
        hideLoading();
      }, 300);
    } catch (error) {
      hideLoading();
      console.error("Failed to update status:", error);
      setError(error.response?.data?.message || "Failed to update status");
    }
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirmed = async () => {
    showLoading("Deleting report...", "delete");
    setError("");

    try {
      await axios.delete(`/api/reports/${id}`);

      // Show success briefly before navigation
      setTimeout(() => {
        hideLoading();
        navigate("/reports");
      }, 500);
    } catch (error) {
      hideLoading();
      console.error("Failed to delete report:", error);
      setError(error.response?.data?.message || "Failed to delete report");
    }
  };

  if (loading) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </>
    );
  }

  if (!report) {
    return (
      <>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="card text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Report Not Found
            </h2>
            <button
              onClick={() => navigate("/reports")}
              className="btn btn-primary"
            >
              Back to Reports
            </button>
          </div>
        </div>
      </>
    );
  }

  const isOwner = user?.id === report.reportedBy?._id;
  const isAdmin = user?.role === "admin";
  const canEdit = isOwner || isAdmin;

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-gray-900 mb-6 flex items-center gap-2"
        >
          ← Back
        </button>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="card mb-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {report.title}
              </h1>
              <span className={`badge badge-${report.status}`}>
                {report.status}
              </span>
            </div>
            {canEdit && (
              <button
                onClick={handleDelete}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                title="Delete report"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Images Gallery */}
          {report.images && report.images.length > 0 && (
            <div className="mb-6">
              <div
                className={`grid gap-4 ${
                  report.images.length === 1
                    ? "grid-cols-1"
                    : report.images.length === 2
                    ? "grid-cols-2"
                    : "grid-cols-2 md:grid-cols-3"
                }`}
              >
                {report.images.map((image, index) => (
                  <img
                    key={image.publicId || index}
                    src={image.url}
                    alt={`${report.title} - Image ${index + 1}`}
                    className={`w-full object-cover rounded-lg ${
                      index === 0 && report.images.length > 1
                        ? "col-span-2 h-96"
                        : "h-64"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Description
            </h3>
            <p className="text-gray-700">{report.description}</p>
          </div>

          {/* Details Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                Waste Type
              </h4>
              <p className="text-gray-900 capitalize">{report.wasteType}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                Severity
              </h4>
              <p className="text-gray-900 capitalize">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
                    report.severity === "critical"
                      ? "bg-red-100 text-red-800"
                      : report.severity === "high"
                      ? "bg-orange-100 text-orange-800"
                      : report.severity === "medium"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {report.severity}
                </span>
              </p>
            </div>
            {(report.location?.address ||
              (report.location?.coordinates &&
                report.location.coordinates.length === 2)) && (
              <div className="md:col-span-2">
                <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
                  <MapPinIcon className="w-4 h-4" />
                  Location
                </h4>
                {report.location?.address ? (
                  <p className="text-gray-900 mb-1">
                    {report.location.address}
                  </p>
                ) : null}
                {report.location?.coordinates && (
                  <p className="text-sm text-gray-600">
                    Coordinates: {report.location.coordinates[1].toFixed(6)},{" "}
                    {report.location.coordinates[0].toFixed(6)}
                  </p>
                )}

                {/* Link to map - always available when coordinates exist */}
                <Link
                  to={`/map?report=${report._id}`}
                  className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                  <MapPinIcon className="w-4 h-4" />
                  View on Map
                </Link>
              </div>
            )}
            {report.estimatedVolume && (
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Estimated Volume
                </h4>
                <p className="text-gray-900">{report.estimatedVolume}</p>
              </div>
            )}
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                Date Reported
              </h4>
              <p className="text-gray-900">
                {new Date(report.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            {report.updatedAt &&
              new Date(report.updatedAt).getTime() !==
                new Date(report.createdAt).getTime() && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    Last Updated
                  </h4>
                  <p className="text-gray-900">
                    {new Date(report.updatedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              )}
          </div>

          {/* Resolution Notes */}
          {report.resolutionNotes && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-green-900 mb-2">
                Resolution Notes
              </h4>
              <p className="text-green-800">{report.resolutionNotes}</p>
            </div>
          )}

          {/* Reporter Info */}
          <div className="border-t border-gray-200 pt-6 mb-6">
            <h4 className="text-sm font-medium text-gray-500 mb-4">
              Reported By
            </h4>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <UserIcon className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {report.reportedBy?.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {report.reportedBy?.email}
                  </p>
                  {report.reportedBy?.role === "admin" ? (
                    <p className="text-sm text-purple-600 font-medium mt-1">
                      🛡️ Administrator
                    </p>
                  ) : (
                    <p className="text-sm text-primary-600 font-medium mt-1">
                      🌱 {report.reportedBy?.ecoPoints} eco points
                    </p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Reports</p>
                <p className="text-2xl font-bold text-gray-900">
                  {report.reportedBy?.reportsCount || 1}
                </p>
              </div>
            </div>
          </div>

          {/* Status Update Actions */}
          {canEdit && (
            <div className="border-t border-gray-200 pt-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Update Status
              </h4>
              {report.status === "resolved" ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 font-medium">
                    ✓ This issue has been resolved
                  </p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {/* pending → verified */}
                  {report.status === "pending" && (
                    <button
                      onClick={() => handleStatusUpdate("verified")}
                      disabled={loadingState.isLoading}
                      className="btn btn-primary"
                    >
                      Mark as Verified
                    </button>
                  )}
                  {/* verified → in-progress */}
                  {report.status === "verified" && (
                    <button
                      onClick={() => handleStatusUpdate("in-progress")}
                      disabled={loadingState.isLoading}
                      className="btn btn-secondary"
                    >
                      Mark as In Progress
                    </button>
                  )}
                  {/* in-progress → resolved */}
                  {report.status === "in-progress" && (
                    <button
                      onClick={() => handleStatusUpdate("resolved")}
                      disabled={loadingState.isLoading}
                      className="btn bg-green-600 text-white hover:bg-green-700"
                    >
                      Mark as Resolved
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          <ConfirmDialog
            isOpen={showDeleteConfirm}
            onClose={() => setShowDeleteConfirm(false)}
            onConfirm={handleDeleteConfirmed}
            title="Delete Report?"
            message="Are you sure you want to delete this report? This action cannot be undone."
            confirmText="Delete"
            cancelText="Cancel"
            type="danger"
          />
        </div>
      </div>
    </>
  );
};

export default ReportDetail;
