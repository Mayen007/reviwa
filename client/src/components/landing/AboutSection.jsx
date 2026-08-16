import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full font-semibold mb-4 text-sm">
              About Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Mission-Driven Impact
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Empowering communities through technology. Building cleaner cities
              through collective action.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-3.5 py-1.5 bg-primary-50 text-primary-700 rounded-full text-sm font-medium border border-primary-100">
                Community First
              </span>
              <span className="px-3.5 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium border border-emerald-100">
                Data-Driven
              </span>
              <span className="px-3.5 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100">
                Scalable
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-6 text-white shadow-lg">
              <div className="text-3xl font-bold mb-1">2020</div>
              <p className="text-sm text-primary-100">Founded</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg">
              <div className="text-3xl font-bold mb-1">15+</div>
              <p className="text-sm text-emerald-100">Cities</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
              <div className="text-3xl font-bold mb-1">50K+</div>
              <p className="text-sm text-blue-100">Users</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
              <div className="text-3xl font-bold mb-1">100+</div>
              <p className="text-sm text-purple-100">Partners</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
