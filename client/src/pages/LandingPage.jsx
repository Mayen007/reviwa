import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  MapPinIcon,
  ChartBarIcon,
  TrophyIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const LandingPage = () => {
  const [userInitials, setUserInitials] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    fetchUserInitials();
  }, []);

  const fetchUserInitials = async () => {
    try {
      const response = await axios.get("/api/users/leaderboard?limit=5");
      const users = response.data.data.users;

      // Get initials from user names
      const initials = users.map((user) => {
        const names = user.name.split(" ");
        return names.map((n) => n[0].toUpperCase()).join("");
      });

      setUserInitials(initials);

      // Get total user count
      const statsResponse = await axios.get("/api/reports/stats/dashboard");
      setTotalUsers(statsResponse.data.data.stats.totalUsers || users.length);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      // Fallback to default initials
      setUserInitials(["S", "M", "A", "J", "K"]);
      setTotalUsers(12000);
    }
  };
  return (
    <>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-12 md:py-16 lg:py-20 overflow-hidden min-h-screen flex items-center">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
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
                  <span className="text-sm font-semibold">
                    🌍 Building Sustainable Cities - SDG 11
                  </span>
                </motion.div>

                <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-dark">
                  Building Cleaner Cities,
                  <br />
                  <span className="bg-gradient-to-r from-green-200 to-primary-200 bg-clip-text text-transparent">
                    Together
                  </span>
                </h1>
                <p className="text-xl md:text-2xl mb-10 text-primary-100 max-w-3xl leading-relaxed">
                  Report illegal waste dumping, track cleanup progress, and earn
                  rewards for making your community cleaner.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Link
                    to="/register"
                    className="btn bg-white text-primary-700 hover:bg-primary-50 px-8 py-4 text-lg font-bold shadow-2xl hover:shadow-3xl"
                  >
                    Get Started Free →
                  </Link>
                  <Link
                    to="/reports"
                    className="btn bg-transparent hover:bg-white/10 px-8 py-4 text-lg font-bold border-2 border-white backdrop-blur-sm"
                  >
                    View Reports
                  </Link>
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
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="hidden md:flex justify-center items-center"
              >
                <div className="relative">
                  {/* SVG Illustration */}
                  <svg
                    viewBox="0 0 500 500"
                    className="w-full max-w-lg drop-shadow-2xl"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Background Circle */}
                    <motion.circle
                      cx="250"
                      cy="250"
                      r="200"
                      fill="rgba(255, 255, 255, 0.1)"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    />

                    {/* Ground */}
                    <motion.ellipse
                      cx="250"
                      cy="420"
                      rx="180"
                      ry="20"
                      fill="rgba(255, 255, 255, 0.15)"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                    />

                    {/* Person with Trash Bag */}
                    <motion.g
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.9 }}
                    >
                      {/* Body */}
                      <rect
                        x="220"
                        y="280"
                        width="60"
                        height="100"
                        rx="30"
                        fill="#10b981"
                      />
                      {/* Head */}
                      <circle cx="250" cy="260" r="25" fill="#fbbf24" />
                      {/* Arm */}
                      <rect
                        x="280"
                        y="290"
                        width="40"
                        height="15"
                        rx="7"
                        fill="#10b981"
                      />
                      {/* Trash Bag */}
                      <path
                        d="M 320 280 Q 340 290 335 320 L 315 340 Q 310 350 300 345 L 285 335 Q 280 325 285 310 Z"
                        fill="#1f2937"
                      />
                      <circle cx="310" cy="315" r="3" fill="#16a34a" />
                    </motion.g>

                    {/* Recycling Bin */}
                    <motion.g
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 1.1 }}
                    >
                      <rect
                        x="140"
                        y="320"
                        width="50"
                        height="70"
                        rx="5"
                        fill="#16a34a"
                      />
                      <rect
                        x="135"
                        y="315"
                        width="60"
                        height="10"
                        rx="3"
                        fill="#22c55e"
                      />
                      {/* Recycling Symbol */}
                      <path
                        d="M 155 345 L 165 360 L 175 345 M 165 350 L 165 370"
                        stroke="white"
                        strokeWidth="3"
                        fill="none"
                      />
                      <circle cx="165" cy="375" r="3" fill="white" />
                    </motion.g>

                    {/* Tree */}
                    <motion.g
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 1.3 }}
                      style={{ transformOrigin: "380px 390px" }}
                    >
                      {/* Trunk */}
                      <rect
                        x="370"
                        y="360"
                        width="20"
                        height="50"
                        fill="#92400e"
                      />
                      {/* Leaves */}
                      <circle cx="380" cy="345" r="30" fill="#22c55e" />
                      <circle cx="365" cy="355" r="25" fill="#16a34a" />
                      <circle cx="395" cy="355" r="25" fill="#16a34a" />
                    </motion.g>

                    {/* Sparkles */}
                    <motion.g
                      animate={{
                        opacity: [0.4, 1, 0.4],
                        scale: [0.8, 1.2, 0.8],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <path
                        d="M 180 200 L 183 207 L 190 210 L 183 213 L 180 220 L 177 213 L 170 210 L 177 207 Z"
                        fill="#fbbf24"
                      />
                      <path
                        d="M 340 180 L 342 185 L 347 187 L 342 189 L 340 194 L 338 189 L 333 187 L 338 185 Z"
                        fill="#fbbf24"
                      />
                      <path
                        d="M 420 240 L 423 247 L 430 250 L 423 253 L 420 260 L 417 253 L 410 250 L 417 247 Z"
                        fill="#fbbf24"
                      />
                    </motion.g>

                    {/* Floating Leaves */}
                    <motion.g
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <path
                        d="M 100 280 Q 105 275 110 280 Q 105 285 100 280"
                        fill="#22c55e"
                        opacity="0.6"
                      />
                      <path
                        d="M 400 300 Q 405 295 410 300 Q 405 305 400 300"
                        fill="#16a34a"
                        opacity="0.6"
                      />
                    </motion.g>
                  </svg>

                  {/* Decorative Elements */}
                  <motion.div
                    className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full opacity-20 blur-xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="absolute -bottom-4 -left-4 w-24 h-24 bg-green-300 rounded-full opacity-20 blur-xl"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
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

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-xl text-gray-600">
                Simple, effective, and rewarding
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={<MapPinIcon className="w-12 h-12 text-primary-600" />}
                title="Report Waste"
                description="Spot illegal dumping? Take a photo and pin it on the map with details."
              />
              <FeatureCard
                icon={
                  <CheckCircleIcon className="w-12 h-12 text-primary-600" />
                }
                title="Get Verified"
                description="Our community and admins verify reports to ensure accuracy."
              />
              <FeatureCard
                icon={<ChartBarIcon className="w-12 h-12 text-primary-600" />}
                title="Track Progress"
                description="Watch as your city gets cleaner with real-time updates and stats."
              />
              <FeatureCard
                icon={<TrophyIcon className="w-12 h-12 text-primary-600" />}
                title="Earn Rewards"
                description="Get eco-points for every verified report and climb the leaderboard."
              />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <StatCard number="1,234" label="Reports Submitted" />
              <StatCard number="856" label="Sites Cleaned" />
              <StatCard number="2,456" label="Active Users" />
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Real Impact, Real Change
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See how communities are transforming their neighborhoods with
                Reviwa
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Contributing to SDG 11
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Our platform directly supports the United Nations
                    Sustainable Development Goal 11: Making cities inclusive,
                    safe, resilient and sustainable. Every report you make
                    contributes to building better urban environments.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircleIcon className="w-6 h-6 text-primary-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Reduce pollution and improve air quality
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="w-6 h-6 text-primary-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Enhance public spaces and green areas
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="w-6 h-6 text-primary-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Build community engagement and awareness
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="w-6 h-6 text-primary-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Create data-driven solutions for urban planning
                      </span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl shadow-xl p-8 text-white">
                  <h4 className="text-3xl font-bold mb-2">2.5 Tons</h4>
                  <p className="text-primary-100 mb-4">
                    Waste Collected This Month
                  </p>
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-white"
                      initial={{ width: 0 }}
                      whileInView={{ width: "75%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h4 className="text-3xl font-bold text-gray-900 mb-2">94%</h4>
                  <p className="text-gray-600 mb-4">
                    Reports Resolved Within 7 Days
                  </p>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: "94%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-secondary-800 to-secondary-900 rounded-2xl shadow-xl p-8 text-white">
                  <h4 className="text-3xl font-bold mb-2">150+</h4>
                  <p className="text-gray-300">Communities Participating</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                What Our Community Says
              </h2>
              <p className="text-xl text-gray-600">
                Real stories from real change-makers
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    SA
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Sarah Anderson</h4>
                    <p className="text-sm text-gray-600">Community Volunteer</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Reviwa has transformed how our neighborhood tackles waste.
                  We've cleaned up 15 illegal dumping sites in just 3 months!"
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    MK
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Michael Kim</h4>
                    <p className="text-sm text-gray-600">
                      Environmental Activist
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "The gamification aspect is genius! My students compete to
                  report and clean up waste. It's education and action
                  combined."
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    PN
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Priya Nair</h4>
                    <p className="text-sm text-gray-600">City Council Member</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Reviwa provides invaluable data for urban planning. We can
                  now prioritize cleanup efforts based on real community input."
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl mb-8 text-gray-200">
              Join thousands of citizens working together to create cleaner,
              healthier communities.
            </p>
            <Link
              to="/register"
              className="btn bg-white text-primary-700 hover:bg-primary-50 px-8 py-3 text-lg inline-block"
            >
              Start Reporting Today
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-white font-bold text-lg mb-4">
                  About Reviwa
                </h3>
                <p className="text-sm">
                  A community-driven platform for sustainable waste management
                  aligned with SDG 11 - Sustainable Cities and Communities.
                </p>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-4">
                  Quick Links
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link to="/reports" className="hover:text-white">
                      View Reports
                    </Link>
                  </li>
                  <li>
                    <Link to="/leaderboard" className="hover:text-white">
                      Leaderboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="hover:text-white">
                      Get Started
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-4">Contact</h3>
                <p className="text-sm">
                  Have questions? Reach out to us at
                  <br />
                  <a
                    href="mailto:support@reviwa.com"
                    className="text-primary-400 hover:text-primary-300"
                  >
                    support@reviwa.com
                  </a>
                </p>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
              <p>
                &copy; {new Date().getFullYear()} Reviwa. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    whileHover={{ y: -8, scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300 }}
    className="card card-hover text-center group relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <div className="relative z-10">
      <div className="flex justify-center mb-4">
        <div className="p-4 bg-primary-50 rounded-2xl group-hover:bg-primary-100 transition-all duration-300 group-hover:scale-110 transform">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

const StatCard = ({ number, label }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="group"
  >
    <div className="text-6xl font-extrabold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
      {number}
    </div>
    <div className="text-gray-600 text-lg font-medium">{label}</div>
  </motion.div>
);

export default LandingPage;
