import { motion } from "framer-motion";
import {
  UserGroupIcon,
  BoltIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const WhyUsSection = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-primary-50">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-green-200/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-green-500 text-white rounded-full text-sm font-semibold mb-4 shadow-lg"
          >
            <SparklesIcon className="w-4 h-4" />
            Our Advantage
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Why{" "}
            <span className="bg-gradient-to-r from-primary-600 to-green-600 bg-clip-text text-transparent">
              Reviwa
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Four pillars that make us the leader in civic engagement
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -10, scale: 1.03 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-primary-600/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
            <div className="relative text-center p-8 rounded-2xl bg-white border border-primary-100 shadow-lg group-hover:shadow-2xl group-hover:border-primary-300 transition-all duration-300">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-primary-500/50"
              >
                <UserGroupIcon className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Community-Driven
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                By the people, for the people
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -10, scale: 1.03 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
            <div className="relative text-center p-8 rounded-2xl bg-white border border-blue-100 shadow-lg group-hover:shadow-2xl group-hover:border-blue-300 transition-all duration-300">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-blue-500/50"
              >
                <BoltIcon className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Tech-Enabled
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                AI + maps + analytics
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -10, scale: 1.03 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
            <div className="relative text-center p-8 rounded-2xl bg-white border border-emerald-100 shadow-lg group-hover:shadow-2xl group-hover:border-emerald-300 transition-all duration-300">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-primary-500/50"
              >
                <ShieldCheckIcon className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Transparent
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Open data, verified results
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -10, scale: 1.03 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
            <div className="relative text-center p-8 rounded-2xl bg-white border border-purple-100 shadow-lg group-hover:shadow-2xl group-hover:border-purple-300 transition-all duration-300">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-purple-500/50"
              >
                <SparklesIcon className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Scalable
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Neighborhood → City → Nation
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
