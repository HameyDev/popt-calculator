"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function TransitionWrapper({ children }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname} // re-animates on route change
        initial={{ opacity: 0, y: 20 }}  // before page loads
        animate={{ opacity: 1, y: 0 }}   // animate in
        exit={{ opacity: 0, y: -20 }}    // animate out
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
