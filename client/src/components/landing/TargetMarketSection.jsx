import { motion } from "framer-motion";
import {
  UserGroupIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

export const TargetMarketCard = ({ icon, title, description, color }) => {
  const colorClasses = {
    primary: "from-primary-500 to-primary-600 shadow-primary-500/50",
    green: "from-emerald-500 to-green-600 shadow-emerald-500/50",
    blue: "from-blue-500 to-blue-600 shadow-blue-500/50",
    purple: "from-purple-500 to-purple-600 shadow-purple-500/50",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -12, scale: 1.05 }}
      className="group relative"
    >
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 group-hover:bg-white/15 transition-all duration-300"></div>

      {/* Content */}
      <div className="relative p-8">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className={`w-16 h-16 bg-gradient-to-br ${
            colorClasses[color] || colorClasses.primary
          } rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl transition-shadow`}
        >
          {icon}
        </motion.div>
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary-50 transition-colors">
          {title}
        </h3>
        <p className="text-primary-100 text-sm leading-relaxed font-normal">
          {description}
        </p>

        {/* Decorative corner accent */}
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-white/10 to-transparent rounded-tl-2xl rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
    </motion.div>
  );
};

const TargetMarketSection = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 overflow-hidden">
      {/* Animated decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImRvdHMiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IndoaXRlIiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZG90cykiLz48L3N2Zz4=')] opacity-40"></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-primary-400/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold mb-6 border border-white/30"
          >
            <UserGroupIcon className="w-4 h-4" />
            Built For Everyone
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Who It's For
          </h2>
          <p className="text-xl text-primary-50 max-w-2xl mx-auto">
            Everyone plays a role in building cleaner communities
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <TargetMarketCard
            icon={<UserGroupIcon className="w-8 h-8" />}
            title="Citizens"
            description="Report. Earn rewards. Make your neighborhood cleaner."
            color="primary"
          />
          <TargetMarketCard
            icon={<BuildingOfficeIcon className="w-8 h-8" />}
            title="Businesses"
            description="Show CSR impact. Engage employees. Build better communities."
            color="green"
          />
          <TargetMarketCard
            icon={<AcademicCapIcon className="w-8 h-8" />}
            title="Schools & NGOs"
            description="Educate students. Drive action. Measure impact."
            color="blue"
          />
          <TargetMarketCard
            icon={<GlobeAltIcon className="w-8 h-8" />}
            title="Government"
            description="Get data. Optimize resources. Respond faster."
            color="purple"
          />
        </div>
      </div>
    </section>
  );
};

export default TargetMarketSection;
