"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = ["WELCOME", "TO", "Nexora AI"];

export default function IntroScreen({ onComplete }: { onComplete?: () => void }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timings = [800, 700, 1000];

    let elapsed = 0;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    steps.forEach((_, i) => {
      elapsed += timings[i];
      const t = setTimeout(() => {
        if (i < steps.length - 1) {
          setStep(i + 1);
        } else {
          setTimeout(() => {
            setDone(true);
            setTimeout(() => onComplete?.(), 700);
          }, 800);
        }
      }, elapsed);
      timeouts.push(t);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-9999 flex items-center justify-center bg-[#080610]"
          exit={{ opacity: 0, filter: "blur(12px)", scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Ambient glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-[#7C5CFC]/10 blur-[90px]" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 rounded-full bg-[#7C5CFC]/20 blur-2xl" />

          <AnimatePresence mode="wait">
            <motion.p
              key={step}
              initial={{ opacity: 0, filter: "blur(8px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, filter: "blur(8px)", y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={`select-none text-center font-light tracking-[0.25em] ${
                step === 2
                  ? "text-4xl font-semibold tracking-[0.15em] text-[#7C5CFC]"
                  : "text-2xl text-white/60"
              }`}
              style={{ fontFamily: "'SF Pro Display', 'Helvetica Neue', sans-serif" }}
            >
              {steps[step]}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}