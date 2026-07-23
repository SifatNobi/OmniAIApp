"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const dismiss = useCallback(() => {
    setProgress(100);
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  useEffect(() => {
    let mounted = true;
    let start = performance.now();

    const tick = () => {
      if (!mounted) return;
      const elapsed = performance.now() - start;
      const p = Math.min(elapsed / 2500, 0.85);
      setProgress(p * 100);
      if (p < 0.85) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    const onLoad = () => {
      setTimeout(dismiss, 400);
    };

    if (document.readyState === "complete") {
      setTimeout(dismiss, 600);
    } else {
      window.addEventListener("load", onLoad);
    }

    return () => {
      mounted = false;
      window.removeEventListener("load", onLoad);
    };
  }, [dismiss]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
        >
          <div className="relative flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
              className="relative"
            >
              <motion.div
                className="absolute -inset-8 rounded-full border border-accent/30"
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.5, 0.2, 0.5],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -inset-14 rounded-full border border-accent/15"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.1, 0.3],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              />
              <div className="relative flex h-16 w-16 items-center justify-center">
                <svg viewBox="0 0 32 32" className="h-10 w-10">
                  <defs>
                    <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="50%" stopColor="#06B6D4" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                  <motion.circle
                    cx="16" cy="16" r="14"
                    fill="none"
                    stroke="url(#logoGrad)"
                    strokeWidth="2"
                    initial={{ pathLength: 0, rotate: -90 }}
                    animate={{ pathLength: progress / 100, rotate: -90 }}
                    style={{ transformOrigin: "16px 16px" }}
                    transition={{ duration: 0.3, ease: "linear" }}
                  />
                  <motion.circle
                    cx="16" cy="16" r="6"
                    fill="url(#logoGrad)"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                  />
                </svg>
              </div>
            </motion.div>
          </div>

          <div className="mt-12 flex flex-col items-center gap-2">
            <div className="h-[2px] w-48 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-accent via-cyan-400 to-purple-500"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "linear" }}
              />
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs tracking-widest text-text-secondary/50"
            >
              LOADING
            </motion.p>
          </div>

          <motion.div
            className="absolute bottom-12 flex gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="h-1 w-1 rounded-full bg-accent/40"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
