import React from "react";
import { motion } from "framer-motion";

// Animation variants following Reviwa design system specifications
const fadeInVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1], // cubic-bezier(0.4, 0, 0.2, 1)
    },
  },
};

const slideUpVariants = {
  hidden: {
    opacity: 0,
    y: 32,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Motion wrapper components for common animations
export const FadeIn = ({ children, delay = 0, className = "", ...props }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={fadeInVariants}
    transition={{ ...fadeInVariants.visible.transition, delay }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

export const SlideUp = ({ children, delay = 0, className = "", ...props }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={slideUpVariants}
    transition={{ ...slideUpVariants.visible.transition, delay }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

export const StaggerContainer = ({ children, className = "", ...props }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={staggerContainer}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children, className = "", ...props }) => (
  <motion.div variants={fadeInVariants} className={className} {...props}>
    {children}
  </motion.div>
);

// For components that need to animate on scroll/viewport entry
export const AnimateOnView = ({
  children,
  animation = "fadeIn",
  delay = 0,
  className = "",
  ...props
}) => {
  const variants = animation === "slideUp" ? slideUpVariants : fadeInVariants;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={variants}
      transition={{ ...variants.visible.transition, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default {
  FadeIn,
  SlideUp,
  StaggerContainer,
  StaggerItem,
  AnimateOnView,
};
