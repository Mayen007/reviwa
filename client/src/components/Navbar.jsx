import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import {
  MapIcon,
  MapPinIcon,
  PlusCircleIcon,
  TrophyIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path
      ? "text-primary-600 bg-primary-50 shadow-sm"
      : "text-gray-600 hover:text-primary-600 hover:bg-primary-50/50";
  };

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-2 group"
              onClick={closeMobileMenu}
            >
              <div className="w-9 h-9 flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  <img
                    src="/logo.svg"
                    alt="Reviwa logo"
                    className="w-8 h-6"
                  />
                </span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                Reviwa
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              {/* Admin-only navigation when on admin page */}
              {location.pathname === "/admin" ? (
                <Link
                  to="/admin"
                  className="px-3 py-2 rounded-lg font-medium transition-all relative bg-purple-600 text-white shadow-lg shadow-purple-500/50"
                >
                  <svg
                    className="w-5 h-5 inline mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  Admin Control Panel
                </Link>
              ) : (
                <>
                  {/* Regular user navigation */}
                  {isAuthenticated && (
                    <Link
                      to="/dashboard"
                      className={`px-3 py-2 rounded-lg font-medium transition-colors ${isActive(
                        "/dashboard"
                      )}`}
                    >
                      <ChartBarIcon className="w-5 h-5 inline mr-1" />
                      Dashboard
                    </Link>
                  )}
                  {isAuthenticated && user?.role === "admin" && (
                    <Link
                      to="/admin"
                      className={`px-3 py-2 rounded-lg font-medium transition-all relative ${
                        location.pathname === "/admin"
                          ? "bg-purple-600 text-white shadow-lg shadow-purple-500/50"
                          : "text-gray-600 hover:bg-purple-50 hover:text-purple-600"
                      }`}
                    >
                      <svg
                        className="w-5 h-5 inline mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                      Admin
                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                      </span>
                    </Link>
                  )}
                  <Link
                    to="/reports"
                    className={`px-3 py-2 rounded-lg font-medium transition-colors ${isActive(
                      "/reports"
                    )}`}
                  >
                    <MapPinIcon className="w-5 h-5 inline mr-1" />
                    Reports
                  </Link>
                  <Link
                    to="/map"
                    className={`px-3 py-2 rounded-lg font-medium transition-colors ${isActive(
                      "/map"
                    )}`}
                  >
                    <MapIcon className="w-5 h-5 inline mr-1" />
                    Map
                  </Link>
                  <Link
                    to="/leaderboard"
                    className={`px-3 py-2 rounded-lg font-medium transition-colors ${isActive(
                      "/leaderboard"
                    )}`}
                  >
                    <TrophyIcon className="w-5 h-5 inline mr-1" />
                    Leaderboard
                  </Link>

                  {isAuthenticated && (
                    <Link
                      to="/create-report"
                      className={`px-3 py-2 rounded-lg font-medium transition-colors ${isActive(
                        "/create-report"
                      )}`}
                    >
                      <PlusCircleIcon className="w-5 h-5 inline mr-1" />
                      Report Waste
                    </Link>
                  )}
                </>
              )}
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-3">
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </button>

              {/* Desktop User Menu */}
              <div className="hidden md:flex items-center space-x-3">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <UserCircleIcon className="w-6 h-6 text-gray-600" />
                      <div className="hidden sm:block text-left">
                        <p className="text-sm font-medium text-gray-900">
                          {user?.name}
                        </p>
                        {user?.role !== "admin" && (
                          <p className="text-xs text-primary-600">
                            {user?.ecoPoints || 0} points
                          </p>
                        )}
                        {user?.role === "admin" && (
                          <p className="text-xs text-purple-600 font-semibold">
                            Administrator
                          </p>
                        )}
                      </div>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Logout"
                    >
                      <ArrowRightOnRectangleIcon className="w-6 h-6" />
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="px-4 py-2 text-gray-700 font-medium hover:text-primary-600 transition-colors"
                    >
                      Login
                    </Link>
                    <Link to="/register" className="btn btn-primary">
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white border-b border-gray-200 shadow-lg overflow-hidden"
            >
              <div className="px-4 py-6 space-y-3">
                {/* Mobile Navigation Links */}
                {location.pathname === "/admin" ? (
                  <Link
                    to="/admin"
                    onClick={closeMobileMenu}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all relative bg-purple-600 text-white shadow-lg shadow-purple-500/50"
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
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <span>Admin Control Panel</span>
                  </Link>
                ) : (
                  <>
                    {/* Regular mobile navigation */}
                    {isAuthenticated && (
                      <Link
                        to="/dashboard"
                        onClick={closeMobileMenu}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${isActive(
                          "/dashboard"
                        )}`}
                      >
                        <ChartBarIcon className="w-5 h-5" />
                        <span>Dashboard</span>
                      </Link>
                    )}
                    {isAuthenticated && user?.role === "admin" && (
                      <Link
                        to="/admin"
                        onClick={closeMobileMenu}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all relative ${
                          location.pathname === "/admin"
                            ? "bg-purple-600 text-white shadow-lg shadow-purple-500/50"
                            : "text-gray-600 hover:bg-purple-50 hover:text-purple-600"
                        }`}
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
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                        <span>Admin</span>
                        <span className="flex h-2 w-2 ml-auto">
                          <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-purple-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                        </span>
                      </Link>
                    )}
                    <Link
                      to="/reports"
                      onClick={closeMobileMenu}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${isActive(
                        "/reports"
                      )}`}
                    >
                      <MapPinIcon className="w-5 h-5" />
                      <span>Reports</span>
                    </Link>
                    <Link
                      to="/map"
                      onClick={closeMobileMenu}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${isActive(
                        "/map"
                      )}`}
                    >
                      <MapIcon className="w-5 h-5" />
                      <span>Map</span>
                    </Link>
                    <Link
                      to="/leaderboard"
                      onClick={closeMobileMenu}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${isActive(
                        "/leaderboard"
                      )}`}
                    >
                      <TrophyIcon className="w-5 h-5" />
                      <span>Leaderboard</span>
                    </Link>

                    {isAuthenticated && (
                      <>
                        <Link
                          to="/create-report"
                          onClick={closeMobileMenu}
                          className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${isActive(
                            "/create-report"
                          )}`}
                        >
                          <PlusCircleIcon className="w-5 h-5" />
                          <span>Report Waste</span>
                        </Link>
                      </>
                    )}
                  </>
                )}

                {isAuthenticated && (
                  <>
                    <div className="border-t border-gray-200 pt-3 mt-3">
                      <Link
                        to="/profile"
                        onClick={closeMobileMenu}
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <UserCircleIcon className="w-6 h-6 text-gray-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {user?.name}
                          </p>
                          {user?.role !== "admin" && (
                            <p className="text-xs text-primary-600">
                              {user?.ecoPoints || 0} points
                            </p>
                          )}
                          {user?.role === "admin" && (
                            <p className="text-xs text-purple-600 font-semibold">
                              Administrator
                            </p>
                          )}
                        </div>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <ArrowRightOnRectangleIcon className="w-6 h-6" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </>
                )}

                {!isAuthenticated && (
                  <div className="border-t border-gray-200 pt-3 mt-3 space-y-2">
                    <Link
                      to="/login"
                      onClick={closeMobileMenu}
                      className="block w-full text-center px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={closeMobileMenu}
                      className="block w-full text-center btn btn-primary"
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
