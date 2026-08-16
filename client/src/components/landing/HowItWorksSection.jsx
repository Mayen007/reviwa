import { motion } from "framer-motion";
import {
  MapPinIcon,
  CheckCircleIcon,
  ChartBarIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";

export const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    whileHover={{ y: -8, scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300 }}
    className="card card-hover text-center group relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <div className="relative z-10">
      <div className="flex justify-center mb-3 sm:mb-4">
        <div className="p-3 sm:p-4 bg-primary-50 rounded-2xl group-hover:bg-primary-100 transition-all duration-300 group-hover:scale-110 transform">
          {icon}
        </div>
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
        {title}
      </h3>
      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  </motion.div>
);

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600">4 steps to cleaner cities</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <FeatureCard
            icon={
              <MapPinIcon className="w-10 h-10 sm:w-12 sm:h-12 text-primary-600" />
            }
            title="1. Report"
            description="Photo + location. Done in 30 seconds."
          />
          <FeatureCard
            icon={
              <CheckCircleIcon className="w-10 h-10 sm:w-12 sm:h-12 text-primary-600" />
            }
            title="2. Verify"
            description="Community confirms. Admins approve."
          />
          <FeatureCard
            icon={
              <ChartBarIcon className="w-10 h-10 sm:w-12 sm:h-12 text-primary-600" />
            }
            title="3. Track"
            description="Real-time cleanup updates."
          />
          <FeatureCard
            icon={
              <TrophyIcon className="w-10 h-10 sm:w-12 sm:h-12 text-primary-600" />
            }
            title="4. Earn"
            description="Points, badges, leaderboard glory."
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
