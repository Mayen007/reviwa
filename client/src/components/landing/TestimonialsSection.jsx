import { motion } from "framer-motion";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

const TestimonialsSection = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-primary-100 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-20"></div>

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
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-green-500 text-white rounded-full text-sm font-semibold mb-6 shadow-lg"
          >
            <ChatBubbleLeftRightIcon className="w-4 h-4" />
            Community Voices
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            What Our{" "}
            <span className="bg-gradient-to-r from-primary-600 to-green-600 bg-clip-text text-transparent">
              Community
            </span>{" "}
            Says
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real stories from real change-makers
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative"
          >
            {/* Quote icon decoration */}
            <div className="absolute -top-4 -left-4 text-6xl text-primary-200 font-serif select-none pointer-events-none">
              "
            </div>

            <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 group-hover:border-primary-200">
              {/* Star rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>

              <p className="text-gray-700 italic mb-6 leading-relaxed">
                "Reviwa has transformed how our neighborhood tackles waste.
                We've cleaned up 15 illegal dumping sites in just 3 months!"
              </p>

              <div className="flex items-center pt-4 border-t border-gray-100">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-bold mr-4 text-lg shadow-lg">
                  SA
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">
                    Sarah Anderson
                  </h4>
                  <p className="text-sm text-gray-600">
                    Community Volunteer
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative"
          >
            {/* Quote icon decoration */}
            <div className="absolute -top-4 -left-4 text-6xl text-emerald-200 font-serif select-none pointer-events-none">
              "
            </div>

            <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 group-hover:border-emerald-200">
              {/* Star rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>

              <p className="text-gray-700 italic mb-6 leading-relaxed">
                "The gamification aspect is genius! My students compete to
                report and clean up waste. It's education and action
                combined."
              </p>

              <div className="flex items-center pt-4 border-t border-gray-100">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold mr-4 text-lg shadow-lg">
                  MK
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">
                    Michael Kim
                  </h4>
                  <p className="text-sm text-gray-600">
                    Environmental Activist
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative"
          >
            {/* Quote icon decoration */}
            <div className="absolute -top-4 -left-4 text-6xl text-blue-200 font-serif select-none pointer-events-none">
              "
            </div>

            <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 group-hover:border-blue-200">
              {/* Star rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>

              <p className="text-gray-700 italic mb-6 leading-relaxed">
                "Reviwa provides invaluable data for urban planning. We can
                now prioritize cleanup efforts based on real community
                input."
              </p>

              <div className="flex items-center pt-4 border-t border-gray-100">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4 text-lg shadow-lg">
                  PN
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">
                    Priya Nair
                  </h4>
                  <p className="text-sm text-gray-600">
                    City Council Member
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
