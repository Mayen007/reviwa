import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";

const HeroSection = ({
  authLoading,
  isAuthenticated,
  userInitials = [],
  totalUsers = 0,
}) => {
  return (
    <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white py-14 md:py-16 lg:py-20 overflow-hidden min-h-screen flex items-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-48 h-48 md:w-72 md:h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-48 h-48 md:w-72 md:h-72 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-48 h-48 md:w-72 md:h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
            >
              <span className="text-sm font-semibold flex items-center gap-2">
                <Globe className="w-4 h-4 inline" /> Building Sustainable
                Cities - SDG 11
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              Building <br />
              <span className="text-green-300">Cleaner Cities,</span>
              <br />
              Together
            </h1>
            <p className="text-md sm:text-xl md:text-2xl mb-8 sm:mb-10 text-primary-50 max-w-3xl leading-relaxed font-light">
              <span className="font-semibold">Report.</span> Track. Earn
              rewards. Build cleaner cities together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              {authLoading ? (
                <div className="h-12 w-48 rounded-xl bg-white/10 animate-pulse" />
              ) : isAuthenticated ? (
                <>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full sm:w-auto"
                  >
                    <Link
                      to="/create-report"
                      className="btn bg-white inline-flex items-center justify-center text-primary-700 hover:bg-emerald-50 px-8 py-3.5 sm:py-4 text-base sm:text-lg font-bold shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 relative overflow-hidden group w-full sm:w-auto sm:min-w-[190px] rounded-xl"
                    >
                      <span className="relative z-10">Report Waste</span>
                      <svg
                        className="relative z-10 w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform inline"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-primary-400 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full sm:w-auto"
                  >
                    <Link
                      to="/map"
                      className="btn bg-white/10 hover:bg-white/20 text-white inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 text-base sm:text-lg font-bold border-2 border-white/50 backdrop-blur-md transition-all duration-300 w-full sm:w-auto sm:min-w-[190px] rounded-xl"
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>Explore Live Map</span>
                    </Link>
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full sm:w-auto"
                  >
                    <Link
                      to="/register"
                      className="btn bg-white inline-flex items-center justify-center text-primary-700 hover:bg-emerald-50 px-8 py-3.5 sm:py-4 text-base sm:text-lg font-bold shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 relative overflow-hidden group w-full sm:w-auto sm:min-w-[190px] rounded-xl"
                    >
                      <span className="relative z-10">
                        Report Waste
                      </span>
                      <svg
                        className="relative z-10 w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform inline"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-primary-400 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full sm:w-auto"
                  >
                    <Link
                      to="/map"
                      className="btn bg-white/10 hover:bg-white/20 text-white inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 text-base sm:text-lg font-bold border-2 border-white/50 backdrop-blur-md transition-all duration-300 w-full sm:w-auto sm:min-w-[190px] rounded-xl"
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>Explore Live Map</span>
                    </Link>
                  </motion.div>
                </>
              )}
            </div>

            {/* Community Members Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6 mt-12"
            >
              <div className="flex -space-x-3">
                {userInitials.slice(0, 5).map((initials, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    whileHover={{ scale: 1.1, zIndex: 10 }}
                    className="w-12 h-12 bg-gradient-to-r from-primary-400 to-green-500 rounded-full border-3 border-white flex items-center justify-center shadow-lg cursor-pointer"
                    style={{ zIndex: 5 - index }}
                  >
                    <span className="text-white text-sm font-bold">
                      {initials}
                    </span>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.4 }}
                  className="w-12 h-12 bg-white border-3 border-primary-300 rounded-full flex items-center justify-center shadow-lg"
                >
                  <span className="text-primary-600 text-xs font-bold">
                    +
                    {totalUsers > 1000
                      ? `${Math.floor(totalUsers / 1000)}K`
                      : totalUsers}
                  </span>
                </motion.div>
              </div>
              <div className="text-left">
                <p className="text-white font-bold text-lg">
                  Join{" "}
                  {totalUsers > 1000
                    ? `${Math.floor(totalUsers / 1000)}K+`
                    : `${totalUsers}+`}{" "}
                  members
                </p>
                <p className="text-primary-100 text-sm">
                  Making cities cleaner every day
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Cleanup Illustration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: [0, -12, 0] }}
            transition={{
              opacity: { duration: 0.8, delay: 0.3 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            }}
            className="hidden md:flex justify-center items-center"
          >
            <div className="relative w-full max-w-lg mx-auto">
              <img
                src="/hero-cleanup.png"
                alt="People recycling and cleaning up the community"
                className="w-full h-auto max-h-[520px] object-contain drop-shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#f9fafb"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
