"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  cursor?: boolean;
}

export function TypewriterText({
  text,
  speed = 50,
  delay = 0,
  className,
  cursor = true,
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(delayTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [started, text, speed]);

  return (
    <span className={className}>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {displayedText}
      </motion.span>
      {cursor && (
        <motion.span
          animate={{ opacity: done ? [1, 0] : 1 }}
          transition={done ? { duration: 0.6, repeat: Infinity, repeatType: "reverse" } : {}}
          className="inline-block ml-0.5"
        >
          |
        </motion.span>
      )}
    </span>
  );
}
