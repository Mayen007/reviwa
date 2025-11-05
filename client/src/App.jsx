import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { LoadingProvider } from "./context/LoadingContext";

// Pages (eager loading for critical routes)
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";

// Lazy loaded pages (non-critical routes)
const CreateReport = lazy(() => import("./pages/CreateReport"));
const ReportDetail = lazy(() => import("./pages/ReportDetail"));
const Profile = lazy(() => import("./pages/Profile"));
const Leaderboard = lazy(() => import("./pages/Leaderboard"));
const Map = lazy(() => import("./pages/Map"));

// Components
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600"></div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <LoadingProvider>
        <Router
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/reports" element={<Reports />} />
              <Route
                path="/reports/:id"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <ReportDetail />
                  </Suspense>
                }
              />
              <Route
                path="/leaderboard"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <Leaderboard />
                  </Suspense>
                }
              />
              <Route
                path="/map"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <Map />
                  </Suspense>
                }
              />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/create-report"
                element={
                  <PrivateRoute>
                    <Suspense fallback={<PageLoader />}>
                      <CreateReport />
                    </Suspense>
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Suspense fallback={<PageLoader />}>
                      <Profile />
                    </Suspense>
                  </PrivateRoute>
                }
              />

              {/* 404 */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </LoadingProvider>
    </AuthProvider>
  );
}

export default App;
