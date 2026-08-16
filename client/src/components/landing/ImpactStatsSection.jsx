import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import {
  MapPinIcon,
  CheckCircleIcon,
  UserGroupIcon,
  TrophyIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

// Animated counting number hook
const useCountUp = (target, duration = 2) => {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  });
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(target);
    }
  }, [isInView, motionValue, target]);

  return { ref, spring };
};

// Animated number display
const AnimatedNumber = ({ value, suffix = "", prefix = "", decimals = 0 }) => {
  const numericValue = parseFloat(String(value).replace(/,/g, "")) || 0;
  const { ref, spring } = useCountUp(numericValue);

  return (
    <span ref={ref}>
      <motion.span>
        {prefix}
        {spring ? (
          <motion.span>
            {spring.get !== undefined ? (
              <CountDisplay spring={spring} decimals={decimals} />
            ) : (
              value
            )}
          </motion.span>
        ) : (
          value
        )}
        {suffix}
      </motion.span>
    </span>
  );
};

// Separate render component that subscribes to the spring value
const CountDisplay = ({ spring, decimals }) => {
  const ref = useRef(null);

  useEffect(() => {
    return spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent =
          decimals > 0
            ? latest.toFixed(decimals)
            : Math.round(latest).toLocaleString();
      }
    });
  }, [spring, decimals]);

  return <span ref={ref}>0</span>;
};

export const StatCard = ({ rawValue, label, icon, suffix = "", decimals = 0 }) => {
  const numericValue = parseFloat(String(rawValue).replace(/,/g, "")) || 0;
  const { ref, spring } = useCountUp(numericValue);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="group relative"
    >
      {/* Glassmorphism card background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl group-hover:shadow-primary-500/20 transition-all duration-300"></div>

      {/* Content */}
      <div className="relative p-8">
        {icon && (
          <motion.div
            className="flex justify-center mb-6"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-500 to-green-500 flex items-center justify-center text-white shadow-lg group-hover:shadow-primary-500/50 transition-shadow">
              {icon}
            </div>
          </motion.div>
        )}
        <div className="text-center">
          <div
            ref={ref}
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-white via-primary-100 to-white bg-clip-text text-transparent mb-3 group-hover:from-primary-200 group-hover:via-white group-hover:to-green-200 transition-all duration-300"
          >
            <AnimatedCountValue spring={spring} decimals={decimals} suffix={suffix} />
          </div>
          <div className="text-primary-100 text-lg sm:text-xl font-semibold tracking-wide">
            {label}
          </div>
        </div>
      </div>

      {/* Decorative corner accents */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-400/20 to-transparent rounded-br-2xl rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-green-400/20 to-transparent rounded-tl-2xl rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </motion.div>
  );
};

// Component that renders a live spring value directly
const AnimatedCountValue = ({ spring, decimals, suffix }) => {
  const spanRef = useRef(null);

  useEffect(() => {
    return spring.on("change", (latest) => {
      if (spanRef.current) {
        const formatted =
          decimals > 0
            ? latest.toFixed(decimals)
            : Math.round(latest).toLocaleString();
        spanRef.current.textContent = formatted + suffix;
      }
    });
  }, [spring, decimals, suffix]);

  return <span ref={spanRef}>0{suffix}</span>;
};

const ImpactStatsSection = ({ impactStats = {} }) => {
  const totalReports = impactStats.totalReports || 1234;
  const resolvedReports = impactStats.resolvedReports || 856;
  const activeUsers = impactStats.activeUsers || 2456;
  const wasteCollected = parseFloat(impactStats.wasteCollected) || 2.5;

  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-500 rounded-full filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjA1Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100 }}
            className="inline-block mb-6"
          >
            <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-500 to-green-500 rounded-full text-sm font-bold shadow-lg">
              <SparklesIcon className="w-4 h-4 mr-2" />
              Live Impact Tracker
            </span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">
            Our Growing{" "}
            <span className="bg-gradient-to-r from-green-400 to-primary-400 bg-clip-text text-transparent">
              Impact
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real numbers. Real change. Real community power.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <StatCard
            rawValue={totalReports}
            label="Reports Submitted"
            icon={<MapPinIcon className="w-8 h-8" />}
            suffix="+"
          />
          <StatCard
            rawValue={resolvedReports}
            label="Sites Cleaned"
            icon={<CheckCircleIcon className="w-8 h-8" />}
            suffix="+"
          />
          <StatCard
            rawValue={activeUsers}
            label="Active Champions"
            icon={<UserGroupIcon className="w-8 h-8" />}
            suffix="+"
          />
          <StatCard
            rawValue={wasteCollected}
            label="Tons Collected"
            icon={<TrophyIcon className="w-8 h-8" />}
            suffix="T"
            decimals={1}
          />
        </div>
      </div>
    </section>
  );
};

export default ImpactStatsSection;
