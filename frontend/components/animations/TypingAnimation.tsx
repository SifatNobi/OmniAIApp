"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TypingAnimationProps {
  words: string[];
  className?: string;
}

export function TypingAnimation({ words, className = "" }: TypingAnimationProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const currentWord = words[currentIndex];

  const tick = useCallback(() => {
    if (!isDeleting) {
      setDisplayText(currentWord.substring(0, displayText.length + 1));
      if (displayText.length + 1 === currentWord.length) {
        setTimeout(() => setIsDeleting(true), 2000);
        return;
      }
    } else {
      setDisplayText(currentWord.substring(0, displayText.length - 1));
      if (displayText.length - 1 === 0) {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % words.length);
        return;
      }
    }
  }, [currentWord, displayText, isDeleting, words.length]);

  useEffect(() => {
    const timeout = setTimeout(tick, isDeleting ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [tick, isDeleting]);

  return (
    <span className={className}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={displayText}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-gradient"
        >
          {displayText}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
            className="inline-block w-[3px] h-[1em] bg-accent ml-1 align-middle"
          />
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
