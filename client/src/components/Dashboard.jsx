import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import WasteMap from "./WasteMap";
import NotificationCenter from "./NotificationCenter";
import {
  FadeIn,
  SlideUp,
  StaggerContainer,
  StaggerItem,
} from "./MotionWrapper";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const mockReports = [
    {
      id: 1,
      title: "Plastic Waste Accumulation",
      status: "pending",
      coordinates: { lat: 40.7128, lng: -74.006 },
      location: { address: "Central Park, Manhattan, NY" },
      category: "plastic",
      severity: "medium",
    },
    {
      id: 2,
      title: "Electronic Waste Dump",
      status: "verified",
      coordinates: { lat: 40.7589, lng: -73.9851 },
      location: { address: "Times Square Area, NY" },
      category: "electronic",
      severity: "high",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sand-50 to-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-inter font-bold text-lg">
                  R
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-inter font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Reviwa
                </h1>
                <p className="text-xs text-charcoal/70 font-body">
                  Smart Waste Management
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="hidden sm:flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-emerald-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-charcoal">
                    Welcome back
                  </p>
                  <p className="text-xs text-charcoal/70">{user?.name}</p>
                </div>
              </div>

              <div className="hidden md:flex items-center space-x-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200">
                <div className="w-6 h-6 bg-gradient-to-r from-primary to-emerald-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">🌱</span>
                </div>
                <span className="text-sm font-medium text-charcoal">
                  {user?.green_points || 0} Green Points
                </span>
              </div>

              <button
                onClick={logout}
                className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-charcoal hover:bg-gray-50 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarCollapsed ? "w-16" : "w-64"
          } bg-white/80 backdrop-blur-sm border-r border-gray-200 transition-all duration-300 sticky top-20 h-screen`}
        >
          <div className="p-4">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-full flex items-center justify-center p-2 mb-6 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <svg
                className={`w-5 h-5 text-gray-600 transition-transform ${
                  sidebarCollapsed ? "rotate-180" : ""
                }`}
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

            <nav className="space-y-2">
              <div
                className={`flex items-center space-x-3 p-3 rounded-xl bg-emerald-50 border border-primary text-primary ${
                  sidebarCollapsed ? "justify-center" : ""
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
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                  />
                </svg>
                {!sidebarCollapsed && (
                  <span className="font-medium">Dashboard</span>
                )}
              </div>

              <button
                onClick={() => navigate("/report")}
                className={`w-full flex items-center space-x-3 p-3 rounded-xl text-charcoal hover:bg-gray-100 transition-colors ${
                  sidebarCollapsed ? "justify-center" : ""
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
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {!sidebarCollapsed && (
                  <span className="font-medium">Report Waste</span>
                )}
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <FadeIn className="mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-r from-primary to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🌍</span>
              </div>
              <div>
                <h1 className="text-3xl font-inter font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Environmental Impact Dashboard
                </h1>
                <p className="text-charcoal/70">
                  Track your environmental contributions and engage with
                  sustainable communities.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Metrics Cards */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StaggerItem className="card-glass text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent mb-2">
                {user?.green_points || 0}
              </div>
              <div className="text-sm font-medium text-charcoal/70 uppercase tracking-wide">
                Green Points
              </div>
            </StaggerItem>

            <StaggerItem className="card-glass text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {user?.waste_reports_submitted || 0}
              </div>
              <div className="text-sm font-medium text-charcoal/70 uppercase tracking-wide">
                Reports Submitted
              </div>
            </StaggerItem>

            <StaggerItem className="card-glass text-center">
              <div className="text-3xl font-bold text-success mb-2">
                {user?.cleanup_events_attended || 0}
              </div>
              <div className="text-sm font-medium text-charcoal/70 uppercase tracking-wide">
                Cleanups Attended
              </div>
            </StaggerItem>

            <StaggerItem className="card-glass text-center">
              <div className="text-3xl font-bold text-warning mb-2">
                {user?.achievements?.length || 0}
              </div>
              <div className="text-sm font-medium text-charcoal/70 uppercase tracking-wide">
                Achievements
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* CTA Hero Section */}
          <SlideUp delay={0.3}>
            <section className="gradient-hero rounded-2xl mb-8 relative overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-black/10" />
              <div className="relative px-8 py-12 text-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">🌍</span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Spotted Waste? Report It!
                </h2>
                <p className="text-white/90 mb-8">
                  Your reports help create cleaner communities and earn you
                  green points.
                </p>
                <button
                  onClick={() => navigate("/report")}
                  className="btn-reviwa bg-white text-primary hover:bg-gray-100"
                >
                  Report Waste Now
                </button>
              </div>
            </section>
          </SlideUp>

          {/* Map and Leaderboard */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2">
              <div className="card-glass">
                <h3 className="text-xl font-bold text-charcoal mb-6">
                  Waste Reports Map
                </h3>
                <div className="h-96 rounded-lg overflow-hidden">
                  <WasteMap reports={mockReports} />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card-glass">
                <h3 className="text-xl font-bold text-charcoal mb-4">
                  Environmental Leaderboard
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary to-emerald-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-charcoal">
                        EcoWarrior2024
                      </p>
                      <p className="text-xs text-charcoal/70">
                        2,450 green points
                      </p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-primary to-emerald-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {user?.name?.charAt(0)?.toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-charcoal">You</p>
                        <p className="text-xs text-charcoal/70">
                          {user?.green_points || 0} green points
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => navigate("/report")}
        className="fixed right-6 bottom-6 w-16 h-16 bg-gradient-to-r from-primary to-emerald-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow z-50"
      >
        <svg
          className="w-6 h-6 text-white"
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
      </button>

      <NotificationCenter />
    </div>
  );
};

export default Dashboard;
