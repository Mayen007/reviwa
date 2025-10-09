import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import WasteMap from "./WasteMap";
import ReportsList from "./ReportsList";
import NotificationCenter, { QuickStats } from "./NotificationCenter";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Mock data for waste reports (kept minimal for layout)
  const mockReports = [
    {
      id: 1,
      title: "Plastic Bottles Accumulation",
      status: "pending",
      coordinates: { lat: 40.7128, lng: -74.006 },
      location: { address: "Central Park, Manhattan, NY" },
    },
    {
      id: 2,
      title: "Electronic Waste Dump",
      status: "verified",
      coordinates: { lat: 40.7589, lng: -73.9851 },
      location: { address: "Times Square Area, NY" },
    },
    {
      id: 3,
      title: "Food Waste Container",
      status: "in_progress",
      coordinates: { lat: 40.7282, lng: -73.7949 },
      location: { address: "Queens Boulevard, Queens, NY" },
    },
  ];

  const handleLogout = () => logout();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-eco-50">
      {/* Header */}
      <header className="header-premium sticky top-0 z-50">
        <div className="w-full px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-3xl font-extrabold gradient-text tracking-tight">
                  Reviwa
                </h1>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Smart Waste Management
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="hidden sm:flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-eco-500 to-eco-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Welcome back
                  </p>
                  <p className="text-xs text-slate-500">{user?.name}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="btn-premium btn-secondary hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all duration-200"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="w-full py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Quick Stats */}
          <div className="mb-12 animate-fadeIn">
            <QuickStats user={user} reports={mockReports} />
          </div>

          {/* Welcome + Points */}
          <section className="card-premium mb-12 animate-slideUp">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-eco-500 to-eco-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold gradient-text mb-1">
                      Environmental Impact Dashboard
                    </h2>
                    <p className="text-slate-600">
                      Track contributions and engage with local cleanups.
                    </p>
                  </div>
                </div>
              </div>

              <div className="card-elevated p-6 text-center min-w-[180px]">
                <div className="text-4xl font-extrabold gradient-text mb-1">
                  {user?.green_points || 0}
                </div>
                <div className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                  Green Points
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="card-elevated p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {user?.waste_reports_submitted || 0}
                </div>
                <div className="text-sm text-slate-600">Reports Submitted</div>
              </div>
              <div className="card-elevated p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {user?.cleanup_events_attended || 0}
                </div>
                <div className="text-sm text-slate-600">Cleanups Attended</div>
              </div>
              <div className="card-elevated p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {user?.recycling_sessions_logged || 0}
                </div>
                <div className="text-sm text-slate-600">Recycling Sessions</div>
              </div>
              <div className="card-elevated p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {user?.achievements?.length || 0}
                </div>
                <div className="text-sm text-slate-600">Achievements</div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-br from-green-500 via-blue-500 to-purple-600 overflow-hidden shadow-2xl rounded-3xl mb-6 relative">
            <div className="absolute inset-0 bg-black opacity-10" />
            <div className="relative px-8 py-12 sm:p-12">
              <div className="text-center">
                <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full mx-auto mb-6 flex items-center justify-center">
                  🌍
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Spotted Waste? Report It!
                </h2>
                <p className="text-white/90 mb-6">
                  Your reports help create cleaner communities and earn you
                  green points.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => navigate("/report")}
                    className="group px-10 py-3 bg-white text-gray-900 font-bold rounded-2xl shadow-lg"
                  >
                    Report Waste Now
                  </button>
                  <button className="px-6 py-3 border-2 border-white text-white rounded-2xl bg-white/20">
                    View Nearby Reports
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Map + Reports */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Waste Reports Near You
                  </h3>
                </div>
                <WasteMap
                  reports={mockReports}
                  onReportClick={(r) => console.log("Selected", r)}
                  height="420px"
                />
              </div>
            </div>

            <div>
              <ReportsList
                reports={mockReports}
                onStatusChange={(id, s) => console.log("status", id, s)}
                onViewDetails={(r) => console.log("view", r)}
              />
            </div>
          </section>

          {/* Profile + Achievements */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <div className="bg-white overflow-hidden shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Your Profile
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <p className="text-gray-900">{user?.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <p className="text-gray-900">{user?.email}</p>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Your Achievements
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {(user?.achievements || []).map((a, i) => (
                  <div key={i} className="border p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{a.icon}</div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {a.title}
                          </div>
                          <div className="text-sm text-gray-600">
                            {a.description}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-eco-600">
                        +{a.green_points_earned}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Quick Actions */}
          <section className="mt-6">
            <div className="bg-white overflow-hidden shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="flex gap-4">
                <button className="px-4 py-2 rounded-lg bg-green-600 text-white">
                  Report Waste Site
                </button>
                <button className="px-4 py-2 rounded-lg border bg-white">
                  View Map
                </button>
                <button className="px-4 py-2 rounded-lg border bg-white">
                  Join Cleanup Event
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Notification Center */}
      <NotificationCenter />
    </div>
  );
};

export default Dashboard;
