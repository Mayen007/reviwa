import { motion } from "framer-motion";
import { Target } from "lucide-react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

const SocialImpactSection = ({ impactStats = {} }) => {
  const wasteCollected = impactStats.wasteCollected || "2.5";

  return (
    <section className="py-16 bg-gradient-to-br from-primary-50 to-emerald-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            The Impact
          </h2>
          <p className="text-lg text-gray-600">
            Real numbers. Real change.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl shadow-xl p-6 text-white text-center"
          >
            <div className="text-4xl font-bold mb-2">
              {wasteCollected}T
            </div>
            <p className="text-primary-100 font-medium">Waste Collected</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl shadow-xl p-6 text-center border border-gray-100"
          >
            <div className="text-4xl font-bold text-gray-900 mb-2">94%</div>
            <p className="text-gray-600 font-medium">Resolved in 7 Days</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-r from-emerald-600 to-primary-700 rounded-xl shadow-xl p-6 text-white text-center"
          >
            <div className="text-4xl font-bold mb-2">150+</div>
            <p className="text-emerald-100 font-medium">Communities</p>
          </motion.div>
        </div>

        {/* SDG Impact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100"
        >
          <div className="text-3xl mb-3 text-primary-600">
            <Target className="w-8 h-8 mx-auto" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Supporting SDG 11
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Every report contributes to sustainable cities and communities
          </p>
          <div className="grid sm:grid-cols-3 gap-4 max-w-xl mx-auto text-sm font-semibold text-gray-700">
            <div className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-primary-50 text-primary-800">
              <CheckCircleIcon className="w-5 h-5 text-primary-600 shrink-0" />
              <span>Cleaner air</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-primary-50 text-primary-800">
              <CheckCircleIcon className="w-5 h-5 text-primary-600 shrink-0" />
              <span>Green spaces</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-primary-50 text-primary-800">
              <CheckCircleIcon className="w-5 h-5 text-primary-600 shrink-0" />
              <span>Data planning</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialImpactSection;
