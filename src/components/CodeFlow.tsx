"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

interface CodeFlowStep {
  code: string;
  highlight: number[];
  description: string;
  output?: string;
}

interface CodeFlowProps {
  title: string;
  steps: CodeFlowStep[];
  language?: string;
}

export function CodeFlow({
  title,
  steps,
  language = "typescript",
}: CodeFlowProps) {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalSteps = steps.length;
  const step = steps[currentStep];
  const codeLines = step.code.split("\n");

  const goNext = useCallback(() => {
    setCurrentStep((prev) => (prev < totalSteps - 1 ? prev + 1 : prev));
  }, [totalSteps]);

  const goPrev = useCallback(() => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  // Auto-play logic
  useEffect(() => {
    if (autoPlay) {
      autoPlayRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < totalSteps - 1) {
            return prev + 1;
          }
          setAutoPlay(false);
          return prev;
        });
      }, 2000);
    } else if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
    };
  }, [autoPlay, totalSteps]);

  return (
    <div className="my-8 rounded-xl border border-[var(--card-border)] overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-gray-700/50">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="ml-2 text-sm text-gray-400 font-mono">{title}</span>
        </div>
        <span className="text-xs text-gray-500 font-mono">{language}</span>
      </div>

      {/* Progress bar */}
      <div className="h-0.5 bg-gray-800">
        <motion.div
          className="h-full"
          style={{
            background:
              "linear-gradient(90deg, var(--accent-purple), var(--accent-blue), var(--accent-cyan))",
          }}
          animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Two-panel layout */}
      <div className="flex flex-col md:flex-row">
        {/* Left panel: Code */}
        <div className="flex-1 min-w-0 bg-[#0d1117] overflow-x-auto">
          <pre className="p-4 text-sm leading-relaxed font-mono">
            <code>
              {codeLines.map((line, i) => {
                const lineNum = i + 1;
                const isHighlighted = step.highlight.includes(lineNum);
                return (
                  <motion.div
                    key={`${currentStep}-${i}`}
                    initial={{ backgroundColor: "transparent" }}
                    animate={{
                      backgroundColor: isHighlighted
                        ? "rgba(139, 92, 246, 0.15)"
                        : "transparent",
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex"
                  >
                    <span className="inline-block w-8 text-right mr-4 text-gray-600 select-none text-xs leading-relaxed">
                      {lineNum}
                    </span>
                    <span
                      className={
                        isHighlighted
                          ? "text-[var(--accent-cyan)]"
                          : "text-gray-300"
                      }
                    >
                      {line || "\u00A0"}
                    </span>
                  </motion.div>
                );
              })}
            </code>
          </pre>
        </div>

        {/* Right panel: Description */}
        <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-gray-700/50 bg-[#161b22] p-4 flex flex-col">
          {/* Step indicator */}
          <div className="text-xs text-gray-500 mb-3 font-mono">
            {t.codeFlow.step} {currentStep + 1}/{totalSteps}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="flex-1"
            >
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                {step.description}
              </p>

              {step.output && (
                <div className="rounded-lg bg-[#0d1117] border border-gray-700/50 p-3">
                  <div className="text-xs text-gray-500 mb-2 font-mono">
                    {t.codeFlow.output}
                  </div>
                  <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">
                    {step.output}
                  </pre>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-700/50">
            <button
              onClick={goPrev}
              disabled={currentStep === 0}
              className="px-3 py-1.5 text-xs font-medium rounded-md bg-gray-700/50 text-gray-300 hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              {t.codeFlow.prev}
            </button>
            <button
              onClick={goNext}
              disabled={currentStep === totalSteps - 1}
              className="px-3 py-1.5 text-xs font-medium rounded-md bg-gray-700/50 text-gray-300 hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              {t.codeFlow.next}
            </button>
            <button
              onClick={() => setAutoPlay((p) => !p)}
              className={`ml-auto px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                autoPlay
                  ? "bg-[var(--accent-purple)] text-white"
                  : "bg-gray-700/50 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {autoPlay ? t.codeFlow.pause : t.codeFlow.autoPlay}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
