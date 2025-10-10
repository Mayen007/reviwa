import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FadeIn, SlideUp } from "./MotionWrapper";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await login(formData.email, formData.password);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-accent-sand to-gray-50 py-12 px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo and Header */}
        <FadeIn className="text-center">
          <div className="mx-auto h-20 w-20 flex items-center justify-center rounded-2xl bg-gradient-to-r from-primary to-emerald-600 shadow-lg mb-6">
            <span className="text-2xl text-white font-inter font-bold">R</span>
          </div>
          <h1 className="text-3xl font-inter font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
            Welcome back to Reviwa
          </h1>
          <p className="text-charcoal/70 font-body">
            Sign in to continue building sustainable cities
          </p>
        </FadeIn>

        {/* Login Form Card */}
        <SlideUp delay={0.2} className="card-glass">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-body">
                {error}
              </div>
            )}

            <div className="space-y-6">
              {/* Email Field with Floating Label */}
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="peer block w-full px-4 py-3 border border-gray-300 rounded-xl bg-white/50 backdrop-blur-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="Email address"
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 -top-2.5 px-2 bg-white text-sm font-medium text-charcoal/70 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-charcoal/50 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary"
                >
                  Email address
                </label>
              </div>

              {/* Password Field with Floating Label */}
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="peer block w-full px-4 py-3 border border-gray-300 rounded-xl bg-white/50 backdrop-blur-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="Password"
                />
                <label
                  htmlFor="password"
                  className="absolute left-4 -top-2.5 px-2 bg-white text-sm font-medium text-charcoal/70 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-charcoal/50 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary"
                >
                  Password
                </label>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-reviwa w-full disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4"
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
                  Signing in...
                </div>
              ) : (
                "Sign in to Dashboard"
              )}
            </button>
          </form>
        </SlideUp>

        {/* Register Link */}
        <div className="text-center">
          <p className="text-charcoal/70 font-body">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-primary hover:text-secondary transition-colors"
            >
              Join the environmental movement
            </Link>
          </p>
        </div>

        {/* Demo Credentials */}
        <div className="card-glass">
          <h4 className="text-sm font-medium text-charcoal mb-3 font-inter">
            🌱 Demo Accounts
          </h4>
          <div className="text-xs text-charcoal/70 space-y-2 font-body">
            <div className="p-2 bg-emerald-50 rounded-lg">
              <p>
                <strong className="text-primary">Citizen:</strong>{" "}
                sarah@example.com / EcoPass123!
              </p>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg">
              <p>
                <strong className="text-secondary">NGO:</strong>{" "}
                contact@greensolutions.org / GreenOrg123!
              </p>
            </div>
            <div className="p-2 bg-gray-50 rounded-lg">
              <p>
                <strong className="text-charcoal">Admin:</strong>{" "}
                admin@reviwa.com / AdminPass123!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
